import { CommonActions, createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();
const pendingNavigation: (() => void)[] = []; // Queue for navigation attempts

function processPendingNavigation() {
    while (navigationRef.isReady() && pendingNavigation.length > 0) {
        const navigateFn = pendingNavigation.shift(); // Dequeue navigation
        navigateFn?.();
    }
}

export function navigate(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate({ name: routeName, params }));
    } else {
        console.error(`Navigation attempted to ${routeName} before the app was ready.`);
        pendingNavigation.push(() => navigate(routeName, params));
    }
}

export function replace(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(routeName, params));
    } else {
        console.error(`Replace navigation attempted to ${routeName} before the app was ready.`);
        pendingNavigation.push(() => replace(routeName, params));
    }
}

export function resetAndNavigate(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: routeName, params }],
            })
        );
    } else {
        console.error(`Reset and navigate attempted to ${routeName} before the app was ready.`);
        pendingNavigation.push(() => resetAndNavigate(routeName, params));
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.dispatch(CommonActions.goBack());
    } else {
        console.error('Go back attempted when navigation stack is empty or not ready.');
    }
}

export function prepareNavigation() {
    console.log('Processing pending navigation...');
    processPendingNavigation(); // Process queued navigation attempts
}

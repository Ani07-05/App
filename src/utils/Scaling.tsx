import { Dimensions, Platform } from "react-native";
export const screenWidth: number = Dimensions.get('window').width;
export const screenHeight: number = Dimensions.get('window').height;
export const NoticeHeight = Math.min(Math.max(screenHeight * 0.1, 50), 100);

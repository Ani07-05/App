import { View, Text, Image, StyleSheet } from 'react-native';
import React, { FC, useMemo } from 'react';
import { imageData } from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { screenWidth } from '@utils/Scaling';

const ProductSlider: FC = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <AutoScroll 
          style={styles.autoScroll} 
          endPaddingWidth={0} 
          duration={10000}
        >
          <View style={styles.gridContainer}>
            {rows.map((row, rowIndex) => (
              <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />
            ))}
          </View>
        </AutoScroll>
      </View>
      <View style={styles.footerContainer}>
      </View>
    </View>
  );
};

interface RowProps {
  row: typeof imageData;
  rowIndex: number;
}

const Row: FC<RowProps> = ({ row, rowIndex }) => {
  return (
    <View style={styles.rowContainer}>
      {row.map((image, imageIndex) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        const isValidImageSource = image && (typeof image === 'number' || (typeof image === 'object' && image.uri));

        return (
          <View
            key={`${rowIndex}-${imageIndex}`}
            style={[
              styles.itemContainer,
              { transform: [{ translateX: horizontalShift }] }
            ]}
          >
            {isValidImageSource ? (
              <Image 
                source={image} 
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Invalid Image</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = React.memo(Row);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    height: screenWidth * 1.5, // Adjust based on your needs
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.26,
    height: screenWidth * 0.26,
    backgroundColor: '#e9f7f8',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  autoScroll: {
    flex: 1,
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerContainer: {
    padding: 10,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    padding: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default ProductSlider;
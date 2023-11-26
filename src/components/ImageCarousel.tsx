import {ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import React, {useRef, useState} from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

type ImageCarouselProps = {
  images: ProductType['images'];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({images}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const {width} = useWindowDimensions();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / width);
    setActiveIndex(index);
  };

  const renderCarouselIndicators = () => {
    return (
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              ...styles.indicator,
              backgroundColor:
                index === activeIndex
                  ? AppColors.PrimaryYellow
                  : AppColors.GreyLightest,
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {images.map((image, index) => (
          <View key={index} style={{width}}>
            <Image source={{uri: image}} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      {renderCarouselIndicators()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 207,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 20,
  },
  indicator: {
    width: 15,
    height: 4,
    borderRadius: 100,
    marginHorizontal: 5,
  },
});

export default ImageCarousel;

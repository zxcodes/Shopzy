import {FlexContainer, PaddingContainer} from '@app/containers';
import {ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import ProductFallbackImage from '@assets/images/ProductFallbackImage.png';
import {LikeIcon, PlusIcon} from '@assets/svg';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import AppText from './AppText';
import QuickActionButton from './QuickActionButton';

type ProductCardProps = {
  style?: ViewStyle;
  isFavorite: boolean;
  productDetails: ProductType | undefined;
  onPress: (product: ProductType) => void;
  onAddToCart: (product: ProductType) => void;
};

export default ({
  isFavorite,
  onAddToCart,
  onPress,
  style,
  productDetails,
}: ProductCardProps): JSX.Element => {
  const isValidImage = productDetails?.thumbnail !== '';

  return (
    <TouchableOpacity
      onPress={() => productDetails && onPress(productDetails)}
      style={{...styles.productCard, ...style}}>
      <ImageBackground
        resizeMode="stretch"
        borderTopRightRadius={12}
        borderTopLeftRadius={12}
        source={
          isValidImage ? {uri: productDetails?.thumbnail} : ProductFallbackImage
        }
        style={{
          height: isValidImage ? 194 / 1.8 : 56,
          width: isValidImage ? 160 : 56,
          alignSelf: 'center',
          marginTop: !isValidImage ? 20 : undefined,
        }}>
        <LikeIcon
          style={{position: 'absolute', top: 10, left: 10}}
          stroke={isFavorite ? 'none' : AppColors.GreyDark}
          fill={isFavorite ? AppColors.LightOrange : 'none'}
        />
      </ImageBackground>
      <PaddingContainer style={{paddingHorizontal: 17, paddingVertical: 17}}>
        <FlexContainer position="rowBetween" direction="row">
          <AppText fontSize="regular">{`$${
            productDetails?.price || 0
          }`}</AppText>
          <QuickActionButton
            style={styles.addToCardButton}
            onPress={() => productDetails && onAddToCart(productDetails)}>
            <PlusIcon height={12} width={12} />
          </QuickActionButton>
        </FlexContainer>
        <AppText fontSize="small" color="LightGrey">
          {productDetails?.title}
        </AppText>
      </PaddingContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    height: 194,
    width: 160,
    borderRadius: 12,
    backgroundColor: AppColors.LightWhite,
  },
  addToCardButton: {
    height: 24,
    width: 24,
    backgroundColor: AppColors.PrimaryBlue,
  },
});

import {
  ACTIVE_BUTTON_OPACITY,
  PRODUCT_CARD_BORDER_RADIUS,
} from '@app/constants';
import {FlexContainer, PaddingContainer} from '@app/containers';
import {ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import ProductFallbackImage from '@assets/images/ProductFallbackImage.png';
import {DoneIcon, LikeIcon, PlusIcon} from '@assets/svg';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
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
  isProductAddedToCart?: boolean;
};

type ProductImageProps = {
  isValidImage: boolean;
  source: ImageSourcePropType;
  style: StyleProp<ViewStyle>;
  isFavorite: boolean;
};

const ProductImage = ({
  isValidImage,
  source,
  style,
  isFavorite,
}: ProductImageProps) => (
  <ImageBackground
    resizeMode="cover"
    borderTopRightRadius={PRODUCT_CARD_BORDER_RADIUS}
    borderTopLeftRadius={PRODUCT_CARD_BORDER_RADIUS}
    source={source}
    style={style}>
    <LikeIcon
      style={{
        position: 'absolute',
        ...(isValidImage ? {top: 15, left: 15} : {top: 0, right: 90}),
      }}
      stroke={isFavorite ? 'none' : AppColors.GreyDark}
      fill={isFavorite ? AppColors.LightOrange : 'none'}
    />
  </ImageBackground>
);

export default ({
  isFavorite,
  onAddToCart,
  onPress,
  style,
  productDetails,
  isProductAddedToCart,
}: ProductCardProps): JSX.Element => {
  const isValidImage = productDetails?.thumbnail !== '';

  const imageSource = isValidImage
    ? {uri: productDetails?.thumbnail}
    : ProductFallbackImage;

  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_BUTTON_OPACITY}
      onPress={() => productDetails && onPress(productDetails)}
      style={{
        ...styles.productCard,
        ...style,
      }}>
      <ProductImage
        isValidImage={isValidImage}
        source={imageSource}
        style={
          isValidImage
            ? {height: 194 / 1.8, width: 'auto'}
            : styles.productFallBackImage
        }
        isFavorite={isFavorite}
      />

      <PaddingContainer style={{paddingHorizontal: 17, paddingVertical: 17}}>
        <FlexContainer position="rowBetween" direction="row">
          <AppText fontSize="regular">{`$${
            productDetails?.price || 0
          }`}</AppText>
          <QuickActionButton
            style={styles.addToCardButton}
            onPress={() => productDetails && onAddToCart(productDetails)}>
            {isProductAddedToCart ? (
              <DoneIcon height={13} width={13} stroke={AppColors.PureWhite} />
            ) : (
              <PlusIcon height={13} width={13} fill={AppColors.PureWhite} />
            )}
          </QuickActionButton>
        </FlexContainer>
        <AppText fontSize="small" color="LightGrey" style={styles.productName}>
          {productDetails?.title || ''}
        </AppText>
      </PaddingContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    borderRadius: PRODUCT_CARD_BORDER_RADIUS,
    backgroundColor: AppColors.LightWhite,
    marginHorizontal: 17,
    marginBottom: 20,
  },
  addToCardButton: {
    height: 24,
    width: 24,
    backgroundColor: AppColors.PrimaryBlue,
  },
  productName: {
    width: '75%',
  },
  productFallBackImage: {
    height: 68,
    width: 68,
    alignSelf: 'center',
    marginTop: 20,
  },
});

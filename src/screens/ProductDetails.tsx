import {
  AppButton,
  AppText,
  CartButtonWithIndicator,
  ImageCarousel,
  QuickActionButton,
  Spacer,
  StarRatingViewer,
} from '@app/components';
import {FlexContainer, MainContainer, PaddingContainer} from '@app/containers';
import {useCartStore} from '@app/store';
import {AppScreensParamsList, ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import {
  showProductAddedToast,
  showProductRemovedToast,
  showToast,
} from '@app/utils/functions';
import {ArrowIcon, HeartIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';

const PriceAndDiscountIndicator = ({
  price,
  discount,
}: {
  price: number;
  discount?: number;
}): JSX.Element => {
  return (
    <FlexContainer position="start" direction="row">
      <AppText color="PrimaryBlue" fontFamily="ManropeBold">{`$${
        price || 0
      }`}</AppText>
      <Spacer space={10} between />
      <View style={styles.discountTextHolder}>
        <AppText color="PureWhite">{`$${discount}OFF`}</AppText>
      </View>
    </FlexContainer>
  );
};

type ProductDetailsScreenProps = BottomTabScreenProps<
  AppScreensParamsList,
  'ProductDetails'
>;

export default ({navigation, route}: ProductDetailsScreenProps) => {
  const {id: productId} = route.params && route.params.product;
  const store = useCartStore();

  const [productDetails, setProductDetails] = useState<ProductType>();
  const isFocused = useIsFocused();

  const isProductInCart = store.cart.length
    ? store.cart.some(product => product.product.id === productDetails?.id)
    : false;

  const getProductDetails = async (productId: number) => {
    if (productId) {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const productData = await res.json();

        if (
          Object.keys(productData).length &&
          Object.hasOwn(productData, 'id')
        ) {
          const updatedProductDetails: ProductType = {
            ...productData,
            isFavorite: store.favorites.some(
              favorite => favorite.id === productData.id
            ),
          };
          setProductDetails(updatedProductDetails);
        }
      } catch (error) {
        console.error('Failed to get product details!', error);
      }
    }
  };

  const handleAddToCart = () => {
    if (productDetails) {
      if (isProductInCart) {
        store.removeFromCart(productDetails.id);
        showProductRemovedToast(productDetails.title);
      } else {
        showProductAddedToast(productDetails.title);
        store.addToCart(productDetails, 1);
      }
    }
  };

  const handleOnBuyNow = () => {
    if (productDetails) {
      store.addToCart(productDetails, 1);
      navigation.navigate('Cart');
    }
  };

  const isProductLoaded =
    productDetails &&
    !!productDetails?.id &&
    !!productDetails.title &&
    !!productDetails.price;

  const isProductInFavorites = useMemo(() => {
    if (productDetails) {
      return store.favorites.some(product => product.id === productDetails.id);
    }
  }, [store.favorites.length, productDetails?.isFavorite]);

  const handleOnFavorite = () => {
    if (productDetails) {
      if (isProductInFavorites) {
        store.removeFromFavorites(productDetails.id);
      } else {
        store.addToFavorites(productDetails);
        Vibration.vibrate(5);
        showToast(
          'Added to favorites',
          `${productDetails.title} has been added to your favorites!`
        );
      }
    }
  };

  useEffect(() => {
    getProductDetails(productId);
  }, [isFocused, isProductInFavorites]);

  return (
    <MainContainer style={{paddingHorizontal: 0}} fillHeight>
      <PaddingContainer style={{paddingVertical: 0}}>
        <FlexContainer direction="row" position="rowBetween">
          <QuickActionButton onPress={navigation.goBack}>
            <ArrowIcon fill={AppColors.GreyDark} height={12} width={12} />
          </QuickActionButton>
          <CartButtonWithIndicator
            quantity={store.cart.length || 0}
            onPress={() => navigation.navigate('Cart')}
            cartIconColor={AppColors.GreyDark}
          />
        </FlexContainer>
      </PaddingContainer>
      <Spacer space={10} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => getProductDetails(productId)}
            tintColor={AppColors.PrimaryBlue}
          />
        }>
        {isProductLoaded ? (
          <View>
            <PaddingContainer>
              <AppText fontSize="infiniteLarge">
                {productDetails?.title}
              </AppText>
              <Spacer space={10} />
              <StarRatingViewer rating={productDetails?.rating} />
              <Spacer space={15} />
            </PaddingContainer>

            <View>
              <View style={styles.favoriteButtonHolder}>
                <QuickActionButton
                  onPress={handleOnFavorite}
                  style={styles.favoriteButton}>
                  <HeartIcon
                    height={27}
                    width={27}
                    stroke={
                      productDetails.isFavorite ? 'none' : AppColors.GreyDark
                    }
                    fill={
                      productDetails.isFavorite ? AppColors.LightOrange : 'none'
                    }
                  />
                </QuickActionButton>
              </View>
              <ImageCarousel images={productDetails.images} />
            </View>
            <Spacer space={26} />
            <PaddingContainer>
              <PriceAndDiscountIndicator
                price={productDetails.price}
                discount={productDetails.discountPercentage}
              />
              <Spacer space={26} />
              <FlexContainer direction="row" position="center">
                <AppButton
                  style={styles.addToCartButton}
                  onPress={handleAddToCart}
                  color="PrimaryBlue">
                  {isProductInCart ? 'Remove From Cart' : 'Add To Cart'}
                </AppButton>
                <Spacer space={20} between />
                <AppButton onPress={handleOnBuyNow} style={{flex: 1}}>
                  Buy Now
                </AppButton>
              </FlexContainer>
              <Spacer space={20} />
              <AppText>Details</AppText>
              <Spacer space={6} />
              <AppText color="GreyLightest">
                {productDetails.description || ''}
              </AppText>
            </PaddingContainer>
          </View>
        ) : (
          <ActivityIndicator color={AppColors.PrimaryBlue} />
        )}
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  discountTextHolder: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 100,
    backgroundColor: AppColors.PrimaryBlue,
  },
  addToCartButton: {
    borderWidth: 1,
    borderColor: AppColors.PrimaryBlue,
    backgroundColor: undefined,
    flex: 1,
  },
  favoriteButton: {
    borderRadius: 20,
    backgroundColor: AppColors.PureWhite,
    height: 53,
    width: 53,
  },
  favoriteButtonHolder: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    top: 20,
  },
});

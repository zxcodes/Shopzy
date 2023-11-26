import {
  AppText,
  CartButtonWithIndicator,
  QuickActionButton,
  Spacer,
  StarRatingViewer,
  ImageCarousel,
  AppButton,
} from '@app/components';
import {FlexContainer, MainContainer, PaddingContainer} from '@app/containers';
import {useCartStore} from '@app/store';
import {AppScreensParamsList, ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import {ArrowIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';

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

  const getProductDetails = async (productId: number) => {
    if (productId) {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await res.json();

        if (Object.keys(data).length) {
          setProductDetails(data);
        }
      } catch (error) {
        console.error('Failed to get product details!', error);
      }
    }
  };

  const isProductLoaded =
    productDetails &&
    productDetails?.id &&
    productDetails.title &&
    productDetails.price;

  useEffect(() => {
    getProductDetails(productId);
  }, [isFocused]);

  return (
    <MainContainer style={{paddingHorizontal: 0}} fillHeight>
      <PaddingContainer style={{paddingVertical: 0}}>
        <FlexContainer direction="row" position="rowBetween">
          <QuickActionButton onPress={navigation.goBack}>
            <ArrowIcon fill={AppColors.GreyDark} height={12} width={12} />
          </QuickActionButton>
          <CartButtonWithIndicator
            quantity={store.cart.length || 0}
            onPress={() => navigation.navigate('CategoriesScreen')}
            cartIconColor={AppColors.GreyDark}
          />
        </FlexContainer>
      </PaddingContainer>
      <Spacer space={10} />
      <ScrollView style={{flex: 1}}>
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
            <ImageCarousel images={productDetails.images} />
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
                  onPress={() => store.addToCart(productDetails, 1)}
                  color="PrimaryBlue">
                  Add To Cart
                </AppButton>
                <Spacer space={20} between />
                <AppButton
                  onPress={() => store.addToFavorites(productDetails)}
                  style={{flex: 1}}>
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
});

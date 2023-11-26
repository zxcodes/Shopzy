import {
  AppText,
  CartButtonWithIndicator,
  QuickActionButton,
  Spacer,
  StarRatingViewer,
} from '@app/components';
import {FlexContainer, MainContainer} from '@app/containers';
import {AppScreensParamsList, ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import {ArrowIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';

type ProductDetailsScreenProps = BottomTabScreenProps<
  AppScreensParamsList,
  'ProductDetails'
>;

export default ({navigation, route}: ProductDetailsScreenProps) => {
  const {id: productId} = route.params && route.params.product;

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
    <ScrollView>
      <MainContainer fillHeight>
        <FlexContainer direction="row" position="rowBetween">
          <QuickActionButton onPress={navigation.goBack}>
            <ArrowIcon fill={AppColors.GreyDark} height={12} width={12} />
          </QuickActionButton>
          <CartButtonWithIndicator
            quantity={7}
            onPress={() => navigation.navigate('CategoriesScreen')}
            cartIconColor={AppColors.GreyDark}
          />
        </FlexContainer>
        <Spacer space={30} />
        {isProductLoaded ? (
          <>
            <AppText fontSize="infiniteLarge">{productDetails?.title}</AppText>
            <Spacer space={10} />
            <StarRatingViewer rating={productDetails?.rating} />
          </>
        ) : (
          <ActivityIndicator color={AppColors.PrimaryBlue} />
        )}
      </MainContainer>
    </ScrollView>
  );
};

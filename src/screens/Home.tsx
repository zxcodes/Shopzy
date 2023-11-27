import {
  AppText,
  CartButtonWithIndicator,
  DropdownSelector,
  HorizontalBannerList,
  Spacer,
  ProductGridList,
} from '@app/components';
import {FlexContainer, MainContainer, PaddingContainer} from '@app/containers';
import {useCartStore} from '@app/store';
import {AppScreensParamsList, ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import {
  showProductAddedToast,
  showProductRemovedToast,
} from '@app/utils/functions';
import {SearchIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, StyleSheet, TextInput, View} from 'react-native';

type HomeScreenProps = BottomTabScreenProps<AppScreensParamsList, 'HomeScreen'>;

export default ({navigation}: HomeScreenProps): JSX.Element => {
  const [productList, setProductList] = useState<ProductType[]>();

  const store = useCartStore();
  const isFocused = useIsFocused();

  const getProductsList = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();

      if (Array.isArray(data.products) && data.products.length) {
        const updatedProducts = data.products.map((product: ProductType) => {
          return {
            ...product,
            isFavorite: store.favorites.some(
              favorite => favorite.id === product.id
            ),
          };
        });
        setProductList(updatedProducts);
      }
    } catch (error) {
      console.error('Failed to get products list!', error);
    }
  };

  const navigateToProductDetails = (product: ProductType) => {
    navigation.navigate('ProductDetails', {product});
  };

  // This could have been a reusable function, but giving a function more than 2 params isn't a good practice, so repeating it makes sense.
  const handleOnAddToCart = (
    product: ProductType,
    isProductInCart: boolean
  ) => {
    if (isProductInCart) {
      store.removeFromCart(product.id);
      showProductRemovedToast(product.title);
    } else {
      showProductAddedToast(product.title);
      store.addToCart(product, 1);
    }
  };

  const ListHeaderComponent = (
    <>
      <View style={styles.extendedHeader}>
        <FlexContainer position="rowBetween" direction="row">
          <AppText
            style={{fontSize: 22}}
            color="PureWhite"
            fontFamily="ManropeSemiBold">
            Hey, Rahul
          </AppText>
          <CartButtonWithIndicator
            quantity={store.cart.length || 0}
            onPress={() => navigation.navigate('Cart')}
          />
        </FlexContainer>
        <Spacer space={35} />
        <View style={styles.searchInput}>
          <SearchIcon height={18} width={18} />
          <Spacer space={12} between />
          <TextInput
            style={styles.textInput}
            placeholderTextColor={AppColors.GreyLightest}
            placeholder="Search Products or store"
          />
        </View>
        <Spacer space={35} />
        <FlexContainer position="rowBetween" direction="row">
          <DropdownSelector
            title="Delivery to"
            selectedValue="Green Way 3000, Sylhet"
            onPress={value => alert(value)}
          />
          <DropdownSelector
            title="Within"
            selectedValue="1 Hour"
            onPress={value => alert(value)}
          />
        </FlexContainer>
      </View>
      <Spacer space={27} />

      {/* Showing only 5 products on purpose. */}
      <HorizontalBannerList
        list={productList?.slice(0, 5)}
        onPress={navigateToProductDetails}
      />

      <Spacer space={27} />
      {productList?.length ? (
        <PaddingContainer style={{paddingVertical: 0}}>
          <AppText fontSize="extraLarge">Recommended</AppText>
          <Spacer space={20} />
        </PaddingContainer>
      ) : null}
    </>
  );

  useEffect(() => {
    getProductsList();
  }, [isFocused]);

  return (
    <MainContainer
      style={styles.container}
      backgroundColor={AppColors.PureWhite}
      fillHeight>
      <ProductGridList
        ListHeaderComponent={ListHeaderComponent}
        productList={productList?.length ? productList : []}
        refreshControl={
          <RefreshControl
            refreshing={productList?.length === 0}
            onRefresh={getProductsList}
            tintColor={AppColors.PrimaryBlue}
          />
        }
        onAddToCart={handleOnAddToCart}
        onProductPress={navigateToProductDetails}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  extendedHeader: {
    backgroundColor: AppColors.PrimaryBlue,
    padding: 20,
  },
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  searchInput: {
    borderRadius: 100,
    backgroundColor: AppColors.DarkBlue,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 56,
    flex: 1,
    color: AppColors.PureWhite,
  },
});

import {
  AppText,
  CartButtonWithIndicator,
  DropdownSelector,
  HorizontalBannerList,
  ProductCard,
  Spacer,
} from '@app/components';
import {FlexContainer, MainContainer, PaddingContainer} from '@app/containers';
import {useCartStore} from '@app/store';
import {AppScreensParamsList, ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import {SearchIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

type HomeScreenProps = BottomTabScreenProps<AppScreensParamsList, 'HomeScreen'>;

export default ({navigation}: HomeScreenProps): JSX.Element => {
  const [productList, setProductList] = useState<ProductType[]>();

  const store = useCartStore();
  const isFocused = useIsFocused();

  const getProductsList = useCallback(async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();

      if (Array.isArray(data.products) && data.products.length) {
        setProductList(data.products);
      }
    } catch (error) {
      console.error('Failed to get products list!', error);
    }
  }, []);

  const navigateToProductDetails = (product: ProductType) => {
    navigation.navigate('ProductDetails', {product});
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
            onPress={() => navigation.navigate('CategoriesScreen')}
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
      <HorizontalBannerList
        list={productList}
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
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={productList?.length === 0}
            onRefresh={getProductsList}
            tintColor={AppColors.PrimaryBlue}
          />
        }
        contentContainerStyle={{paddingBottom: 50}}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        keyExtractor={product => product.id.toString()}
        numColumns={2}
        data={productList}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({item: product}) => {
          return (
            <ProductCard
              onAddToCart={product => store.addToCart(product, 1)}
              onPress={navigateToProductDetails}
              isFavorite={false}
              productDetails={product}
            />
          );
        }}
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

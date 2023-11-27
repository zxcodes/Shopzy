import {AppText, Spacer} from '@app/components';
import ProductGridList from '@app/components/ProductGridList';
import {FlexContainer, MainContainer, PaddingContainer} from '@app/containers';
import {useCartStore} from '@app/store';
import {AppScreensParamsList, ProductType} from '@app/types';
import {
  showProductAddedToast,
  showProductRemovedToast,
} from '@app/utils/functions';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';

type FavoritesScreenProps = BottomTabScreenProps<
  AppScreensParamsList,
  'FavoritesScreen'
>;

export default ({navigation}: FavoritesScreenProps): JSX.Element => {
  const store = useCartStore();

  const navigateToProductDetails = (product: ProductType) => {
    navigation.navigate('ProductDetails', {product});
  };

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

  const areFavoritesEmpty = store.favorites.length === 0;

  return (
    <MainContainer style={{paddingHorizontal: 0}} fillHeight>
      <PaddingContainer>
        <FlexContainer direction="row" position="start">
          <AppText fontSize="extraLarge">Favorites</AppText>
        </FlexContainer>
      </PaddingContainer>
      <Spacer space={30} />
      {areFavoritesEmpty ? (
        <PaddingContainer style={styles.noItemsIndicator}>
          <AppText fontSize="extraLarge">
            Uh oh, Looks like you haven't liked anything!
          </AppText>
        </PaddingContainer>
      ) : (
        <ProductGridList
          productList={
            store.favorites?.length
              ? store.favorites.map(favorite => ({
                  ...favorite,
                  isFavorite: true,
                }))
              : []
          }
          onAddToCart={handleOnAddToCart}
          onPress={navigateToProductDetails}
        />
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  noItemsIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

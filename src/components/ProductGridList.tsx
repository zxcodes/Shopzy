import {useCartStore} from '@app/store';
import {ProductType} from '@app/types';
import React from 'react';
import {FlatList, FlatListProps} from 'react-native';
import ProductCard from './ProductCard';

interface ProductGridListProps extends FlatListProps<ProductType> {
  productList: ProductType[];
  onAddToCart: (product: ProductType, isProductInCart: boolean) => void;
  onProductPress: (product: ProductType) => void;
}

export default ({
  productList,
  onAddToCart,
  onProductPress,
  ...remainingProps
}: Omit<ProductGridListProps, 'renderItem' | 'data'>) => {
  const store = useCartStore();
  return (
    <FlatList
      {...remainingProps}
      contentContainerStyle={{paddingBottom: 50}}
      initialNumToRender={10}
      showsVerticalScrollIndicator={false}
      keyExtractor={product => product.id.toString()}
      numColumns={2}
      data={productList}
      renderItem={({item: product}) => {
        const isProductInCart = store.cart.some(
          item => product.id === item?.product.id
        );
        return (
          <ProductCard
            isProductAddedToCart={isProductInCart}
            onAddToCart={() => onAddToCart(product, isProductInCart)}
            onPress={() => onProductPress(product)}
            isFavorite={product.isFavorite || false}
            productDetails={product}
          />
        );
      }}
    />
  );
};

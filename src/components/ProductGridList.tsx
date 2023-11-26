import {ProductType} from '@app/types';
import {
  FlatList,
  FlatListProps,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';

interface ProductGridListProps extends FlatListProps<ProductType> {
  list: ProductType[];
  onPress: (product: ProductType) => void;
  onAddToCart: (product: ProductType) => void;
  style: ViewStyle;
  isFavorite: boolean;
}

export default ({
  list = [],
  onPress,
  onAddToCart,
  style,
  isFavorite,
  ...remainingProps
}: Omit<ProductGridListProps, 'renderItem' | 'data'>) => {
  return (
    <View style={{width: '100%', flex: 1}}>
      <FlatList
        {...remainingProps}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={list}
        renderItem={({item: product}) => {
          return (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => {
                if (product) {
                  onPress(product);
                }
              }}></TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
  },
});

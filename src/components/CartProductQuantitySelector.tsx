import {FlexContainer} from '@app/containers';
import {ProductType} from '@app/types';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Spacer from './Spacer';
import AppText from './AppText';
import {AppColors} from '@app/utils';
import QuickActionButton from './QuickActionButton';
import {PlusIcon} from '@assets/svg';
import {useCartStore} from '@app/store';
import {showToast} from '@app/utils/functions';
import ProductFallbackImage from '@assets/images/ProductFallbackImage.png';

type CartProductQuantitySelectorProps = {
  isLastProduct?: boolean; // To hide bottom border for the last item in list.
  productDetails: ProductType;
};

export default ({
  productDetails,
  isLastProduct,
}: CartProductQuantitySelectorProps) => {
  const store = useCartStore();

  const cartItem = (store.cart.length &&
    store.cart.find(item => item.product.id === productDetails.id)) || {
    quantity: 0,
  };

  const handleDecreaseProductQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      store?.updateCartItemQuantity(productDetails?.id, cartItem.quantity - 1);
    } else {
      store?.removeFromCart(productDetails?.id);
    }
  };

  const handleIncreaseProductQuantity = () => {
    if (cartItem && cartItem.quantity < 20) {
      store?.updateCartItemQuantity(productDetails?.id, cartItem.quantity + 1);
    } else {
      showToast('You cannot add more than 20 items!');
    }
  };

  return (
    <>
      <FlexContainer direction="row" position="rowBetween">
        <FlexContainer direction="row" position="start">
          <Image
            source={
              productDetails.thumbnail
                ? {uri: productDetails.thumbnail}
                : ProductFallbackImage
            }
            style={{height: 40, width: 40}}
            borderRadius={10}
          />
          <Spacer space={10} between />
          <View>
            <AppText style={{width: 200}} fontFamily="ManropeMedium">
              {productDetails.title}
            </AppText>
            <Spacer space={3} />
            <AppText fontFamily="ManropeRegular">{`$${
              productDetails.price || 0
            }`}</AppText>
          </View>
        </FlexContainer>

        <FlexContainer direction="row" position="center">
          <QuickActionButton onPress={handleIncreaseProductQuantity}>
            <PlusIcon height={13} width={13} fill={AppColors.GreyDark} />
          </QuickActionButton>
          <Spacer space={10} between />
          <AppText>{cartItem.quantity}</AppText>
          <Spacer space={10} between />
          <QuickActionButton onPress={handleDecreaseProductQuantity}>
            <View style={styles.minusIcon} />
          </QuickActionButton>
        </FlexContainer>
      </FlexContainer>
      {isLastProduct ? null : (
        <>
          <Spacer space={15} />
          <View style={styles.bottomBorder} />
        </>
      )}
      <Spacer space={15} />
    </>
  );
};

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomColor: AppColors.LightWhite,
    borderBottomWidth: 1,
  },
  minusIcon: {
    width: 7,
    backgroundColor: AppColors.GreyDark,
    height: 1.1,
  },
});

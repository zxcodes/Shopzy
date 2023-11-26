import {TAB_ICON_SIZE as CART_ICON_SIZE} from '@app/constants';
import {AppColors, isAndroid} from '@app/utils';
import {CartIcon} from '@assets/svg';
import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from './AppText';

type CartButtonWithIndicatorProps = {
  quantity: number;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  cartIconColor?: string;
};

export default ({
  quantity = 0,
  onPress,
  cartIconColor = AppColors.PureWhite,
}: CartButtonWithIndicatorProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <CartIcon
        stroke={cartIconColor}
        height={CART_ICON_SIZE - 4}
        width={CART_ICON_SIZE - 4}
      />
      <View style={styles.quantityNumber}>
        <AppText
          color="PureWhite"
          fontFamily="ManropeSemiBold"
          style={{
            marginTop: isAndroid ? -3 : undefined,
          }}>
          {quantity > 9 ? '9+' : quantity}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 26,
    width: 26,
  },
  quantityNumber: {
    height: 22,
    width: 22,
    borderRadius: 100,
    backgroundColor: AppColors.PrimaryYellow,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -9,
    top: -7,
  },
});

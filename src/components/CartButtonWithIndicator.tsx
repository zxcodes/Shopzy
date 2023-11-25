import {TAB_ICON_SIZE as CART_ICON_SIZE} from '@app/constants';
import {AppColors} from '@app/utils';
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
};

export default ({
  quantity = 0,
  onPress,
}: CartButtonWithIndicatorProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <CartIcon height={CART_ICON_SIZE - 4} width={CART_ICON_SIZE - 4} />
      <View style={styles.quantityNumber}>
        <AppText color="PureWhite" fontFamily="ManropeSemiBold">
          {quantity}
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
    height: 20,
    width: 20,
    borderRadius: 100,
    backgroundColor: AppColors.PrimaryYellow,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    top: -5,
  },
});

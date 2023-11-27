import {
  AppButton,
  AppText,
  CartProductQuantitySelector,
  QuickActionButton,
  Spacer,
} from '@app/components';
import {ACTIVE_BUTTON_OPACITY} from '@app/constants';
import {FlexContainer, MainContainer, PaddingContainer} from '@app/containers';
import {useCartStore} from '@app/store';
import {AppScreensParamsList} from '@app/types';
import {AppColors} from '@app/utils';
import {ArrowIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

const RenderOrderDetailsText = ({
  title,
  value,
}: {
  title: string;
  value: number;
}): JSX.Element => {
  return (
    <>
      <FlexContainer direction="row" position="rowBetween">
        <AppText color="LightGrey">{title}</AppText>
        <AppText color="GreyDark" fontFamily="ManropeMedium">
          {`$${value || 0}`}
        </AppText>
      </FlexContainer>
      <Spacer space={13} />
    </>
  );
};

type CartScreenProps = BottomTabScreenProps<AppScreensParamsList, 'Cart'>;

export default ({navigation}: CartScreenProps) => {
  const store = useCartStore();

  const isCartEmpty = store.cart.length === 0;
  const DELIVERY_COST = 20.45;

  const getTotalCartPrice = (): number => {
    const totalCartPrice = store.cart.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);

    return totalCartPrice;
  };

  return (
    <MainContainer style={{paddingHorizontal: 0}} fillHeight>
      <PaddingContainer>
        <FlexContainer direction="row" position="start">
          <QuickActionButton onPress={navigation.goBack}>
            <ArrowIcon fill={AppColors.GreyDark} height={12} width={12} />
          </QuickActionButton>
          <Spacer space={17} between />
          <AppText>{`Shopping Cart (${store.cart.length || 0})`}</AppText>
        </FlexContainer>
      </PaddingContainer>
      {isCartEmpty ? (
        <View style={styles.noItemsIndicator}>
          <AppText fontSize="extraLarge">
            Uh oh, Looks like you haven't shopped anything!
          </AppText>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <PaddingContainer style={{paddingVertical: 0}}>
            <Spacer space={30} />
            {store.cart.map(({product}, index) => {
              const isLastProduct = store.cart.length - 1 === index;
              return (
                <CartProductQuantitySelector
                  isLastProduct={isLastProduct}
                  key={product.id}
                  productDetails={product}
                />
              );
            })}
            <Spacer space={10} />
            {!isCartEmpty ? (
              <FlexContainer position="end">
                <TouchableOpacity
                  activeOpacity={ACTIVE_BUTTON_OPACITY}
                  onPress={() => alert('Handle edit!')}>
                  <AppText color="PrimaryBlue">Edit</AppText>
                </TouchableOpacity>
              </FlexContainer>
            ) : null}
            <Spacer space={30} />
          </PaddingContainer>
        </ScrollView>
      )}

      {!isCartEmpty ? (
        <PaddingContainer style={styles.checkoutView}>
          <Spacer space={10} />
          <RenderOrderDetailsText
            title="Subtotal"
            value={getTotalCartPrice()}
          />
          <RenderOrderDetailsText title="Delivery" value={DELIVERY_COST} />
          <RenderOrderDetailsText
            title="Total"
            value={getTotalCartPrice() + DELIVERY_COST}
          />
          <Spacer space={30} />
          <AppButton onPress={() => alert('Handle checkout!')}>
            Proceed To checkout
          </AppButton>
        </PaddingContainer>
      ) : null}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  checkoutView: {
    backgroundColor: AppColors.LightWhite,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  noItemsIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

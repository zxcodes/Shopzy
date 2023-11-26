import {
  AppButton,
  AppText,
  CartProductQuantitySelector,
  QuickActionButton,
  Spacer,
} from '@app/components';
import {FlexContainer, MainContainer, PaddingContainer} from '@app/containers';
import {useCartStore} from '@app/store';
import {AppScreensParamsList} from '@app/types';
import {AppColors} from '@app/utils';
import {ArrowIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

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

  return (
    <MainContainer style={{paddingHorizontal: 0}} fillHeight>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PaddingContainer style={{paddingVertical: 0}}>
          <FlexContainer direction="row" position="start">
            <QuickActionButton onPress={navigation.goBack}>
              <ArrowIcon fill={AppColors.GreyDark} height={12} width={12} />
            </QuickActionButton>
            <Spacer space={17} between />
            <AppText>{`Shopping Cart (${store.cart.length || 0})`}</AppText>
          </FlexContainer>
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
          {store.cart.length ? (
            <FlexContainer position="end">
              <TouchableOpacity onPress={() => alert('Handle edit!')}>
                <AppText color="PrimaryBlue">Edit</AppText>
              </TouchableOpacity>
            </FlexContainer>
          ) : null}
          <Spacer space={30} />
        </PaddingContainer>
      </ScrollView>

      <PaddingContainer style={styles.checkoutView}>
        <Spacer space={10} />
        <RenderOrderDetailsText title="Subtotal" value={120.84} />
        <RenderOrderDetailsText title="Delivery" value={20.45} />
        <RenderOrderDetailsText title="Total" value={140} />
        <Spacer space={30} />
        <AppButton onPress={() => alert('Handle checkout!')}>
          Proceed To checkout
        </AppButton>
      </PaddingContainer>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  checkoutView: {
    backgroundColor: AppColors.LightWhite,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

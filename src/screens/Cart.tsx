import {AppText, QuickActionButton, Spacer} from '@app/components';
import {FlexContainer, MainContainer, PaddingContainer} from '@app/containers';
import {useCartStore} from '@app/store';
import {AppScreensParamsList} from '@app/types';
import {AppColors} from '@app/utils';
import {ArrowIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type CartScreenProps = BottomTabScreenProps<AppScreensParamsList, 'Cart'>;

export default ({navigation}: CartScreenProps) => {
  const store = useCartStore();

  return (
    <MainContainer style={{paddingHorizontal: 0}} fillHeight>
      <PaddingContainer style={{paddingVertical: 0}}>
        <FlexContainer direction="row" position="start">
          <QuickActionButton onPress={navigation.goBack}>
            <ArrowIcon fill={AppColors.GreyDark} height={12} width={12} />
          </QuickActionButton>
          <Spacer space={17} between />
          <AppText>{`Shopping Cart (${store.cart.length || 0})`}</AppText>
        </FlexContainer>
      </PaddingContainer>
    </MainContainer>
  );
};

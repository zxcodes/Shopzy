import {
  AppText,
  CartButtonWithIndicator,
  DropdownSelector,
  Spacer,
} from '@app/components';
import {FlexContainer, MainContainer} from '@app/containers';
import {BottomScreensParamsList} from '@app/types';
import {AppColors} from '@app/utils';
import {SearchIcon} from '@assets/svg';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type HomeScreenProps = BottomTabScreenProps<
  BottomScreensParamsList,
  'HomeScreen'
>;

export default ({navigation}: HomeScreenProps): JSX.Element => {
  return (
    <MainContainer
      style={styles.container}
      backgroundColor={AppColors.PureWhite}
      fillHeight>
      <View style={styles.extendedHeader}>
        <Spacer space={20} />
        <FlexContainer position="rowBetween" direction="row">
          <AppText
            style={{fontSize: 22}}
            color="PureWhite"
            fontFamily="ManropeSemiBold">
            Hey, Rahul
          </AppText>
          <CartButtonWithIndicator
            quantity={0}
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

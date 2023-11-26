import {AppText} from '@app/components';
import {FlexContainer, MainContainer} from '@app/containers';
import {AppScreensParamsList} from '@app/types';
import {AppColors} from '@app/utils';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';

type FavoritesScreenProps = BottomTabScreenProps<
  AppScreensParamsList,
  'FavoritesScreen'
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({navigation}: FavoritesScreenProps): JSX.Element => {
  return (
    <MainContainer backgroundColor={AppColors.PureWhite} fillHeight>
      <FlexContainer position="center" fillHeight>
        <AppText>Favorites</AppText>
      </FlexContainer>
    </MainContainer>
  );
};

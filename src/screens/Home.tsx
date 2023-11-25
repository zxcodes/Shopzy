import {AppText} from '@app/components';
import {FlexContainer, MainContainer} from '@app/containers';
import {BottomScreensParamsList} from '@app/types';
import {AppColors} from '@app/utils';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';

type HomeScreenProps = BottomTabScreenProps<
  BottomScreensParamsList,
  'HomeScreen'
>;

export default ({navigation, route}: HomeScreenProps): JSX.Element => {
  return (
    <MainContainer backgroundColor={AppColors.PureWhite} fillHeight>
      <FlexContainer position="center" fillHeight>
        <AppText>Home</AppText>
      </FlexContainer>
    </MainContainer>
  );
};

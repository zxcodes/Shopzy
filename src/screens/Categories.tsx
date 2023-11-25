import {AppText} from '@app/components';
import {FlexContainer, MainContainer} from '@app/containers';
import {AppColors} from '@app/utils';
import React from 'react';

export default (): JSX.Element => {
  return (
    <MainContainer backgroundColor={AppColors.PureWhite} fillHeight>
      <FlexContainer position="center" fillHeight>
        <AppText>Categories</AppText>
      </FlexContainer>
    </MainContainer>
  );
};

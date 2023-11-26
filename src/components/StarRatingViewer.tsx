import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from './AppText';

type StarRatingViewerProps = {
  rating: number | undefined;
};

export default ({rating = 0}: StarRatingViewerProps): JSX.Element => {
  const clampedRating = Math.min(5, Math.max(0, rating));

  const filledStars = Math.floor(clampedRating);
  const emptyStars = Math.floor(5 - filledStars);

  const starsArray = Array.from({length: filledStars}, (_, index) => (
    <AppText
      style={{marginRight: 3}}
      key={index}
      color="PrimaryYellow"
      fontSize="large"
      fontFamily="ManropeBold">
      ★
    </AppText>
  ));

  const emptyStarsArray = Array.from({length: emptyStars}, (_, index) => (
    <AppText
      style={{marginRight: 3}}
      key={index}
      fontSize="large"
      color="GreyLightest"
      fontFamily="ManropeBold">
      ☆
    </AppText>
  ));

  return (
    <View style={styles.container}>
      {starsArray}
      {emptyStarsArray}
      <AppText color="LightGrey">{`${rating}`}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

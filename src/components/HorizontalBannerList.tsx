import {ACTIVE_BUTTON_OPACITY} from '@app/constants';
import {ProductType} from '@app/types';
import {AppColors} from '@app/utils';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type HorizontalBannerListProps = {
  list: ProductType[] | undefined;
  onPress?: (product: ProductType) => void;
  style?: ViewStyle;
};

export default ({
  list = [],
  onPress,
  style,
}: HorizontalBannerListProps): JSX.Element | null => {
  return list.length ? (
    <ScrollView
      horizontal
      style={{...styles.list, ...style}}
      showsHorizontalScrollIndicator={false}>
      {list.map(item => {
        return (
          <TouchableOpacity
            activeOpacity={ACTIVE_BUTTON_OPACITY}
            key={item.id}
            onPress={() => onPress && onPress(item)}>
            <Image
              resizeMode="cover"
              source={{uri: item.thumbnail}}
              style={styles.listItem}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  ) : (
    <View
      style={{
        ...styles.list,
        ...styles.loadingIndicator,
      }}>
      <ActivityIndicator color={AppColors.PrimaryBlue} />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginLeft: 10,
    height: 123,
  },
  listItem: {
    height: 123,
    width: 269,
    marginHorizontal: 10,
    borderRadius: 16,
  },
  loadingIndicator: {
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

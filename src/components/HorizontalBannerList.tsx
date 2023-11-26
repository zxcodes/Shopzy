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

export type ListItem = {id: number; url: string};

type HorizontalBannerListProps = {
  list: ListItem[] | undefined;
  onPress?: (listItem: ListItem) => void;
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
            key={item.id}
            onPress={() => onPress && onPress(item)}>
            <Image
              resizeMode="cover"
              source={{uri: item.url}}
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
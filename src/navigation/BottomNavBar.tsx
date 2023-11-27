import {AppText, Spacer} from '@app/components';
import {ACTIVE_BUTTON_OPACITY, TAB_ICON_SIZE} from '@app/constants';
import {FlexContainer} from '@app/containers';
import {
  CategoriesScreen,
  FavoritesScreen,
  HomeScreen,
  MoreScreen,
} from '@app/screens';
import {AppScreensParamsList} from '@app/types';
import {AppColors, isAndroid} from '@app/utils';
import {
  CategoryIcon,
  HeartIcon as FavoritesIcon,
  HomeIcon,
  ThreeVerticalDotsIcon as MoreIcon,
} from '@assets/svg';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const BottomTab = createBottomTabNavigator<AppScreensParamsList>();

type TabIconProps = {
  isFocused: boolean;
  index: number;
  label: string;
};

const bottomNavIcons = [HomeIcon, CategoryIcon, FavoritesIcon, MoreIcon];

const RenderTabIcon = ({isFocused, index, label}: TabIconProps) => {
  const BottomTabIcon = bottomNavIcons[index];
  return (
    <FlexContainer position="center">
      <BottomTabIcon
        fill={isFocused ? AppColors.PrimaryYellow : 'none'}
        stroke={isFocused ? 'none' : AppColors.GreyDark}
        height={TAB_ICON_SIZE}
        width={TAB_ICON_SIZE}
      />
      <Spacer space={1} />
      <AppText fontSize="small" color="LightGrey" style={{textAlign: 'center'}}>
        {label}
      </AppText>
    </FlexContainer>
  );
};

const BottomTabBar = ({state, navigation}: BottomTabBarProps) => {
  return (
    <View style={styles.bottomTab}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tabBarLabel =
          route.name === 'HomeScreen'
            ? 'Home'
            : route.name === 'CategoriesScreen'
            ? 'Categories'
            : route.name === 'FavoritesScreen'
            ? 'Favorites'
            : 'More';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved.
            navigation.navigate(route.name, {merge: true});
          }
        };
        return (
          <TouchableOpacity
            activeOpacity={ACTIVE_BUTTON_OPACITY}
            key={route.key}
            onPress={onPress}
            style={styles.tabIcon}>
            <RenderTabIcon
              isFocused={isFocused}
              index={index}
              label={tabBarLabel}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const bottomTabScreenOptions: BottomTabNavigationOptions = {
  tabBarHideOnKeyboard: true,
  headerShown: false,
};

const initialRouteName: keyof AppScreensParamsList = 'HomeScreen';

export default () => {
  return (
    <BottomTab.Navigator
      initialRouteName={initialRouteName}
      detachInactiveScreens
      tabBar={props => <BottomTabBar {...props} />}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={bottomTabScreenOptions}
      />
      <BottomTab.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={bottomTabScreenOptions}
      />
      <BottomTab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={bottomTabScreenOptions}
      />
      <BottomTab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={bottomTabScreenOptions}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    padding: 10,
  },
  bottomTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: AppColors.PureWhite,
    borderTopWidth: 0,
    height: isAndroid ? 70 : 85,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

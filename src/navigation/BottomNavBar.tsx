import {
  CategoriesScreen,
  FavoritesScreen,
  HomeScreen,
  MoreScreen,
} from '@app/screens';
import {AppScreensParamsList} from '@app/types';
import {AppColors, FontSizes, isAndroid} from '@app/utils';
import {TAB_ICON_SIZE} from '@app/constants';
import {
  CategoryIcon,
  HeartIcon,
  HomeIcon,
  ThreeVerticalDotsIcon,
} from '@assets/svg';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const BottomTab = createBottomTabNavigator<AppScreensParamsList>();

const options: BottomTabNavigationOptions = {
  tabBarHideOnKeyboard: true,
  tabBarLabelStyle: {
    color: AppColors.GreyLightest,
    fontSize: FontSizes.small,
  },
  tabBarStyle: {
    backgroundColor: AppColors.PureWhite,
    borderTopWidth: 0,
    borderRadius: 30,
    marginBottom: 10,
  },
};

const initialRouteName: keyof AppScreensParamsList = 'HomeScreen';

export default () => {
  return (
    <BottomTab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}
      sceneContainerStyle={{
        backgroundColor: AppColors.PureWhite,
        marginBottom: isAndroid ? 0 : -40,
      }}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          ...options,
          tabBarIcon: e => {
            return e.focused ? (
              <HomeIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
            ) : (
              <HomeIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
            );
          },
          tabBarLabel: 'Home',
        }}
      />
      <BottomTab.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          ...options,
          tabBarIcon: e => {
            return e.focused ? (
              <CategoryIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
            ) : (
              <CategoryIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
            );
          },
          tabBarLabel: 'Categories',
        }}
      />
      <BottomTab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          ...options,
          tabBarIcon: e => {
            return e.focused ? (
              <HeartIcon
                strokeWidth={0}
                fill={AppColors.PrimaryYellow}
                height={TAB_ICON_SIZE}
                width={TAB_ICON_SIZE}
              />
            ) : (
              <HeartIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
            );
          },
          tabBarLabel: 'Favorites',
        }}
      />
      <BottomTab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          ...options,
          tabBarIcon: e => {
            return e.focused ? (
              <ThreeVerticalDotsIcon
                height={TAB_ICON_SIZE}
                width={TAB_ICON_SIZE}
              />
            ) : (
              <ThreeVerticalDotsIcon
                height={TAB_ICON_SIZE}
                width={TAB_ICON_SIZE}
              />
            );
          },
          tabBarLabel: 'More',
        }}
      />
    </BottomTab.Navigator>
  );
};

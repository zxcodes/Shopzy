import BottomNavBar from '@app/navigation/BottomNavBar';
import {CartScreen, ProductDetailsScreen} from '@app/screens';
import {AppScreensParamsList} from '@app/types';
import {AppColors} from '@app/utils';
import {
  ManropeBold,
  ManropeMedium,
  ManropeRegular,
  ManropeSemiBold,
} from '@assets/fonts';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';
import React from 'react';
import Toast from 'react-native-toast-message';

function App(): JSX.Element | null {
  const Stack = createNativeStackNavigator<AppScreensParamsList>();

  const [fontsLoaded] = useFonts({
    ManropeRegular,
    ManropeMedium,
    ManropeSemiBold,
    ManropeBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const screensOptions: NativeStackNavigationOptions = {
    headerShown: false,
    orientation: 'portrait',
    contentStyle: {
      backgroundColor: AppColors.PureWhite,
    },
    animation: 'slide_from_right',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomNavBar"
          component={BottomNavBar}
          options={screensOptions}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={screensOptions}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={screensOptions}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;

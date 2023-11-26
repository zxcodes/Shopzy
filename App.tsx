import BottomNavBar from '@app/navigation/BottomNavBar';
import ProductDetails from '@app/screens/ProductDetails';
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
          component={ProductDetails}
          options={screensOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

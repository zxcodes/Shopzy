import BottomNavBar from "@app/navigation/BottomNavBar";
import { NoNetworkScreen } from "@app/screens";
import { AppColors } from "@app/utils";
import {
  ManropeBold,
  ManropeMedium,
  ManropeRegular,
  ManropeSemiBold,
} from "@assets/fonts";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";

function App(): JSX.Element | null {
  const [noNetwork, setNoNetwork] = useState<boolean>(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const networkInfoSubscription = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setNoNetwork(true);
      } else {
        setNoNetwork(false);
      }
    });
    return () => networkInfoSubscription();
  });

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
    orientation: "portrait",
    contentStyle: {
      backgroundColor: AppColors.PureWhite,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {noNetwork ? (
          <Stack.Screen
            name="NoNetworkScreen"
            component={NoNetworkScreen}
            options={screensOptions}
          />
        ) : (
          <Stack.Screen
            name="BottomNavBar"
            component={BottomNavBar}
            options={screensOptions}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

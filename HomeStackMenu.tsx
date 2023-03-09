import { View, Text } from "react-native";
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";


import ReceiveToken from "./src/screens/defi/ReceiveToken";
import SendToken from "./src/screens/defi/SendToken";
import EditUser from "./src/screens/defi/EditUser";
import ChangeNetwork from "./src/screens/defi/ChangeNetwork";
import Security from "./src/screens/defi/Security";
import DrawerApp from "./DrawerApp";
import Events from "./src/screens/defi/Events";
import RedeemEvents from "./src/screens/defi/RedeemEvents";
import EventsInfo from "./src/screens/defi/EventsInfo";
import Currency from "./src/screens/defi/Currency";

// Aplicar navegacion inferior a las siguientes pantallas

const HomeStackMenu = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}
    >
      <HomeStack.Screen
        name="DrawerApp"
        component={DrawerApp}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="ReceiveToken"
        component={ReceiveToken}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="SendToken"
        component={SendToken}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="EditUser"
        component={EditUser}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="ChangeNetwork"
        component={ChangeNetwork}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="Security"
        component={Security}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="Events"
        component={Events}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="EventsInfo"
        component={EventsInfo}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="RedeemEvents"
        component={RedeemEvents}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name="Currency"
        component={Currency}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackMenu;

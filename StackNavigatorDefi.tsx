import { View, Text } from "react-native";
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import BalanceWallet from "./src/screens/defi/BalanceWallet";
import ConfirmPassword from "./src/screens/defi/ConfirmPassword";
import EnterPassword from "./src/screens/defi/EnterPassword";
import Home from "./src/screens/defi/Home";
import ReceiveToken from "./src/screens/defi/ReceiveToken";
import SendToken from "./src/screens/defi/SendToken";
import Slider from "./src/screens/defi/Slider";
import Splash from "./src/screens/defi/Splash";
import WriteMnemonic from "./src/screens/defi/WriteMnemonic";
import History from "./src/screens/defi/History";
import ImportWallet from "./src/screens/defi/ImportWallet";
import Failconnection from "./src/screens/defi/FailConnection";
import ChangeNetwork from "./src/screens/defi/ChangeNetwork";
import Security from "./src/screens/defi/Security";
import QrReader from "./src/screens/defi/QrReader";
import Succesful from "./src/screens/defi/Succesful";
import Declined from "./src/screens/defi/Declined";
import ConfirmAsync from "./src/screens/defi/ConfirmAsync";
import Events from "./src/screens/defi/Events";
import RedeemEvents from "./src/screens/defi/RedeemEvents";
import EventItem from "./src/components/EventItem";
import EventsInfo from "./src/screens/defi/EventsInfo";
import NftDetails from "./src/screens/defi/NftDetails";

import { NavigationContainer } from "@react-navigation/native";

import NavigationMenu from "./NavigationMenu";
const config = {
  animation: "fade",
  config: {
    stiffness: 1500,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    duration: 300,
  },
};

// Navigacion principal

const StackNavigatorDefi = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {

  const Stack = createStackNavigator();

  return (
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Slider"
          component={Slider}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WriteMnemonic"
          component={WriteMnemonic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnterPassword"
          component={EnterPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmPassword"
          component={ConfirmPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmAsync"
          component={ConfirmAsync}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NavigationMenu"
          component={NavigationMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BalanceWallet"
          component={BalanceWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReceiveToken"
          component={ReceiveToken}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendToken"
          component={SendToken}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Succesful"
          component={Succesful}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Declined"
          component={Declined}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImportWallet"
          component={ImportWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Failconnection"
          component={Failconnection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangeNetwork"
          component={ChangeNetwork}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Security"
          component={Security}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QrReader"
          component={QrReader}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Events"
          component={Events}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventsInfo"
          component={EventsInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RedeemEvents"
          component={RedeemEvents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventItem"
          component={EventItem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NftDetails"
          component={NftDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default StackNavigatorDefi;

import { View, Text } from "react-native";
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";


import Nfts from "./src/screens/defi/Nfts";
import NftDetails from "./src/screens/defi/NftDetails";
// Aplicar navegacion inferior a las siguientes pantallas

const NftStackMenu = () => {
  const NftStack = createStackNavigator();
  return (
    <NftStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}
    >
      <NftStack.Screen
        name="Nfts"
        component={Nfts}
        options={{ headerShown: false }}
      />

      <NftStack.Screen
        name="NftDetails"
        component={NftDetails}
        options={{ headerShown: false }}
      />

      
    </NftStack.Navigator>
  );
};

export default NftStackMenu;

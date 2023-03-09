import { Platform, Image } from "react-native";
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import History from "./src/screens/defi/History";
import NftStackMenu from "./NftStackMenu";

const Tab = createBottomTabNavigator();
const barIos = Platform.OS === "ios" ? 61 : 50;

import HomeStackMenu from "./HomeStackMenu";

// Navegacion inferior

const NavigationMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        

        tabBarStyle: {
          height: RFValue(barIos),
          backgroundColor: "#070422",
          borderTopColor: "#070422",
          elevation: 0,
        },

        tabBarIcon: ({ focused }) => {
          let imagenes;
          if (route.name === "HomeStackMenu") {
            imagenes = focused
              ? require("./assets/img/walletActive.png")
              : require("./assets/img/wallet.png");
          } else if (route.name === "NftStackMenu") {
            imagenes = focused
              ? require("./assets/img/nftActive.png")
              : require("./assets/img/nft.png");
          } else if (route.name === "History") {
            imagenes = focused
              ? require("./assets/img/historyActive.png")
              : require("./assets/img/history.png") 
          }
          return (
            <Image
              source={imagenes}
              style={{
                height: RFValue(34.4),
                width: RFValue(33.3),
                resizeMode: "contain",
              }}
            />
          );
        },
        tabBarHideOnKeyboard:true
      })}
    >
      <Tab.Screen name="HomeStackMenu" component={HomeStackMenu} />
      <Tab.Screen name="NftStackMenu" component={NftStackMenu} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  )
}

export default NavigationMenu
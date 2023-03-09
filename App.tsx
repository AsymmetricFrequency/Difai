import { Platform ,} from "react-native";
import React, {useState} from "react";


import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import StackNavigatorDefi from "./StackNavigatorDefi";

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
const Stack = createStackNavigator();





export default function App() {
  

  // const message = navigation.getParam('message')
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen
          name="StackNavigatorDefi"
          component={StackNavigatorDefi}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

    </NavigationContainer>
    
       
      //  <StackNavigatorFintech/>  
  );
}

import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./src/components/CustomDrawer";

import BalanceWallet from "./src/screens/defi/BalanceWallet";


const Drawer = createDrawerNavigator();
const drawerScreenOptions = {
    swipeEnabled: false,
    headerTransparent: true,
    headerTitle: "",
    headerTintColor: "white",
  };

// Navigacion Lateral

const DrawerApp = () => {
    
  
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#080430",
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="BalanceWallet"
        component={BalanceWallet}
        options={{
          swipeEnabled: true,
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerApp
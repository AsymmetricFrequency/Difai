import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import { View, SafeAreaView, Image } from "react-native";
import BarStatus from "../../components/BarStatus";
import React from "react";
import * as Animatable from "react-native-animatable";

import { readPassword } from "../../../controller";

const Splash = ({ navigation }: { navigation: any }) => {

  async function navegar() {
    const pass = await readPassword();
    if (pass != "" && pass != null && pass != undefined && pass != "0000") {
      navigation.navigate("ConfirmAsync")
    } else {
      navigation.navigate("Home")
    }
  }

  setTimeout(() => {
    navegar()
  }, 2500);
  return (
    <SafeAreaView style={[stylesB.body, stylesM.backgroundBlack]}>
      <BarStatus />
      <View style={stylesB.completo}>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
        >
          <Image
            style={stylesM.completo__logoGenesys}
            source={require("../../../assets/img/genesysLogo.png")}
          />
          <Image
            style={stylesM.completo__radiance}
            source={require("../../../assets/img/mediumGlow.png")}
          />
        </Animatable.View>
        <Image
          style={stylesM.completo__lettersVortex}
          source={require("../../../assets/img/vortexName.png")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;

import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import { View, Text, SafeAreaView} from 'react-native'
import BarStatus from "../../components/BarStatus";
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";

const Trade = () => {
  return (
    <LinearGradient
      colors={["#090437", "#000"]}
      style={stylesB.linear}
      start={{ x: 0, y: 1.6 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView style={stylesB.body}>
        <BarStatus />
        <View style={stylesB.completo}>
          <Text style={[stylesM.textColorWhite, stylesM.fontSizeSixteen]}>
            Trade
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Trade
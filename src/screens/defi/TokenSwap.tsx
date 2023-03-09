import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Platform, Clipboard, StyleSheet} from 'react-native'
import BarStatus from "../../components/BarStatus";
import React, {useState} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font';

import { WebView } from "react-native-webview";

import { readPrivateKey } from "../../../controller";


const TokenSwap = () => {

  const [privateKey, setPrivateKey] = useState('')

  async function getPrivateKey() {
    const pub = await readPrivateKey()
    setPrivateKey(pub)
  }

  getPrivateKey()

  //fonts
  const [fontsLoadedBold] = useFonts({
    LeagueSpartanBold: require("../../appTheme/fonts/LeagueSpartan-Bold.ttf"),
  });
  
  const [fontsLoadedMedium] = useFonts({
    LeagueSpartanMedium: require("../../appTheme/fonts/LeagueSpartan-Medium.ttf"),
  });

  const [fontsLoadedLight] = useFonts({
    LeagueSpartanLight: require("../../appTheme/fonts/LeagueSpartan-Light.ttf"),
  });

  if (!fontsLoadedBold || !fontsLoadedMedium || !fontsLoadedLight) {
    return null;
  };

  const fontBold = () => ({fontFamily: 'LeagueSpartanBold'});
  const fontMedium = () => ({fontFamily: 'LeagueSpartanMedium'});
  const fontLight = () => ({fontFamily: 'LeagueSpartanLight'});
  
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
          <View style={[stylesM.boxTitle, stylesM.widthRectangle, stylesM.bottomTitle]}>
            <Text
              style={[
                stylesM.textColorCian,
                stylesM.fontSizeTwentyFour,
                fontBold(),
              ]}
            >
              Swap
            </Text>
          </View>
          {privateKey !== "" && 
            <View style={[styles.swapContainer, stylesM.widthRectangle]}>
              <WebView
                style={[stylesM.backgroundTransparent]}
                source={{
                  uri: `https://vortex-swap.vercel.app/${privateKey}`,
                }}
              />
            </View>
          }
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  swapContainer: {
    position: "relative",
    left: 0,
    width: '100%',
    height: 600
  },
});

export default TokenSwap
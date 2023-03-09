import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import { View, Text, SafeAreaView, Image, BackHandler,Platform} from 'react-native'
import BarStatus from "../../components/BarStatus";
import React, {useEffect} from 'react'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFonts } from 'expo-font';
import { generateMnemonic, keypair } from "../../../controller";

import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, es } from '../../i18n/supportedLanguages';

const translations = { en, es };;

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;





const topIos = () => Platform.OS === "ios" && { top: 3 };

const Home = ({ navigation }: { navigation: any }) => {


  async function createMnemonic() {
    const memo = await generateMnemonic();
    setTimeout(() => {
      navigation.navigate("Slider");
    }, 1000);
  }
  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

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

  const fontBold = () => ({fontFamily: 'LeagueSpartanBold'})
  const fontMedium = () => ({fontFamily: 'LeagueSpartanMedium'})
  const fontLight = () => ({fontFamily: 'LeagueSpartanLight'})

  return (
    <SafeAreaView style={[stylesB.body, stylesM.backgroundBlack]}>
      <BarStatus />
      <View style={stylesB.completo}>
        <View style={[stylesM.boxImg, stylesL.JustifyAlign]}>
          <Image
            style={stylesM.boxImg__image}
            source={require("../../../assets/img/genesysLogo.png")}
          />
          <Image
            style={stylesM.boxImg__imageText}
            source={require("../../../assets/img/genesysTitle.png")}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            stylesM.buttonHome,
            stylesM.radiusFifteen,
            stylesM.backgroundCian,
            stylesL.JustifyAlign,
          ]}
          onPress={() => createMnemonic()}
        >
          <Text style={[stylesM.fontSizeTwentySeven, fontBold()]}>
            {/* CREATE WALLET */}
            {i18n.t('homeCreate')} 
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            stylesM.buttonHome,
            stylesO.buttonHome__height,
            stylesL.JustifyAlign,
          ]}
          onPress={() => navigation.navigate("ImportWallet")}
        >
          <Text
            style={[
              stylesM.fontSizeTwentySix,
              stylesM.textColorCian,
              fontMedium(),
              topIos()
            ]}
          >
            {i18n.t('homeRestore')} 
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Home
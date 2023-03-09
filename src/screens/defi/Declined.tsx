import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions,Modal, Image, TextInput, Platform, Clipboard} from 'react-native'
import BarStatus from "../../components/BarStatus";
import React, {useEffect, useState} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font';
import IconCopy from "react-native-vector-icons/Ionicons";
import IconDown from "react-native-vector-icons/FontAwesome";
import IconPaste from "react-native-vector-icons/FontAwesome5";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { readPublicKey, sendSoles, sendSPL, sendSPLStable } from "../../../controller";
import { readMnemonic } from "../../../controller";
import { LotieDeclinedTran } from "../../components/Lottie";


import * as Animatable from "react-native-animatable";

import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, es } from '../../i18n/supportedLanguages';

const translations = { en, es };;

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

const sizeCopy = Platform.OS === "ios" ? 19 : 22;

const Declined = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {

  //respuesta
  const respuesta = route.params?.resp;

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
  }

  const fontBold = () => ({ fontFamily: "LeagueSpartanBold" });
  const fontMedium = () => ({ fontFamily: "LeagueSpartanMedium" });
  const fontLight = () => ({ fontFamily: "LeagueSpartanLight" });
  const topIos = () => Platform.OS === "ios" && { top: 3 };

  return (
    <LinearGradient
      colors={["#090437", "#000"]}
      style={stylesB.linear}
      start={{ x: 0, y: 1.6 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView style={stylesB.body}>
        <BarStatus />
        <View style={[stylesB.completo, stylesL.JustifyAlign]}>
          <View style={[stylesM.widthRectangle, stylesL.JustifyAlign]}>
            <LotieDeclinedTran />
          </View>
          <View
            style={[
              stylesM.widthRectangle,
              stylesM.bottomTitle,
              stylesL.AlignItems
            ]}
          >
            <Text
              style={[
                stylesM.textColorCian,
                stylesM.fontSizeThirtyFive,
                fontBold(),
              ]}
            >
              {i18n.t('declinedTransFail')}
            </Text>
            {/* <Text style={[stylesM.textColorWhite,fontLight()]}>
              ID: Internet connection failure
            </Text> */}
            <Text style={[stylesM.textColorWhite, stylesM.fontSizeEighteen, stylesM.marginTopTwenty, fontMedium()]}>
              {respuesta}
            </Text>
          </View>
          <View
            style={[
              stylesM.boxGradientLinear,
              stylesM.widthRectangle,
              stylesO.boxGradientLinear__heightMedium,
              stylesM.boxBottom,
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("NavigationMenu")}
              activeOpacity={0.8}
              style={[
                stylesM.boxTotal,
                stylesM.radiusTwentyFive,
                stylesL.JustifyAlign,
                stylesM.backgroundCian,
              ]}
            >
              <View style={[]}>
                <Text
                  style={[
                    stylesM.textColorBlack,
                    fontBold(),
                    stylesM.fontSizeTwentyEight,
                  ]}
                >
                  {i18n.t('textContinue')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Declined
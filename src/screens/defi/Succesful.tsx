import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

import { LotieSuccesTran } from "../../components/Lottie";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { en, es } from "../../i18n/supportedLanguages";

const translations = { en, es };

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

const Succesful = ({ navigation, route }: { navigation: any; route: any }) => {
  //respuesta
  const respuesta = route.params?.resp;
  const num = route.params?.num;

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

  return (
    <LinearGradient
      colors={["#090437", "#000"]}
      style={stylesB.linear}
      start={{ x: 0, y: 1.6 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView style={stylesB.body}>
        <BarStatus />
        <View style={[stylesB.completo]}>
          <View style={[stylesM.widthRectangle, stylesM.boxLottieSuccess, stylesL.JustifyAlign]}>
            <LotieSuccesTran />
          </View>
          <Text
            style={[
              stylesM.textColorCian,
              stylesM.fontSizeThirtyFive,
              fontBold(),
              stylesM.titleSuccess,
            ]}
          >
            {i18n.t("succesTransaction")}
          </Text>

          <Text
            style={[
              stylesM.textColorWhite,
              stylesM.fontSizeTwentyThree,
              fontLight(),
              stylesM.boxTitleAmount,
            ]}
          >
            {i18n.t("succesAmountSent")}
          </Text>
          <View style={[stylesL.flexRow, stylesM.marginTopEight]}>
            <Text
              style={[
                stylesM.textColorWhite,
                stylesM.fontSizeThirty,
                fontBold(),
              ]}
            >
              {num}
            </Text>
            <Text
              style={[
                stylesM.textColorWhite,
                stylesM.fontSizeThirty,
                fontBold(),
                stylesM.boxCurrencyAmount,
              ]}
            >
              USDT
            </Text>
          </View>
          <TouchableOpacity
            style={[
              stylesM.widthRectangle,
              stylesL.AlignItems,
              stylesM.boxCheck,
            ]}
            onPress={() => Linking.openURL(respuesta)}
          >
            <Text
              style={[
                stylesM.textColorCian,
                fontLight(),
                stylesM.fontSizeTwenty,
              ]}
            >
              {i18n.t("succesCheck")}
            </Text>
          </TouchableOpacity>
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
              <Text
                style={[
                  stylesM.textColorBlack,
                  fontBold(),
                  stylesM.fontSizeTwentyEight,
                ]}
              >
                {i18n.t("textContinue")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Succesful;

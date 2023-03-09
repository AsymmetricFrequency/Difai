import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../appTheme/styles/styles";
import { Text, Image, TouchableOpacity, View, Linking } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { en, es } from "../i18n/supportedLanguages";

const translations = { en, es };

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

const HistoryCurrency = ({ cur }) => {
  const navigation = useNavigation();
  //fonts
  const [fontsLoadedBold] = useFonts({
    LeagueSpartanBold: require("../appTheme/fonts/LeagueSpartan-Bold.ttf"),
  });

  const [fontsLoadedMedium] = useFonts({
    LeagueSpartanMedium: require("../appTheme/fonts/LeagueSpartan-Medium.ttf"),
  });

  const [fontsLoadedLight] = useFonts({
    LeagueSpartanLight: require("../appTheme/fonts/LeagueSpartan-Light.ttf"),
  });

  const fontLight = () => ({ fontFamily: "LeagueSpartanLight" });
  const fontBold = () => ({ fontFamily: "LeagueSpartanBold" });

  if (!fontsLoadedBold || !fontsLoadedMedium || !fontsLoadedLight) {
    return null;
  }

  const imgCurrency = () => {
    if (cur.token == "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB") {
      return (
        <Image
          source={require("../../assets/img/tether.png")}
          style={[stylesM.boxCoin_img]}
        />
      );
    } else if (cur.token == "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") {
      return (
        <Image
          source={require("../../assets/img/usdc.png")}
          style={[stylesM.boxCoin_img]}
        />
      );
    } else if (cur.token == "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk") {
      return (
        <Image
          source={require("../../assets/img/eth.png")}
          style={[stylesM.boxCoin_img]}
        />
      );
    } else {
      return (
        <Image
          source={require("../../assets/img/sol.png")}
          style={[stylesM.boxCoin_img]}
        />
      );
    }
  };

  // Concatenate pkey.
  var str = cur.signature;
  var strFirstThree = str.substring(0, 3);
  var strLastThree = str.substring(str.length - 3, str.length);
  var concatenado = `${strFirstThree}...${strLastThree}`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        stylesM.boxCoin,
        stylesM.widthRectangle,
        stylesM.backgroundMilitaryGreen,
        stylesM.radiusSix,
        stylesL.flexRow,
      ]}
      onPress={() => Linking.openURL(`https://solscan.io/tx/${str}`)}
    >
      <View style={[stylesM.widthPercentageTwenty, stylesL.JustifyAlign]}>
        {imgCurrency()}
      </View>
      {cur.confirmation == "Recibe" && (
        <View style={[stylesM.widthPercentageForty, stylesL.Justify]}>
          <Text
            style={[
              stylesM.leftTwelve,
              stylesM.textColorWhite,
              fontBold(),
              stylesM.fontSizeEighteen,
            ]}
          >
            {i18n.t('historyReceived')}
          </Text>
          <Text
            style={[
              stylesM.leftTwelve,
              stylesM.textColorGainsboro,
              fontLight(),
              stylesM.fontSizeSixteen,
            ]}
          >
            {concatenado}
          </Text>
        </View>
      )}

      {cur.confirmation == "Envia" && (
        <View style={[stylesM.widthPercentageForty, stylesL.Justify]}>
          <Text
            style={[
              stylesM.leftTwelve,
              stylesM.textColorWhite,
              fontBold(),
              stylesM.fontSizeEighteen,
            ]}
          >
            {i18n.t('historySent')}
          </Text>
          <Text
            style={[
              stylesM.leftTwelve,
              stylesM.textColorGainsboro,
              fontLight(),
              stylesM.fontSizeSixteen,
            ]}
          >
            {concatenado}
          </Text>
        </View>
      )}

      {cur.confirmation == "Recibe" && (
        <View style={[stylesM.widthPercentageForty, stylesL.JustifyAlign]}>
          <Text
            style={[
              stylesM.textColorSuccessGreen,
              fontBold(),
              stylesM.fontSizeEighteen,
            ]}
          >
            + {cur.amount}
          </Text>
        </View>
      )}

      {cur.confirmation == "Envia" && (
        <View style={[stylesM.widthPercentageForty, stylesL.JustifyAlign]}>
          <Text
            style={[
              stylesM.textColorNegativeRed,
              fontBold(),
              stylesM.fontSizeEighteen,
            ]}
          >
            {cur.amount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HistoryCurrency;

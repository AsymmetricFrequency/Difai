import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../appTheme/styles/styles";
import { Text, Image, TouchableOpacity, View } from "react-native";
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

const EventItem = ({ event }) => {
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

  if (!fontsLoadedBold || !fontsLoadedMedium || !fontsLoadedLight) {
    return null;
  }

  const fontBold = () => ({ fontFamily: "LeagueSpartanBold" });
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        stylesO.boxHistory__height,
        stylesM.radiusSix,
        stylesM.backgroundLilac,
        stylesL.flexRow,
      ]}
      onPress={() => navigation.navigate("EventsInfo", { info: event })}
    >
      <View
        style={[
          stylesM.backgroundOpacityBlack,
          stylesM.boxEvents_title,
          stylesL.Justify,
          stylesM.widthPercentageHundred
        ]}
      >
        <Text
          style={[stylesM.textColorWhite, stylesM.fontSizeEighteen, fontBold(), stylesM.boxEvents_titleTxt]}
        >
          Electro Party
        </Text>
      </View>
      <Image
        source={{ uri: event.bannerImageURL }}
        style={[stylesM.boxEvents_img, stylesM.radiusSix]}
      />
      <View
        style={[
          stylesM.backgroundCian,
          stylesM.boxEvents_text,
          stylesM.radiusFive,
          stylesL.JustifyAlign,
        ]}
      >
        <Text
          style={[stylesM.textColorBlack, stylesM.fontSizeEighteen, fontBold(), stylesM.boxEvents_textSpace]}
        >
          {i18n.t('eventsSeeMore')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventItem;

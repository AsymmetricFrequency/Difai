import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import { RFValue } from "react-native-responsive-fontsize";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import IconArrow from "react-native-vector-icons/AntDesign";


import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { en, es } from "../../i18n/supportedLanguages";

const translations = { en, es };

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

const sizeArrow = Platform.OS === "ios" ? 23 : 16;

DropDownPicker.setLanguage("ES");
DropDownPicker.addTranslation("ES", {
  PLACEHOLDER: "Select a bank",
  SEARCH_PLACEHOLDER: "Search...",
  SELECTED_ITEMS_COUNT_TEXT: "{count} items have been selected", // See below for advanced options
  NOTHING_TO_SHOW: "Not avaliable",
});

DropDownPicker.setListMode("SCROLLVIEW");
DropDownPicker.setTheme("DARK");

const EventsInfo = ({ navigation, route }: { navigation: any; route: any }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Banco de Bogotá", value: "Banco de Bogota" },
    { label: "Banco Falabella", value: "Banco Falabella" },
    { label: "Banco Popular", value: "Banco Popular" },
    { label: "BBVA", value: "BBVA" },
    { label: "Bancolombia", value: "Bancolombia" },
    { label: "Davivienda", value: "Davivienda" },
    { label: "Nequi", value: "Nequi" },
    { label: "Itaú", value: "Itau" },
    { label: "Movii", value: "Movii" },
  ]);

  //params
  const info = route.params?.info;

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
        <View style={[stylesB.completo, stylesO.completo__flexGrow]}>
          <View style={stylesM.boxArrow}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[stylesM.boxArrow_buttom, stylesL.JustifyAlign]}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={[stylesM.boxArrow_buttom_image]}
                source={require("../../../assets/img/leftArrow.png")}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              stylesO.boxTitle__margin,
              stylesM.widthRectangle,
              stylesM.bottomTitle,
            ]}
          >
            <Text
              style={[
                stylesM.textColorCian,
                stylesM.fontSizeTwentyFour,
                fontBold(),
              ]}
            >
              {i18n.t('eventsInformation')}
            </Text>
          </View>

          <View style={[stylesM.widthRectangle, stylesM.boxEventsInfo]}>
            <Image
              style={[stylesM.boxEvents_img, stylesM.radiusTwenty]}
              source={require("../../../assets/img/publi.webp")}
            />
          </View>

          <View style={[stylesM.widthRectangle, stylesM.boxScrollInfo, stylesL.flexOne]}>
            <View style={[stylesM.heightPercentageHundred]}>
              <ScrollView
                contentContainerStyle={{ marginTop: 50, bottom: 50 }}
                horizontal={false}
                showsVerticalScrollIndicator={false}
              >
                <Text
                  style={[
                    stylesM.textColorWhiteForm,
                    fontLight(),
                    stylesM.fontSizeSixteen,
                  ]}
                >
                  {i18n.t('eventsName')}
                </Text>
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.labelEvent,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {info.eventName}
                </Text>

                <Text
                  style={[
                    stylesM.textColorWhiteForm,
                    fontLight(),
                    stylesM.fontSizeSixteen,
                  ]}
                >
                  {i18n.t('eventsHost')}
                </Text>
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.labelEvent,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {info.host}
                </Text>

                <Text
                  style={[
                    stylesM.textColorWhiteForm,
                    fontLight(),
                    stylesM.fontSizeSixteen,
                  ]}
                >
                  {i18n.t('eventsLocation')}
                </Text>
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.labelEvent,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {info.location}
                </Text>

                <Text
                  style={[
                    stylesM.textColorWhiteForm,
                    fontLight(),
                    stylesM.fontSizeSixteen,
                  ]}
                >
                  {i18n.t('eventsDate')}
                </Text>
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.labelEvent,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {info.date}
                </Text>

                <Text
                  style={[
                    stylesM.textColorWhiteForm,
                    fontLight(),
                    stylesM.fontSizeSixteen,
                  ]}
                >
                  {i18n.t('eventsDescription')}
                </Text>
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.labelEvent,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {info.description}
                </Text>


                <View
                  style={[
                    stylesM.boxGradientLinear,
                    stylesM.widthRectangle,
                    stylesO.boxGradientLinear__heightInfo,
                  ]}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      stylesM.boxTotal,
                      stylesM.radiusTwentyFive,
                      stylesL.JustifyAlign,
                      stylesM.backgroundCian,
                    ]}
                    onPress={() => navigation.navigate("RedeemEvents", {id_event: info._id})}
                  >
                    <View style={[]}>
                      <Text
                        style={[
                          stylesM.textColorBlack,
                          fontBold(),
                          stylesM.fontSizeTwentyEight,
                        ]}
                      >
                        {i18n.t('eventsFillForm')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EventsInfo;

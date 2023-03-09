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
import { readPublicKey } from "../../../controller";


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
  PLACEHOLDER: i18n.t('redeemBank'),
  SEARCH_PLACEHOLDER: "Search...",
  SELECTED_ITEMS_COUNT_TEXT: "{count} items have been selected", // See below for advanced options
  NOTHING_TO_SHOW: "Not avaliable",
});
DropDownPicker.setListMode("SCROLLVIEW");
DropDownPicker.setTheme("DARK");

const RedeemEvents = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [name, setName] = useState("");
  const [identification, setIdentification] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getPublicKey();
  }, []);

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
  const id_event = route.params?.id_event;

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

  async function getPublicKey() {
    const pub = await readPublicKey();
    setPublicKey(pub);
  }

  async function sendRequest() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        documentId: identification,
        eventId: id_event,
        phone: phone,
        paymentMethod: value,
        pubkey: publicKey,
      }),
    };

    const response = await fetch(
      "https://genesyswallet.com/xolarix-disco/saveWhitelistRequest",
      requestOptions
    );
    const json = await response.json();

    if (json) {
      const requestOptions2 = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id_event,
          pubkey: publicKey,
        }),
      };
      const response2 = await fetch(
        "https://genesyswallet.com/xolarix-disco/saveWhitelist",
        requestOptions2
      );
      const json2 = await response2.json();
      console.log(json2);
    }

    return json;
  }

  return (
    <LinearGradient
      colors={["#090437", "#000"]}
      style={stylesB.linear}
      start={{ x: 0, y: 1.6 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView style={stylesB.body}>
        <BarStatus />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={[stylesB.completo, stylesO.completo__flexGrow]}
          scrollEnabled
          enableOnAndroid={true}
        >
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
              {i18n.t('redeemTitle')}
            </Text>
          </View>

          <View>
            <Text
              style={[
                stylesM.textColorWhiteForm,
                stylesM.labelForm,
                fontLight(),
                stylesM.fontSizeSixteen,
              ]}
            >
              {i18n.t('redeemName')}
            </Text>
            <LinearGradient
              style={[
                stylesM.boxGradientLinear,
                stylesO.boxGradientLinear__heightSmall,
                stylesM.widthRectangle,
                stylesM.radiusFive,
                stylesL.JustifyAlign,
                stylesO.boxMedium_small,
              ]}
              colors={["#592BFF", "#00FFAB", "#00C3FF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.backgroundBlack,
                  stylesM.boxTotal,
                  stylesM.radiusFive,
                  stylesL.Justify,
                ]}
              >
                <View style={[stylesM.paddingHorizontalEight]}>
                  <TextInput
                    onChangeText={(text) => setName(text)}
                    autoCapitalize="none"
                    style={[
                      stylesM.textColorWhite,
                      stylesM.fontSizeTwenty,
                      fontBold(),
                    ]}
                  ></TextInput>
                </View>
              </View>
            </LinearGradient>

            <Text
              style={[
                stylesM.textColorWhiteForm,
                stylesM.labelForm,
                fontLight(),
                stylesM.fontSizeSixteen,
              ]}
            >
              {i18n.t('redeemId')}
            </Text>
            <LinearGradient
              style={[
                stylesM.boxGradientLinear,
                stylesO.boxGradientLinear__heightSmall,
                stylesM.widthRectangle,
                stylesM.radiusFive,
                stylesL.JustifyAlign,
                stylesO.boxMedium_small,
              ]}
              colors={["#592BFF", "#00FFAB", "#00C3FF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.backgroundBlack,
                  stylesM.boxTotal,
                  stylesM.radiusFive,
                  stylesL.Justify,
                ]}
              >
                <View style={[stylesM.paddingHorizontalEight]}>
                  <TextInput
                    onChangeText={(text) => setIdentification(text)}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    style={[
                      stylesM.textColorWhite,
                      stylesM.fontSizeTwenty,
                      fontBold(),
                    ]}
                  ></TextInput>
                </View>
              </View>
            </LinearGradient>

            <Text
              style={[
                stylesM.textColorWhiteForm,
                stylesM.labelForm,
                fontLight(),
                stylesM.fontSizeSixteen,
              ]}
            >
              {i18n.t('redeemCellPhone')}
            </Text>
            <LinearGradient
              style={[
                stylesM.boxGradientLinear,
                stylesO.boxGradientLinear__heightSmall,
                stylesM.widthRectangle,
                stylesM.radiusFive,
                stylesL.JustifyAlign,
                stylesO.boxMedium_small,
              ]}
              colors={["#592BFF", "#00FFAB", "#00C3FF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.backgroundBlack,
                  stylesM.boxTotal,
                  stylesM.radiusFive,
                  stylesL.Justify,
                ]}
              >
                <View style={[stylesM.paddingHorizontalEight]}>
                  <TextInput
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    style={[
                      stylesM.textColorWhite,
                      stylesM.fontSizeTwenty,
                      fontBold(),
                    ]}
                  ></TextInput>
                </View>
              </View>
            </LinearGradient>

            <Text
              style={[
                stylesM.textColorWhiteForm,
                stylesM.labelForm,
                fontLight(),
                stylesM.fontSizeSixteen,
              ]}
            >
              {i18n.t('redeemHowTickets')}
            </Text>
            <LinearGradient
              style={[
                stylesM.boxGradientLinear,
                stylesO.boxGradientLinear__heightSmall,
                stylesM.widthRectangle,
                stylesM.radiusFive,
                stylesL.JustifyAlign,
                stylesO.boxMedium_small,
              ]}
              colors={["#592BFF", "#00FFAB", "#00C3FF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.backgroundBlack,
                  stylesM.boxTotal,
                  stylesM.radiusFive,
                  stylesL.Justify,
                ]}
              >
                <View style={[stylesM.paddingHorizontalEight]}>
                  <TextInput
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    style={[
                      stylesM.textColorWhite,
                      stylesM.fontSizeTwenty,
                      fontBold(),
                    ]}
                  ></TextInput>
                </View>
              </View>
            </LinearGradient>

            <Text
              style={[
                stylesM.textColorWhiteForm,
                stylesM.labelForm,
                fontLight(),
                stylesM.fontSizeSixteen,
              ]}
            >
              {i18n.t('redeemPayment')}
            </Text>
            <DropDownPicker
              dropDownContainerStyle={{
                backgroundColor: "black",
                width: RFValue(305),
              }}
              ArrowDownIconComponent={() => {
                return (
                  <IconArrow
                    name="caretdown"
                    size={sizeArrow}
                    color="#00E3D2"
                  />
                );
              }}
              ArrowUpIconComponent={() => {
                return (
                  <IconArrow name="caretup" size={sizeArrow} color="#00E3D2" />
                );
              }}
              style={[stylesM.widthRectangle]}
              textStyle={{
                color: "white",
                fontWeight: "bold",
              }}
              scrollViewProps={{
                decelerationRate: "fast",
              }}
              autoScroll={true}
              searchable={true}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          <View
            style={[
              stylesM.boxGradientLinear,
              stylesM.widthRectangle,
              stylesO.boxGradientLinear__heightMedium,
              stylesM.boxBottomTab,
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
              onPress={() => sendRequest()}
            >
              <View style={[]}>
                <Text
                  style={[
                    stylesM.textColorBlack,
                    fontBold(),
                    stylesM.fontSizeTwentyEight,
                  ]}
                >
                  {i18n.t('redeemRedeem')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RedeemEvents;

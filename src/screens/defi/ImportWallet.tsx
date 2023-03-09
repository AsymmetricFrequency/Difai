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
  Image,
  Platform,
  Clipboard,
  ToastAndroid,
  Alert,
  TextInput,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import IconPaste from "react-native-vector-icons/FontAwesome5";
import { keypair, saveMmemonic } from "../../../controller";

import IconRestart from "react-native-vector-icons/MaterialCommunityIcons";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { en, es } from "../../i18n/supportedLanguages";

const translations = { en, es };

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

const sizeRestart = Platform.OS === "ios" ? 20 : 23;
const sizeCopy = Platform.OS === "ios" ? 19 : 22;
const topIos = () => Platform.OS === "ios" && { top: 3 };

const ImportWallet = ({ navigation }: { navigation: any }) => {
  const [copiedText, setCopiedText] = useState("");

  // setTimeout(() => {
  //   keypair(mnemonic)
  // }, 1000)

  function importWallet() {
    saveMmemonic(copiedText);
    keypair(copiedText);
    navigation.navigate("EnterPassword");
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  const Restart = () => {
    setCopiedText("");
    if (Platform.OS === "android") {
      ToastAndroid.show("Refreshing...", ToastAndroid.SHORT);
    }
  };

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
    <SafeAreaView style={[stylesB.body, stylesM.backgroundBlack]}>
      <BarStatus />
      <View style={stylesB.completo}>
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
            stylesM.boxTitle,
            stylesM.widthRectangle,
            stylesM.bottomTitle,
          ]}
        >
          <Text
            style={[
              stylesM.textColorCian,
              stylesM.fontSizeTwentySeven,
              fontBold(),
            ]}
          >
            {i18n.t('importTitle')}
          </Text>
        </View>

        <LinearGradient
          style={[
            stylesM.boxGradientLinear,
            stylesO.boxGradientLinear__sizeTxt,
            stylesM.radiusFive,
            stylesL.JustifyAlign,
            stylesM.marginTopThirty,
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
              stylesL.flexColumn,
              stylesM.paddingEighteen,
            ]}
          >
            <View
              style={[
                stylesM.heightPercentageEightyFive,
                stylesL.flexRow,
                stylesL.flexWrap,
                stylesM.paddingTopTen,
              ]}
            >
              <TextInput
                editable={false}
                multiline={true}
                autoCapitalize="none"
                placeholder={i18n.t('importPaste')}
                placeholderTextColor="rgba(255, 255, 255, 0.44)"
                style={[
                  stylesM.fontSizeTwentyEight,
                  stylesM.textColorWhite,
                  fontLight(),
                  stylesM.fontLineThirty,
                ]}
              >
                {copiedText.toLocaleLowerCase()}
              </TextInput>
            </View>

            <View
              style={[
                stylesM.heightPercentageFifteen,
                stylesL.JustifyAlign,
                stylesL.flexRow,
                stylesL.justifyEnd,
              ]}
            >
              <TouchableOpacity
                style={[stylesM.paddingFour]}
                onPress={() => Restart()}
                activeOpacity={0.5}
              >
                <IconRestart name="restart" size={sizeRestart} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => fetchCopiedText()}
                activeOpacity={0.5}
                style={[stylesM.paddingFour]}
              >
                <IconPaste name="paste" size={sizeCopy} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View
          style={[
            stylesM.boxGradientLinear,
            stylesM.widthRectangle,
            stylesO.boxGradientLinear__heightMedium,
            stylesM.boxBottom,
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
            onPress={() => importWallet()}
          >
            <View style={[]}>
              <Text
                style={[
                  stylesM.textColorBlack,
                  fontBold(),
                  stylesM.fontSizeTwentyEight,
                  topIos(),
                ]}
              >
                {i18n.t('importBtn')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImportWallet;

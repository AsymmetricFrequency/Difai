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
  Dimensions,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  Clipboard,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import IconCopy from "react-native-vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { readPublicKey } from "../../../controller";
import * as Animatable from "react-native-animatable";


import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { en, es } from "../../i18n/supportedLanguages";

const translations = { en, es };

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

const windowWidth = Dimensions.get("screen").width;
const sizeCopy = Platform.OS === "ios" ? 19 : 22;
const topIos = () => Platform.OS === "ios" && { top: 3 };

const ReceiveToken = ({ navigation }: { navigation: any }) => {
  const [publicKey, setPublicKey] = useState("");

  async function getPublicKey() {
    const pub = await readPublicKey();
    setPublicKey(pub);
  }

  getPublicKey();

  const [anmt, setanmt] = useState("");
  const [MostrarError, setError] = useState("");
  const [vacioModal, setVacioModal] = useState(false);

  const CopyMonic = () => {
    Clipboard.setString(publicKey);
    setVacioModal(true);
    setError(i18n.t('textCopie'));
    setanmt("slideInUp");
    setTimeout(() => {
      setanmt("fadeOutDownBig");
      setTimeout(() => {
        setVacioModal(false);
      }, 100);
    }, 1000);
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
  // Concatenate pkey.
  var str = publicKey;
  var strFirstThree = str.substring(0, 5);
  var strLastThree = str.substring(str.length - 5, str.length);
  var concatenado = `${strFirstThree}...${strLastThree}`;

  return (
    <LinearGradient
      colors={["#090437", "#000"]}
      style={stylesB.linear}
      start={{ x: 0, y: 1.6 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView style={stylesB.body}>
        <BarStatus />
        {/* Modal Copy */}
        <Modal
          visible={vacioModal}
          transparent
          onRequestClose={() => setVacioModal(false)}
          hardwareAccelerated
        >
          <Animatable.View
            animation={anmt}
            style={[stylesB.completo]}
            duration={600}
          >
            <View
              style={[
                stylesM.modalBottom,
                stylesM.backgroundNavy,
                stylesL.JustifyAlign,
                stylesM.radiusFifteen,
              ]}
            >
              <Text
                style={[
                  stylesM.textColorCian,
                  fontBold(),
                  stylesM.fontSizeTwentyTwo,
                  topIos(),
                ]}
              >
                {MostrarError}
              </Text>
            </View>
          </Animatable.View>
        </Modal>
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

          <View style={[stylesM.boxTitle, stylesM.widthRectangle]}>
            <Text
              style={[
                stylesM.textColorCian,
                stylesM.fontSizeTwentyFour,
                fontBold(),
              ]}
            >
              {i18n.t('textReceive')}
            </Text>
          </View>

          <LinearGradient
            style={[
              stylesM.boxGradientLinear,
              stylesM.widthRectangle,
              stylesM.radiusFive,
              stylesL.JustifyAlign,
              stylesO.boxGradientLinear__size,
              stylesM.marginTopThirty,
            ]}
            colors={["#592BFF", "#00FFAB", "#00C3FF"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
          >
            {publicKey !== "" && (
              <View
                style={[
                  stylesM.backgroundBlack,
                  stylesM.boxTotal,
                  stylesM.radiusFive,
                  stylesL.flexColumn,
                  stylesL.JustifyAlign,
                ]}
              >
                <QRCode
                  size={windowWidth * 0.6}
                  backgroundColor={"transparent"}
                  color={"white"}
                  value={publicKey}
                />
              </View>
            )}
          </LinearGradient>

          <View
            style={[
              stylesM.boxImage,
              stylesM.widthRectangle,
              stylesL.alignItemsEnd,
            ]}
          >
            <Image
              style={[stylesM.boxImage_img]}
              source={require("../../../assets/img/receiveImg.png")}
            />
          </View>

          <LinearGradient
            style={[
              stylesM.boxGradientLinear,
              stylesM.widthRectangle,
              stylesM.radiusFive,
              stylesL.JustifyAlign,
              stylesO.boxGradientLinear__heightMedium,
              stylesM.boxBottomTab,
            ]}
            colors={["#592BFF", "#00FFAB", "#00C3FF"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                stylesM.boxTotal,
                stylesM.radiusFive,
                stylesL.flexRow,
                stylesL.JustifyAlign,
                stylesM.backgroundNightBlue,
              ]}
              onPress={() => CopyMonic()}
            >
              <View
                style={[
                  stylesM.widthPercentageSeven,
                  stylesM.paddingLeft,
                  stylesL.alignItemsEnd,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.fontSizeTwentyEight,
                  ]}
                >
                  {concatenado}
                </Text>
              </View>
              <View style={[stylesM.widthPercentageTree, stylesM.paddingLeft]}>
                <IconCopy name="copy-outline" size={sizeCopy} color="#fff" />
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ReceiveToken;

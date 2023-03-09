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
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Clipboard,
  Modal
} from "react-native";
import * as Animatable from "react-native-animatable";


import BarStatus from "../../components/BarStatus";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { saveNameUser, readNameUser, readPrivateKey } from "../../../controller";
import { readMnemonic } from "../../../controller";
import IconArrow from "react-native-vector-icons/SimpleLineIcons";


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
const sizeArrow = Platform.OS === "ios" ? 32 : 35;

const Security = ({ navigation }: { navigation: any }) => {
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [vacioModal, setVacioModal] = useState(false);
  const [anmt, setanmt] = useState("");
  const [MostrarError, setError] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  async function leerMnemonic() {
    const palabras = await readMnemonic();
    
    setMnemonic(palabras);
  }

  async function leerPrivada() {
    const privada = await readPrivateKey();
    
    setPrivateKey(privada);
  }

  leerMnemonic();
  leerPrivada();

  const ExportMnemonic = () => {
    Clipboard.setString(mnemonic);
    setVacioModal(true);
    setError(i18n.t('textCopie'));
    setanmt("slideInUp");
    setTimeout(() => {
      setanmt("fadeOutDownBig");
      setTimeout(() => {
        setVacioModal(false);
      }, 100);
    }, 1850);
  };

  const ExportPrivateKey = () => {
      Clipboard.setString(privateKey);
      setVacioModal(true);
      setError(i18n.t('textCopie'));
      setanmt("slideInUp");
      setTimeout(() => {
        setanmt("fadeOutDownBig");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 1850);
 
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
    <LinearGradient
      colors={["#090437", "#000"]}
      style={stylesB.linear}
      start={{ x: 0, y: 1.6 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView style={stylesB.body}>
        <BarStatus />
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
                  topIos()
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
                topIos(),
              ]}
            >
              {i18n.t('draweSecurity')}
            </Text>
          </View>
          <View
            style={[
              stylesM.widthRectangle,
              stylesM.heightPercentageEight,
              stylesM.paddingHorizontalTwentySix,
            ]}
          >
            <ScrollView
              contentContainerStyle={{
                marginTop: 50,
                bottom: 50,
              }}
              horizontal={false}
              showsVerticalScrollIndicator={true}
            >
              {/* <View
                  style={[
                    stylesM.boxHistory,
                    stylesM.radiusSix,
                    stylesM.backgroundLilac,
                    stylesL.flexRow,
                  ]}
                >
                  <View
                    style={[
                      Platform.OS === "ios"
                        ? stylesM.widthPercentageTree
                        : stylesM.widthPercentageTwenty,
                      stylesL.Justify,
                      stylesL.alignItemsEnd,
                    ]}
                  >
                    <Switch
                      trackColor={{ false: "#020107", true: "#C4C4C4" }}
                      thumbColor={isEnabled ? "#2CF6F6" : "#C4C4C4"}
                      ios_backgroundColor="#020107"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setIsEnabled(!isEnabled)}
                    style={[
                      Platform.OS === "ios"
                        ? stylesM.widthPercentageSeven
                        : stylesM.widthPercentageEighty,
                      stylesL.Justify,
                    ]}
                  >
                    <Text
                      style={[
                        stylesM.textColorWhite,
                        stylesM.leftTwelve,
                        stylesM.fontSizeTwentySeven,
                        fontBold(),
                        topIos(),
                      ]}
                    >
                      Face/Touch
                    </Text>
                  </TouchableOpacity>
                </View> */}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("EnterPassword")}
                style={[
                  stylesM.boxHistory,
                  stylesM.radiusSix,
                  stylesM.backgroundLilac,
                  stylesL.flexRow,
                ]}
              >
                <View
                  style={[
                    Platform.OS === "ios"
                      ? stylesM.widthPercentageTree
                      : stylesM.widthPercentageTwenty,
                    stylesL.Justify,
                    stylesL.alignItemsEnd,
                  ]}
                >
                  <Image
                    style={[stylesM.boxImgSecurity]}
                    source={require("../../../assets/img/security.png")}
                  />
                </View>

                <View
                  style={[
                    Platform.OS === "ios"
                      ? stylesM.widthPercentageSeven
                      : stylesM.widthPercentageEighty,
                    stylesL.Justify,
                    stylesM.paddingTwelve
                  ]}
                >
                  <Text
                    style={[
                      stylesM.textColorWhite,
                      stylesM.fontSizeTwentySeven,
                      fontBold(),
                      topIos(),
                    ]}
                  >
                    {i18n.t('securityChangePass')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => ExportMnemonic()}
                style={[
                  stylesM.boxHistory,
                  stylesM.radiusSix,
                  stylesM.backgroundLilac,
                  stylesL.flexRow,
                ]}
              >
                <View
                  style={[
                    Platform.OS === "ios"
                      ? stylesM.widthPercentageTree
                      : stylesM.widthPercentageTwenty,
                    stylesL.Justify,
                    stylesL.alignItemsEnd,
                  ]}
                >
                  <Image
                    style={[stylesM.boxImgSecurity]}
                    source={require("../../../assets/img/key.webp")}
                  />
                </View>
                <View
                  style={[
                    Platform.OS === "ios"
                      ? stylesM.widthPercentageSeven
                      : stylesM.widthPercentageEighty,
                    stylesL.Justify,
                    stylesM.paddingTwelve
                  ]}
                >
                  <Text
                    style={[
                      stylesM.textColorWhite,
                      stylesM.fontSizeTwentySeven,
                      fontBold(),
                      topIos(),
                    ]}
                  >
                    {i18n.t('securityExportMnemonic')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => ExportPrivateKey()}
                activeOpacity={0.8}
                style={[
                  stylesM.boxHistory,
                  stylesM.radiusSix,
                  stylesM.backgroundLilac,
                  stylesL.flexRow,
                ]}
              >
                <View
                   style={[
                    Platform.OS === "ios"
                      ? stylesM.widthPercentageTree
                      : stylesM.widthPercentageTwenty,
                    stylesL.Justify,
                    stylesL.alignItemsEnd,
                  ]}
                >
                  <Image
                    style={[stylesM.boxImgSecurity]}
                    source={require("../../../assets/img/key.webp")}
                  />
                </View>
                <View
                  style={[
                    Platform.OS === "ios"
                      ? stylesM.widthPercentageSeven
                      : stylesM.widthPercentageEighty,
                    stylesL.Justify,
                    stylesM.paddingTwelve
                  ]}
                >
                  <Text
                    style={[
                      stylesM.textColorWhite,
                      stylesM.fontSizeTwentySeven,
                      fontBold(),
                      topIos(),
                    ]}
                  >
                    {i18n.t('textExportPrivate')}
                  </Text>
                </View>
                
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Security;

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
  Modal,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import * as Animatable from "react-native-animatable";
import React, {useState} from 'react'
import { useFonts } from 'expo-font';
import { Lotierror } from "../../components/Lottie";
import IconErase from "react-native-vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";

import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, es } from '../../i18n/supportedLanguages';

const translations = { en, es };;

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

const sizeErase = Platform.OS === "ios" ? 23 : 26;

const EnterPassword = ({ navigation }: { navigation: any }) => {
  const [password1, setPassword1] = useState({ pass1: "" });
  //Estado background

  const [colour, setColourUno] = useState("black");
  const [colourTwo, setColourTwo] = useState("black");
  const [colourThree, setColourThree] = useState("black");
  const [colourFour, setColourFour] = useState("black");

  //Modales
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  const [anmt, setanmt] = useState("");
  const [vacioModal, setVacioModal] = useState(false);
  const [MostrarError, setError] = useState("");

  function validadorPassword() {
    setColourFour("black");
    setColourThree("black");
    setColourTwo("black");
    setColourUno("black");
    setPin1("");
    setPin2("");
    setPin3("");
    setPin4("");
  }

  function genPassword() {
    password1.pass1 = pin1 + pin2 + pin3 + pin4;
    const antipass = password1.pass1;
    console.log(antipass);
    if (antipass.length === 4) {
      navigation.navigate("ConfirmPassword", { prePassword: antipass });
    } else {
      validadorPassword();
      setVacioModal(true);
      setError(i18n.t('textPassError'));
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setVacioModal(false);
        }, 100);
      }, 1850);
    }
  }

  function funcion(numero: string) {
    if (pin1 == "") {
      setPin1(numero);
      setColourUno("#70E0F9");
    } else if (pin1 != "" && pin2 == "") {
      setPin2(numero);
      setColourTwo("#70E0F9");
    } else if (pin1 != "" && pin2 != "" && pin3 == "") {
      setPin3(numero);
      setColourThree("#70E0F9");
    } else if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 == "") {
      setPin4(numero);
      setColourFour("#70E0F9");
    }
  }

  function borrar() {
    if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 != "") {
      setPin4("");
      setColourFour("black");
    } else if (pin1 != "" && pin2 != "" && pin3 != "" && pin4 == "") {
      setPin3("");
      setColourThree("black");
    } else if (pin1 != "" && pin2 != "" && pin3 == "" && pin4 == "") {
      setPin2("");
      setColourTwo("black");
    } else if (pin1 != "" && pin2 == "" && pin3 == "" && pin4 == "") {
      setPin1("");
      setColourUno("black");
    } else if (pin1 == "" && pin2 == "" && pin3 == "" && pin4 == "") {
      console.log("====================================");
      console.log("No hay nada que borrar");
      console.log("====================================");
    }
  }

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
      <Modal
        visible={vacioModal}
        transparent
        onRequestClose={() => setVacioModal(false)}
        hardwareAccelerated
      >
        <Animatable.View animation={anmt} duration={600}>
          <View style={stylesB.completo}>
            <View
              style={[
                stylesM.modalWindow,
                stylesM.backgroundNavy,
                stylesL.AlignItems,
                stylesM.radiusFifteen,
                stylesL.flexRow,
              ]}
            >
              <View style={stylesL.AlignItems}>
                <View style={stylesL.JustifyAlign}>
                  <Lotierror />
                </View>
              </View>
              <View style={stylesM.modalWindow_notification}>
                <View style={stylesL.Justify}>
                  <Text
                    style={[
                      stylesM.textColorWhite,
                      fontBold(),
                      stylesM.fontSizeTwentyTwo,
                    ]}
                  >
                    Error
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      stylesM.textColorWhite,
                      fontLight(),
                      stylesM.fontSizeSixteen,
                    ]}
                  >
                    {MostrarError}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
      </Modal>

      <View style={stylesB.completo}>
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
              stylesM.fontSizeTwentyFour,
              fontBold(),
            ]}
          >
            {i18n.t('enterTitle')}
          </Text>
        </View>

        <Image
          style={[stylesM.logoSmall]}
          source={require("../../../assets/img/security.png")}
        />

        {/* Four Circle */}
        <View
          style={[
            stylesM.widthRectangle,
            stylesL.spaceAround,
            stylesM.marginTopThirty,
            stylesL.flexRow,
            stylesM.paddingHorizontalTwentyFive,
          ]}
        >
          <LinearGradient
            style={[
              stylesM.radiusTwentyFive,
              stylesM.circlePass,
              stylesM.paddingFour,
            ]}
            colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
          >
            <View
              style={[
                stylesM.boxTotal,
                stylesM.radiusTwentyFive,
                { backgroundColor: colour },
              ]}
            ></View>
          </LinearGradient>

          <LinearGradient
            style={[
              stylesM.radiusTwentyFive,
              stylesM.circlePass,
              stylesM.paddingFour,
            ]}
            colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
          >
            <View
              style={[
                stylesM.boxTotal,
                stylesM.radiusTwentyFive,
                { backgroundColor: colourTwo },
              ]}
            ></View>
          </LinearGradient>

          <LinearGradient
            style={[
              stylesM.radiusTwentyFive,
              stylesM.circlePass,
              stylesM.paddingFour,
            ]}
            colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
          >
            <View
              style={[
                stylesM.boxTotal,
                stylesM.radiusTwentyFive,
                { backgroundColor: colourThree },
              ]}
            ></View>
          </LinearGradient>

          <LinearGradient
            style={[
              stylesM.radiusTwentyFive,
              stylesM.circlePass,
              stylesM.paddingFour,
            ]}
            colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
          >
            <View
              style={[
                stylesM.boxTotal,
                stylesM.radiusTwentyFive,
                { backgroundColor: colourFour },
              ]}
            ></View>
          </LinearGradient>
        </View>

        {/* row one */}
        <View
          style={[
            stylesM.widthRectangle,
            stylesL.spaceAround,
            stylesM.marginTopThirty,
            stylesL.flexRow,
            stylesM.paddingHorizontalEight,
          ]}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("1")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  1
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("2")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  2
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("3")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  3
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* row two */}
        <View
          style={[
            stylesM.widthRectangle,
            stylesL.spaceAround,
            stylesM.marginTopTwenty,
            stylesL.flexRow,
            stylesM.paddingHorizontalEight,
          ]}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("4")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  4
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("5")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  5
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("6")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  6
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* row tree */}
        <View
          style={[
            stylesM.widthRectangle,
            stylesL.spaceAround,
            stylesM.marginTopTwenty,
            stylesL.flexRow,
            stylesM.paddingHorizontalEight,
          ]}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("7")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  7
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("8")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  8
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("9")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  9
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* row four */}
        <View
          style={[
            stylesM.widthRectangle,
            stylesL.spaceAround,
            stylesM.marginTopTwenty,
            stylesL.flexRow,
            stylesM.paddingHorizontalEight,
          ]}
        >
          {/* empty */}
          <View
            style={[
              stylesM.radiusThirty,
              stylesM.circleNumber,
              stylesM.paddingFour,
              stylesM.backgroundBlack,
            ]}
          >
            <View
              style={[
                stylesM.boxTotal,
                stylesM.backgroundBlack,
                stylesM.radiusThirty,
                stylesL.JustifyAlign,
              ]}
            >
              <Text
                style={[
                  stylesM.textColorWhite,
                  stylesM.fontSizeThirtyFive,
                  fontBold(),
                ]}
              ></Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={() => funcion("0")}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeThirtyFive,
                    fontBold(),
                  ]}
                >
                  0
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => borrar()}>
            <LinearGradient
              style={[
                stylesM.radiusThirty,
                stylesM.circleNumber,
                stylesM.paddingFour,
              ]}
              colors={["#0CE3B6", "#01D7E4", "#592BFF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <View
                style={[
                  stylesM.boxTotal,
                  stylesM.backgroundBlack,
                  stylesM.radiusThirty,
                  stylesL.JustifyAlign,
                ]}
              >
                <IconErase name="erase" size={sizeErase} color="#00E3D2" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
            activeOpacity={0.8}
            style={[
              stylesM.boxTotal,
              stylesM.radiusTwentyFive,
              stylesL.JustifyAlign,
              stylesM.backgroundCian,
            ]}
            onPress={() => genPassword()}
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
  );
};


export default EnterPassword
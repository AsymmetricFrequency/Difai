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
  Modal,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import IconCopy from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { keypair } from "../../../controller";
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
const topIos = () => Platform.OS === "ios" && { top: 3 };

const WriteMnemonic = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const mnemonic = route.params?.msg;

  setTimeout(() => {
    keypair(mnemonic)
  }, 1000)

  const [continueModal, setContinueModal] = useState(false);
  const [anmt, setanmt] = useState("");
  const [MostrarError, setError] = useState("");
  const [vacioModal, setVacioModal] = useState(false);

  const ModalContinue = () => {
    setContinueModal(true);
    setanmt("fadeIn");
  };

  const HideContinue = () => {
    setTimeout(() => {
      setanmt("fadeOut");
      setTimeout(() => {
        setContinueModal(false);
        navigation.navigate("EnterPassword");
      }, 100);
    }, 2);
  };

  const HideModal = () => {
    setTimeout(() => {
      setanmt("fadeOutDown");
      setTimeout(() => {
        setContinueModal(false);
      }, 100);
    }, 2);
  };

  const CopyMonic = () => {
    Clipboard.setString(mnemonic);
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

  return (
    <SafeAreaView style={[stylesB.body, stylesM.backgroundBlack]}>
      <BarStatus />
      {/* Modal Continue */}
      <Modal
        visible={continueModal}
        transparent
        onRequestClose={() => setContinueModal(false)}
        hardwareAccelerated
      >
        <Animatable.View
          animation={anmt}
          style={[
            stylesB.completo,
            stylesL.JustifyAlign,
            stylesM.backgroundOpacity,
          ]}
          duration={600}
        >
          <View
            style={[
              stylesM.modalCenter,
              stylesM.backgroundTransparenDark,
              stylesL.JustifyAlign,
              stylesM.radiusFifteen,
              stylesM.radiusThirty,
            ]}
          >
            <View style={[stylesM.heightPercentageEight, { width: "100%" }]}>
              <Text
                style={[
                  stylesM.textColorWhiteBone,
                  fontBold(),
                  stylesM.fontSizeTwentySix,
                  topIos(),
                ]}
              >
                {i18n.t('writeModalTitle')}
              </Text>
              <Text
                style={[
                  stylesM.textColorCian,
                  fontLight(),
                  stylesM.fontSizeTwenty,
                  topIos(),
                  stylesM.marginTopTwenty,
                  stylesM.fontLineTwenty,
                ]}
              >
                {i18n.t('writeModalText')}
              </Text>
            </View>
            <View style={[stylesM.heightPercentageTwo, stylesL.flexRow, stylesL.JustifyAlign]}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[stylesM.widthPercentageSixty, stylesL.alignItemsEnd]}
                onPress={() => HideModal()}
              >
                <Text
                  style={[
                    stylesM.textColorLilac,
                    fontLight(),
                    stylesM.fontSizeTwentyTwo,
                    topIos(),
                  ]}
                >
                  {i18n.t('textCancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[stylesM.widthPercentageForty]}
                onPress={() => HideContinue()}
              >
                <Text
                  style={[
                    stylesM.textColorLilac,
                    fontLight(),
                    stylesM.fontSizeTwentyTwo,
                    topIos(),
                    stylesM.paddingLeftTitle,
                  ]}
                >
                  {i18n.t('textContinue')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </Modal>
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
            {i18n.t('writeTitle')}
          </Text>
        </View>

        <Image
          style={[stylesM.logoSmall]}
          source={require("../../../assets/img/genesysLogo.png")}
        />

        <View
          style={[
            stylesM.widthRectangle,
            stylesM.paddingLeftTitle,
            stylesM.marginTopTwenty,
          ]}
        >
          <Text
            style={[
              stylesM.textColorWhite,
              stylesM.fontSizeEighteen,
              fontBold(),
            ]}
          >
            {i18n.t('writeText')}
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
            <View style={[stylesM.heightPercentageEightyFive]}>
              <Text
                style={[
                  stylesM.fontSizeTwentyEight,
                  stylesM.textColorWhite,
                  fontLight(),
                  stylesM.fontLineThirty,
                ]}
              >
                {mnemonic}
              </Text>
            </View>

            <View
              style={[
                stylesM.heightPercentageFifteen,
                stylesL.alignItemsEnd,
                stylesL.Justify,
              ]}
            >
              <TouchableOpacity onPress={() => CopyMonic()} activeOpacity={0.5}>
                <IconCopy name="copy-outline" size={sizeCopy} color="#fff" />
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
            onPress={() => ModalContinue()}
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

export default WriteMnemonic;

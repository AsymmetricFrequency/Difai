import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "./../appTheme/styles/styles";

import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import * as Animatable from "react-native-animatable";
import * as Localization from 'expo-localization';
import { savePassword } from "../../controller";
import { I18n } from 'i18n-js';
import { en, es } from '../i18n/supportedLanguages';

const translations = { en, es };;

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;


const sizeEdit = Platform.OS === "ios" ? 17 : 20;
const topIos = () => Platform.OS === "ios" && { top: 3 };

function CustomDrawer({ navigation }: { navigation: any }) {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [continueModal, setContinueModal] = useState(false);
  const [anmt, setanmt] = useState("");

  // const toggleSwitch = () => {
  //   setIsEnabled((previousState) => !previousState);
  //   navigation.navigate("StackNavigatorDefi", {
  //     bold: "defi",
  //   })
  // };
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
  const fontMedium = () => ({ fontFamily: "LeagueSpartanMedium" });
  const fontLight = () => ({ fontFamily: "LeagueSpartanLight" });

  const ModalContinue = () => {
    setContinueModal(true);
    setanmt("fadeIn");
    
  };

  const HideContinue = () => {
    setTimeout(() => {
      setanmt("fadeOut");
      setTimeout(() => {
        setContinueModal(false);
        savePassword("");
        navigation.navigate("Home");
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

  return (
    <View style={[stylesB.linear]}>
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
              stylesM.radiusThirty,
              stylesL.flexColumn
            ]}
          >
            <View
              style={[
                stylesM.widthPercentageHundred,
              ]}
            >
              <View style={[stylesL.AlignItems]}>
                <Image
                  style={[stylesM.imgLog]}
                  source={require("../../assets/img/logOut.webp")}
                />
                <Text
                  style={[
                    stylesM.textColorWhiteBone,
                    fontBold(),
                    stylesM.fontSizeTwentySix,
                    topIos(),
                  ]}
                >
                  {i18n.t('draweModalTitle')}
                </Text>
              </View>

              <Text
                style={[
                  stylesM.textColorWhiteBone,
                  fontLight(),
                  stylesM.fontSizeTwenty,
                  topIos(),
                  stylesM.marginTopTwenty,
                  stylesM.fontLineTwenty,
                ]}
              >
                {i18n.t('draweModalText')}
              </Text>
            </View>
            <View
              style={[
                stylesL.flexRow,
                stylesL.AlignItems,
                stylesM.widthPercentageHundred,
                stylesL.justifyEnd,
                stylesM.marginTopFifteen
              ]}
            >
              <View
                style={[
                  stylesL.alignItemsEnd,
                  stylesL.flexRow,
                  stylesL.spaceAround,
                  stylesM.widthPercentageSixty,
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[stylesM.textContinue]}
                  onPress={() => HideContinue()}
                >
                  <Text
                    style={[
                      stylesM.textColorLilac,
                      fontMedium(),
                      stylesM.fontSizeTwentyTwo,
                      topIos(),
                    ]}
                  >
                    {i18n.t('textContinue')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[]}
                  onPress={() => HideModal()}
                >
                  <Text
                    style={[
                      stylesM.textColorLilac,
                      fontMedium(),
                      stylesM.fontSizeTwentyTwo,
                      topIos(),
                    ]}
                  >
                    {i18n.t('textCancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animatable.View>
      </Modal>
      <DrawerContentScrollView contentContainerStyle={{ top: 0 }}>
        <ScrollView
          nestedScrollEnabled={true}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[stylesM.boxNetwork, stylesL.JustifyAlign]}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={[stylesM.marginHorizontalTwelve, { opacity: 1 }]}
          >
            <Image
              source={require("./../../assets/img/sol.png")}
              style={[stylesM.boxCoin_img]}
            />
          </TouchableOpacity>
        </ScrollView>


        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            stylesM.widthPercentageHundred,
            stylesM.boxTitleDrawer,
            stylesM.paddingLeftTitle,
            stylesL.Justify,
          ]}
          onPress={() => navigation.navigate("Security")}
        >
          <Text
            style={[
              stylesM.textColorWhite,
              fontBold(),
              topIos(),
              stylesM.fontSizeTwentyFour,
            ]}
          >
            {i18n.t('draweSecurity')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            stylesM.widthPercentageHundred,
            stylesM.boxTitleDrawer,
            stylesM.paddingLeftTitle,
            stylesL.Justify,
          ]}
          onPress={() => navigation.navigate("Events")}
        >
          <Text
            style={[
              stylesM.textColorWhite,
              fontBold(),
              topIos(),
              stylesM.fontSizeTwentyFour,
            ]}
          >
            {i18n.t('draweEvents')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            stylesM.widthPercentageHundred,
            stylesM.boxTitleDrawer,
            stylesM.paddingLeftTitle,
            stylesL.Justify,
          ]}
          onPress={() => ModalContinue()}
        >
          <Text
            style={[
              stylesM.textColorWhite,
              fontBold(),
              topIos(),
              stylesM.fontSizeTwentyFour,
            ]}
          >
            {i18n.t('draweLogout')}
          </Text>
        </TouchableOpacity>
        {/* swiche enviar mensaje al navegador */}
        {/* <View
          style={[
            stylesM.widthPercentageHundred,
            stylesM.boxTitleDrawer,
            stylesM.paddingLeftTitle,
            stylesL.Justify,
            stylesL.flexRow,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => [setIsEnabled(!isEnabled), navigation.navigate("StackNavigatorDefi", {
              bold: "defi",
            })]}
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
                fontBold(),
                topIos(),
                stylesM.fontSizeTwentyFour,
              ]}
            >
              Fintech
            </Text>
          </TouchableOpacity>

          <View
            style={[
              Platform.OS === "ios"
                ? stylesM.widthPercentageTree
                : stylesM.widthPercentageTwenty,
              stylesL.JustifyAlign,
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
        </View> */}
      </DrawerContentScrollView>

    </View>
  );
}

export default CustomDrawer;

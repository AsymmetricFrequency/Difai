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
  Switch,
} from "react-native";

import BarStatus from "../../components/BarStatus";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

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

const ChangeNetwork = ({ navigation }: { navigation: any }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
              {i18n.t('changeNet')}
            </Text>
          </View>
          <View
            style={[
              stylesM.widthRectangle,
              stylesM.heightPercentageEight,
              stylesM.paddingHorizontalTwentySix,
            ]}
          >
            <View style={[stylesO.glow__right]}>
              <Image
                style={[stylesM.glowImage]}
                source={require("../../../assets/img/mediumGlow.png")}
              />
            </View>
            <ScrollView
              contentContainerStyle={{
                marginTop: 50,
                bottom: 50,
                paddingRight: 12,
              }}
              horizontal={false}
              showsVerticalScrollIndicator={true}
            >
              <View
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
                  activeOpacity={0.5}
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
                    Mainnet
                  </Text>
                </TouchableOpacity>
              </View>


              <View
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
                  activeOpacity={0.5}
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
                    Test Net
                  </Text>
                </TouchableOpacity>
              </View>

              <View
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
                  activeOpacity={0.5}
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
                    Devnet
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ChangeNetwork;

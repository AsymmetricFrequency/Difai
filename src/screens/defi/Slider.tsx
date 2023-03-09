import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import { View, Text, SafeAreaView, Image, TouchableOpacity, Platform} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5";
import BarStatus from "../../components/BarStatus";
import React, {useState} from 'react'
import AppIntroSlider from "react-native-app-intro-slider";
import { useFonts } from 'expo-font';
import { readMnemonic } from "../../../controller";

import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, es } from '../../i18n/supportedLanguages';

const translations = { en, es };;

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;


const iconIos = Platform.OS === "ios" ? 22 : 25;

const Slider = ({ navigation }: { navigation: any; route: any }) => {

  const [mnemonic, setMnemonic] = useState("");

  async function getMnemonic() {
    const frase = await readMnemonic();
    console.log(frase);
    
    setMnemonic(frase);
  }

  getMnemonic();
  
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
  };

  const fontBold = () => ({fontFamily: 'LeagueSpartanBold'})
  const fontMedium = () => ({fontFamily: 'LeagueSpartanMedium'})
  const fontLight = () => ({ fontFamily: "LeagueSpartanLight" });

  const RenderItem = ({ item }) => {
    
    return (
      <SafeAreaView style={[stylesB.body, stylesM.backgroundBlack]}>
         <BarStatus/>
        <View style={stylesB.completo}>
          
          <Image style={stylesM.introImageStyle} source={item.image} />

          <View style={[stylesM.boxSliderTitle, stylesL.JustifyAlign]}>
            <Text style={[stylesM.fontSizeThirtyFive, stylesM.textColorWhite,stylesL.textAlignCenter, fontBold()]}>{item.title}</Text>
          </View>

          <View style={[stylesM.boxSliderTxt, stylesL.Justify]}>
            <Text style={[stylesL.textAlignCenter, stylesM.textColorWhite, stylesM.fontSizeTwentyTwo, fontLight()]}>{item.text}</Text>
          </View>
          
          {item.key == "s1" && (
            <>
              <View style={stylesM.boxArrow}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[stylesM.boxArrow_buttom, stylesL.JustifyAlign]}
                  onPress={() => navigation.goBack()}
                >
                  <Image style={[stylesM.boxArrow_buttom_image]} source={require('../../../assets/img/leftArrow.png')}/>
                </TouchableOpacity>
              </View>

              <View style={stylesM.glow}>
                <Image style={[stylesM.glowImage]} source={require('../../../assets/img/mediumGlow.png')} />
              </View>
            </>
          )}

          {item.key == "s2" && (
            <View style={stylesO.glow__down}>
              <Image style={[stylesM.glowImage]} source={require('../../../assets/img/mediumGlow.png')} />
            </View>
          )}

          {item.key == "s3" && (
            <>
              <View style={stylesO.boxArrow__right}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[stylesM.boxArrow_buttom,stylesL.JustifyAlign]}
                  onPress={() => navigation.navigate("WriteMnemonic", { msg: mnemonic })}
                >
                  <Image style={[stylesO.boxArrow_buttom_image__rotate]} source={require('../../../assets/img/leftArrow.png')}/>
                </TouchableOpacity>
              </View>

              <View style={stylesO.glow__right}>
                <Image style={[stylesM.glowImage]} source={require('../../../assets/img/mediumGlow.png')} />
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const renderdone = () => {
    return <></>;
  };

  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        showNextButton={false}
        showDoneButton={false}
        renderDoneButton={renderdone}
        dotStyle={stylesM.dotStyle}
        activeDotStyle={[stylesM.activeStyle, stylesM.backgroundCian]}
      />
    </>
  );
};

const slides = [
  {
    key: "s1",
    title: (<Text>{i18n.t('sliderOne')} </Text>),
    text: (<Text>{i18n.t('sliderOneSub')} </Text>),
    image: require("../../../assets/img/s1.png"),
  },
  {
    key: "s2",
    title: (<Text>{i18n.t('sliderTwo')} </Text>),
    text: (<Text>{i18n.t('sliderTwoSub')} </Text>),
    image: require("../../../assets/img/s2.png"),
  },
  {
    key: "s3",
    title: (<Text>{i18n.t('sliderThree')} </Text>),
    text:(<Text>{i18n.t('sliderThreeSub')} </Text>),
    image: require("../../../assets/img/s3.png"),
  },
];




export default Slider
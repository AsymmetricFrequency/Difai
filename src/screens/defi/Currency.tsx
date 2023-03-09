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
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { getSolHistory, getSPLHistoryCurrency, readPublicKey } from "../../../controller";
import { FlatList } from "react-native-gesture-handler";
import HistoryCurrency from "../../components/HistoryCurrency";
import { onChange } from "react-native-reanimated";

import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, es } from '../../i18n/supportedLanguages';

const translations = { en, es };;

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

//Refresh
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Currency = ({ navigation, route }: { navigation: any; route: any }) => {
  // Receive params
  const cur = route.params?.cur;
  const balance = route.params?.balance;
  
  
  
  const [refreshing, setRefreshing] = React.useState(false);
  const [transactions, setTransactions] = useState([]);
  const [address, setAddress] = useState('');
  const [publicKey, setPublicKey] = useState('');

  async function getPublicKey() {
    const pub = await readPublicKey();
    setPublicKey(pub);
  }

  useEffect(() => {
    getPublicKey();
  },[])
  
  async function getHistoryCurrency() {
    if (cur == 'USDT') {
      setAddress('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB')
    }
    if (cur == 'USDC'){
      setAddress('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')
    }
    if(cur == 'ETH') {
      setAddress('2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk')
    }
    
    const response = await getSPLHistoryCurrency(publicKey, 20, address);
    const trans = await response;
    setTransactions(trans);
    
    if(cur == 'SOL'){
      const response = await getSolHistory(publicKey, 10);
      const trans = await response;
      setTransactions(trans);
    }
  }

  useEffect(() => {
    getHistoryCurrency();
  }, [publicKey])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
   
    wait(2000).then(() => setRefreshing(false));
  }, []);

  
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


  const textCurrency = () => {
    if (cur == "USDT") {
      return (
        <Text
          style={[
            stylesM.textColorCian,
            stylesM.fontSizeTwentyFour,
            fontBold(),
          ]}
        >
          USDT
        </Text>
      );
    } else if (cur == "USDC") {
      return (
        <Text
          style={[
            stylesM.textColorCian,
            stylesM.fontSizeTwentyFour,
            fontBold(),
          ]}
        >
          USDC
        </Text>
      );
    } else if (cur == "SOL") {
      return (
        <Text
          style={[
            stylesM.textColorCian,
            stylesM.fontSizeTwentyFour,
            fontBold(),
          ]}
        >
          SOL
        </Text>
      );
    } else if (cur == "ETH") {
      return (
        <Text
          style={[
            stylesM.textColorCian,
            stylesM.fontSizeTwentyFour,
            fontBold(),
          ]}
        >
          ETH
        </Text>
      );
    }
  };

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
              stylesO.boxTitle__margin,
              stylesM.widthRectangle,
              stylesM.bottomTitle,
            ]}
          >
            {textCurrency()}
          </View>
          <LinearGradient
            style={[
              stylesO.boxGradientLinear__Height,
              stylesM.widthRectangle,
              stylesM.radiusFive,
              stylesL.JustifyAlign,
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
              ]}
            >
              <View style={[stylesM.heightPercentageTwo, stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.fontSizeEighteen,
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.boxTxt_total,
                    stylesM.marginTopFive,
                  ]}
                >
                  Balance
                </Text>
              </View>

              <View
                style={[stylesM.heightPercentageEight, stylesL.JustifyAlign]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeSixty,
                    fontBold(),
                  ]}
                >
                  {balance}
                </Text>
              </View>
            </View>
          </LinearGradient>

          <View
            style={[
              stylesM.widthRectangle,
              stylesL.flexRow,
              stylesL.spaceBetween,
              stylesM.boxMedium,
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("SendToken")}
            >
              <LinearGradient
                style={[
                  stylesM.boxGradientLinear,
                  stylesO.boxGradientLinear__top,
                  stylesM.buttonSendReceived,
                  stylesM.radiusEight,
                  stylesL.JustifyAlign,
                ]}
                colors={["#592BFF", "#00FFAB", "#00C3FF"]}
                start={{ x: 0, y: 0.2 }}
                end={{ x: 0, y: 1 }}
              >
                <View
                  style={[
                    stylesM.backgroundBlack,
                    stylesM.boxTotal,
                    stylesM.radiusEight,
                    stylesL.flexRow,
                  ]}
                >
                  <View
                    style={[stylesM.widthPercentageHundred, stylesL.flexRow]}
                  >
                    <View
                      style={[
                        stylesM.widthPercentageForty,
                        stylesL.Justify,
                        stylesL.alignItemsEnd,
                      ]}
                    >
                      <Image
                        source={require("../../../assets/img/send.png")}
                        style={[stylesO.boxTotal_img__height]}
                      />
                    </View>
                    <View
                      style={[
                        stylesL.Justify,
                        stylesM.widthPercentageSixty,
                        stylesM.paddingLeft,
                      ]}
                    >
                      <Text
                        style={[
                          stylesM.textColorWhite,
                          fontBold(),
                          stylesM.fontSizeTwenty,
                        ]}
                      >
                        {i18n.t('textSend')}
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("ReceiveToken")}
            >
              <LinearGradient
                style={[
                  stylesM.boxGradientLinear,
                  stylesO.boxGradientLinear__top,
                  stylesM.buttonSendReceived,
                  stylesM.radiusEight,
                  stylesL.JustifyAlign,
                ]}
                colors={["#592BFF", "#00FFAB", "#00C3FF"]}
                start={{ x: 0, y: 0.2 }}
                end={{ x: 0, y: 1 }}
              >
                <View
                  style={[
                    stylesM.backgroundBlack,
                    stylesM.boxTotal,
                    stylesM.radiusEight,
                    stylesL.flexRow,
                  ]}
                >
                  <View
                    style={[stylesM.widthPercentageHundred, stylesL.flexRow]}
                  >
                    <View
                      style={[
                        stylesM.widthPercentageForty,
                        stylesL.Justify,
                        stylesL.alignItemsEnd,
                      ]}
                    >
                      <Image
                        source={require("../../../assets/img/send.png")}
                        style={[stylesO.boxTotal_img__height]}
                      />
                    </View>
                    <View
                      style={[
                        stylesL.Justify,
                        stylesM.widthPercentageSixty,
                        stylesM.paddingLeft,
                      ]}
                    >
                      <Text
                        style={[
                          stylesM.textColorWhite,
                          fontBold(),
                          stylesM.fontSizeTwenty,
                        ]}
                      >
                        {i18n.t('textReceive')}
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={[stylesM.boxTextRecent, stylesM.widthRectangle]}>
            <Text
              style={[
                stylesM.textColorMilitaryGreen,
                fontLight(),
                stylesM.fontSizeSixteen,
              ]}
            >
              {i18n.t('currencyActivity')}
            </Text>
          </View>
          <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              data={transactions}
              renderItem={({ item }) => {
                return <HistoryCurrency cur={item} />;
              }}
              keyExtractor={(item, index) => index.toString()}
            >
          </FlatList>
            
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Currency;

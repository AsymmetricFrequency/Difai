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
  Platform,
  Clipboard,
  TouchableOpacity,
  Image,
  Modal,
  RefreshControl,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import IconCopy from "react-native-vector-icons/Ionicons";
import IconUser from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import {
  readPublicKey,
  getSolanaBalance,
  getSplBalance,
  getPrices,
  savePassword,
} from "../../../controller";
import * as Animatable from "react-native-animatable";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, es } from '../../i18n/supportedLanguages';

const translations = { en, es };;

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

const sizeCopy = Platform.OS === "ios" ? 15 : 16;
const topIos = () => Platform.OS === "ios" && { top: 3 };

//Refresh
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const BalanceWallet = ({ navigation, route }: { navigation: any; route: any }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPublicKey();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [publicKey, setPublicKey] = useState("");

  const [solBalance, setSolBalance] = useState("0.0");
  const [usdtBalance, setUsdtBalance] = useState("0.0");
  const [usdcBalance, setUsdcBalance] = useState("0.0");
  const [ethBalance, setEthBalance] = useState("0.0");
  const [totalBalance, setTotalBalance] = useState("0.0");

  async function getPublicKey() {
    const pub = await readPublicKey();
    setPublicKey(pub);
    await getBalance(pub);
  }

  useEffect(() => {
    getPublicKey();
  }, []);

  async function getBalance(publicKey: any) {
    try {
      const solBalance = await getSolanaBalance(publicKey);
      setSolBalance(solBalance);

      const usdtBalance = await getSplBalance(
        publicKey,
        "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
      );
      setUsdtBalance(usdtBalance);
      const usdcBalance = await getSplBalance(
        publicKey,
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      );
      setUsdcBalance(usdcBalance);
      const ethBalance = await getSplBalance(
        publicKey,
        "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk"
      );
      setEthBalance(ethBalance);
      const prices = await getPrices();

      const solAmount = solBalance * prices.solana;
      const ethAmount = ethBalance * prices.ethereum;
      const totalAmount = (
        Number(solAmount) +
        Number(ethAmount) +
        Number(usdcBalance) +
        Number(usdtBalance)
      ).toString();
      const round = totalAmount.substring(0, 5);
      setTotalBalance(round);
    } catch (error) {
      console.log(error);
    }
  }

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
  var strFirstThree = str.substring(0, 3);
  var strLastThree = str.substring(str.length - 3, str.length);
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
          <View style={[stylesM.widthRectangle, stylesL.alignItemsEnd]}>
            <LinearGradient
              style={[
                stylesM.boxGradientLinear,
                stylesO.boxGradientLinear__small,
                stylesM.radiusTwentyNine,
                stylesL.JustifyAlign,
                { zIndex: 1 },
              ]}
              colors={["#592BFF", "#00FFAB", "#00C3FF"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => CopyMonic()}
                style={[
                  stylesM.backgroundBlack,
                  stylesM.boxTotal,
                  stylesM.radiusTwentyNine,
                  stylesL.flexRow,
                  stylesL.JustifyAlign,
                ]}
              >
                <View
                  style={[
                    stylesM.widthPercentageTwentyTwo,
                    stylesL.JustifyAlign,
                  ]}
                >
                  <IconUser name="user-circle" size={sizeCopy} color="#fff" />
                </View>
                <View
                  style={[stylesM.widthPercentageFive, stylesL.JustifyAlign]}
                >
                  <Text
                    style={[
                      stylesM.textColorWhite,
                      stylesM.fontSizeFourteen,
                      fontBold(),
                    ]}
                  >
                    {concatenado}
                  </Text>
                </View>
                <View
                  style={[
                    stylesM.widthPercentageTwentyTwo,
                    stylesL.JustifyAlign,
                  ]}
                >
                  <IconCopy name="copy-outline" size={sizeCopy} color="#fff" />
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <LinearGradient
            style={[
              stylesM.boxGradientLinear,
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
                    stylesM.textColorCian,
                    fontBold(),
                    stylesM.boxTxt_total,
                  ]}
                >
                  {i18n.t('balanceTotal')}
                </Text>
              </View>

              <View style={[stylesM.heightPercentageSix, stylesL.JustifyAlign]}>
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeSeventyFive,
                    fontBold(),
                  ]}
                >
                  {totalBalance}
                </Text>
              </View>

              <View style={[stylesM.heightPercentageTwo, stylesL.AlignItems]}>
                <Text
                  style={[
                    stylesM.fontSizeSixteen,
                    fontBold(),
                    stylesM.textColorWhite,
                  ]}
                >
                  =(USDT)
                </Text>
              </View>
            </View>
          </LinearGradient>

          
          <View style={[stylesM.widthRectangle, stylesL.flexRow, stylesL.spaceBetween, stylesM.boxMedium,]}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("SendToken")}
            >
              <LinearGradient
                style={[
                  stylesM.boxGradientLinear,
                  stylesO.boxGradientLinear__heightMedium,
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
                        style={[stylesM.boxTotal_img]}
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
                  stylesO.boxGradientLinear__heightMedium,
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
                        source={require("../../../assets/img/receive.png")}
                        style={[stylesM.boxTotal_img]}
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

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ marginTop: 50, bottom: 50 }}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                stylesM.boxCoin,
                stylesM.widthRectangle,
                stylesM.backgroundDarkBlue,
                stylesM.radiusSix,
                stylesL.flexRow,
              ]}
              onPress={() => 
                navigation.navigate("Currency", {
                  cur: "USDT",
                  balance: usdtBalance
                })
              }

            >
              <View
                style={[
                  stylesM.widthPercentageTwenty,
                  stylesL.Justify,
                  stylesL.alignItemsEnd,
                ]}
              >
                <Image
                  source={require("../../../assets/img/tether.png")}
                  style={[stylesM.boxCoin_img]}
                />
              </View>
              <View style={[stylesM.widthPercentageForty, stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.leftTwelve,
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  USDT
                </Text>
              </View>
              <View
                style={[stylesM.widthPercentageForty, stylesL.JustifyAlign]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {usdtBalance}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                stylesM.boxCoin,
                stylesM.widthRectangle,
                stylesM.backgroundDarkBlue,
                stylesM.radiusSix,
                stylesL.flexRow,
              ]}
              onPress={() => 
                navigation.navigate("Currency", {
                  cur: "USDC",
                  balance: usdcBalance
                })
              }
            >
              <View
                style={[
                  stylesM.widthPercentageTwenty,
                  stylesL.Justify,
                  stylesL.alignItemsEnd,
                ]}
              >
                <Image
                  source={require("../../../assets/img/usdc.png")}
                  style={[stylesM.boxCoin_img]}
                />
              </View>
              <View style={[stylesM.widthPercentageForty, stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.leftTwelve,
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  USDC
                </Text>
              </View>
              <View
                style={[stylesM.widthPercentageForty, stylesL.JustifyAlign]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {usdcBalance}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                stylesM.boxCoin,
                stylesM.widthRectangle,
                stylesM.backgroundDarkBlue,
                stylesM.radiusSix,
                stylesL.flexRow,
              ]}
              onPress={() => 
                navigation.navigate("Currency", {
                  cur: "SOL",
                  balance: solBalance
                })
              }
            >
              <View
                style={[
                  stylesM.widthPercentageTwenty,
                  stylesL.Justify,
                  stylesL.alignItemsEnd,
                ]}
              >
                <Image
                  source={require("../../../assets/img/sol.png")}
                  style={[stylesM.boxCoin_img]}
                />
              </View>
              <View style={[stylesM.widthPercentageForty, stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.leftTwelve,
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  SOL
                </Text>
              </View>
              <View
                style={[stylesM.widthPercentageForty, stylesL.JustifyAlign]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {solBalance}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                stylesM.boxCoin,
                stylesM.widthRectangle,
                stylesM.backgroundDarkBlue,
                stylesM.radiusSix,
                stylesL.flexRow,
              ]}
              onPress={() => 
                navigation.navigate("Currency", {
                  cur: "ETH",
                  balance: ethBalance
                })
              }
            >
              <View
                style={[
                  stylesM.widthPercentageTwenty,
                  stylesL.Justify,
                  stylesL.alignItemsEnd,
                ]}
              >
                <Image
                  source={require("../../../assets/img/eth.png")}
                  style={[stylesM.boxCoin_img]}
                />
              </View>
              <View style={[stylesM.widthPercentageForty, stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.leftTwelve,
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  ETH
                </Text>
              </View>
              <View
                style={[stylesM.widthPercentageForty, stylesL.JustifyAlign]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {ethBalance}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BalanceWallet;

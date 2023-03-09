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
  Dimensions,
  Modal,
  Image,
  TextInput,
  Platform,
  Clipboard,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import IconCopy from "react-native-vector-icons/Ionicons";
import IconDown from "react-native-vector-icons/FontAwesome";
import IconPaste from "react-native-vector-icons/FontAwesome5";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  readPublicKey,
  getSolanaBalance,
  getSplBalance,
  getPrices,
  sendSPL,
  sendSoles,
  sendSPLStable,
  readPrivateKey
} from "../../../controller";
import { readMnemonic } from "../../../controller";

import { LotieEnviado, LotierrorModal } from "../../components/Lottie";

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

const sizeCopy = Platform.OS === "ios" ? 19 : 22;

const SendToken = ({ navigation }: { navigation: any }) => {
  const [bloqueoText, setBloqueoText] = useState(true);
  const [copiedText, setCopiedText] = useState("");
  const [toPublic, setToPublic] = useState("");
  const [amount, setAmount] = useState("");

  const [selectedToken, setSelectedToken] = useState("SOL");
  const [selectedMint, setSelectedMint] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const [publicKey, setPublicKey] = useState("");

  const [solBalance, setSolBalance] = useState("0.0");
  const [usdtBalance, setUsdtBalance] = useState("0.0");
  const [usdcBalance, setUsdcBalance] = useState("0.0");
  const [ethBalance, setEthBalance] = useState("0.0");
  const [totalBalance, setTotalBalance] = useState("0.0");

  // async function leerMnemonic() {
  //   const palabras = await readMnemonic();

  //   setMnemonic(palabras);
  // }

  // leerMnemonic();

  async function leerSecretKey() {
    const key = await readPrivateKey();
    
    setSecretKey(key);

  }

  leerSecretKey();

  async function getPublicKey() {
    const pub = await readPublicKey();
    setPublicKey(pub);
    await getBalance(pub);
  }

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

  useEffect(() => {
    getPublicKey();
  }, []);


  //Funcion enviar SOL
  async function enviarSoles() {
    if (toPublic == "") {
      setLoadingModal(true);
      setLottierror(false);
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setLoadingModal(false);
          setDisableSend(false);
        }, 100);
      }, 1000);
    } else {
      setLottierror(true);
      setLoadingModal(true);
      setanmt("fadeInDownBig");
      const transaccion = await sendSoles(secretKey, toPublic, Number(amount));
      console.log(transaccion);
      console.log("SOL");

      var respuesta_es = "";
      var spaceCount = transaccion.split(" ").length - 1;

      //Handleo de errores
      if (spaceCount > 0) {
        if (
          transaccion ==
          "failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1"
        ) {
          respuesta_es = "Insufficient balance for this transaction";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else if (transaccion == "Invalid public key input") {
          respuesta_es = "Invalid destination public key";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else if (transaccion == "Non-base58 character") {
          respuesta_es = "Invalid destination public key";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else if (
          transaccion ==
          "failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit."
        ) {
          respuesta_es = "Fondos insuficientes para la Transacción";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else if (
          transaccion ==
          "failed to send transaction = Transaction simulation failed: Insufficient funds for fee"
        ) {
          respuesta_es = "Insufficient Funds for the Transaction";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else {
          respuesta_es = "Something went wrong, please try again";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        }
      } else {
        setLoadingModal(false);
        navigation.navigate("Succesful", {
          resp: JSON.parse(transaccion).transfer_transaction,
          num: amount,
        });
        setDisableSend(false);
      }
    }
  }

  async function enviarSpl() {
    if (toPublic == "") {
      setLoadingModal(true);
      setLottierror(false);
      setanmt("fadeInDownBig");
      setTimeout(() => {
        setanmt("fadeOutUp");
        setTimeout(() => {
          setLoadingModal(false);
          setDisableSend(false);
        }, 100);
      }, 1000);
    } else {
      setLottierror(true);
      setLoadingModal(true);
      setanmt("fadeInDownBig");
      const transaccion = await sendSPL(
        secretKey,
        toPublic,
        Number(amount),
        selectedMint
      );
      console.log(transaccion);
      console.log("SPL");

      var respuesta_es = "";
      var spaceCount = transaccion.split(" ").length - 1;

      //Handleo de errores
      if (spaceCount > 0) {
        if (
          transaccion ==
          "failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1"
        ) {
          respuesta_es = "Insufficient balance for this transaction";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else if (transaccion == "Invalid public key input") {
          respuesta_es = "Invalid destination public key";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else if (transaccion == "Non-base58 character") {
          respuesta_es = "Invalid destination public key";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else if (
          transaccion ==
          "failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit."
        ) {
          respuesta_es = "Fondos insuficientes para la Transacción";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else if (
          transaccion ==
          "failed to send transaction = Transaction simulation failed: Insufficient funds for fee"
        ) {
          respuesta_es = "Insufficient Funds for the Transaction";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        } else {
          respuesta_es = "Something went wrong, please try again";
          setLoadingModal(false);
          navigation.navigate("Declined", { resp: respuesta_es });
          setDisableSend(false);
        }
      } else {
        setLoadingModal(false);
        navigation.navigate("Succesful", {
          resp: JSON.parse(transaccion).transfer_transaction,
          num: amount,
        });
        setDisableSend(false);
      }
    }
  }

  // async function enviarSplEstable() {
  //   if (toPublic == "") {
  //     setLoadingModal(true);
  //     setLottierror(false);
  //     setanmt("fadeInDownBig");
  //     setTimeout(() => {
  //       setanmt("fadeOutUp");
  //       setTimeout(() => {
  //         setLoadingModal(false);
  //         setDisableSend(false);
  //       }, 100);
  //     }, 1000);
  //   } else {
  //     setLottierror(true);
  //     setLoadingModal(true);
  //     setanmt("fadeInDownBig");
  //     const transaccion = await sendSPLStable(
  //       mnemonic,
  //       toPublic,
  //       Number(amount),
  //       selectedMint
  //     );
  //     console.log(transaccion);
  //     console.log("SPL ESTABLE");

  //     var respuesta_es = "";
  //     var spaceCount = transaccion.split(" ").length - 1;

  //     //Handleo de errores
  //     if (spaceCount > 0) {
  //       if (
  //         transaccion ==
  //         "failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1"
  //       ) {
  //         respuesta_es = "Insufficient balance for this transaction";
  //         setLoadingModal(false);
  //         navigation.navigate("Declined", { resp: respuesta_es });
  //         setDisableSend(false);
  //       } else if (transaccion == "Invalid public key input") {
  //         respuesta_es = "Invalid destination public key";
  //         setLoadingModal(false);
  //         navigation.navigate("Declined", { resp: respuesta_es });
  //         setDisableSend(false);
  //       } else if (transaccion == "Non-base58 character") {
  //         respuesta_es = "Invalid destination public key";
  //         setLoadingModal(false);
  //         navigation.navigate("Declined", { resp: respuesta_es });
  //         setDisableSend(false);
  //       } else if (
  //         transaccion ==
  //         "failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit."
  //       ) {
  //         respuesta_es = "Fondos insuficientes para la Transacción";
  //         setLoadingModal(false);
  //         navigation.navigate("Declined", { resp: respuesta_es });
  //         setDisableSend(false);
  //       } else if (
  //         transaccion ==
  //         "failed to send transaction = Transaction simulation failed: Insufficient funds for fee"
  //       ) {
  //         respuesta_es = "Insufficient Funds for the Transaction";
  //         setLoadingModal(false);
  //         navigation.navigate("Declined", { resp: respuesta_es });
  //         setDisableSend(false);
  //       } else {
  //         respuesta_es = "Something went wrong, please try again";
  //         setLoadingModal(false);
  //         navigation.navigate("Declined", { resp: respuesta_es });
  //         setDisableSend(false);
  //       }
  //     } else {
  //       setLoadingModal(false);
  //       navigation.navigate("Succesful", {
  //         resp: transaccion,
  //         num: amount,
  //       });
  //       setDisableSend(false);
  //     }
  //   }
  // }

  const [continueModal, setContinueModal] = useState(false);

  const [loadingModal, setLoadingModal] = useState(false);

  const [anmt, setanmt] = useState("");
  const [disableSend, setDisableSend] = useState(false);


  const [lottierror, setLottierror] = useState(true);



  const [MostrarError, setError] = useState("");

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
    setToPublic(text);
    setBloqueoText(false);
  };

  const ModalContinue = () => {
    setContinueModal(true);
    setanmt("fadeIn");
  };

  const HideModal = () => {
    setTimeout(() => {
      setanmt("fadeOutDown");
      setTimeout(() => {
        setContinueModal(false);
      }, 100);
    }, 2);
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
  const topIos = () => Platform.OS === "ios" && { top: 3 };

  return (
    <LinearGradient
      colors={["#090437", "#000"]}
      style={stylesB.linear}
      start={{ x: 0, y: 1.6 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView style={stylesB.body}>
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
                stylesM.modalSend,
                stylesM.backgroundTransparenDark,
                stylesL.JustifyAlign,
                stylesM.radiusFifteen,
                stylesM.radiusThirty,
              ]}
            >
              <View
                style={[
                  stylesM.heightPercentageEight,
                  stylesL.flexColumn,
                  stylesM.widthPercentageHundred,
                ]}
              >
                <View style={[stylesM.heightPercentageTwo]}>
                  <Text
                    style={[
                      stylesM.textColorCian,
                      fontMedium(),
                      stylesM.fontSizeTwentyFour,
                      topIos(),
                    ]}
                  >
                    {i18n.t('sendChooseToken')}
                  </Text>
                </View>
                <View
                  style={[
                    stylesM.heightPercentageEight,
                    stylesL.flexRow,
                    stylesL.flexWrap,
                    stylesL.spaceBetween,
                    stylesM.marginTopTwenty,
                    stylesM.paddingHorizontalEight,
                  ]}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[stylesM.marginBottomFifteen]}
                    onPress={() => [
                      HideModal(),
                      setSelectedToken("USDT"),
                      setSelectedMint(
                        "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
                      ),
                    ]}
                  >
                    <Image
                      source={require("../../../assets/img/tether.png")}
                      style={[stylesM.boxImgModal]}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[stylesM.marginBottomFifteen]}
                    onPress={() => [
                      HideModal(),
                      setSelectedToken("USDC"),
                      setSelectedMint(
                        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
                      ),
                    ]}
                  >
                    <Image
                      source={require("../../../assets/img/usdc.png")}
                      style={[stylesM.boxImgModal]}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[stylesM.marginBottomFifteen]}
                    onPress={() => [
                      HideModal(),
                      setSelectedToken("SOL"),
                      setSelectedMint(""),
                    ]}
                  >
                    <Image
                      source={require("../../../assets/img/sol.png")}
                      style={[stylesM.boxImgModal]}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[stylesM.marginBottomFifteen]}
                    onPress={() => [
                      HideModal(),
                      setSelectedToken("ETH"),
                      setSelectedMint(
                        "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk"
                      ),
                    ]}
                  >
                    <Image
                      source={require("../../../assets/img/eth.png")}
                      style={[stylesM.boxImgModal]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  stylesM.heightPercentageTwo,
                  stylesM.widthPercentageHundred,
                  stylesL.flexRow,
                  stylesL.JustifyAlign,
                  stylesL.justifyEnd,
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
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
              </View>
            </View>
          </Animatable.View>
        </Modal>

        {/* Modal loading */}
        <Modal
          visible={loadingModal}
          transparent
          onRequestClose={() => setLoadingModal(false)}
          hardwareAccelerated
        >
          <View
            style={[
              stylesL.JustifyAlign,
              stylesB.linear,
              stylesM.backgroundOpacity,
            ]}
          >
            <Animatable.View animation={anmt} duration={600}>
              <View style={[stylesL.AlignItems]}>
                {lottierror ? <LotieEnviado /> : <LotierrorModal />}
              </View>
              {lottierror ? 
                <></> 
                : 
                <View style={[stylesL.AlignItems]}>
                  <Text style={[stylesM.textColorWhite, stylesM.marginTopTwenty, fontBold(), stylesM.fontSizeTwentyTwo]}>{i18n.t('sendEnterKey')}</Text>
                </View>
                
              }
            </Animatable.View>
          </View>
        </Modal>

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={[stylesB.completo, stylesO.completo__flexGrow]}
          scrollEnabled
          enableOnAndroid={true}
        >
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
                topIos(),
              ]}
            >
              {i18n.t('textSend')}
            </Text>
          </View>

          <LinearGradient
            style={[
              stylesM.boxGradientLinear,
              stylesM.widthRectangle,
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
              ]}
            >
              <View style={[stylesM.heightPercentageTwo, stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.fontSizeEighteen,
                    stylesM.textColorWhite,
                    fontBold(),
                    stylesM.boxTxt_total,
                  ]}
                >
                  {i18n.t('sendAmount')}
                </Text>
              </View>

              <View style={[stylesM.heightPercentageSix, stylesL.JustifyAlign]}>
                <TextInput
                  // editable = {bloqueoText}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  placeholder="0"
                  placeholderTextColor="white"
                  onChangeText={(text) => setAmount(text)}
                  style={[
                    stylesM.textColorWhite,
                    stylesM.fontSizeSeventyFive,
                    fontBold(),
                    stylesM.paddingHorizontalEight,
                  ]}
                ></TextInput>
              </View>
              <View style={[stylesM.heightPercentageTwo, stylesL.AlignItems]}>
                {selectedToken == 'SOL' && 
                <Text
                  style={[
                    stylesM.fontSizeSixteen,
                    fontBold(),
                    stylesM.textColorMediumAquamarine,
                  ]}
                >
                  $ {solBalance}
                </Text>
                }
                {selectedToken == 'USDT' && 
                <Text
                  style={[
                    stylesM.fontSizeSixteen,
                    fontBold(),
                    stylesM.textColorMediumAquamarine,
                  ]}
                >
                  $ {usdtBalance}
                </Text>
                }
                {selectedToken == 'USDC' && 
                <Text
                  style={[
                    stylesM.fontSizeSixteen,
                    fontBold(),
                    stylesM.textColorMediumAquamarine,
                  ]}
                >
                  $ {usdcBalance}
                </Text>
                }
                {selectedToken == 'ETH' && 
                <Text
                  style={[
                    stylesM.fontSizeSixteen,
                    fontBold(),
                    stylesM.textColorMediumAquamarine,
                  ]}
                >
                  $ {ethBalance}
                </Text>
                }
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            style={[
              stylesM.boxGradientLinear,
              stylesO.boxGradientLinear__heightMedium,
              stylesM.widthRectangle,
              stylesM.radiusFive,
              stylesL.JustifyAlign,
              stylesM.boxMedium,
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
                stylesL.flexRow,
                stylesL.JustifyAlign,
              ]}
            >
              <View style={[stylesM.widthPercentageSeven]}>
                <TextInput
                  // editable = {bloqueoText}
                  onChangeText={(val) => setToPublic(val)}
                  autoCapitalize="none"
                  placeholder={i18n.t('sendAddress')}
                  placeholderTextColor="#5A35B7"
                  style={[
                    stylesM.textColorPurple,
                    stylesM.fontSizeTwenty,
                    fontBold(),
                    stylesM.paddingLeft,
                    stylesM.textLight,
                  ]}
                >
                  {copiedText}
                </TextInput>
              </View>

              <View
                style={[
                  stylesM.copyButton,
                  stylesM.widthPercentageTree,
                  stylesL.flexRow,
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => fetchCopiedText()}
                  style={[stylesM.widthPercentageFive, stylesL.JustifyAlign]}
                >
                  <IconPaste name="paste" size={sizeCopy} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[stylesM.widthPercentageFive, stylesL.JustifyAlign]}
                  onPress={() =>
                    navigation.navigate("QrReader", {
                      bold: fontBold(),
                      light: fontLight(),
                      medium: fontMedium(),
                    })
                  }
                >
                  <IconCopy
                    name="qr-code-outline"
                    size={sizeCopy}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
          {selectedToken === `SOL` && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                stylesM.boxCoin,
                stylesM.widthRectangle,
                stylesM.backgroundDarkBlue,
                stylesM.radiusSix,
                stylesL.flexRow,
                stylesL.JustifyAlign,
              ]}
              onPress={() => ModalContinue()}
            >
              <View style={[stylesL.Justify]}>
                <Image
                  source={require(`../../../assets/img/sol.png`)}
                  style={[stylesM.boxCoin_img]}
                />
              </View>

              <View style={[stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.leftTwelve,
                    stylesM.textColorWhite,
                    fontBold(),
                    topIos(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {selectedToken}
                </Text>
              </View>

              <View style={[stylesM.leftTwelve, stylesL.Justify]}>
                <IconDown name="chevron-down" size={sizeCopy} color="#fff" />
              </View>
            </TouchableOpacity>
          )}

          {selectedToken === `USDT` && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                stylesM.boxCoin,
                stylesM.widthRectangle,
                stylesM.backgroundDarkBlue,
                stylesM.radiusSix,
                stylesL.flexRow,
                stylesL.JustifyAlign,
              ]}
              onPress={() => ModalContinue()}
            >
              <View style={[stylesL.Justify]}>
                <Image
                  source={require(`../../../assets/img/tether.png`)}
                  style={[stylesM.boxCoin_img]}
                />
              </View>

              <View style={[stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.leftTwelve,
                    stylesM.textColorWhite,
                    fontBold(),
                    topIos(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {selectedToken}
                </Text>
              </View>

              <View style={[stylesM.leftTwelve, stylesL.Justify]}>
                <IconDown name="chevron-down" size={sizeCopy} color="#fff" />
              </View>
            </TouchableOpacity>
          )}

          {selectedToken === `ETH` && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                stylesM.boxCoin,
                stylesM.widthRectangle,
                stylesM.backgroundDarkBlue,
                stylesM.radiusSix,
                stylesL.flexRow,
                stylesL.JustifyAlign,
              ]}
              onPress={() => ModalContinue()}
            >
              <View style={[stylesL.Justify]}>
                <Image
                  source={require(`../../../assets/img/eth.png`)}
                  style={[stylesM.boxCoin_img]}
                />
              </View>

              <View style={[stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.leftTwelve,
                    stylesM.textColorWhite,
                    fontBold(),
                    topIos(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {selectedToken}
                </Text>
              </View>

              <View style={[stylesM.leftTwelve, stylesL.Justify]}>
                <IconDown name="chevron-down" size={sizeCopy} color="#fff" />
              </View>
            </TouchableOpacity>
          )}

          {selectedToken === `USDC` && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                stylesM.boxCoin,
                stylesM.widthRectangle,
                stylesM.backgroundDarkBlue,
                stylesM.radiusSix,
                stylesL.flexRow,
                stylesL.JustifyAlign,
              ]}
              onPress={() => ModalContinue()}
            >
              <View style={[stylesL.Justify]}>
                <Image
                  source={require(`../../../assets/img/usdc.png`)}
                  style={[stylesM.boxCoin_img]}
                />
              </View>

              <View style={[stylesL.Justify]}>
                <Text
                  style={[
                    stylesM.leftTwelve,
                    stylesM.textColorWhite,
                    fontBold(),
                    topIos(),
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {selectedToken}
                </Text>
              </View>

              <View style={[stylesM.leftTwelve, stylesL.Justify]}>
                <IconDown name="chevron-down" size={sizeCopy} color="#fff" />
              </View>
            </TouchableOpacity>
          )}

          <View
            style={[
              stylesM.boxGradientLinear,
              stylesM.widthRectangle,
              stylesO.boxGradientLinear__heightMedium,
              stylesM.boxBottomTab,
            ]}
          >
            {selectedToken == "SOL" && (
              <TouchableOpacity
                onPress={() => {
                  [enviarSoles(), setDisableSend(true)];
                }}
                disabled={disableSend}
                activeOpacity={0.8}
                style={[
                  stylesM.boxTotal,
                  stylesM.radiusTwentyFive,
                  stylesL.JustifyAlign,
                  disableSend
                    ? stylesM.backgroundCianDisable
                    : stylesM.backgroundCian,
                ]}
              >
                <View style={[]}>
                  <Text
                    style={[
                      stylesM.textColorBlack,
                      fontBold(),
                      stylesM.fontSizeTwentyEight,
                    ]}
                  >
                    {i18n.t('textSend')}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {selectedToken == "USDT" && (
              <TouchableOpacity
                onPress={() => {
                  enviarSpl();
                }}
                activeOpacity={0.8}
                style={[
                  stylesM.boxTotal,
                  stylesM.radiusTwentyFive,
                  stylesL.JustifyAlign,
                  stylesM.backgroundCian,
                ]}
              >
                <View style={[]}>
                  <Text
                    style={[
                      stylesM.textColorBlack,
                      fontBold(),
                      stylesM.fontSizeTwentyEight,
                    ]}
                  >
                    {i18n.t('textSend')}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {selectedToken == "USDC" && (
              <TouchableOpacity
                onPress={() => {
                  enviarSpl();
                }}
                activeOpacity={0.8}
                style={[
                  stylesM.boxTotal,
                  stylesM.radiusTwentyFive,
                  stylesL.JustifyAlign,
                  stylesM.backgroundCian,
                ]}
              >
                <View style={[]}>
                  <Text
                    style={[
                      stylesM.textColorBlack,
                      fontBold(),
                      stylesM.fontSizeTwentyEight,
                    ]}
                  >
                   {i18n.t('textSend')}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {selectedToken == "ETH" && (
              <TouchableOpacity
                onPress={() => {
                  enviarSpl();
                }}
                activeOpacity={0.8}
                style={[
                  stylesM.boxTotal,
                  stylesM.radiusTwentyFive,
                  stylesL.JustifyAlign,
                  stylesM.backgroundCian,
                ]}
              >
                <View style={[]}>
                  <Text
                    style={[
                      stylesM.textColorBlack,
                      fontBold(),
                      stylesM.fontSizeTwentyEight,
                    ]}
                  >
                    {i18n.t('textSend')}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SendToken;

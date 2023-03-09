import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  Platform,
  Dimensions,
  Modal,
  Button,
  SafeAreaView,
  Image,
  StatusBar
} from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { RFValue } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import { Lotierror, Lotieqr, LotierrorQr } from "../../components/Lottie";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/Entypo";
import BarStatus from "../../components/BarStatus";
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

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;


const topIos = () => Platform.OS === "ios" &&({ top: 3 });







const QrReader = ({ navigation, route }: { navigation: any; route: any }) => {
  const fontBold = route.params?.bold;
  const fontLight = route.params?.light;
  const fontMedium = route.params?.medium;
  
  // +++++++++++++++++++++++++++++++++++++++++Qr para iOS+++++++++++++++++++++++++++++++++++++++++

  
  if (Platform.OS === "ios") {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("");

    //preguntando el permiso para camara
    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == "granted");
      })();
    };

    useEffect(() => {
      askForCameraPermission();
    }, []);

    //Constantes modales
    const [anmt, setanmt] = useState("");
    const [aprobado, setaprobado] = useState(false);
    const [MostrarError, setError] = useState("");
    const [lottie, setLottie] = useState(<Lotierror />);
    const [mostrartitulo, setmostrartitulo] = useState("");

    //Handleo del escaneado
    const handleBarCodeScanned = ({ data }) => {
      setScanned(true);
      setText(data);
      Clipboard.setString(data);
      //aqui va el envio de los props
      setmostrartitulo(i18n.t('qrscaned'));
      setError(i18n.t('qrCopied'));
      setaprobado(true);
      setLottie(<Lotieqr />);
      setanmt("fadeInDownBig");
    };

    //si el permiso es nulo
    if (hasPermission === null) {
      return <Text>{i18n.t('qrNullPermission')}</Text>;
    }

    //si el permiso es falso
    if (hasPermission === false) {
    }

    //boton volver
    function regresar() {
      setScanned(false);
      navigation.goBack();
    }

    

    //si el permiso es verdadero
    if (hasPermission === true) {
      return (
        <View style={[stylesM.containeruno, stylesL.AlignItems]}>
          <Modal
            visible={aprobado}
            transparent
            onRequestClose={() => setaprobado(false)}
            hardwareAccelerated
          >
            <View style={[stylesL.flexOne, stylesL.AlignItems, stylesL.JustifyAlign, stylesM.backgroundPurpleIndigo]}>
              <Animatable.View animation={anmt} duration={600}>
                <View>
                  <View style={[stylesM.ventanafull, stylesL.AlignItems, stylesL.flexColumn]}>
                    <View style={stylesL.Justify}>
                      <Text style={[stylesM.texticonfull, stylesM.textColorWhite, stylesM.fontSizeThirty]}>{mostrartitulo}</Text>
                    </View>
                    <View style={[stylesM.icontextfull, stylesL.AlignItems]}>
                      <View style={[stylesL.AlignItems, stylesL.Justify]}>{lottie}</View>
                    </View>

                    <View>
                      <Text style={[stylesM.notificacionfull, stylesM.textColorWhite, stylesM.fontSizeTwenty, stylesL.textAlignCenter]}>
                        {MostrarError}
                      </Text>
                    </View>
                    {/* Texto copiado */}
                    <Text style={[stylesM.copiadotxt, stylesM.textColorGrey, stylesM.fontSizeTwenty, stylesL.textAlignCenter]}>{text}</Text>
                    {/* Botones modal */}
                    <View style={[stylesM.dcVC, stylesM.radiusTen, stylesL.flexRow]}>
                      <View style={stylesM.dcV}>
                        <TouchableOpacity
                          style={[stylesM.btnVC, stylesL.AlignItems, stylesM.backgroundWhite, stylesM.radiusTwenty]}
                          activeOpacity={0.5}
                          onPress={() => [
                            setScanned(false),
                            setaprobado(false),
                          ]}
                        >
                          <Text style={[stylesM.textColorRebeccaPurple, stylesM.fontSizeFourteen]}>{i18n.t('qrRescan')}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={stylesM.dcC}>
                        <TouchableOpacity
                          style={[stylesM.btnVC, stylesL.AlignItems, stylesM.backgroundWhite, stylesM.radiusTwenty]}
                          activeOpacity={0.5}
                          onPress={() => regresar()}
                        >
                          <Text style={[stylesM.textColorRebeccaPurple, stylesM.fontSizeFourteen]}>{i18n.t('qrConfirm')}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Animatable.View>
            </View>
          </Modal>

          {/* camara */}
          <SafeAreaView style={[stylesB.body, stylesM.backgroundBlack]}>
            <StatusBar barStyle={"dark-content"} />
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={[
                StyleSheet.absoluteFillObject,
                stylesB.completo,
                stylesL.Justify,
              ]}
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
              <View style={[stylesM.tituloqr, stylesL.AlignItems, stylesM.backgroundBlackOpacity, stylesM.radiusFifteen]}>
                <Text style={stylesM.textColorWhite}>{i18n.t('qrScanQr')}</Text>
              </View>
              <Animatable.View
                style={[stylesM.barcodebox, stylesL.AlignItems, stylesM.radiusFifteen]}
                animation="pulse"
                duration={2000}
                iterationCount={"infinite"}
              ></Animatable.View>
              <View style={[stylesM.cajavolver, stylesL.AlignItems]}>
                <TouchableOpacity
                  style={[stylesM.btnvolver, stylesL.AlignItems, stylesM.backgroundWhite, stylesM.radiusTwenty]}
                  activeOpacity={0.5}
                  onPress={() => regresar()}
                >
                  <Text style={[stylesM.textColorPurple, stylesM.fontSizeSixteen]}>
                    {i18n.t('qrReturn')}
                  </Text>
                </TouchableOpacity>
              </View>
            </BarCodeScanner>
          </SafeAreaView>
        </View>
      );
    }
    return (
      // permiso denegado

      <View style={[stylesM.cajaqra, stylesL.AlignItems, stylesM.backgroundPurpleIndigo, stylesL.Justify]}>
        <Animatable.View animation={"fadeInDownBig"} duration={600}>
          <View>
            <View style={[stylesL.Justify, stylesL.AlignItems]}>
              <View style={[stylesL.JustifyAlign]}>
                <Text
                  style={[
                    stylesM.fontSizeTwentyEight,
                    stylesM.textColorWhite,
                    stylesM.textBold,
                  ]}
                >
                  {i18n.t('qrDenied')}
                </Text>
              </View>
              {/* Lottie */}
              <View>
                <LottieView
                  style={stylesM.lottieqr}
                  source={require("../../../assets//lottie/error.json")}
                  speed={2}
                  autoPlay
                />
              </View>
              <View>
                <Text
                  style={[
                    stylesM.textKey,
                    stylesM.textColorWhite,
                    stylesL.textAlignCenter,
                    stylesM.fontSizeEighteen,
                  ]}
                >
                  {i18n.t('qrCheckPermissions')}
                </Text>
              </View>
              <View style={stylesL.AlignItems}>
                <TouchableOpacity
                  style={[styles.btnv, stylesL.AlignItems, stylesM.backgroundWhite, stylesM.radiusTwenty]}
                  activeOpacity={0.5}
                  onPress={() => regresar()}
                >
                  <Text style={[stylesM.textColorPurple, stylesM.fontSizeSixteen]}>
                  {i18n.t('qrReturn')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
    );

    // +++++++++++++++++++++++++++++++++++++++++Qr para Android+++++++++++++++++++++++++++++++++++++++++
    
    
  } else if (Platform.OS === "android") {

    


    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    //Constantes modales
    const [anmt, setanmt] = useState("");
    const [aprobado, setaprobado] = useState(false);
    const [MostrarError, setError] = useState("");
    const [lottie, setLottie] = useState(<Lotierror />);
    const [mostrartitulo, setmostrartitulo] = useState("");
    const [text, setText] = useState("");

    //boton volver
    function regresar() {
      setScanned(false);
      navigation.goBack();
    }


    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, []);

    if (hasPermission === null) {
 
      return (
        <LinearGradient
          colors={["#090437", "#000"]}
          style={stylesB.linear}
          start={{ x: 0, y: 1.6 }}
          end={{ x: 0, y: 0 }}
        >
          <SafeAreaView style={stylesB.body}>
            <BarStatus />
            <View style={[stylesB.completo, stylesL.JustifyAlign]}>
              <Text
                style={[
                  stylesM.textColorWhite,
                  stylesL.textAlignCenter,
                  stylesM.fontSizeTwenty,
                  fontMedium,
                  stylesM.fontLineThirty
                ]}
              >
                {i18n.t('qrPermissionDenied')}
              </Text>
              <View style={[stylesL.AlignItems, stylesM.marginTopTwenty]}>
                  <TouchableOpacity
                    style={[
                      stylesM.boxBottomQr_txt,
                      stylesO.boxBottomQr_txt__width,
                      stylesM.backgroundCian,
                      stylesM.radiusTwenty,
                      stylesL.JustifyAlign,
                      stylesM.marginTopThirty
                    ]}
                    activeOpacity={0.5}
                    onPress={() => regresar()}
                  >
                    <Text
                      style={[
                        stylesM.fontSizeTwentyFour,
                        stylesM.textColorBlack,
                        fontBold,
                        topIos(),
                      ]}
                    >
                      {i18n.t('qrReturn')}
                    </Text>
                  </TouchableOpacity>
                </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      );
    };

    
     

    if (hasPermission === false) {

      return (
        <LinearGradient
          colors={["#090437", "#000"]}
          style={stylesB.linear}
          start={{ x: 0, y: 1.6 }}
          end={{ x: 0, y: 0 }}
        >
          <SafeAreaView style={stylesB.body}>
            <BarStatus />
            <View style={[stylesB.completo, stylesL.Justify]}>
              <Animatable.View
                animation={"fadeInDownBig"}
                duration={1500}
                style={[stylesL.JustifyAlign]}
              >
                <View style={[stylesL.JustifyAlign]}>
                  <Text
                    style={[
                      stylesM.fontSizeTwentyEight,
                      stylesM.textColorWhite,
                      fontBold,
                    ]}
                  >
                    {i18n.t('qrDenied')}
                  </Text>
                </View>

                <View>
                  <LotierrorQr />
                </View>

                <Text
                  style={[
                    stylesM.textKey,
                    stylesM.textColorWhite,
                    stylesL.textAlignCenter,
                    stylesM.fontSizeTwenty,
                    fontMedium,
                    stylesM.fontLineThirty

                  ]}
                >
                  {i18n.t('qrPermissionDenied')}
                </Text>

                <View style={stylesL.AlignItems}>
                  <TouchableOpacity
                    style={[
                      stylesM.boxBottomQr_txt,
                      stylesO.boxBottomQr_txt__width,
                      stylesM.backgroundCian,
                      stylesM.radiusTwenty,
                      stylesL.JustifyAlign,
                    ]}
                    activeOpacity={0.5}
                    onPress={() => regresar()}
                  >
                    <Text
                      style={[
                        stylesM.fontSizeTwentyFour,
                        stylesM.textColorBlack,
                        fontBold,
                        topIos(),
                      ]}
                    >
                      {i18n.t('qrReturn')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      );
    }
    if (scanned == true) {
      
      return (
        <LinearGradient
          colors={["#090437", "#000"]}
          style={stylesB.linear}
          start={{ x: 0, y: 1.6 }}
          end={{ x: 0, y: 0 }}
        >
          <SafeAreaView style={stylesB.body}>
            <BarStatus />
            <View style={[stylesB.completo, stylesL.Justify]}>
              <Animatable.View
                animation={"fadeInDownBig"}
                duration={1500}
                style={[stylesL.JustifyAlign]}
              >
                <View style={[stylesL.JustifyAlign]}>
                  <Text
                    style={[
                      stylesM.fontSizeTwentyEight,
                      stylesM.textColorWhite,
                      fontBold,
                    ]}
                  >
                    {i18n.t('qrscaned')}
                  </Text>
                </View>

                <View>
                  <Lotieqr />
                </View>

                <Text
                  style={[
                    stylesM.textKey,
                    stylesM.textColorWhite,
                    stylesL.textAlignCenter,
                    stylesM.fontSizeTwenty,
                    fontMedium,
                  ]}
                >
                  {i18n.t('qrCopied')}
                </Text>
                {/* Texto copiado */}
                <View>
                  <Text style={[stylesM.copiadotxtAndroid, stylesM.textColorGrey, stylesM.fontSizeTwenty, stylesL.textAlignCenter]}>{text}</Text>

                </View>

                <View style={[stylesL.flexRow, stylesM.widthRectangle]}>
                  <View
                    style={[stylesM.boxBottomQr, stylesM.widthPercentageFive]}
                  >
                    <TouchableOpacity
                      style={[
                        stylesM.boxBottomQr_txt,
                        stylesM.backgroundCian,
                        stylesM.radiusTwenty,
                        stylesL.JustifyAlign,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => [setScanned(false), setaprobado(false)]}
                    >
                      <Text
                        style={[
                          stylesM.fontSizeTwentyFour,
                          stylesM.textColorBlack,
                          fontBold,
                          topIos(),
                        ]}
                      >
                        {i18n.t('qrRescan')}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={[stylesM.boxBottomQr, stylesM.widthPercentageFive]}
                  >
                    <TouchableOpacity
                      style={[
                        stylesM.boxBottomQr_txt,
                        stylesM.backgroundCian,
                        stylesM.radiusTwenty,
                        stylesL.JustifyAlign,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => regresar()}
                    >
                      <Text
                        style={[
                          stylesM.fontSizeTwentyFour,
                          stylesM.textColorBlack,
                          fontBold,
                          topIos(),
                        ]}
                      >
                        {i18n.t('qrConfirm')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animatable.View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      );
    }
    
   
    return (
      
      <SafeAreaView style={stylesB.body}>
        <BarStatus />
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
        <Camera
          onBarCodeScanned={(...args) => {
            const data = args[0].data;
            const result = JSON.stringify(data);
            Clipboard.setString(data);
            setScanned(true);
            setText(data);
          }}
          barCodeScannerSettings={{
            barCodeTypes: ["qr"],
          }}
          style={[stylesB.completo, stylesL.Justify]}
        >
          <View
            style={[
              stylesM.box_titleQr,
              stylesL.AlignItems,
              stylesM.radiusSixteen,
              stylesM.backgroundBlackMedium,
            ]}
          >
            <Text style={[stylesM.textColorWhite, fontBold]}>{i18n.t('qrScanQr')}</Text>
          </View>
          <Animatable.View
            style={[stylesM.boxScanQr, stylesM.radiusSixteen]}
            animation="pulse"
            duration={2000}
            iterationCount={"infinite"}
          ></Animatable.View>
        </Camera>
      </SafeAreaView>
    );
  }

  
  return null;
};


export default QrReader;

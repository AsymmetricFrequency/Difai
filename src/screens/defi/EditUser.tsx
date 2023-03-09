import {
  stylesB,
  stylesL,
  stylesM,
  stylesO,
  stylesS,
} from "../../appTheme/styles/styles";
import { View, Text, SafeAreaView, Image, TouchableOpacity, Platform, TextInput, ToastAndroid, Clipboard, Alert, Modal, Dimensions, Keyboard } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import BarStatus from "../../components/BarStatus";
import React, {useState} from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import IconEdit from "react-native-vector-icons/Feather";
import IconArrow from "react-native-vector-icons/SimpleLineIcons";
import IconCheck from "react-native-vector-icons/Entypo";
import { Lotierror } from "../../components/Lottie";
import { saveNameUser, readNameUser, readPrivateKey } from "../../../controller";
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

const sizeEdit = Platform.OS === "ios" ? 17 : 20;
const sizeArrow = Platform.OS === "ios" ? 32 : 35;

const topIos = () => Platform.OS === "ios" &&({ top: 3 });
  
const EditUser = ({ navigation }: { navigation: any} ) => {
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

    //active textinput style
    const [stateUser,setStateUser]= useState({isFocused:true})
    const [state,setState]= useState(false)
    const [nameUser,setNameUser]= useState("")
    const [viewNameUser,setViewNameUser]= useState("")


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

  
  async function editUser1() {
    setStateUser({isFocused: false});
    setState(false);
    saveNameUser(nameUser);
    const updateUser = await readNameUser();
    setViewNameUser(updateUser) 
    console.log(viewNameUser);
  }
  async function editUser2() {
    
    setStateUser({isFocused: true});
    setState(true);
    
  }
  
 
  

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
                topIos()
              ]}
            >
              {i18n.t('editProfile')}
            </Text>
          </View>
          <View
            style={[
              stylesM.widthRectangle,
              stylesM.heightPercentageEight,
              stylesM.paddingHorizontalTwentySix,
            ]}
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
                  stylesM.widthPercentageSeven,
                  stylesL.Justify,
                  stylesM.paddingLeft,
                ]}
              >
                <TextInput
                  style={[
                    stylesM.textColorWhite,
                    stylesM.leftTwelve,
                    stylesM.fontSizeTwentySix,
                    topIos()
                    ,
                    {
                       borderBottomColor: stateUser.isFocused
                         ? "#1ee3cf"
                         : "transparent",
                      borderBottomWidth: 1,
                      padding: 0,
                      fontFamily: "LeagueSpartanBold",
                    },
                  ]}
                  
                  onChangeText={(value) => setNameUser(value)}
                  editable={state}
                  placeholder = "User Name"
                  placeholderTextColor={"white"}
                  autoFocus={state}
                  
                >
                  {viewNameUser}
                </TextInput>
              </View>
              {stateUser.isFocused ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[stylesM.widthPercentageTree, stylesL.JustifyAlign]}
                  onPress={() => editUser1()}
                >
                  <LinearGradient
                    style={[
                      stylesM.bottomEdit,
                      stylesM.radiusEighteen,
                      stylesL.JustifyAlign,
                    ]}
                    colors={["#1EE3CF", "#3300FF"]}
                    start={{ x: 0, y: 0.2 }}
                    end={{ x: 0, y: 1 }}
                  >
                  <IconCheck name="check"  size={sizeEdit} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>


                  ) : (

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={[stylesM.widthPercentageTree, stylesL.JustifyAlign]}
                    onPress={() => editUser2()}
                  >
                    <LinearGradient
                      style={[
                        stylesM.bottomEdit,
                        stylesM.radiusEighteen,
                        stylesL.JustifyAlign,
                      ]}
                      colors={["#1EE3CF", "#3300FF"]}
                      start={{ x: 0, y: 0.2 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <IconEdit name="edit-2" size={sizeEdit} color="#fff" />
                      
                    </LinearGradient>
                  </TouchableOpacity>
              )}
              
            </View>

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
                  stylesM.widthPercentageSeven,
                  stylesL.Justify,
                  stylesM.paddingLeft,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.leftTwelve,
                    stylesM.fontSizeTwentySeven,
                    fontBold(),
                    topIos()
                  ]}
                >
                  {i18n.t('editUserExport')}
                </Text>
              </View>
              <View style={[stylesM.widthPercentageTree, stylesL.JustifyAlign]}>
                <IconArrow
                  name="arrow-down-circle"
                  size={sizeArrow}
                  color="#fff"
                />
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
                  stylesM.widthPercentageSeven,
                  stylesL.Justify,
                  stylesM.paddingLeft,
                ]}
              >
                <Text
                  style={[
                    stylesM.textColorWhite,
                    stylesM.leftTwelve,
                    stylesM.fontSizeTwentySeven,
                    fontBold(),
                    topIos()
                  ]}
                >
                  {i18n.t('textExportPrivate')}
                </Text>
              </View>
              <View style={[stylesM.widthPercentageTree, stylesL.JustifyAlign]}>
                <IconArrow
                  name="arrow-down-circle"
                  size={sizeArrow}
                  color="#fff"
                />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
  
export default EditUser;
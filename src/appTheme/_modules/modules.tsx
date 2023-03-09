import {
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
  Appearance,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const copyIos = Platform.OS === "ios" ? "23%" : "30%";
const keyIos = Platform.OS === "ios" ? "77%" : "70%";

const modalIos = Platform.OS === "ios" ? 0.31 : 0.34;
const modalIosSend = Platform.OS === "ios" ? 0.33 : 0.3;
const alturaios = Platform.OS === "ios" ? "11%" : "2%";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

export const stylesM = StyleSheet.create({
  // =====================================================================
  // UNITY VARIABLES
  // =====================================================================

  textColorWhite: {
    color: "white",
  },

  textColorGrey: {
    color: "#B9B8B8",
  },

  textColorWhiteBone: {
    color: "#E6E1E5",
  },

  textColorRebeccaPurple: {
    color: "#5B298A",
  },

  textColorGainsboro: {
    color: "rgba(255, 255, 255, 0.38)",
  },

  textColorWhiteForm: {
    color: "rgba(255, 255, 255, 0.5)",
  },

  textColorBlack: {
    color: "black",
  },

  textColorCian: {
    color: "#1ee3cf",
  },

  textColorMediumAquamarine: {
    color: "#50af95",
  },

  textColorMilitaryGreen: {
    color: "#1EE3CF",
  },

  textColorSuccessGreen: {
    color: "rgba(0, 255, 171, 1)",
  },

  textColorNegativeRed: {
    color: "rgba(182, 54, 54, 1)",
  },

  textColorPurple: {
    color: "#5a35b7",
  },

  textColorLilac: {
    color: "#D0BCFF",
  },

  textBold: {
    fontWeight: "bold",
  },

  textLight: {
    fontWeight: "normal",
  },

  fontSizeFourteen: {
    fontSize: RFValue(10),
  },

  fontSizeSixteen: {
    fontSize: RFValue(13),
  },

  fontSizeEighteen: {
    fontSize: RFValue(15),
  },

  fontSizeTwenty: {
    fontSize: RFValue(17),
  },

  fontSizeTwentyTwo: {
    fontSize: RFValue(18),
  },

  fontSizeTwentyThree: {
    fontSize: RFValue(19),
  },

  fontSizeTwentyFour: {
    fontSize: RFValue(20),
  },

  fontSizeTwentyEight: {
    fontSize: RFValue(23),
  },

  fontSizeThirty: {
    fontSize: RFValue(25),
  },

  fontSizeThirtyFive: {
    fontSize: RFValue(29),
  },

  fontSizeTwentySix: {
    fontSize: RFValue(22),
  },

  fontSizeTwentySeven: {
    fontSize: RFValue(23),
  },

  fontSizeSixty: {
    fontSize: RFValue(50),
  },

  fontSizeSeventyFive: {
    fontSize: RFValue(85),
  },

  fontLineTwenty: {
    lineHeight: 20,
  },

  fontLineThirty: {
    lineHeight: 30,
  },

  backgroundRed: {
    backgroundColor: "red",
  },

  backgroundBlack: {
    backgroundColor: "black",
  },

  backgroundPurpleIndigo: {
    backgroundColor: "rgba(91, 41, 137, 1)",
  },

  backgroundBlackOpacity: {
    backgroundColor: "rgba(29, 29, 27, 0.45)",
  },

  backgroundCian: {
    backgroundColor: "#1ee3cf",
  },

  backgroundCianSearch: {
    backgroundColor: " rgba(30, 227, 207, 0.4)",
  },

  backgroundCianDisable: {
    backgroundColor: "#0b564f",
  },

  backgroundPurpleDark: {
    backgroundColor: "#120250",
  },

  backgroundWhite: {
    backgroundColor: "white",
  },

  backgroundTurquoise: {
    backgroundColor: "#70e0f9",
  },

  backgroundCianBox: {
    backgroundColor: "#70FDEF",
  },

  backgroundDarkBlue: {
    backgroundColor: "rgba(57, 12, 161, 0.6)",
  },

  backgroundNavy: {
    backgroundColor: "#3A0CA3",
  },

  backgroundNightBlue: {
    backgroundColor: "#070422",
  },

  backgroundLilac: {
    backgroundColor: "rgba(52, 23, 118, 0.5)",
  },

  backgroundTransparent: {
    backgroundColor: "transparent",
  },

  backgroundTransparenDark: {
    backgroundColor: "#1C1B1F",
  },

  backgroundOpacity: {
    backgroundColor: "rgba(0, 0, 0, 0.70)",
  },

  backgroundOpacityBlack: {
    backgroundColor: "rgba(0, 0, 4, 0.9)",
  },

  backgroundBlackMedium: {
    backgroundColor: "rgba(29, 29, 27, 0.45)",
  },

  backgroundGreenLinear: {
    backgroundColor: "background: rgba(30, 227, 207, 0.22)",
  },

  backgroundMilitaryGreen: {
    backgroundColor: "rgba(30, 227, 207, 0.21)",
  },

  widthRectangle: {
    width: RFValue(305),
  },

  radiusFive: {
    borderRadius: 5,
  },

  radiusSix: {
    borderRadius: 6,
  },

  radiusEight: {
    borderRadius: 8,
  },

  radiusTen: {
    borderRadius: 10,
  },

  radiusThirteen: {
    borderRadius: 13,
  },

  radiusFifteen: {
    borderRadius: 15,
  },

  radiusSixteen: {
    borderRadius: 16,
  },

  radiusEighteen: {
    borderRadius: 18,
  },

  radiusTwenty: {
    borderRadius: 20,
  },

  radiusTwentyFive: {
    borderRadius: 25,
  },

  radiusTwentyNine: {
    borderRadius: 15,
  },

  radiusThirty: {
    borderRadius: 30,
  },

  marginTopFive: {
    marginTop: RFValue(4),
  },

  marginTopEight: {
    marginTop:RFValue(7),
  },

  marginTopFifteen: {
    marginTop:RFValue(12.5),
  },

  marginTopTwenty: {
    marginTop: RFValue(17),
  },

  marginTopTwentyFive: {
    marginTop: RFValue(21),
  },

  marginTopThirty: {
    marginTop: RFValue(33),
  },

  marginBottomFifteen: {
    marginBottom: RFValue(15),
  },

  topSeventeen: {
    top: 17,
  },

  topRow: {
    top: 50,
  },

  textAlignCenter: {
    textAlign: "center",
  },

  widthPercentageFiv: {
    width: "5%",
  },

  widthPercentageTwenty: {
    width: "20%",
  },

  widthPercentageTwentyTwo: {
    width: "25%",
  },

  widthPercentageTree: {
    width: copyIos,
  },

  widthPercentageForty: {
    width: "40%",
  },

  widthPercentageFive: {
    width: "50%",
  },

  widthPercentageSixty: {
    width: "60%",
  },

  widthPercentageSeven: {
    width: keyIos,
  },

  widthPercentageEighty: {
    width: "80%",
  },

  widthPercentageHundred: {
    width: "100%",
  },

  heightPercentageFifteen: {
    height: "15%",
  },

  heightPercentageTwo: {
    height: "20%",
  },

  heightPercentageSix: {
    height: "60%",
  },

  heightPercentageEight: {
    height: "80%",
  },

  heightPercentageEightyFive: {
    height: "85%",
  },

  heightPercentageHundred: {
    height: "100%",
  },

  marginPercentageEight: {
    marginHorizontal: "8%",
  },

  marginHorizontalTwelve: {
    marginHorizontal: RFValue(12),
  },

  leftTwelve: {
    marginLeft: RFValue(10),
  },

  paddingEighteen: {
    padding: RFValue(15),
  },

  paddingLeft: {
    paddingLeft: RFValue(12),
  },

  paddingLeftTitle: {
    paddingLeft: RFValue(17),
  },

  paddingTwelve: {
    paddingLeft: RFValue(18),
  },

  bottomTitle: {
    marginBottom: RFValue(33),
  },

  paddingFour: {
    padding: RFValue(3),
  },

  paddingTopTen: {
    paddingTop: RFValue(8),
  },

  paddingHorizontalFifteen: {
    paddingHorizontal: RFValue(12),
  },

  paddingHorizontalTwentyFive: {
    paddingHorizontal: RFValue(21),
  },

  paddingHorizontalEight: {
    paddingHorizontal: RFValue(7),
  },

  paddingHorizontalTwentySix: {
    paddingHorizontal: RFValue(14),
    paddingVertical: RFValue(16),
  },

  // =====================================================================
  // END UNITY VARIABLES.
  // =====================================================================

  //Lottie
  lottie: {
    width: RFValue(41.7),
    height: RFValue(41.7),
  },

  lottiexito: {
    width: 60,
    height: 60,
  },

  lottieqr: {
    width: 380,
    height: 380,
  },

  lottiesplash: {
    width: RFValue(336),
    height: RFValue(289),
  },

  lottiecopy: {
    width: 53,
    height: 53,
  },

  lottiecarga: {
    width: 220,
    height: 220,
  },

  lottiefallido: {
    width: RFValue(213.8),
    height: RFValue(213.8),
  },

  lottiesucces: {
    width: RFValue(136.9),
    height: RFValue(136.9),
  },

  lottietran: {
    width: RFValue(180),
    height: RFValue(180),
  },

  lottietranSuccesfully: {
    width: RFValue(308),
    height: RFValue(308),
  },

  lottiecondorchart: {
    //backgroundColor: "red",
    width: 50,
    height: 50,
    flex: 1,
  },

  lottiecerrars: {
    width: RFValue(230),
    height: RFValue(230),
  },

  lottieinternet: {
    width: RFValue(334),
    height: RFValue(334),
  },
  //End Lottie

  //Splash

  completo__logoGenesys: {
    height: RFValue(247),
    marginTop: RFValue(176),
    marginHorizontal: RFValue(50),
    width: RFValue(247),
  },
  completo__lettersVortex: {
    height: RFValue(15),
    bottom: 43,
    position: "absolute",
    width: RFValue(85),
  },

  completo__radiance: {
    height: RFValue(182.9),
    width: RFValue(219.5),
    position: "relative",
    bottom: 170,
    left: 65,
    opacity: 0.9,
  },

  //End Splash

  //Home
  boxImg: {
    marginTop: RFValue(63.5),
  },

  boxImg__image: {
    width: RFValue(160),
    height: RFValue(160.5),
    resizeMode: "contain",
  },

  boxImg__imageText: {
    width: RFValue(197),
    height: RFValue(35),
    resizeMode: "contain",
    marginTop: RFValue(21.5),
  },

  buttonHome: {
    marginTop: RFValue(237),
    width: RFValue(195),
    height: RFValue(40),
  },

  //End Home

  //VerifyMnemonic
  boxVerify: {
    width: RFValue(65),
    height: RFValue(21),
    marginHorizontal: RFValue(7.5),
    marginBottom: RFValue(25),
    padding: RFValue(2),
  },

  boxTitle: {
    marginTop: RFValue(41.5),
    paddingLeft: RFValue(17),
  },
  //End VerifyMnemonic

  // Slider
  introImageStyle: {
    width: RFValue(185),
    height: RFValue(184.5),
    resizeMode: "contain",
    marginTop: RFValue(64.18),
  },

  boxSliderTitle: {
    marginTop: RFValue(49.9),
    width: RFValue(210),
    height: RFValue(130),
  },

  boxSliderTxt: {
    width: RFValue(217),
    height: RFValue(80),
    marginTop: RFValue(53),
  },

  boxArrow: {
    position: "absolute",
    left: RFValue(12),
    top: RFValue(0),
    zIndex: 3,
    elevation: 3,
  },

  boxArrow_buttom: {
    width: RFValue(40),
    height: RFValue(40),
    zIndex: 3,
    elevation: 3,
  },

  boxArrow_buttom_image: {
    resizeMode: "contain",
    width: RFValue(35),
    height: RFValue(27),
  },

  dotStyle: {
    width: RFValue(24),
    height: RFValue(24),
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#1ee3cf",
    marginHorizontal: RFValue(21),
  },

  activeStyle: {
    width: RFValue(24),
    height: RFValue(24),
    borderRadius: 25,
    marginHorizontal: RFValue(21),
  },

  glow: {
    position: "absolute",
    top: RFValue(193),
    left: RFValue(0),
  },

  glowImage: {
    width: RFValue(173),
    height: RFValue(181),
  },

  //End Slider

  //Balance
  boxGradientLinear: {
    height: RFValue(173),
    padding: 1,
  },

  buttonSendReceived: {
    width: RFValue(141),
  },

  boxMedium: {
    marginBottom: RFValue(22),
  },

  boxTotal: {
    width: "100%",
    height: "100%",
  },

  boxTxt_total: {
    marginLeft: RFValue(16),
  },

  boxTotal_img: {
    width: RFValue(25),
    height: RFValue(25),
    resizeMode: "contain",
  },

  boxCoin: {
    height: RFValue(50),
    marginBottom: RFValue(17),
  },

  boxCoin_img: {
    width: RFValue(38),
    height: RFValue(38),
    resizeMode: "contain",
  },
  //End Balance

  //Receive
  boxImage: {
    marginTop: RFValue(54),
  },

  boxImage_img: {
    resizeMode: "contain",
    width: RFValue(198.5),
    height: RFValue(186),
  },

  boxBottom: {
    position: "absolute",
    bottom: RFValue(50),
  },

  boxBottomTab: {
    position: "absolute",
    bottom: RFValue(10),
  },
  //End Receive

  //Send
  copyButton: {
    width: RFValue(21.8),
    height: RFValue(21.8),
  },

  boxImgModal: {
    width: RFValue(58),
    height: RFValue(58),
    resizeMode: "contain",
  },
  //End Send

  //History
  boxHistory: {
    width: "100%",
    height: RFValue(63.5),
    marginBottom: RFValue(22),
  },

  imgHistory: {
    resizeMode: "contain",
    width: RFValue(43),
    height: RFValue(43),
    marginTop: RFValue(5.5),
  },

  indicator: {
    flex: 1,
  },

  //End History

  //WriteMnemonic
  logoSmall: {
    resizeMode: "contain",
    width: RFValue(83),
    height: RFValue(83),
  },

  //End WriteMnemonic

  //Modal
  modalWindow: {
    borderWidth: 0.5,
    borderColor: "black",
    height: windowHeight * 0.1,
    paddingLeft: RFValue(12),
    paddingRight: RFValue(12),
    top: alturaios,
    width: windowWidth * 0.95,
  },

  modalBottom: {
    paddingLeft: RFValue(12),
    paddingRight: RFValue(12),
    bottom: RFValue(50),
    position: "absolute",
    height: windowHeight * 0.06,
    width: windowWidth * 0.95,
  },

  modalCenter: {
    minHeight: RFValue(210),
    padding: RFValue(21),
    width: windowWidth * 0.75,
  },

  modalSend: {
    height: windowHeight * modalIosSend,
    padding: RFValue(20),
    width: windowWidth * 0.8,
  },

  modalWindow_notification: {
    marginLeft: RFValue(5),
  },

  //End Modal

  //EnterPassword
  circlePass: {
    width: RFValue(41),
    height: RFValue(41),
  },

  circleNumber: {
    width: RFValue(54),
    height: RFValue(54),
  },

  //End EnterPassword

  //EditUser
  bottomEdit: {
    width: RFValue(32),
    height: RFValue(32),
  },

  //End EditUser

  //CustomDrawer
  boxNetwork: {
    height: RFValue(50),
    marginBottom: RFValue(34),
    marginTop: RFValue(8),
  },

  boxTitleDrawer: {
    height: RFValue(25),
    marginBottom: RFValue(20),
  },

  boxDrawerImport: {
    height: RFValue(50),
  },

  imgLog: {
    width: RFValue(18),
    height: RFValue(18),
    resizeMode: "contain",
    marginBottom: RFValue(3),
  },

  textContinue: {
    marginRight: RFValue(15),
  },
  //End CustomDrawer

  //Security
  boxImgSecurity: {
    resizeMode: "contain",
    width: RFValue(34),
    height: RFValue(34),
  },

  //End Security

  //QrReader

  // --Style iOS--

  containeruno: {
    height: windowHeight,
    paddingTop: RFValue(35),
    paddingHorizontal: RFValue(15),
    width: windowWidth,
  },

  tituloqr: {
    position: "absolute",
    padding: RFValue(20),
    top: RFValue(60),
  },

  barcodebox: {
    borderWidth: 5,
    borderColor: "rgba(255, 255, 255, 0.45)",
    height: windowHeight * 0.5,
    width: windowWidth * 0.9,
  },

  cajavolver: {
    bottom: RFValue(60),
    position: "absolute",
  },

  btnvolver: {
    elevation: 10,
    paddingHorizontal: RFValue(50),
    paddingVertical: RFValue(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  // --end Style iOS--

  // --Modal--

  ventanafull: {
    height: windowHeight * 0.15,
    width: windowWidth * 0.95,
  },

  texticonfull: {
    top: RFValue(-140),
  },

  icontextfull: {
    top: RFValue(-150),
  },

  notificacionfull: {
    top: RFValue(-80),
  },

  copiadotxt: {
    top: RFValue(-70),
  },

  copiadotxtAndroid: {
    top: RFValue(-30),
  },

  dcVC: {
    padding: RFValue(15),
    top: RFValue(-50),
  },

  dcV: {
    width: RFValue(143),
  },

  dcC: {
    width: RFValue(143),
  },

  btnVC: {
    elevation: 10,
    marginHorizontal: RFValue(15),
    paddingVertical: RFValue(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  // --Style Android--

  cajaqra: {
    height: windowHeight,
    width: windowWidth,
  },

  dcVCa: {
    padding: RFValue(15),
  },

  // --Camara--

  btnv: {
    elevation: 10,
    paddingHorizontal: RFValue(50),
    paddingVertical: RFValue(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  // --End Camara--

  box_titleQr: {
    padding: RFValue(20),
    top: RFValue(-40),
  },

  boxScanQr: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    borderWidth: 5,
    borderColor: "rgba(255, 255, 255, 0.45)",
  },

  textKey: {
    paddingHorizontal: RFValue(12),
    top: RFValue(-50),
  },

  boxBottomQr: {
    padding: RFValue(12),
  },

  boxBottomQr_txt: {
    height: RFValue(42),
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  //End QrReader

  // Nfts
  boxNtf: {
    width: RFValue(134),
    height: RFValue(126),
    padding: RFValue(5),
    marginBottom: RFValue(30),
  },

  boxNft_img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  boxNtf_text: {
    width: RFValue(117),
    height: RFValue(109),
    position: "absolute",
    left: RFValue(8),
    top: RFValue(8),
  },

  // End Nfts

  // Events
  boxEvents_title: {
    position: "absolute",
    zIndex: 1,
    height: RFValue(21),
    paddingHorizontal: RFValue(15),
  },

  boxEvents_titleTxt: {
    marginTop: RFValue(-4),
  },

  boxSearch: {
    height: RFValue(29),
  },

  boxEvents_text: {
    position: "absolute",
    right: RFValue(6),
    bottom: RFValue(8),
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    paddingHorizontal: RFValue(4),
    paddingVertical: RFValue(2),
  },

  boxEvents_textSpace: {
    marginTop: RFValue(-3),
  },

  boxEvents_img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  boxNtf_textName: {
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  // End events

  // ReddemEvents
  labelForm: {
    marginBottom: RFValue(6),
  },

  // End ReddemEvents

  // EventsInfo
  labelEvent: {
    marginBottom: RFValue(12),
    marginTop: RFValue(1),
  },

  boxEventsInfo: {
    height: RFValue(228),
  },

  boxScrollInfo: {
    marginTop: RFValue(30),
  },

  // End EventsInfo

  //Currency

  boxTextRecent: {
    marginBottom: RFValue(12),
  },

  //End Currency

  //NftDetails
  boxImgNft: {
    height: RFValue(299),
  },

  boxProperties: {
    marginBottom: RFValue(11),
  },

  boxProperties_Details: {
    borderColor: "rgba(12, 133, 121, 1)",
    borderWidth: 3,
    padding: RFValue(7),
    marginRight: RFValue(12.5),
    marginBottom: RFValue(15),
  },

  //End NftDetails

  //Succesful
  titleSuccess:{
    marginTop: RFValue(7),
  },

  boxLottieSuccess: {
    marginTop: RFValue(43),
  },

  boxTitleAmount: {
    marginTop: RFValue(31),
  },

  boxCheck: {
    marginTop: RFValue(37),
  },

  boxCurrencyAmount: {
    marginLeft: RFValue(4.5),
  },

  //EndSuccesful
});

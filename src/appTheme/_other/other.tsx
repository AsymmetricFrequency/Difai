import {
    StyleSheet,

} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const stylesO = StyleSheet.create({
  completo__flexGrow: {
    flexGrow: 1,
    flex: 0,
  },

  buttonHome__height: {
    height: RFValue(23),
    marginTop: RFValue(29),
  },

  boxWords_rowOne_boxOne__top: {
    top: 25,
  },

  glow__down: {
    position: "absolute",
    left: RFValue(12),
    top: RFValue(380),
  },

  glow__right: {
    position: "absolute",
    right: RFValue(12),
    top: RFValue(227),
  },

  boxArrow__right: {
    position: "absolute",
    right: RFValue(12),
    top: RFValue(0),
    zIndex: 3,
    elevation: 3,
  },

  boxArrow_buttom_image__rotate: {
    resizeMode: "contain",
    width: RFValue(35),
    height: RFValue(27),
    transform: [{ rotate: "180deg" }],
  },

  boxGradientLinear__small: {
    width: RFValue(94.5),
    height: RFValue(27),
    marginTop: RFValue(12),
    marginBottom: RFValue(27),
  },

  boxGradientLinear__heightMedium: {
    height: RFValue(44),
    marginTop: RFValue(32),
  },

  boxGradientLinear__top:{
    height: RFValue(35),
    marginTop: RFValue(20),
  },

  boxTotal_img__height: {
    width: RFValue(25),
    height: RFValue(21),
    resizeMode: "contain",
  },

  boxGradientLinear__heightInfo: {
    height: RFValue(44),
    marginTop: RFValue(15),
  },

  boxGradientLinear__heightSmall: {
    height: RFValue(35),
    // marginTop: RFValue(32),
  },

  boxMedium_small: {
    marginBottom: RFValue(11),
  },

  boxGradientLinear__size: {
    width: RFValue(239),
    height: RFValue(237.5),
  },

  boxGradientLinear__sizeTxt: {
    width: RFValue(272.5),
    height: RFValue(236),
  },

  boxVerify__bottom: {
    marginBottom: RFValue(12.5),
  },

  boxBottomQr_txt__width:{
    width:RFValue(120)
  },

  boxTitle__margin: {
    marginTop: RFValue(41.5),
  },

  boxHistory__height: {
    width: "100%",
    height: RFValue(150),
    marginBottom: RFValue(22),
  },

  boxGradientLinear__Height: {
    height: 119,
    padding: 1,
  },
});

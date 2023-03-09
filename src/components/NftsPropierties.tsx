import {
    stylesB,
    stylesL,
    stylesM,
    stylesO,
    stylesS,
  } from "../appTheme/styles/styles";
  import { Text, Image, TouchableOpacity, View } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useFonts } from "expo-font";
  import { useNavigation } from '@react-navigation/native';
  

  
  const NftsPropierties = ({ propier }) => {
    
      const navigation = useNavigation();
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
      const fontMedium = () => ({ fontFamily: "LeagueSpartanMedium" });
      const fontBold = () => ({ fontFamily: "LeagueSpartanBold" });

    return (
        <View style={[stylesM.boxProperties_Details, stylesL.Justify, stylesM.radiusThirteen]}>
            <Text
              style={[
                stylesM.textColorWhiteForm,
                fontMedium(),
                stylesM.fontSizeFourteen,
                ]}
            >
                {propier.trait_type}
            </Text>
            <Text
                style={[
                stylesM.textColorWhite,
                fontBold(),
                stylesM.fontSizeSixteen,
              ]}
            >
                {propier.value}
            </Text>
          </View>
    );
  };
  
  export default NftsPropierties;
  
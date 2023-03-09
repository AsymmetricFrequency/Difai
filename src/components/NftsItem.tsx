import {
    stylesB,
    stylesL,
    stylesM,
    stylesO,
    stylesS,
  } from "../appTheme/styles/styles";
  import { Text, Image, TouchableOpacity, View } from "react-native";
  import React from "react";
  import { useFonts } from "expo-font";
  import { useNavigation } from '@react-navigation/native';
  
  
  
  const NftsItem = ({ nft }) => {
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
    
      const fontBold = () => ({ fontFamily: "LeagueSpartanBold" });
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
              stylesM.boxNtf,
              stylesM.radiusTen,
              stylesM.backgroundGreenLinear,
              stylesL.flexRow,
            ]}
            onPress={() => navigation.navigate("NftDetails",{propierties: nft.attributes, description: nft.description, image: nft.image})}
        >
        <View
            style={[
              stylesM.boxTotal,
              stylesM.radiusTen,
              stylesL.overFlowHidden,
            ]}
        >
            <Image
              source={{
                uri: nft.image,
              }}
              style={[stylesM.boxTotal]}
            />
        </View>
        
        <View style={[stylesM.boxNtf_text]}>
          <Text
              style={[
                stylesM.textColorWhite,
                stylesM.fontSizeSixteen,
                fontBold(),
                stylesM.boxNtf_textName,
              ]}
            >
              {nft.name}
            </Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  export default NftsItem;
  
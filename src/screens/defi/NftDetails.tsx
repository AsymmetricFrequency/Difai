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
  Image,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import NftsPropierties from "../../components/NftsPropierties";


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

const NftDetails = ({ navigation, route }: { navigation: any; route: any }) => {
  const [refreshing, setRefreshing] = useState(false);

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

  //params
  const propierties = route.params?.propierties;
  const description = route.params?.description;
  const image = route.params?.image;

  

  const fontBold = () => ({ fontFamily: "LeagueSpartanBold" });
  const fontMedium = () => ({ fontFamily: "LeagueSpartanMedium" });
  const fontLight = () => ({ fontFamily: "LeagueSpartanLight" });

  const getHeader = () => {
    return (
      <>
        <View style={[stylesM.widthRectangle, stylesM.boxImgNft]}>
          <Image
            style={[stylesM.boxEvents_img, stylesM.radiusTwenty]}
            source={{
              uri: image,
            }}
          />
        </View>
        <Text
          style={[
            stylesM.textColorWhiteForm,
            fontLight(),
            stylesM.fontSizeSixteen,
            stylesM.boxScrollInfo,

          ]}
        >
          {i18n.t('nftDescription')}
        </Text>
        <Text
          style={[
            stylesM.textColorWhite,
            stylesM.labelEvent,
            fontBold(),
            stylesM.fontSizeEighteen,
          ]}
        >
          {description}
        </Text>

        <Text
          style={[
            stylesM.textColorWhiteForm,
            fontLight(),
            stylesM.fontSizeSixteen,
            stylesM.boxProperties
          ]}
        >
          {i18n.t('nftProperties')}
        </Text>
      </>
    );
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
            ]}
          >
            <Text
              style={[
                stylesM.textColorCian,
                stylesM.fontSizeTwentyFour,
                fontBold(),
              ]}
            >
              {i18n.t('nftTitle')}
            </Text>
          </View>

          <View
            style={[
              stylesM.widthRectangle,
              stylesM.boxScrollInfo,
              stylesL.flexOne,
            ]}
          >
            <View style={[stylesM.heightPercentageHundred]}>
              <View
                style={[
                  stylesM.widthPercentageHundred,
                  stylesL.flexWrap,
                  stylesL.flexRow,
                ]}
              >
                <FlatList
                  contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap:"wrap"
                  }}
                  ListHeaderComponent={getHeader}
                  numColumns={2}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  data={propierties}
                  renderItem={({ item }) => {
                    return <NftsPropierties propier={item} />;
                  }}
                  keyExtractor={(item, index) => index.toString()}
                ></FlatList>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NftDetails;

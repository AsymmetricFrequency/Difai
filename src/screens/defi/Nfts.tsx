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
import { RFValue } from "react-native-responsive-fontsize";
import { getNfts } from "../../../controller";
import { LotieEmptyNft } from "../../components/Lottie";
import NftsItem from "../../components/NftsItem";
import { readPublicKey } from "../../../controller";

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

const Nfts = ({ navigation }: { navigation: any }) => {

  const [publicKey, setPublicKey] = useState('');

  async function getPublicKey() {
    const pub = await readPublicKey();
    setPublicKey(pub);
    getMyNfts(pub);
  }

  useEffect(() => {
    getPublicKey()
  },[])
  const [refreshing, setRefreshing] = React.useState(false);

  const [nfts, setNfts] = useState([]);

  const [emptyNfts, setEmptyNfts] = useState(true);

  //Pantalla carga
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 2000);
  });

  async function getMyNfts(publicKey: string) {
    const response = await getNfts(publicKey);
    const nfts = await response;
    if (nfts.length < 1) {
      setEmptyNfts(false);
    }

    setNfts(nfts);
  }

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

  console.log("====================================");
  console.log(nfts);
  console.log("====================================");

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
          <View
            style={[
              stylesO.boxTitle__margin,
              stylesM.widthRectangle,
              stylesM.bottomTitle,
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
          <View style={[stylesM.widthRectangle, stylesM.heightPercentageEight]}>
            {emptyNfts ? (
              <FlatList
                columnWrapperStyle={{
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
                numColumns={2}
                contentContainerStyle={{
                  marginTop: 50,
                  bottom: 50,
                  paddingHorizontal: 5,
                }}
                horizontal={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={nfts}
                renderItem={({ item }) => {
                  return <NftsItem nft={item} />;
                }}
                keyExtractor={(item, index) => index.toString()}
              ></FlatList>
            ) : (
              <View style={[stylesL.JustifyAlign, stylesM.boxTotal]}>
                <LotieEmptyNft />
                <Text
                  style={[
                    stylesM.textColorWhiteForm,
                    stylesM.fontSizeTwentyFour,
                    fontBold(),
                    stylesL.textAlignCenter
                  ]}
                >
                  {i18n.t('nftNotFound')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Nfts;

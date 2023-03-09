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
  Linking,
  ActivityIndicator,
  FlatList
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import HistoryCurrency from "../../components/HistoryCurrency";

import { getSplandSolHistory, readPublicKey} from "../../../controller";


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

const History = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [publicKey, setPublicKey] = useState('');

  //Pantalla carga
  const [animate, setAnimate] = useState(true);

  async function getPublicKey() {
    const pub = await readPublicKey();
    setPublicKey(pub);
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 2000);
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getHistory(publicKey, 20);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  async function getHistory(account: string, limit: number) {
    const response = await getSplandSolHistory(account, limit);
    const transactions = await response;
    setTransactions(transactions);
  }

  useEffect(() => {
    getPublicKey()
    getHistory(publicKey, 20);
  }, [publicKey]);



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
              {i18n.t('historyTitle')}
            </Text>
          </View>

          {animate ? (
            <ActivityIndicator
              animating={animate}
              style={[stylesM.indicator, stylesL.JustifyAlign]}
              color="#1ee3cf"
              size="large"
            />
          ) : (
            <View
              style={[
                stylesM.widthRectangle,
                stylesM.heightPercentageEight,
                // stylesM.paddingHorizontalTwentySix,
              ]}
            >
              <View style={[stylesO.glow__right]}>
                <Image
                  style={[stylesM.glowImage]}
                  source={require("../../../assets/img/mediumGlow.png")}
                />
              </View>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={transactions}
                renderItem={({ item }) => {
                  return <HistoryCurrency cur={item} />;
                }}
                keyExtractor={(item, index) => index.toString()}
              >
              </FlatList>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default History;

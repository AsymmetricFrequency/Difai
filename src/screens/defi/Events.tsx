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
} from "react-native";
import BarStatus from "../../components/BarStatus";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { getEvents } from "../../../controller";
import EventItem from "../../components/EventItem";
import { Searchbar } from 'react-native-paper';


import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { en, es } from "../../i18n/supportedLanguages";

const translations = { en, es };

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

//Refresh
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Events = ({ navigation }: { navigation: any }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  async function obtenerEventos() {
    const response = await getEvents();
    const eventos = await response;

    setEvents(eventos);
  }

  useEffect(() => {
    obtenerEventos();
  }, []);

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
              stylesM.bottomTitle,
              stylesL.flexRow,
              stylesL.AlignItems,
            ]}
          >
            <View style={[stylesM.widthPercentageFive]}>
              <Text
                style={[
                  stylesM.textColorCian,
                  stylesM.fontSizeTwentyFour,
                  fontBold(),
                ]}
              >
                {i18n.t('draweEvents')}
              </Text>
            </View>
            {/* <View style={[stylesM.widthPercentageFive, stylesL.alignItemsEnd]}>
              <Searchbar
                placeholder="Buscar"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={[stylesM.boxSearch, stylesM.backgroundCianSearch, fontBold()]}
                inputStyle={[stylesM.textColorWhiteForm, fontBold()]}
                iconColor={"rgba(255, 255, 255, 0.5)"}
                placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
              />
            </View> */}
          </View>

          <View style={[stylesM.widthRectangle, stylesM.heightPercentageEight]}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={events}
              renderItem={({ item }) => {
                return <EventItem event={item} />;
              }}
              keyExtractor={(item, index) => index.toString()}
            ></FlatList>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Events;

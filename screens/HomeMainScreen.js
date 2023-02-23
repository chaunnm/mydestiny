import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { TabView, SceneMap } from "react-native-tab-view";
import HomeScreen from "./HomeScreen";

const FirstRoute = () => (
  //   <View style={{ flex: 1, backgroundColor: "#FFFBFC" }} />
  <HomeScreen />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#FFFBFC" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const HomeMainScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Search Partners" },
    { key: "second", title: "Make Friends" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default HomeMainScreen;

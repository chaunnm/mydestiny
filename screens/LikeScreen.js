// import { View, Text } from 'react-native'
// import React from 'react'

// const LikeScreen = () => {
//   return (
//     <View>
//       <Text>This is LikeScreen</Text>
//     </View>
//   )
// }

// export default LikeScreen

import { FlatList, SafeAreaView, RefreshControl } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { AnimatedFAB, FAB } from "react-native-paper";
import PostCard from "../components/PostCard";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

const LikeScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const [posts, setPosts] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot({
        next: (snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
            }))
          );
        },
      });
  }, [firestore]);

  return (
    <SafeAreaView style={tailwind("flex-1 justify-center items-center")}>
      <FlatList
        data={posts}
        style={tailwind("w-full p-2")}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#FF85A2"]}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: post }) => (
          <PostCard key={post.index} post={post} />
        )}
      />
      <FAB
        icon="plus"
        style={tailwind("absolute m-3 right-0 bottom-0 bg-red-300")}
        mode="flat"
        onPress={() => navigation.navigate("Post")}
      />
    </SafeAreaView>
  );
};

export default LikeScreen;

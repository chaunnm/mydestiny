import { View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LogoHeader = () => {
 const navigation = useNavigation();
 return (
   <View
     style={{
       flex: 1,
       height: 37,
       flexDirection: "row",
       justifyContent: "space-between",
     }}
   >
     <TouchableOpacity
       style={{ overflow: "visible" }}
       onPress={() => navigation.navigate("Home")}
     >
       <Image
         style={{ width: 214, height: 37 }}
         source={{
           uri: "https://drive.google.com/uc?export=view&id=10ckuZCn5Mt9t8VFRAlrKpT2eDH--GFkP",
         }}
       />
     </TouchableOpacity>
     <MaterialCommunityIcons
       style={{ marginEnd: 30 }}
       name="bell"
       size={28}
       color="#3d3b73"
     />
   </View>
 );
}

export default LogoHeader;
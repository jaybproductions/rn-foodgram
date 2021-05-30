import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";

function TabIcon(iconName) {
  return (
    <Text style={styles.icon}>
      <Ionicons name={iconName} size={20} />
    </Text>
  );
}

function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    console.warn("liked", recipe.name);
    setLiked(!liked);
  };
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          Actions.Recipe({ recipe: recipe });
          Actions.push("");
        }}
      >
        <ImageBackground
          style={{ width: 300, height: 300 }}
          imageStyle={{ borderRadius: 30 }}
          source={{ uri: recipe.photo }}
        >
          <View style={styles.container}>
            <Text>{recipe.name}</Text>
            <Text>{recipe.postedBy}</Text>
            <TouchableHighlight
              onPress={handleLike}
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
            >
              <Text style={liked ? { color: "red" } : ""}>
                {TabIcon("heart-outline")}
              </Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20%",
    backgroundColor: "white",
    position: "absolute",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    bottom: 0,
    padding: 20,
  },
});

export default RecipeCard;

import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function TabIcon(iconName) {
  return (
    <Text style={styles.icon}>
      <Ionicons name={iconName} size={30} />
    </Text>
  );
}

function Recipe({ recipe }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleLike = () => {
    console.warn("liked", recipe.name);
    setLiked(!liked);
  };

  const handleSave = () => {
    console.warn("saved", recipe.name);
    setSaved(!saved);
  };
  return (
    <View>
      <ImageBackground
        style={{ width: "100%", height: 300 }}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        source={{ uri: recipe.photo }}
      >
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{recipe.name}</Text>
            <TouchableHighlight
              onPress={handleLike}
              activeOpacity={0.6}
              underlayColor={false}
            >
              <Text
                style={
                  liked
                    ? { color: "red", padding: 10 }
                    : { color: "white", padding: 10 }
                }
              >
                {TabIcon("heart-outline")}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={handleSave}
              activeOpacity={0.6}
              underlayColor={false}
            >
              <Text
                style={
                  saved
                    ? { color: "blue", padding: 10 }
                    : { color: "white", padding: 10 }
                }
              >
                {TabIcon("bookmark-outline")}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bodyContainer}>
        <Text>Posted by</Text>
        <View style={styles.profileInfo}>
          <TouchableHighlight
            onPress={handleSave}
            activeOpacity={0.6}
            underlayColor={false}
          >
            <Text
              style={
                saved
                  ? { color: "blue", padding: 10 }
                  : { color: "black", padding: 10 }
              }
            >
              {TabIcon("person-circle-outline")}
            </Text>
          </TouchableHighlight>
          <Text>{recipe.postedBy}</Text>
        </View>
        <View style={styles.description}>
          <View>
            <Text>{recipe.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontSize: 30,
    textAlign: "left",
  },
  description: {},

  headerContainer: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 50,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bodyContainer: {
    padding: 10,
  },
  profileInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Recipe;

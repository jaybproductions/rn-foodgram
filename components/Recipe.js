import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../contexts/UserContext";
import firebase from "../firebase";
import { Actions } from "react-native-router-flux";

function TabIcon(iconName) {
  return (
    <Text style={styles.icon}>
      <Ionicons name={iconName} size={30} />
    </Text>
  );
}

function Recipe({ recipe, liked, setLiked }) {
  const [saved, setSaved] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    handleCheckLikes();
  }, [liked, recipe]);

  const handleLike = () => {
    Actions.refresh({ recipe: recipe, liked: !liked, setLiked: setLiked });
    console.warn(recipe.id);
    const docRef = firebase.db.collection("recipes").doc(recipe.id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let tempLikes = [...doc.data().likedBy];
          if (tempLikes.includes(user.uid)) {
            setLiked(false);
            const filtered = tempLikes.filter(
              (item) => item !== user.uid && item === recipe.id
            );
            firebase.db.collection("recipes").doc(recipe.id).update(
              {
                likedBy: filtered,
              },
              { merge: true }
            );
            return;
          }
          setLiked(true);
          tempLikes.push(user.uid);
          firebase.db.collection("recipes").doc(recipe.id).update(
            {
              likedBy: tempLikes,
            },
            { merge: true }
          );
          return;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const handleSave = () => {
    console.warn("saved", recipe.name);
    setSaved(!saved);
  };

  const handleCheckLikes = () => {
    recipe.likedBy.forEach((like) => {
      if (like === user.uid) {
        return setLiked(true);
      } else {
        return setLiked(false);
      }
    });
  };
  return (
    <View>
      <ImageBackground
        style={{ width: "100%", height: 300 }}
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        source={{ uri: recipe.photo }}
      >
        <View style={styles.overlay}>
          <View style={styles.iconContainer}>
            <Text
              style={{
                color: "white",
              }}
            >
              {TabIcon("chevron-down-outline")}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
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
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{recipe.name}</Text>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={styles.bodyContainer}>
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
        <SafeAreaView style={styles.recipeContainer}>
          <Text style={{ paddingTop: 20 }}>Recipe</Text>
          <FlatList
            data={recipe.recipe}
            scrollEnabled={false}
            keyExtractor={(recipe) => recipe.id}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontSize: 30,
    textAlign: "left",
    fontWeight: "900",
    position: "absolute",
    bottom: 0,
    left: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
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
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
  },
  bodyContainer: {
    padding: 20,
  },
  profileInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    padding: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeContainer: {
    width: "80%",
    margin: "auto",
    padding: 20,
    lineHeight: 10,
  },
  item: {
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 16,
  },
});

export default Recipe;

import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  ImageBackground,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import UserContext from "../contexts/UserContext";
import firebase from "../firebase";
import { handleCheckLikes } from "../utils/helpers";
function TabIcon(iconName) {
  return (
    <Text style={styles.icon}>
      <Ionicons name={iconName} size={20} />
    </Text>
  );
}

function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    handleCheckLikes();
  }, []);
  const handleLike = () => {
    const docRef = firebase.db.collection("recipes").doc(recipe.id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let tempLikes = [...doc.data().likedBy];
          if (tempLikes.includes(user.uid)) {
            setLiked(false);
            const filtered = tempLikes.filter((item) => item !== user.uid);
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
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          Actions.Recipe({ recipe: recipe, liked: liked, setLiked: setLiked });
        }}
      >
        <ImageBackground
          style={{ width: 350, height: 350 }}
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

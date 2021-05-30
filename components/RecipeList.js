import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../firebase";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      let tempDoc = [];
      firebase.db
        .collection("recipes")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            tempDoc.push(doc.data());
          });
          setRecipes(tempDoc);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

      //setRecipes(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {recipes &&
          recipes.map((recipe, index) => (
            <View style={{ padding: 10 }} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default RecipeList;

import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        "https://759703459529.ngrok.io/recipes/all"
      );
      setRecipes(response.data);
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

import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "../firebase";
import { getRecipes } from "../utils/helpers";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getRecipes();
      setRecipes(data);
    }

    fetchData();
  }, []);

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

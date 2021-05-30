import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import RecipeList from "../components/RecipeList";

function Home() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <RecipeList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;

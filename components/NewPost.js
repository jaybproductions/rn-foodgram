import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Button,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

function NewPost() {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [recipe, onChangeRecipe] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Add a Post</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={onChangeName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={email}
          onChangeText={onChangeEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Recipe"
          value={recipe}
          onChangeText={onChangeRecipe}
        />
        <Button title="Upload Photo" onPress={pickImage} />
        {photo && (
          <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  input: {
    borderColor: "black",
    width: "75%",
    padding: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default NewPost;

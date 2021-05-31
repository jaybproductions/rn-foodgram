import React from "react";
import { View } from "react-native";
import { ImageBrowser } from "expo-image-picker-multiple";

function ImageUpload() {
  return (
    <View>
      <ImageBrowser
        max={4}
        onChange={(num, onSubmit) => {}}
        callback={(callback) => {}}
      />
    </View>
  );
}

export default ImageUpload;

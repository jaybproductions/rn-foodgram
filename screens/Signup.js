import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { Actions } from "react-native-router-flux";
import firebase from "../firebase";

function Signup() {
  const [email, onChangeEmail] = useState("");
  const [name, onChangeName] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");
  const handleSignup = async () => {
    await firebase.register(name, email, password);
    //Working
    Actions.pop();
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="name"
        style={styles.input}
        value={name}
        onChangeText={onChangeName}
      />
      <TextInput
        placeholder="email"
        style={styles.input}
        value={email}
        onChangeText={onChangeEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={onChangePassword}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={onChangeConfirmPassword}
      />
      <Text>Forgot Password?</Text>
      <TouchableOpacity
        style={styles.loginScreenButton}
        onPress={handleSignup}
        underlayColor="#fff"
      >
        <Text style={styles.loginText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
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
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1E6738",
    width: "75%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Signup;

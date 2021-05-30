import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import firebase from "../../firebase";
import { Actions } from "react-native-router-flux";

function Login() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  const handleCreateAccount = () => {
    Actions.push("Signup");
  };

  const handleLogin = async () => {
    try {
      await firebase.login(email, password);
      Actions.push("Profile");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput
        placeholder="email"
        style={styles.input}
        value={email}
        onChangeText={onChangeEmail}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        value={password}
        onChangeText={onChangePassword}
      />
      <Text>Forgot Password?</Text>
      <TouchableOpacity
        style={styles.loginScreenButton}
        onPress={handleLogin}
        underlayColor="#fff"
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <Button title="Create Account" onPress={handleCreateAccount} />
    </ScrollView>
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

export default Login;

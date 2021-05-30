import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Actions } from "react-native-router-flux";
import Login from "../components/Auth/Login";
import UserContext from "../contexts/UserContext";
import firebase from "../firebase";

function Profile() {
  const { user } = useContext(UserContext);

  const handleLogOut = async () => {
    await firebase.logout();
    //!not working
    Actions.push("Profile");
  };

  if (!user) {
    return <Login />;
  }

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text>Hello, {user.displayName}</Text>
          <View>
            <Text>10</Text>
            <Text>Posts</Text>
          </View>

          <View>
            <Text>230</Text>
            <Text>Following</Text>
          </View>
          <View>
            <Text>1,000</Text>
            <Text>Followers</Text>
          </View>
        </View>
        <Text style={styles.bioText}>Bio</Text>
      </View>

      <View style={styles.container}>
        <Text>Hello, {user.displayName}</Text>
        <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={handleLogOut}
          underlayColor="#fff"
        >
          <Text style={styles.loginText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: "20%",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  bioText: {
    padding: 10,
    fontSize: 16,
  },
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

export default Profile;

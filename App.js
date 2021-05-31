import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { Actions, Router, Scene, Stack } from "react-native-router-flux";
import Home from "./screens/Home";
import Search from "./screens/Search";
import useAuth from "./hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "./contexts/UserContext";
import Profile from "./screens/Profile";
import Signup from "./screens/Signup";
import NewPost from "./components/NewPost";
import Recipe from "./components/Recipe";
import ImageUpload from "./screens/ImageUpload";

function TabIcon(iconName) {
  return (
    <Text style={styles.icon}>
      <Ionicons name={iconName} size={20} />
    </Text>
  );
}

export default function App() {
  const [user, setUser] = useAuth();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Stack key="root">
          <Scene key="modal" modal hideNavBar={true}>
            <Scene
              key="Tabbar"
              tabs={true}
              tabBarStyle={styles.tabBar}
              default="Main"
              hideNavBar={true}
              showLabel={false}
            >
              <Scene
                key="Home"
                component={Home}
                title="Foodie"
                hideBackImage
                icon={() => TabIcon("fast-food-outline")}
                rightButton={
                  <View style={{ paddingRight: 20 }}>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="#DDDDDD"
                      onPress={() => {
                        Actions.push("NewPost");
                      }}
                    >
                      <View>{TabIcon("add-outline")}</View>
                    </TouchableHighlight>
                  </View>
                }
              />
              <Scene
                key="Search"
                component={Search}
                title="Search"
                icon={() => TabIcon("search-outline")}
              />
              <Scene
                key="Profile"
                component={Profile}
                title="Profile"
                icon={() => TabIcon("person-circle-outline")}
              />
            </Scene>
            <Scene key="Signup" component={Signup} modal hideNavBar={true} />
            <Scene key="NewPost" component={NewPost} modal hideNavBar={true} />
            <Scene key="Recipe" component={Recipe} modal hideNavBar={true} />
            <Scene
              key="ImageUpload"
              component={ImageUpload}
              modal
              hideNavBar={true}
            />
          </Scene>
        </Stack>
      </Router>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    height: 50,
    borderTopColor: "darkgrey",
    borderTopWidth: 1,
    opacity: 0.98,
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 25,
  },
});

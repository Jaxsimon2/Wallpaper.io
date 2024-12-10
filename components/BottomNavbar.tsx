import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import AIWallpaper from "./AIWallpaper";

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text>Home Page</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Profile Page</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text>Settings Page</Text>
  </View>
);

const AIWallpaperScreen = () => (
  <View style={styles.screen}>
    <AIWallpaper></AIWallpaper>
  </View>
);

const Tab = createBottomTabNavigator();

const BottomNavbar = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "Home";

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "AI Wallpaper") {
              iconName = focused ? "image" : "image-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="AI Wallpaper" component={AIWallpaperScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomNavbar;

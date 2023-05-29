import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image alt="logo" source={require("../assets/MG_small_logo.png")} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "midnightblue",
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    paddingTop: 10,
  },
  img: {
    width: 50,
    height: 50,
  },
});

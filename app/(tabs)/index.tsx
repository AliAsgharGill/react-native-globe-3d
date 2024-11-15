import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Globe from "../../components/Globe";
export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Globe />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

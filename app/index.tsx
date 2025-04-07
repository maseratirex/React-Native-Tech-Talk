import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [useDifferentImages, setUseDifferentImages] = useState(true);
  const [listLength, setListLength] = useState(50);

  const toggleImages = () => {
    setUseDifferentImages((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/without-optimization",
            params: { useDifferentImages, listLength },
          })
        }
      >
        <Text style={styles.text}>Without Optimization</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/with-optimization",
            params: { useDifferentImages, listLength },
          })
        }
      >
        <Text style={styles.text}>With Optimization</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleImages}>
        <Text style={styles.toggleText}>
          Use Different Images: {useDifferentImages ? "On" : "Off"}
        </Text>
      </TouchableOpacity>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>List Length: {listLength}</Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={100}
          step={5}
          value={listLength}
          onValueChange={(value) => setListLength(value)}
          minimumTrackTintColor="#007bff"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#007bff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#007bff",
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  toggleButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#28a745",
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  toggleText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  sliderContainer: {
    marginTop: 16,
    width: "80%",
    alignItems: "center",
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
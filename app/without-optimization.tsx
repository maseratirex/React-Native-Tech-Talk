import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";


// Explicitly import images
const images = [
  require("../assets/images/image1.jpg"),
  require("../assets/images/image2.jpg"),
  require("../assets/images/image3.jpg"),
  require("../assets/images/image4.jpg"),
  require("../assets/images/image5.jpg"),
  require("../assets/images/image6.jpg"),
  require("../assets/images/image7.jpg"),
  require("../assets/images/image8.jpg"),
  require("../assets/images/image9.jpg"),
  require("../assets/images/image10.jpg"),
  require("../assets/images/image11.jpg"),
  require("../assets/images/image12.jpg"),
  require("../assets/images/image13.jpg"),
  require("../assets/images/image14.jpg"),
  require("../assets/images/image15.jpg"),
  require("../assets/images/image16.jpg"),
  require("../assets/images/image17.jpg"),
  require("../assets/images/image18.jpg"),
  require("../assets/images/image19.jpg"),
  require("../assets/images/image20.jpg"),
  require("../assets/images/image21.jpg"),
  require("../assets/images/image22.jpg"),
];

export default function WithoutOptimization() {
  const { useDifferentImages, listLength } = useLocalSearchParams<{
    useDifferentImages: string;
    listLength: string;
  }>();
  const useSameImage = useDifferentImages === "false" || useDifferentImages === undefined;
  const length = parseInt(listLength || "50", 10);

  const [data, setData] = useState(
    Array.from({ length }, (_, i) => ({
      id: i,
      value: 0,
      image: useSameImage ? images[0] : images[i % images.length],
      isAdded: false,
    }))
  );

  const [renderStatus, setRenderStatus] = useState(
    Array.from({ length: 100 }, () => "Not Rendering")
  );

  const [loadTimes, setLoadTimes] = useState(
    Array.from({ length: 100 }, () => 0)
  );

  const addImage = () => {
    const newId = data.length;
    setData([
      {
        id: newId,
        value: 0,
        image: useSameImage ? images[0] : images[newId % images.length],
        isAdded: true,
      },
      ...data,
    ]);
    setRenderStatus((prev) => ["Not Rendering", ...prev]);
    setLoadTimes((prev) => [0, ...prev]);
  };

  const handleImageLoadStart = (index: number) => {
    setRenderStatus((prev) => {
      const updated = [...prev];
      updated[index] = "Rendering";
      return updated;
    });
    setLoadTimes((prev) => {
      const updated = [...prev];
      updated[index] = Date.now();
      return updated;
    });
  };

  const handleImageLoadEnd = (index: number) => {
    setRenderStatus((prev) => {
      const updated = [...prev];
      updated[index] = "Rendered";
      return updated;
    });
    setLoadTimes((prev) => {
      const updated = [...prev];
      updated[index] = (Date.now() - updated[index]) / 1000; // Convert to seconds
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={addImage}>
        <Text style={styles.addButtonText}>Add Image</Text>
      </TouchableOpacity>
      <ScrollView style={styles.list}>
        {data.map((item, index) => (
          <View key={item.id} style={styles.item}>
            <Image
              source={item.image}
              style={styles.image}
              onLoadStart={() => handleImageLoadStart(index)}
              onLoadEnd={() => handleImageLoadEnd(index)}
            />
            <Text style={styles.text}>
              {item.isAdded ? "Added Image: " : "Image: "}
              {renderStatus[index]}
              {renderStatus[index] === "Rendered" && ` in ${loadTimes[index].toFixed(2)}s`}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    padding: 16,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
});

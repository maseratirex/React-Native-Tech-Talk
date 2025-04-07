import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
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

export default function WithOptimization() {
  const { useDifferentImages, listLength } = useLocalSearchParams<{
    useDifferentImages: string;
    listLength: string;
  }>();
  const useSameImage = useDifferentImages === "false" || useDifferentImages === undefined;
  const length = parseInt(listLength || "50", 10);

  const [data, setData] = useState(
    new Map(
      Array.from({ length }, (_, i) => [
        i,
        {
          id: i,
          value: 0,
          image: useSameImage ? images[0] : images[i % images.length],
          isAdded: false,
        },
      ])
    )
  );

  const [renderStatus, setRenderStatus] = useState(
    new Map(Array.from({ length: 100 }, (_, i) => [i, "Not Rendering"]))
  );

  const [loadTimes, setLoadTimes] = useState(
    new Map(Array.from({ length: 100 }, (_, i) => [i, 0]))
  );

  const addImage = () => {
    const newId = data.size;
    const newData = new Map([
      [
        newId,
        {
          id: newId,
          value: 0,
          image: useSameImage ? images[0] : images[newId % images.length],
          isAdded: true,
        },
      ],
    ]);
    data.forEach((value, key) => newData.set(key, value));
    setData(newData);
    setRenderStatus((prev) => {
      const updated = new Map(prev);
      updated.set(newId, "Not Rendering");
      return updated;
    });
    setLoadTimes((prev) => {
      const updated = new Map(prev);
      updated.set(newId, 0);
      return updated;
    });
  };

  const handleImageLoadStart = (id: number) => {
    setRenderStatus((prev) => {
      const updated = new Map(prev);
      updated.set(id, "Rendering");
      return updated;
    });
    setLoadTimes((prev) => {
      const updated = new Map(prev);
      updated.set(id, Date.now());
      return updated;
    });
  };

  const handleImageLoadEnd = (id: number) => {
    setRenderStatus((prev) => {
      const updated = new Map(prev);
      updated.set(id, "Rendered");
      return updated;
    });
    setLoadTimes((prev) => {
      const updated = new Map(prev);
      updated.set(id, (Date.now() - updated.get(id)) / 1000); // Convert to seconds
      return updated;
    });
  };

  const renderItem = ({ item }: { item: { id: number; value: number; image: any; isAdded: boolean } }) => {
    return (
      <View style={styles.item}>
        <Image
          source={item.image}
          style={styles.image}
          onLoadStart={() => handleImageLoadStart(item.id)}
          onLoadEnd={() => handleImageLoadEnd(item.id)}
        />
        <Text style={styles.text}>
          {item.isAdded ? "Added Image: " : "Image: "}
          {renderStatus.get(item.id)}
          {renderStatus.get(item.id) === "Rendered" && ` in ${loadTimes.get(item.id)?.toFixed(2)}s`}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={addImage}>
        <Text style={styles.addButtonText}>Add Image</Text>
      </TouchableOpacity>
      <FlatList
        data={Array.from(data.values())}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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

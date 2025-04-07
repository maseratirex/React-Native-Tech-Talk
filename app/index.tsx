import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Index() {
  const [data, setData] = useState(
    Array.from({ length: 20 }, (_, i) => ({ id: i, value: 0 }))
  );

  const handlePress = (id: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, value: item.value + 1 } : item
      )
    );
  };

  const renderItem = ({ item }: { item: { id: number; value: number } }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress(item.id)}
      >
        <Text style={styles.text}>Item {item.id}: {item.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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
  item: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});
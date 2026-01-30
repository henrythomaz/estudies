import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();

  console.log(params);
  
  useEffect(() => {}, [])

  async function fetchPokemonByName(name: string) {
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <ScrollView contentContainerStyle={{
      gap: 16,
      padding: 16,
    }}>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  }
});


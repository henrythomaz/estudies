import { Image } from "expo-image";
import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<any>(null);

  async function fetchPokemonByName(name: string) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (params.name && typeof params.name === "string") {
      fetchPokemonByName(params.name.toLowerCase());
    }
  }, [params.name]);

  return (
    <>
      <Stack.Screen options={{ title: String(params.name) }} />

      <ScrollView
        style={{ backgroundColor: "#fff" }}
        contentContainerStyle={{
          gap: 16,
          padding: 16,
          flexGrow: 1,
        }}
      >
        {pokemon && (
          <>
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />

            <Text style={styles.name}>{pokemon.name}</Text>

            <Text style={styles.type}>
              {pokemon.types.map((t: any) => t.type.name).join(", ")}
            </Text>
          </>
        )}
      </ScrollView>
    </>
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
  },
});
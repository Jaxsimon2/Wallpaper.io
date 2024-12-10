import React, { useState } from "react";
import { View, TextInput, Button, Image, StyleSheet, Text } from "react-native";

const AIWallpaper = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);
    setImageUrl(null);

    try {
      const response = await fetch("http://10.0.2.2:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        alert("Failed to generate image.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating the image.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Wallpaper Generator</Text>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a prompt..."
          value={prompt}
          onChangeText={setPrompt}
        />
        <Button
          title={loading ? "Generating..." : "Generate Image"}
          onPress={handleGenerate}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    position: "absolute",
    bottom: 20,
    left: "5%",
    right: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 25,
    fontSize: 16,
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default AIWallpaper;

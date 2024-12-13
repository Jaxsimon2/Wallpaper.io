import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from './theme';

const AIWallpaperScreen: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
   const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);
    setImageUrl(null);

    //for Using a website http://localhost:5000/generate-image
    //for Using a android emulator http://10.0.2.2:5000/generate-image
    //Why? 5000 becuase my port is listening to 5 thousand
    try {
      const response = await fetch("http://localhost:5000/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl); // 
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
    <LinearGradient colors={['#1A1A1A', '#0A0A0A']} style={styles.container}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <Text style={styles.title}>AI Wallpaper Generator</Text>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.accent2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inputGradientBorder}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Describe your dream wallpaper..."
              placeholderTextColor={theme.colors.textSecondary}
              value={prompt}
              onChangeText={setPrompt}
              multiline
            />
            <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
              <Icon name="zap" size={24} color={theme.colors.background} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {isLoading ? (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={theme.colors.primary} />
    <Text style={styles.loadingText}>Creating your masterpiece...</Text>
  </View>
) : generatedImage ? (
  <View style={styles.imageContainer}>
    <Image source={{ uri: generatedImage }} style={styles.generatedImage} />
    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="download" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="share" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  </View>
) : (
  <View style={styles.placeholderContainer}>
    <Icon name="image" size={80} color={theme.colors.textSecondary} />
    <Text style={styles.placeholderText}>
      Your AI-generated wallpaper will appear here
    </Text>
  </View>
)}
      </BlurView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    padding: theme.screenPadding.m,
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.l,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.s,
  },
  input: {
    flex: 1,
    height: 100,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  generateButton: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.m,
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.m,
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  generatedImage: {
    width: '100%',
    height: '80%',
    borderRadius: theme.borderRadius.m,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.m,
  },
  actionButton: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.surface,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.spacing.s,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: theme.spacing.m,
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  inputGradientBorder: {
    padding: 2,
    borderRadius: theme.borderRadius.m,
  },
});

export default AIWallpaperScreen;


import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from './theme';
import Icon from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';

interface Wallpaper {
  id: string;
  image: string;
  title: string;
}

const wallpapers: Wallpaper[] = [
  { id: '1', image: 'https://images.pexels.com/photos/1089194/pexels-photo-1089194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Lights' },
  { id: '2', image: 'https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Long Drive' },
  { id: '3', image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Neon City' },
  { id: '4', image: 'https://images.pexels.com/photos/4317157/pexels-photo-4317157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Peace' },
];

const categories = ['Featured', 'Popular', 'New', 'Abstract', 'Nature', 'Urban'];

const HomeScreen: React.FC = () => {
  const renderWallpaperItem = ({ item }: { item: Wallpaper }) => (
    <TouchableOpacity style={styles.wallpaperItem}>
      <Image source={{ uri: item.image }} style={styles.wallpaperImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.wallpaperGradient}
      >
        <Text style={styles.wallpaperTitle}>{item.title}</Text>
        <TouchableOpacity onPress={likePicture}>
          <Icon name={heartName} size={24} color={"red"} />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );

  const [heartName, setHeartName] = useState("hearto");
  const likePicture = () => {
    if (heartName == "hearto") setHeartName("heart");
    else setHeartName("hearto");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>BackDrop</Text>
      </View>
      <Text style={styles.welcomeText}>Discover Stunning Wallpapers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
      {categories.map((category, index) => (
        <View key={index} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <FlatList
            data={wallpapers}
            renderItem={renderWallpaperItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.m,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  logoText: {
    fontFamily: theme.fonts.logo,
    fontSize: 32,
    color: theme.colors.primary,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginVertical: theme.spacing.l,
    paddingHorizontal: theme.screenPadding.m,
  },
  categoriesContainer: {
    paddingHorizontal: theme.screenPadding.m,
    marginBottom: theme.spacing.m,
  },
  categoryButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.screenPadding.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    marginRight: theme.spacing.s,
  },
  categoryText: {
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
    fontSize: 14,
  },
  categorySection: {
    marginBottom: theme.spacing.l,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.screenPadding.m,
  },
  wallpaperItem: {
    width: theme.dimensions.width * 0.4,
    height: theme.dimensions.width * 0.6,
    marginRight: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
  },
  wallpaperImage: {
    width: '100%',
    height: '100%',
  },
  wallpaperGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: theme.screenPadding.m,
  },
  wallpaperTitle: {
    color: theme.colors.text,
    fontFamily: theme.fonts.medium,
    fontSize: 16,
  },
});

export default HomeScreen;


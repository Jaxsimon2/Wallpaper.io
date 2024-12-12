import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from './theme';

interface Wallpaper {
  id: string;
  image: string;
  title: string;
}

const wallpapers: Wallpaper[] = [
  { id: '1', image: 'https://images.pexels.com/photos/1089194/pexels-photo-1089194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Golden Sunset' },
  { id: '2', image: 'https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Cosmic Swirl' },
  { id: '3', image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Neon City' },
  { id: '4', image: 'https://images.pexels.com/photos/4317157/pexels-photo-4317157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Abstract Fusion' },
];

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWallpapers, setFilteredWallpapers] = useState(wallpapers);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = wallpapers.filter(
      (wallpaper) =>
        wallpaper.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredWallpapers(filtered);
  };

  return (
    <LinearGradient colors={['#1A1A1A', '#0A0A0A']} style={styles.container}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search wallpapers..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <FlatList
          data={filteredWallpapers}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.wallpaperItem}>
              <Image source={{ uri: item.image }} style={styles.wallpaperImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.wallpaperGradient}
              >
                <Text style={styles.wallpaperTitle}>{item.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.wallpaperList}
        />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  searchIcon: {
    marginRight: theme.spacing.s,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
  },
  wallpaperList: {
    justifyContent: 'space-between',
  },
  wallpaperItem: {
    width: '48%',
    aspectRatio: 0.75,
    marginBottom: theme.spacing.m,
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
    fontSize: 14,
  },
});

export default SearchScreen;


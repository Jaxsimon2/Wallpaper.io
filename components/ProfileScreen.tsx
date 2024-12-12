import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from './theme';

interface Wallpaper {
  id: string;
  image: string;
}

const userWallpapers: Wallpaper[] = [
  { id: '1', image: 'https://images.pexels.com/photos/1089194/pexels-photo-1089194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '2', image: 'https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '3', image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: '4', image: 'https://images.pexels.com/photos/4317157/pexels-photo-4317157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];

const ProfileScreen: React.FC = () => {
  return (
    <LinearGradient colors={['#1A1A1A', '#0A0A0A']} style={styles.container}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://img.freepik.com/free-photo/portrait-woman-with-universe-projection-texture_23-2149581259.jpg?t=st=1733990655~exp=1733994255~hmac=84f1550b80b1cb56a8f97383b5d66f59aa4ecbc2475713d8e18c4a3363c23e8a&w=360' }}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>Cosmic Creator</Text>
        </View>
        <Text style={styles.sectionTitle}>My Creations</Text>
        <FlatList
          data={userWallpapers}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.wallpaperItem}>
              <Image source={{ uri: item.image }} style={styles.wallpaperImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.wallpaperGradient}
              >
                <Icon name="heart" size={24} color={theme.colors.primary} />
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
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: theme.spacing.m,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  name: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  wallpaperList: {
    justifyContent: 'space-between',
  },
  wallpaperItem: {
    width: '48%',
    aspectRatio: 1,
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
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;


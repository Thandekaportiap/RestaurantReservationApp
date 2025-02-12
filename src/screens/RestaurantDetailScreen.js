import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const Colors = {
  primary: '#2D5A56',     // Dark green
  secondary: '#A1AFA8',   // Light green
  background: '#F5F5DC',  // Beige
  text: '#2D5A56',        // Dark green
  white: '#FFFFFF',
};

const RestaurantBooking = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/48' }}
            style={styles.logo}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Hubert Restaurant</Text>
          <Text style={styles.subtitle}>Tomorrow, 19:00 - 21:00</Text>
        </View>
      </View>

      {/* Main Image Card */}
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: '../../assets/restaurant.webp' }}
            style={styles.mainImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(45, 90, 86, 0.2)']} // Using primary color with opacity
            style={StyleSheet.absoluteFill}
          />
          
          {/* Pendant Lamps */}
          <View style={styles.lampsContainer}>
            <BlurView intensity={90} style={styles.lamp}>
              <View style={styles.lampInner} />
            </BlurView>
            <BlurView intensity={90} style={styles.lamp}>
              <View style={styles.lampInner} />
            </BlurView>
          </View>
          
          {/* Furniture */}
          <View style={styles.furnitureContainer}>
            <View style={styles.couch} />
          </View>
        </View>
      </View>

      {/* Booking Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.buttonText}>Book Table 8</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  lampsContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lamp: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
  },
  lampInner: {
    flex: 1,
    backgroundColor: `${Colors.secondary}99`, // Adding transparency
  },
  furnitureContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  couch: {
    width: 128,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 9999,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RestaurantBooking;
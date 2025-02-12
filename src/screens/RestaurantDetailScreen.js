import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Table1 from '../../assets/table1.jpg';
import Table2 from '../../assets/table2.webp';
import Table3 from '../../assets/table3.webp';
import Table4 from '../../assets/table4.jpeg';
import RestaurantLogo from '../../assets/restaurant.webp';

const Colors = {
  primary: '#2D5A56',
  secondary: '#A1AFA8',
  background: '#F5F5DC',
  text: '#2D5A56',
  white: '#FFFFFF',
};

const { width } = Dimensions.get('window');

const RestaurantBooking = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const images = [
    { id: 1, image: Table1, label: 'Table 1' },
    { id: 2, image: Table2, label: 'Table 2' },
    { id: 3, image: Table3, label: 'Table 3' },
    { id: 4, image: Table4, label: 'Table 4' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <LinearGradient colors={['transparent', 'rgba(45, 90, 86, 0.2)']} style={StyleSheet.absoluteFill} />

      <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{item.label}</Text>
    </View>
    </View>
  );

  const onScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={RestaurantLogo} style={styles.logo} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Hubert Restaurant</Text>
          <Text style={styles.subtitle}>Tomorrow, 19:00 - 21:00</Text>
        </View>
      </View>

      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <View key={index} style={[styles.dot, { backgroundColor: index === activeIndex ? Colors.primary : Colors.secondary }]} />
          ))}
        </View>
      </View>

      {/* Booking Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.buttonText}>Book Table </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  logoContainer: { width: 48, height: 48, borderRadius: 8, overflow: 'hidden' },
  logo: { width: '100%', height: '100%', resizeMode: 'cover' },
  headerText: { flex: 1 },
  title: { fontSize: 20, fontWeight: '600', color: Colors.text },
  subtitle: { fontSize: 14, color: Colors.secondary },
  carouselContainer: { height: 300, marginBottom: 16, borderRadius: 12, overflow: 'hidden', backgroundColor: Colors.white, elevation: 3 },
  carouselItem: { width: width - 32, height: 300 },
  carouselImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  labelContainer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    paddingVertical: 6,
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  labelText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  dotContainer: { flexDirection: 'row', position: 'absolute', bottom: 16, alignSelf: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  bookButton: { backgroundColor: Colors.primary, borderRadius: 9999, padding: 12, alignItems: 'center' },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '500' },
});

export default RestaurantBooking;
 
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import RestaurantCard from '../components/RestaurantCard';
import { Colors } from '../constants/colors';

const restaurants = [
  { id: '1', name: 'Green Bistro', location: 'Downtown', cuisine: 'Vegetarian' },
  { id: '2', name: 'Ocean Grill', location: 'Beachside', cuisine: 'Seafood' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Table</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard
            name={item.name}
            location={item.location}
            cuisine={item.cuisine}
            onPress={() => navigation.navigate('RestaurantDetail', { restaurant: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
});
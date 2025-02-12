import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Colors = {
  primary: '#2D5A56',       // Dark green
  secondary: '#A1AFA8',     // Light green
  background: '#F5F5DC',    // Beige
  text: '#2D5A56',          // Dark green
  white: '#FFFFFF',
};

const RestaurantScreen = () => {
  const locations = ['Sydney', 'Melbourne', 'Brisbane', 'Sydney1', 'Melbourne1', 'Brisbane1'];
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.name}>Freda Pinto!</Text>
            <Text style={styles.question}>Where are you going tonight?</Text>
          </View>
          <Image
            source={require('../../assets/avatar.jpg')}
            style={styles.profileImage}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.locationContainer}
        >
          {locations.map((location, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.locationButton}
            >
              <Text style={styles.locationText}>{location}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.restaurantsSection}>
          <Text style={styles.sectionTitle}>Restaurants</Text>
          
          <View style={styles.restaurantCard}>
            <Image
              source={require('../../assets/restaurant.webp')}
              style={styles.restaurantImage}
            />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>Momofuku Seiobo</Text>
              <View style={styles.restaurantMetrics}>
                <View style={styles.metric}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.metricText}>4.5/5.0 Stars</Text>
                </View>
                <View style={styles.metric}>
                  <Ionicons name="time-outline" size={16} color={Colors.primary} />
                  <Text style={styles.metricText}>30-45 mins</Text>
                </View>
                <View style={styles.metric}>
                  <Ionicons name="bicycle-outline" size={16} color={Colors.primary} />
                  <Text style={styles.metricText}>Free</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    color: Colors.text,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  question: {
    fontSize: 16,
    color: Colors.secondary,
    marginTop: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  locationContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexGrow: 0,
  },
  locationButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  locationText: {
    color: Colors.white,
    fontWeight: '500',
  },
  restaurantsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.text,
  },
  restaurantCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
  },
  restaurantInfo: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.text,
  },
  restaurantMetrics: {
    flexDirection: 'row',
    gap: 15,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metricText: {
    color: Colors.text,
    fontSize: 14,
  },
});

export default RestaurantScreen;

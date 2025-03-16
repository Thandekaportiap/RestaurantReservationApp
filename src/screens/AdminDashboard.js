import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Custom color palette
const Colors = {
  primary: '#2D5A56',     // Dark green
  secondary: '#A1AFA8',   // Light green
  background: '#F5F5DC',  // Beige
  text: '#2D5A56',        // Dark green
  white: '#FFFFFF',
  danger: '#E53935',      // Red for cancellations/deletions
  success: '#43A047',     // Green for confirmations
  warning: '#FFB300',     // Yellow for pending/alerts
};

// Sample data
const sampleBookings = [
  { id: '1', restaurant: 'Hubert', customer: 'John Doe', date: '2025-03-08', time: '19:00', guests: 4, status: 'confirmed' },
  { id: '2', restaurant: 'Hubert', customer: 'Jane Smith', date: '2025-03-08', time: '20:00', guests: 2, status: 'pending' },
  { id: '3', restaurant: 'La Vita', customer: 'Robert Johnson', date: '2025-03-09', time: '18:30', guests: 6, status: 'confirmed' },
  { id: '4', restaurant: 'Sakura', customer: 'Emily Chen', date: '2025-03-10', time: '19:30', guests: 3, status: 'cancelled' },
];

const sampleRestaurants = [
  { id: '1', name: 'Hubert Restaurant', cuisine: 'French', address: '123 Main St', image: require('../../assets/table1.jpg') },
  { id: '2', name: 'La Vita', cuisine: 'Italian', address: '456 Oak Ave', image: require('../../assets/table2.webp') },
  { id: '3', name: 'Sakura', cuisine: 'Japanese', address: '789 Pine Blvd', image: require('../../assets/table4.jpeg') },
];


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [restaurants, setRestaurants] = useState(sampleRestaurants);
  const [bookings, setBookings] = useState(sampleBookings);
  const [modalVisible, setModalVisible] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    cuisine: '',
    address: '',
    image: 'https://via.placeholder.com/100'
  });

  // Handle adding a new restaurant
  const handleAddRestaurant = () => {
    const newId = (restaurants.length + 1).toString();
    setRestaurants([...restaurants, { ...newRestaurant, id: newId }]);
    setNewRestaurant({ name: '', cuisine: '', address: '', image: 'https://via.placeholder.com/100' });
    setModalVisible(false);
  };

  // Handle booking status change
  const handleStatusChange = (id, status) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  // Dashboard Overview Component
  const OverviewScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{restaurants.length}</Text>
          <Text style={styles.statLabel}>Restaurants</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{bookings.length}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {bookings.filter(b => b.status === 'confirmed').length}
          </Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Recent Bookings</Text>
      {bookings.slice(0, 3).map(booking => (
        <View key={booking.id} style={styles.bookingCard}>
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingRestaurant}>{booking.restaurant}</Text>
            <View style={[
              styles.statusBadge, 
              {backgroundColor: booking.status === 'confirmed' ? Colors.success : 
                booking.status === 'pending' ? Colors.warning : Colors.danger}
            ]}>
              <Text style={styles.statusText}>{booking.status}</Text>
            </View>
          </View>
          <Text style={styles.bookingDetail}>{booking.customer} · {booking.guests} guests</Text>
          <Text style={styles.bookingDetail}>{booking.date} at {booking.time}</Text>
        </View>
      ))}
      
      <Text style={styles.sectionTitle}>Restaurants</Text>
      <FlatList
        data={restaurants.slice(0, 3)}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.restaurantCard}>
            {/* <Image source={{uri: item.image}} style={styles.restaurantImage} /> */}
            <Image source={item.image} style={styles.restaurantImage} />

            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantDetail}>{item.cuisine}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
  
  // Restaurants Management Screen
  const RestaurantsScreen = () => (
    <View style={styles.screenContainer}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color={Colors.white} />
        <Text style={styles.addButtonText}>Add Restaurant</Text>
      </TouchableOpacity>
      
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.restaurantListItem}>
            <Image source={item.image} style={styles.restaurantListImage} />
            <View style={styles.restaurantListInfo}>
              <Text style={styles.restaurantListName}>{item.name}</Text>
              <Text style={styles.restaurantListDetail}>{item.cuisine}</Text>
              <Text style={styles.restaurantListDetail}>{item.address}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        )}
      />
      
      {/* Add Restaurant Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Restaurant</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Restaurant Name"
              value={newRestaurant.name}
              onChangeText={(text) => setNewRestaurant({...newRestaurant, name: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Cuisine"
              value={newRestaurant.cuisine}
              onChangeText={(text) => setNewRestaurant({...newRestaurant, cuisine: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={newRestaurant.address}
              onChangeText={(text) => setNewRestaurant({...newRestaurant, address: text})}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddRestaurant}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
  
  // Bookings Management Screen
  const BookingsScreen = () => (
    <View style={styles.screenContainer}>
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.bookingManageCard}>
            <View style={styles.bookingManageHeader}>
              <Text style={styles.bookingManageRestaurant}>{item.restaurant}</Text>
              <View style={[
                styles.statusBadge, 
                {backgroundColor: item.status === 'confirmed' ? Colors.success : 
                  item.status === 'pending' ? Colors.warning : Colors.danger}
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            
            <Text style={styles.bookingManageDetail}>
              <Ionicons name="person" size={16} color={Colors.primary} />
              {' '}{item.customer}
            </Text>
            
            <Text style={styles.bookingManageDetail}>
              <Ionicons name="calendar" size={16} color={Colors.primary} />
              {' '}{item.date} at {item.time}
            </Text>
            
            <Text style={styles.bookingManageDetail}>
              <Ionicons name="people" size={16} color={Colors.primary} />
              {' '}{item.guests} guests
            </Text>
            
            <View style={styles.bookingActions}>
              {item.status === 'pending' && (
                <>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.confirmButton]}
                    onPress={() => handleStatusChange(item.id, 'confirmed')}
                  >
                    <Text style={styles.actionButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.cancelBookingButton]}
                    onPress={() => handleStatusChange(item.id, 'cancelled')}
                  >
                    <Text style={styles.actionButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
              
              {item.status === 'confirmed' && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.cancelBookingButton]}
                  onPress={() => handleStatusChange(item.id, 'cancelled')}
                >
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restaurant Admin</Text>
      </View>
      
      <View style={styles.content}>
        {activeTab === 'overview' && <OverviewScreen />}
        {activeTab === 'restaurants' && <RestaurantsScreen />}
        {activeTab === 'bookings' && <BookingsScreen />}
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]} 
          onPress={() => setActiveTab('overview')}
        >
          <Ionicons 
            name={activeTab === 'overview' ? "grid" : "grid-outline"}
            size={24} 
            color={activeTab === 'overview' ? Colors.primary : Colors.secondary} 
          />
          <Text style={[styles.tabLabel, activeTab === 'overview' && styles.activeTabLabel]}>
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'restaurants' && styles.activeTab]} 
          onPress={() => setActiveTab('restaurants')}
        >
          <Ionicons 
            name={activeTab === 'restaurants' ? "restaurant" : "restaurant-outline"}
            size={24} 
            color={activeTab === 'restaurants' ? Colors.primary : Colors.secondary} 
          />
          <Text style={[styles.tabLabel, activeTab === 'restaurants' && styles.activeTabLabel]}>
            Restaurants
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'bookings' && styles.activeTab]} 
          onPress={() => setActiveTab('bookings')}
        >
          <Ionicons 
            name={activeTab === 'bookings' ? "calendar" : "calendar-outline"}
            size={24} 
            color={activeTab === 'bookings' ? Colors.primary : Colors.secondary} 
          />
          <Text style={[styles.tabLabel, activeTab === 'bookings' && styles.activeTabLabel]}>
            Bookings
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 16,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    width: '30%',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.secondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  bookingCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingRestaurant: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookingDetail: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 4,
  },
  restaurantCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 150,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  restaurantImage: {
    width: '100%',
    height: 100,
    borderRadius: 4,
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  restaurantDetail: {
    fontSize: 13,
    color: Colors.secondary,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    backgroundColor: Colors.white,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
  },
  tabLabel: {
    fontSize: 12,
    color: Colors.secondary,
    marginTop: 4,
  },
  activeTabLabel: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  // Restaurant List Styles
  restaurantListItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  restaurantListImage: {
    width: 70,
    height: 70,
    borderRadius: 4,
  },
  restaurantListInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  restaurantListName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  restaurantListDetail: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 2,
  },
  editButton: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    justifyContent: 'center',
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalButton: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: Colors.primary,
  },
  saveButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
  },
  cancelButtonText: {
    color: Colors.text,
  },
  // Booking Management Styles
  bookingManageCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  bookingManageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingManageRestaurant: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.text,
  },
  bookingManageDetail: {
    fontSize: 15,
    color: Colors.text,
    marginBottom: 8,
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  confirmButton: {
    backgroundColor: Colors.success,
  },
  cancelBookingButton: {
    backgroundColor: Colors.danger,
  },
  actionButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default AdminDashboard;
// OrderHistoryPage.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useScannedData } from './ScannedDataContext';

const OrderHistoryPage = () => {
  const { scannedData } = useScannedData();

  // Function to handle the "Complete Order" button press
  const handleCompleteOrder = (orderId) => {
    // Add logic to send a message to MainApp that the order is complete
    console.log('Order Complete! Sending message to MainApp');

    // Construct the URL with a custom scheme and orderId parameter
    const url = `mainapp://orderComplete?orderId=${orderId}`;
    
    // Open the URL to send the message to MainApp
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order History Page</Text>
      <ScrollView contentContainerStyle={styles.orderHistoryContainer}>
        {scannedData.map((data, index) => (
          <View key={index}>
            <Text style={styles.scannedDataText}>{JSON.stringify(data)}</Text>
            {/* Add "Complete Order" button */}
            <TouchableOpacity
              style={styles.completeOrderButton}
              onPress={() => handleCompleteOrder(data.orderId)}
            >
              <Text style={styles.completeOrderButtonText}>Complete Order</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f1e3',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3436',
  },
  orderHistoryContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  scannedDataText: {
    fontSize: 18,
    color: '#2d3436',
    marginBottom: 20,
  },
  completeOrderButton: {
    backgroundColor: '#27ae60', // Green color for the "Complete Order" button
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  completeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OrderHistoryPage;

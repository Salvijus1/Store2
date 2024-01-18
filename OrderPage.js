// OrderPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCodeScannerScreen from './QRCodeScannerScreen';

const OrderPage = () => {
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Reset scanned data when component mounts
    setScannedData(null);
  }, []);

  const handleScanPress = () => {
    setIsScanning(true);
  };

  const handleBackPress = () => {
    setIsScanning(false);
    setScannedData(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Page</Text>

      {isScanning ? (
        <QRCodeScannerScreen
          onBarCodeRead={(data) => {
            setScannedData(data);
            setIsScanning(false);
          }}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.ordersContainer}>
          {scannedData ? (
            <View>
              <Text style={styles.scannedDataText}>Scanned Data: {scannedData}</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
              <Text style={styles.scanButtonText}>Scan QR Code</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f1e3', // Light beige for a cozy feel
    paddingTop: 40, // Added padding at the top
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3436', // Dark gray for better readability
  },
  ordersContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  scannedDataText: {
    fontSize: 18,
    color: '#2d3436',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#3498db', // Light blue for the scan button
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    marginBottom: 10,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#e17055', // Salmon color for the back button
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderPage;

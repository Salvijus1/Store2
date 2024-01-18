// QRCodeScannerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useScannedData } from './ScannedDataContext';

const QRCodeScannerScreen = ({ navigation }) => {
  const { addScannedData } = useScannedData();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      console.log('Scanned QR Code:', data);
      addScannedData(data); // Add the scanned data to the context
      navigation && navigation.navigate('OrderDetailsScreen', { scannedData: data });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.scanButtonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QRCodeScannerScreen;

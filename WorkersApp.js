
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import OrderPage from './OrderPage';
import OrderHistoryPage from './OrderHistoryPage';
import QRCodeScannerScreen from './QRCodeScannerScreen';
import { ScannedDataProvider } from './ScannedDataContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const OrderStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Station" component={OrderPage} />
    <Stack.Screen name="QRCodeScannerScreen" component={QRCodeScannerScreen} />
    {/* Add more screens if needed */}
  </Stack.Navigator>
);

const WorkersApp = () => {
  return (
    <ScannedDataProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="OrderStack" component={OrderStack} />
          <Tab.Screen name="OrderHistoryPage" component={OrderHistoryPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </ScannedDataProvider>
  );
};

export default WorkersApp;

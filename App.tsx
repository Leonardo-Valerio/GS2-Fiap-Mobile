import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CheckInScreen from './src/screens/CheckInScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SensorsScreen from './src/screens/SensorsScreens';

export type RootStackParamList = {
  Home: undefined;
  CheckIn: undefined;
  History: undefined;
  Sensors: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#2c3e50' }, // Cor escura (Dark Mode vibe)
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#1a252f' } // Fundo das telas escuro
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'EcoHealth Monitor' }} />
        <Stack.Screen name="CheckIn" component={CheckInScreen} options={{ title: 'Check-in de Bem-estar' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico Pessoal' }} />
        <Stack.Screen name="Sensors" component={SensorsScreen} options={{ title: 'Sensores IoT' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
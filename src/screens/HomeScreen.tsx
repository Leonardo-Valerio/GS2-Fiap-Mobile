import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> };

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Olá, Colaborador</Text>
      <Text style={styles.subtitle}>Como você está se sentindo no seu ambiente de trabalho hoje?</Text>

      {/* Botão Gigante Principal */}
      <TouchableOpacity 
        style={styles.mainButton} 
        onPress={() => navigation.navigate('CheckIn')}
      >
        <Text style={styles.emoji}>❤️</Text>
        <Text style={styles.mainButtonText}>Novo Check-in</Text>
        <Text style={styles.mainButtonSub}>Registre humor, estresse e dores.</Text>
      </TouchableOpacity>

      {/* Botão Secundário */}
      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.secButtonText}>📄 Ver Meus Registros</Text>
    </TouchableOpacity>
    <TouchableOpacity 
        style={[styles.secondaryButton, { marginTop: 10, backgroundColor: '#2980b9' }]} 
        onPress={() => navigation.navigate('Sensors')}>
        <Text style={styles.secButtonText}>📡 Ver Ambiente (IoT)</Text>
    </TouchableOpacity>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>💡 Você sabia?</Text>
        <Text style={styles.infoText}>
          Seus dados ajudam a IA a ajustar a temperatura e iluminação do escritório para melhorar seu bem-estar.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  welcome: { fontSize: 28, fontWeight: 'bold', color: '#ecf0f1', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#bdc3c7', marginBottom: 40 },
  
  mainButton: { 
    backgroundColor: '#e74c3c', padding: 30, borderRadius: 20, alignItems: 'center', marginBottom: 20,
    shadowColor: "#e74c3c", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10
  },
  emoji: { fontSize: 40, marginBottom: 10 },
  mainButtonText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  mainButtonSub: { color: '#ffcccc', fontSize: 14, marginTop: 5 },

  secondaryButton: { 
    backgroundColor: '#34495e', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 30 
  },
  secButtonText: { color: '#ecf0f1', fontSize: 16, fontWeight: '600' },

  infoCard: { backgroundColor: '#2c3e50', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#34495e' },
  infoTitle: { color: '#f1c40f', fontWeight: 'bold', marginBottom: 5 },
  infoText: { color: '#95a5a6', lineHeight: 20 }
});
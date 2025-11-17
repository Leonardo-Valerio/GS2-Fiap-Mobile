import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Função auxiliar para gerar número aleatório entre min e max
const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function SensorsScreen() {
  const [data, setData] = useState({
    temp: 22,
    noise: 45,
    light: 500,
    co2: 400
  });

  // Função que simula a leitura dos sensores
  const readSensors = () => {
    setData({
      temp: getRandom(18, 32), // Gera temperatura entre 18 e 32
      noise: getRandom(30, 95), // Gera ruído entre 30dB e 95dB
      light: getRandom(200, 800),
      co2: getRandom(350, 1200)
    });
  };

  // Lê os sensores ao abrir a tela
  useEffect(() => {
    readSensors();
  }, []);

  // Componente Visual do Sensor (Card)
  const SensorCard = ({ label, value, unit, status, color }: any) => (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value} <Text style={styles.unit}>{unit}</Text></Text>
      </View>
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    </View>
  );

  // Lógica para definir Status e Cor (A "IA" analisando o ambiente)
  const getTempStatus = (v: number) => {
    if (v > 28) return { label: 'CALOR CRÍTICO', color: '#e74c3c' };
    if (v < 20) return { label: 'FRIO', color: '#3498db' };
    return { label: 'IDEAL', color: '#2ecc71' };
  };

  const getNoiseStatus = (v: number) => {
    if (v > 85) return { label: 'BARULHO ALTO', color: '#e74c3c' };
    if (v > 70) return { label: 'ATENÇÃO', color: '#f39c12' };
    return { label: 'SILENCIOSO', color: '#2ecc71' };
  };

  const tempSt = getTempStatus(data.temp);
  const noiseSt = getNoiseStatus(data.noise);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Monitoramento Ambiental (IoT)</Text>
      <Text style={styles.subHeader}>Dados em tempo real da Ala B - Escritório SP</Text>

      <SensorCard 
        label="🌡️ Temperatura" 
        value={data.temp} unit="°C" 
        status={tempSt.label} color={tempSt.color} 
      />

      <SensorCard 
        label="🔊 Nível de Ruído" 
        value={data.noise} unit="dB" 
        status={noiseSt.label} color={noiseSt.color} 
      />

      <SensorCard 
        label="💡 Luminosidade" 
        value={data.light} unit="lux" 
        status={data.light < 300 ? "BAIXA" : "ADEQUADA"} 
        color={data.light < 300 ? "#f39c12" : "#2ecc71"} 
      />

      <SensorCard 
        label="☁️ Qualidade do Ar (CO2)" 
        value={data.co2} unit="ppm" 
        status={data.co2 > 1000 ? "POBRE" : "EXCELENTE"} 
        color={data.co2 > 1000 ? "#e74c3c" : "#2ecc71"} 
      />

      <TouchableOpacity style={styles.refreshBtn} onPress={readSensors}>
        <Text style={styles.refreshText}>🔄 Atualizar Leituras</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1a252f' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#ecf0f1', marginBottom: 5 },
  subHeader: { fontSize: 14, color: '#7f8c8d', marginBottom: 20 },
  
  card: { 
    backgroundColor: '#2c3e50', padding: 20, borderRadius: 10, marginBottom: 15,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderLeftWidth: 5, shadowColor: "#000", elevation: 3
  },
  label: { color: '#bdc3c7', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
  value: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 5 },
  unit: { fontSize: 16, color: '#95a5a6', fontWeight: 'normal' },
  
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 10 },

  refreshBtn: { backgroundColor: '#34495e', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  refreshText: { color: '#fff', fontWeight: 'bold' }
});
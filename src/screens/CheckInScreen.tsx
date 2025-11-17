import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { saveLog, HealthLog } from '../services/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'CheckIn'>;

export default function CheckInScreen({ navigation }: Props) {
  const [mood, setMood] = useState<number>(3);
  const [stress, setStress] = useState<HealthLog['stressLevel']>('Médio');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  // NOVIDADE: Simulação de Data para o Vídeo
  const [daysAgo, setDaysAgo] = useState(0); // 0 = Hoje, 1 = Ontem, etc.

  const symptomsList = ['Dor de Cabeça', 'Cansaço Visual', 'Dor nas Costas', 'Ansiedade', 'Nenhum'];

  const toggleSymptom = (symptom: string) => {
    if (symptom === 'Nenhum') {
      setSelectedSymptoms(['Nenhum']);
      return;
    }
    let newSelection = selectedSymptoms.filter(s => s !== 'Nenhum');
    if (newSelection.includes(symptom)) {
      newSelection = newSelection.filter(s => s !== symptom);
    } else {
      newSelection.push(symptom);
    }
    setSelectedSymptoms(newSelection);
  };

  const handleSave = async () => {
    // Lógica para criar data retroativa
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    const newLog: HealthLog = {
      id: Date.now().toString(),
      mood,
      stressLevel: stress,
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['Nenhum'],
      timestamp: date.toISOString()
    };

    await saveLog(newLog);
    Alert.alert("Sucesso", `Check-in registrado para ${daysAgo === 0 ? 'Hoje' : daysAgo + ' dia(s) atrás'}!`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* SELETOR DE DATA (Truque para a Demo) */}
      <View style={styles.dateSelector}>
        <Text style={styles.labelSmall}>📅 Data do Registro (Simulação):</Text>
        <View style={styles.row}>
          {[0, 1, 2, 3].map((day) => (
            <TouchableOpacity 
              key={day} 
              style={[styles.dateBtn, daysAgo === day && styles.activeDateBtn]}
              onPress={() => setDaysAgo(day)}
            >
              <Text style={[styles.dateText, daysAgo === day && {color: '#1a252f'}]}>
                {day === 0 ? 'Hoje' : `-${day}d`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.label}>1. Como estava seu humor?</Text>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((level) => (
          <TouchableOpacity 
            key={level} 
            style={[styles.moodBtn, mood === level && styles.activeMood]} 
            onPress={() => setMood(level)}
          >
            <Text style={styles.emoji}>{['😡', '🙁', '😐', '🙂', '😄'][level-1]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>2. Nível de Estresse</Text>
      <View style={styles.row}>
        {['Baixo', 'Médio', 'Alto'].map((level) => (
          <TouchableOpacity 
            key={level}
            style={[
              styles.stressBtn, 
              stress === level && styles.activeStress,
              { borderColor: level === 'Alto' ? '#e74c3c' : level === 'Médio' ? '#f39c12' : '#2ecc71' }
            ]}
            onPress={() => setStress(level as any)}
          >
            <Text style={[styles.btnText, stress === level && { color: '#fff' }]}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>3. Sintomas Físicos</Text>
      <View style={styles.chipContainer}>
        {symptomsList.map((symptom) => (
          <TouchableOpacity 
            key={symptom}
            style={[styles.chip, selectedSymptoms.includes(symptom) && styles.activeChip]}
            onPress={() => toggleSymptom(symptom)}
          >
            <Text style={[styles.chipText, selectedSymptoms.includes(symptom) && { color: 'white' }]}>
              {symptom}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
        <Text style={styles.submitText}>SALVAR REGISTRO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1a252f' },
  labelSmall: { color: '#7f8c8d', fontSize: 12, marginBottom: 5, fontWeight: 'bold' },
  label: { color: '#bdc3c7', fontSize: 16, marginTop: 20, marginBottom: 10, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  
  // Estilos Data
  dateSelector: { backgroundColor: '#2c3e50', padding: 15, borderRadius: 10, marginBottom: 10 },
  dateBtn: { padding: 10, borderRadius: 5, backgroundColor: '#34495e', marginRight: 10, minWidth: 50, alignItems: 'center' },
  activeDateBtn: { backgroundColor: '#f1c40f' },
  dateText: { color: '#bdc3c7', fontWeight: 'bold' },

  // Estilos Humor
  moodBtn: { padding: 10, borderRadius: 10, backgroundColor: '#34495e', opacity: 0.5 },
  activeMood: { backgroundColor: '#3498db', opacity: 1, transform: [{ scale: 1.1 }] },
  emoji: { fontSize: 30 },

  // Estilos Estresse
  stressBtn: { flex: 1, marginHorizontal: 5, padding: 15, borderRadius: 8, borderWidth: 2, alignItems: 'center' },
  activeStress: { backgroundColor: '#34495e' },
  btnText: { color: '#ecf0f1', fontWeight: 'bold' },

  // Estilos Sintomas
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { backgroundColor: '#34495e', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginRight: 10, marginBottom: 10 },
  activeChip: { backgroundColor: '#9b59b6' },
  chipText: { color: '#bdc3c7' },

  submitButton: { backgroundColor: '#27ae60', padding: 18, borderRadius: 10, marginTop: 30, alignItems: 'center', marginBottom: 50 },
  submitText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});
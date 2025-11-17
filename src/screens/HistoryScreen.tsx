import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getLogs, clearLogs, HealthLog } from '../services/storage';
import { useIsFocused } from '@react-navigation/native';

export default function HistoryScreen() {
  const [logs, setLogs] = useState<HealthLog[]>([]);
  const [recommendation, setRecommendation] = useState({ text: '', color: '#fff' });
  
  const isFocused = useIsFocused();

  const load = async () => {
    const data = await getLogs();
    // Ordena por data (mais recente primeiro) para a lista
    const sortedData = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setLogs(sortedData);
    generateInsight(sortedData);
  };

  useEffect(() => {
    if (isFocused) load();
  }, [isFocused]);

  // A "IA" do Robozinho
  const generateInsight = (data: HealthLog[]) => {
    if (data.length === 0) return;

    const stressCount = data.filter(i => i.stressLevel === 'Alto').length;
    const lastMood = data[0].mood;

    if (stressCount >= 2) {
      setRecommendation({
        text: "⚠️ Alerta: Detectamos múltiplos registros de estresse alto. Recomendamos agendar uma conversa com o RH ou fazer uma pausa ativa agora.",
        color: '#e74c3c' // Vermelho
      });
    } else if (lastMood <= 2) {
      setRecommendation({
        text: "💡 Dica: Seu humor parece baixo hoje. A iluminação do seu ambiente pode estar inadequada. Tente luz natural.",
        color: '#f39c12' // Laranja
      });
    } else {
      setRecommendation({
        text: "✅ Excelente: Seus níveis de bem-estar estão ótimos! O ambiente parece estar bem configurado para você.",
        color: '#2ecc71' // Verde
      });
    }
  };

  // Componente Visual do Gráfico (Barras de Humor)
  const renderChart = () => {
    // Pega os últimos 7 dias para o gráfico
    const chartData = logs.slice(0, 7).reverse(); 
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Tendência de Humor (Últimos registros)</Text>
        <View style={styles.chartRow}>
          {chartData.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: item.mood * 20, // Altura dinâmica baseada no humor (1-5)
                    backgroundColor: item.mood >= 4 ? '#2ecc71' : item.mood >= 3 ? '#f1c40f' : '#e74c3c'
                  }
                ]} 
              />
              <Text style={styles.barLabel}>{new Date(item.timestamp).getDate()}/{new Date(item.timestamp).getMonth()+1}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Painel Inteligente</Text>
        <TouchableOpacity onPress={async () => { await clearLogs(); load(); }}>
          <Text style={styles.clearText}>Resetar</Text>
        </TouchableOpacity>
      </View>

      {logs.length === 0 ? (
        <Text style={styles.empty}>Faça seu primeiro check-in para ativar a IA.</Text>
      ) : (
        <>
          {/* 1. MENSAGEM DO ROBÔ */}
          <View style={[styles.robotCard, { borderLeftColor: recommendation.color }]}>
            <Text style={styles.robotTitle}>🤖 EcoHealth AI diz:</Text>
            <Text style={styles.robotText}>{recommendation.text}</Text>
          </View>

          {/* 2. GRÁFICO */}
          {renderChart()}

          {/* 3. LISTA DE HISTÓRICO */}
          <Text style={styles.listTitle}>Histórico Recente</Text>
          <FlatList
            data={logs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.logRow}>
                <Text style={styles.logDate}>
                   {new Date(item.timestamp).toLocaleDateString()}
                </Text>
                <Text style={styles.logEmoji}>{['😡', '🙁', '😐', '🙂', '😄'][item.mood-1]}</Text>
                <Text style={[
                  styles.logStress, 
                  { color: item.stressLevel === 'Alto' ? '#e74c3c' : '#2ecc71' }
                ]}>
                  {item.stressLevel}
                </Text>
              </View>
            )}
          />
        </>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1a252f' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#ecf0f1' },
  clearText: { color: '#e74c3c', fontWeight: 'bold' },
  empty: { color: '#7f8c8d', textAlign: 'center', marginTop: 50 },
  
  // Estilo do Robô
  robotCard: { backgroundColor: '#2c3e50', padding: 15, borderRadius: 8, marginBottom: 20, borderLeftWidth: 4 },
  robotTitle: { color: '#bdc3c7', fontWeight: 'bold', marginBottom: 5 },
  robotText: { color: '#fff', fontSize: 14, lineHeight: 20 },

  // Estilo do Gráfico
  chartContainer: { marginBottom: 20, height: 150 },
  chartTitle: { color: '#95a5a6', fontSize: 12, marginBottom: 10, textTransform: 'uppercase' },
  chartRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', height: 100, borderBottomWidth: 1, borderBottomColor: '#34495e' },
  barContainer: { alignItems: 'center' },
  bar: { width: 15, borderRadius: 3, marginBottom: 5 },
  barLabel: { color: '#7f8c8d', fontSize: 10 },

  // Estilo da Lista Compacta
  listTitle: { color: '#95a5a6', fontSize: 12, marginBottom: 10, textTransform: 'uppercase' },
  logRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#2c3e50' },
  logDate: { color: '#bdc3c7' },
  logEmoji: { fontSize: 16 },
  logStress: { fontWeight: 'bold' }
});
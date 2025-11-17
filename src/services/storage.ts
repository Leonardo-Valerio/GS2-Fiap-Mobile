import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ecohealth_logs';

export interface HealthLog {
  id: string;
  mood: number; // 1 a 5
  stressLevel: 'Baixo' | 'Médio' | 'Alto';
  symptoms: string[]; // Ex: ['Dor de cabeça', 'Cansaço']
  timestamp: string;
}

export const saveLog = async (log: HealthLog) => {
  try {
    const existingData = await getLogs();
    const newData = [log, ...existingData]; // Adiciona o mais novo no começo
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error('Erro ao salvar', e);
  }
};

export const getLogs = async (): Promise<HealthLog[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return [];
  }
};

export const clearLogs = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
# 🌿 EcoHealth Manager - Global Solution 2025

> **O Futuro do Trabalho:** Monitoramento de Bem-Estar e Ambiente (IoT)

![License](https://img.shields.io/badge/License-MIT-green)
![React Native](https://img.shields.io/badge/React_Native-v0.76-blue)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![Expo](https://img.shields.io/badge/Expo-Go-black)

## 📖 Sobre o Projeto

O **EcoHealth Manager** é uma solução mobile desenvolvida para a Global Solution de Engenharia de Software (Mobile Development & IoT).

O projeto aborda o tema **"O Futuro do Trabalho"**, propondo uma plataforma que une dados subjetivos (sentimentos do colaborador) com dados objetivos (sensores IoT do ambiente) para combater o burnout e melhorar a ergonomia corporativa.

### 🎯 O Problema
Empresas perdem bilhões com absenteísmo e baixa produtividade operando "no escuro", sem saber como o ambiente (ruído, luz, temperatura) impacta a saúde mental e física dos colaboradores em tempo real.

### 🚀 A Solução
Um aplicativo que atua como um "Coletor Inteligente":
1.  **Check-in de Bem-Estar:** O colaborador registra humor, estresse e sintomas físicos.
2.  **Monitoramento IoT:** O app simula a conexão com sensores ambientais (Temperatura, Ruído, CO2).
3.  **Inteligência Local:** Um dashboard analisa os dados offline (AsyncStorage) e gera alertas preventivos (ex: "Risco de Burnout detectado").

---

## 📱 Funcionalidades

### 1. Check-in Diário (Subjetivo)
* Registro rápido de **Humor** (Escala 1-5).
* Classificação de nível de **Estresse** (Baixo, Médio, Alto).
* Seleção de **Sintomas Físicos** (Dor de cabeça, Cansaço visual, etc.).
* *Feature Extra:* Simulação de data retroativa para testes de histórico.

### 2. Painel Inteligente & Analytics
* **Gráfico de Tendência:** Visualização da variação de humor nos últimos dias.
* **Robô Consultor (IA Local):** Algoritmo que analisa os padrões de estresse e fornece recomendações automáticas (ex: "Procure o RH" ou "Melhore a iluminação").
* **Persistência de Dados:** Uso de `AsyncStorage` para manter o histórico salvo no dispositivo.

### 3. Monitoramento IoT (Objetivo)
* Tela de simulação de sensores em tempo real.
* Geração de dados aleatórios para **Temperatura**, **Ruído** e **Luminosidade**.
* Alertas visuais imediatos (Cores Vermelho/Verde) baseados em normas de ergonomia.

---

## 🛠 Tecnologias Utilizadas

* **Framework:** [React Native](https://reactnative.dev/) (via Expo)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Persistência:** [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
* **Navegação:** React Navigation (Native Stack)
* **Ambiente:** Node.js

---

## 📂 Estrutura do Projeto


src/
├── components/    # Componentes reutilizáveis (Botões, Cards)
├── screens/       # Telas da aplicação
│   ├── HomeScreen.tsx     # Menu Principal (Dashboard Vibe)
│   ├── CheckInScreen.tsx  # Formulário de Registro (Coletor do Funcionário)
│   ├── HistoryScreen.tsx  # Dashboard com Gráficos e IA
│   └── SensorsScreen.tsx  # Simulação de Hardware IoT (Coletor do Ambiente)
├── services/
│   └── storage.ts         # Lógica de persistência (AsyncStorage)
└── App.tsx        # Configuração de rotas e tema


## 🚀 Como Rodar o Projeto
Pré-requisitos
Node.js instalado.

Gerenciador de pacotes (npm ou yarn).

### Passo a Passo
#### Clone o repositório:
git clone [https://github.com/Leonardo-Valerio/GS2-Fiap-Mobile.git](https://github.com/Leonardo-Valerio/GS2-Fiap-Mobile.git)
cd EcoHealthManager
#### Instale as dependências: 
npm install
#### Execute o projeto: Para rodar no Navegador (Recomendado para demonstração rápida):
npx expo start --web
#### Para rodar no Celular (via Expo Go):
npx expo start

# 👥 Integrantes do Grupo
Joel Barros - RM550378
Leonardo Valério - RM550988


import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useGlobalSearchParams } from 'expo-router';

export default function AppointmentsScreen() {
  const router = useRouter();
  const params = useGlobalSearchParams();
  
  // State to toggle between tabs
  const [activeTab, setActiveTab] = useState<'doctor' | 'vaccine'>('doctor');

  // --- DYNAMIC DATA SETUP ---
  const isChildMode = params.mode === 'child';
  const babyDob = params.babyDob ? String(params.babyDob) : null; 
  const dueDate = params.dueDate ? String(params.dueDate) : null;

  // 🤰 VACCINES FOR PREGNANCY
  const pregnancyVaccines = [
    { id: 'p1', name: 'Influenza (Flu)', timeframe: 'Any trimester', targetWeek: 12, status: false },
    { id: 'p2', name: 'Tdap', timeframe: '27 - 36 weeks', targetWeek: 27, status: false },
    { id: 'p3', name: 'RSV', timeframe: '32 - 36 weeks', targetWeek: 32, status: false },
    { id: 'p4', name: 'COVID-19 Booster', timeframe: 'Any trimester', targetWeek: 12, status: false },
    { id: 'p5', name: 'Hepatitis B', timeframe: 'If at high risk', targetWeek: 1, status: false },
  ];

  // 👶 VACCINES FOR BABY
  const childVaccines = [
    { id: 'c1', name: 'Hepatitis B (Dose 1)', timeframe: 'At Birth', targetMonths: 0, status: false },
    { id: 'c2', name: 'Hepatitis B (Dose 2)', timeframe: '1 - 2 Months', targetMonths: 1, status: false },
    { id: 'c3', name: 'Rotavirus & DTaP', timeframe: '2 Months', targetMonths: 2, status: false },
    { id: 'c6', name: 'Polio & Pneumococcal', timeframe: '2 Months', targetMonths: 2, status: false },
    { id: 'c8', name: 'Flu (Influenza)', timeframe: '6 Months', targetMonths: 6, status: false },
    { id: 'c9', name: 'MMR & Varicella', timeframe: '12 Months', targetMonths: 12, status: false },
  ];

  const [vaccineList, setVaccineList] = useState(isChildMode ? childVaccines : pregnancyVaccines);

  const toggleVaccine = (id: string) => {
    setVaccineList(prevList => 
      prevList.map(vaccine => 
        vaccine.id === id ? { ...vaccine, status: !vaccine.status } : vaccine
      )
    );
  };

  // --- COUNTDOWN MATH ---
  const getChildTimeLeft = (targetMonths: number) => {
    if (!babyDob) return "Date unknown";
    const targetDate = new Date(babyDob);
    targetDate.setMonth(targetDate.getMonth() + targetMonths);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
    if (diffDays === 0) return "Due today!";
    if (diffDays <= 30) return `Due in ${diffDays} days`;
    return `Due in ${Math.floor(diffDays / 30)} months`;
  };

  const getPregnancyTimeLeft = (targetWeek: number) => {
    if (!dueDate) return "Date unknown";
    const due = new Date(dueDate);
    const conception = new Date(due);
    conception.setDate(conception.getDate() - (40 * 7));
    const targetDate = new Date(conception);
    targetDate.setDate(targetDate.getDate() + (targetWeek * 7));
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `Window opened ${Math.abs(diffDays)} days ago`;
    if (diffDays === 0) return "Due today!";
    if (diffDays <= 14) return `Due in ${diffDays} days`;
    return `Due in ${Math.floor(diffDays / 7)} weeks`;
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule</Text>
        <View style={{ width: 24 }} /> {/* Spacer for centering */}
      </View>

      {/* Tab Toggle */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'doctor' && styles.activeTab]}
          onPress={() => setActiveTab('doctor')}
        >
          <Ionicons name="calendar" size={18} color={activeTab === 'doctor' ? '#fff' : '#888'} />
          <Text style={[styles.tabText, activeTab === 'doctor' && styles.activeTabText]}>
            Doctor Visits
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'vaccine' && styles.activeTab]}
          onPress={() => setActiveTab('vaccine')}
        >
          <Ionicons name="medical" size={18} color={activeTab === 'vaccine' ? '#fff' : '#888'} />
          <Text style={[styles.tabText, activeTab === 'vaccine' && styles.activeTabText]}>
            Vaccinations
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {activeTab === 'doctor' ? (
          /* --- DOCTOR APPOINTMENTS LIST --- */
          <View>
            <Text style={styles.sectionHeader}>Upcoming</Text>
            
            <View style={styles.card}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateMonth}>AUG</Text>
                <Text style={styles.dateDay}>14</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Prenatal Checkup</Text>
                <Text style={styles.cardSubtitle}>Dr. Eleanor Vance • 10:00 AM</Text>
                <Text style={styles.cardDetail}>City Hospital, Room 205</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateMonth}>SEP</Text>
                <Text style={styles.dateDay}>02</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>3rd Trimester Ultrasound</Text>
                <Text style={styles.cardSubtitle}>Dr. Patel • 2:30 PM</Text>
                <Text style={styles.cardDetail}>Women's Imaging Center</Text>
              </View>
            </View>
          </View>

        ) : (
          /* --- DYNAMIC VACCINATIONS LIST --- */
          <View>
            <Text style={styles.sectionHeader}>
              {isChildMode ? "Baby's Schedule" : "Pregnancy Immunizations"}
            </Text>
            
            {vaccineList.map((vaccine) => {
              const countdownText = isChildMode 
                ? getChildTimeLeft(vaccine.targetMonths) 
                : getPregnancyTimeLeft(vaccine.targetWeek);
              const isOverdue = countdownText.includes('Overdue');

              return (
                <TouchableOpacity 
                  key={vaccine.id} 
                  style={[styles.card, vaccine.status && styles.vaccineCompletedCard]} 
                  onPress={() => toggleVaccine(vaccine.id)}
                >
                  <View style={[styles.iconBadge, vaccine.status && { backgroundColor: '#eef8f5' }]}>
                    <Ionicons 
                      name={vaccine.status ? "shield-checkmark" : "shield-half"} 
                      size={24} 
                      color={vaccine.status ? "#4bd3a4" : "#ff9800"} 
                    />
                  </View>
                  
                  <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, vaccine.status && styles.vaccineCompletedText]}>
                      {vaccine.name}
                    </Text>
                    <Text style={styles.cardSubtitle}>Schedule: {vaccine.timeframe}</Text>
                    
                    {/* The Status / Countdown Logic */}
                    {vaccine.status ? (
                      <View style={styles.statusCompleted}>
                        <Text style={styles.statusTextCompleted}>Completed</Text>
                      </View>
                    ) : (
                      <Text style={[
                        styles.cardDetail, 
                        { marginTop: 4, fontWeight: 'bold', color: isOverdue ? '#ff5252' : '#f57f17' }
                      ]}>
                        ⏱️ {countdownText}
                      </Text>
                    )}
                  </View>

                  <View style={[styles.checkbox, vaccine.status && styles.checkboxCompleted]}>
                    {vaccine.status && <Ionicons name="checkmark" size={18} color="#fff" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

      </ScrollView>

      {/* Floating Action Button to Add New */}
      {activeTab === 'doctor' && (
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff', paddingTop: 40 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  
  tabContainer: { flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 20, paddingBottom: 15, borderBottomWidth: 1, borderColor: '#eee' },
  tab: { flex: 1, flexDirection: 'row', paddingVertical: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 25, marginHorizontal: 5 },
  activeTab: { backgroundColor: '#4bd3a4' },
  tabText: { fontSize: 15, fontWeight: '600', color: '#888', marginLeft: 8 },
  activeTabText: { color: '#fff' },

  scrollContent: { padding: 20, paddingBottom: 100 }, 
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#555', marginBottom: 15, marginTop: 10 },
  
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2, alignItems: 'center' },
  vaccineCompletedCard: { opacity: 0.7 },
  
  dateBadge: { backgroundColor: '#eef8f5', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', marginRight: 15, height: 65, width: 65 },
  dateMonth: { fontSize: 12, fontWeight: 'bold', color: '#4bd3a4', textTransform: 'uppercase' },
  dateDay: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  
  iconBadge: { backgroundColor: '#ffe9d6', borderRadius: 12, height: 60, width: 60, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  
  cardContent: { flex: 1, paddingRight: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#666', marginBottom: 4 },
  cardDetail: { fontSize: 13, color: '#999' },
  vaccineCompletedText: { textDecorationLine: 'line-through', color: '#888' },
  
  statusCompleted: { backgroundColor: '#eef8f5', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10, alignSelf: 'flex-start', marginTop: 5 },
  statusTextCompleted: { color: '#4bd3a4', fontSize: 12, fontWeight: 'bold' },
  
  checkbox: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center', marginLeft: 5 },
  checkboxCompleted: { backgroundColor: '#4bd3a4', borderColor: '#4bd3a4' },

  fab: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#4bd3a4', justifyContent: 'center', alignItems: 'center', shadowColor: '#4bd3a4', shadowOpacity: 0.4, shadowRadius: 10, elevation: 5 },
});
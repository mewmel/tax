import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import ChatbotButton from '@/components/ChatbotButton';
import UniversalChatbot from '@/components/UniversalChatbot';

export default function PaymentScreen() {
  const [showChatbot, setShowChatbot] = useState(false);

  const pendingPayments = [
    { 
      id: 1, 
      type: 'Thuế GTGT Q4/2024', 
      amount: '8.500.000', 
      dueDate: '20/01/2025', 
      status: 'urgent',
      daysLeft: 3
    },
    { 
      id: 2, 
      type: 'Thuế TNCN năm 2024', 
      amount: '2.500.000', 
      dueDate: '31/03/2025', 
      status: 'normal',
      daysLeft: 65
    },
  ];

  const recentPayments = [
    { 
      id: 1, 
      type: 'Thuế GTGT Q3/2024', 
      amount: '7.800.000', 
      date: '15/10/2024', 
      status: 'success',
      method: 'VietinBank'
    },
    { 
      id: 2, 
      type: 'Thuế Môn Bài 2024', 
      amount: '3.000.000', 
      date: '25/01/2024', 
      status: 'success',
      method: 'Techcombank'
    },
    { 
      id: 3, 
      type: 'Thuế TNDN 2023', 
      amount: '12.500.000', 
      date: '30/03/2024', 
      status: 'success',
      method: 'BIDV'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return <AlertCircle size={20} color="#DC2626" />;
      case 'normal':
        return <Clock size={20} color="#EA580C" />;
      case 'success':
        return <CheckCircle size={20} color="#059669" />;
      default:
        return <Clock size={20} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return '#FEE2E2';
      case 'normal':
        return '#FEF3C7';
      case 'success':
        return '#D1FAE5';
      default:
        return '#F3F4F6';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <UniversalChatbot
        visible={showChatbot}
        onClose={() => setShowChatbot(false)}
        chatType="general"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nộp Thuế</Text>
        <Text style={styles.headerSubtitle}>Thanh toán thuế trực tuyến</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pending Payments */}
        <View style={[styles.section, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Khoản thuế cần nộp</Text>
          {pendingPayments.map((payment) => (
            <View key={payment.id} style={[styles.pendingCard, { backgroundColor: getStatusColor(payment.status) }]}>
              <View style={styles.pendingHeader}>
                <View style={styles.pendingInfo}>
                  {getStatusIcon(payment.status)}
                  <Text style={styles.pendingType}>{payment.type}</Text>
                </View>
                <Text style={styles.pendingAmount}>{payment.amount} ₫</Text>
              </View>
              <View style={styles.pendingDetails}>
                <Text style={styles.pendingDue}>Hạn cuối: {payment.dueDate}</Text>
                <Text style={[
                  styles.pendingDays,
                  payment.status === 'urgent' ? styles.urgentDays : styles.normalDays
                ]}>
                  Còn {payment.daysLeft} ngày
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.payNowButton}
                onPress={() => router.push(`/tax-payment?id=${payment.id}`)}
              >
                <Text style={styles.payNowText}>Nộp ngay</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Recent Payments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>
          {recentPayments.map((payment) => (
            <View key={payment.id} style={styles.recentCard}>
              <View style={styles.recentLeft}>
                {getStatusIcon(payment.status)}
                <View style={styles.recentInfo}>
                  <Text style={styles.recentType}>{payment.type}</Text>
                  <Text style={styles.recentMethod}>Qua {payment.method}</Text>
                  <Text style={styles.recentDate}>{payment.date}</Text>
                </View>
              </View>
              <Text style={styles.recentAmount}>{payment.amount} ₫</Text>
            </View>
          ))}
        </View>

        {/* Payment Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lịch nộp thuế</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Calendar size={16} color="#1E40AF" />
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleCard}>
            <Text style={styles.scheduleTitle}>Sắp tới</Text>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleDate}>20/01/2025</Text>
              <Text style={styles.scheduleDescription}>Thuế GTGT Q4/2024</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleDate}>20/02/2025</Text>
              <Text style={styles.scheduleDescription}>Thuế GTGT Q1/2025</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleDate}>31/03/2025</Text>
              <Text style={styles.scheduleDescription}>Thuế TNCN năm 2024</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <ChatbotButton onPress={() => setShowChatbot(true)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  header: {
    backgroundColor: '#059669',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D1FAE5',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '500',
  },
  pendingCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  pendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pendingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pendingType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  pendingAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  pendingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pendingDue: {
    fontSize: 14,
    color: '#6B7280',
  },
  pendingDays: {
    fontSize: 14,
    fontWeight: '500',
  },
  urgentDays: {
    color: '#DC2626',
  },
  normalDays: {
    color: '#EA580C',
  },
  payNowButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  payNowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  recentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentInfo: {
    marginLeft: 12,
  },
  recentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  recentMethod: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  recentDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  recentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  scheduleDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  scheduleDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});
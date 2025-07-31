import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Calendar, TriangleAlert as AlertTriangle, ArrowLeft, Building2 } from 'lucide-react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import ChatbotButton from '@/components/ChatbotButton';
import UniversalChatbot from '@/components/UniversalChatbot';
import { useState } from 'react';

export default function BusinessDetailsScreen() {
  const [showChatbot, setShowChatbot] = useState(false);
  const { id } = useLocalSearchParams();
  
  // Data cho các doanh nghiệp
  const businessesData = {
    '1': {
      name: 'Cửa hàng tạp hóa Hoa Mai',
      taxCode: '8765432109',
      address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
      businessType: 'Hộ kinh doanh cá thể',
      registrationDate: '15/01/2020',
      status: 'Hoạt động',
      revenue: '2.5 tỷ VNĐ'
    },
    '2': {
      name: 'Quán Cà Phê Sài Gòn',
      taxCode: '9876543210',
      address: '456 Đường DEF, Phường KLM, Quận 3, TP.HCM',
      businessType: 'Công ty TNHH',
      registrationDate: '20/08/2021',
      status: 'Hoạt động',
      revenue: '1.8 tỷ VNĐ'
    }
  };

  // Lấy thông tin doanh nghiệp dựa trên ID, mặc định là business 1
  const currentBusiness = businessesData[id as '1' | '2'] || businessesData['1'];

  const handleBackPress = () => {
    router.back();
  };

  const taxObligations = [
    { id: 1, type: 'Thuế Môn Bài', period: 'Năm 2024', amount: '3.000.000', status: 'Đã nộp', dueDate: '31/01/2024' },
    { id: 2, type: 'Thuế GTGT', period: 'Quý 4/2024', amount: '8.500.000', status: 'Chưa nộp', dueDate: '20/01/2025' },
    { id: 3, type: 'Thuế TNDN', period: 'Năm 2024', amount: '15.200.000', status: 'Đã nộp', dueDate: '31/03/2024' },
  ];

  const recentTransactions = [
    { id: 1, type: 'Thuế GTGT Q3/2024', amount: '7.800.000', date: '15/10/2024', status: 'Thành công' },
    { id: 2, type: 'Thuế Môn Bài 2024', amount: '3.000.000', date: '25/01/2024', status: 'Thành công' },
    { id: 3, type: 'Thuế TNDN 2023', amount: '12.500.000', date: '30/03/2024', status: 'Thành công' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <UniversalChatbot
        visible={showChatbot}
        onClose={() => setShowChatbot(false)}
        chatType="business"
        subtitle="Chuyên gia thuế doanh nghiệp"
      />

      <Stack.Screen 
        options={{ 
          title: 'Chi tiết doanh nghiệp',
          headerStyle: { backgroundColor: '#059669' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )
        }} 
      />

      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Building2 size={28} color="#FFFFFF" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Thuế Doanh Nghiệp</Text>
              <Text style={styles.headerSubtitle}>Quản lý thuế và nghĩa vụ</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Business Info */}
        <View style={styles.businessCard}>
          <View style={styles.businessHeader}>
            <Text style={styles.sectionTitle}>Chi tiết doanh nghiệp</Text>
            <View style={styles.businessNameContainer}>
              <Text style={styles.businessName}>{currentBusiness.name}</Text>
              <View style={[styles.statusBadge, styles.activeStatus]}>
                <Text style={styles.statusBadgeText}>{currentBusiness.status}</Text>
              </View>
            </View>
          </View>
          <View style={styles.businessInfo}>
            <Text style={[styles.businessDetail, styles.businessInfoItem]}>MST: {currentBusiness.taxCode}</Text>
            <Text style={[styles.businessDetail, styles.businessInfoItem]}>Địa chỉ: {currentBusiness.address}</Text>
            <Text style={[styles.businessDetail, styles.businessInfoItem]}>Loại hình: {currentBusiness.businessType}</Text>
            <Text style={[styles.businessDetail, styles.businessInfoItem]}>Đăng ký từ: {currentBusiness.registrationDate}</Text>
            <Text style={[styles.businessDetail, styles.businessInfoItem]}>Doanh thu năm: {currentBusiness.revenue}</Text>
          </View>
        </View>

        {/* Tax Status Summary */}
        <View style={styles.statusCard}>
          <Text style={styles.sectionTitle}>Tình trạng thuế tháng này</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <View style={[styles.statusIcon, { backgroundColor: '#FEE2E2' }]}>
                <AlertTriangle size={20} color="#DC2626" />
              </View>
              <Text style={styles.statusLabel}>Sắp đến hạn</Text>
              <Text style={styles.statusValue}>1</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIcon, { backgroundColor: '#D1FAE5' }]}>
                <FileText size={20} color="#059669" />
              </View>
              <Text style={styles.statusLabel}>Đã hoàn thành</Text>
              <Text style={styles.statusValue}>2</Text>
            </View>
            <View style={styles.statusItem}>
              <View style={[styles.statusIcon, { backgroundColor: '#DBEAFE' }]}>
                <Calendar size={20} color="#1E40AF" />
              </View>
              <Text style={styles.statusLabel}>Tổng số kỳ</Text>
              <Text style={styles.statusValue}>3</Text>
            </View>
          </View>
        </View>

        {/* Tax Obligations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nghĩa vụ thuế</Text>
          {taxObligations.map((obligation) => (
            <View key={obligation.id} style={styles.obligationCard}>
              <View style={styles.obligationHeader}>
                <Text style={styles.obligationType}>{obligation.type}</Text>
                <View style={[
                  styles.obligationStatus, 
                  obligation.status === 'Đã nộp' ? styles.statusPaid : styles.statusPending
                ]}>
                  <Text style={styles.obligationStatusText}>{obligation.status}</Text>
                </View>
              </View>
              <Text style={styles.obligationPeriod}>{obligation.period}</Text>
              <View style={styles.obligationDetails}>
                <Text style={styles.obligationAmount}>Số tiền: {obligation.amount} ₫</Text>
                <Text style={styles.obligationDue}>Hạn cuối: {obligation.dueDate}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionContent}>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>{transaction.amount} ₫</Text>
                <Text style={styles.transactionStatus}>{transaction.status}</Text>
              </View>
            </View>
          ))}
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
  backButton: {
    marginRight: 15,
    padding: 4,
  },
  header: {
    backgroundColor: '#059669',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  businessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  businessHeader: {
    marginBottom: 16,
  },
  businessNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeStatus: {
    backgroundColor: '#D1FAE5',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  businessInfo: {
    paddingVertical: 4,
  },
  businessInfoItem: {
    marginBottom: 8,
  },
  businessName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  businessDetail: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  section: {
    marginTop: 24,
  },
  obligationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  obligationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  obligationType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  obligationStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusPaid: {
    backgroundColor: '#D1FAE5',
  },
  statusPending: {
    backgroundColor: '#FEE2E2',
  },
  obligationStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  obligationPeriod: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  obligationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  obligationAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  obligationDue: {
    fontSize: 14,
    color: '#6B7280',
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionContent: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  transactionStatus: {
    fontSize: 14,
    color: '#059669',
  },
});

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Download, Eye, Calendar, Users, RefreshCw } from 'lucide-react-native';
import { useState } from 'react';
import ChatbotButton from '@/components/ChatbotButton';
import UniversalChatbot from '@/components/UniversalChatbot';

export default function PersonalTaxScreen() {
  const [showChatbot, setShowChatbot] = useState(false);

  const taxDeclarations = [
    { id: 1, year: '2024', status: 'Đã nộp', amount: '2.500.000', date: '15/03/2024', type: 'finalized' },
    { id: 2, year: '2023', status: 'Đã hoàn thuế', amount: '1.200.000', date: '28/03/2023', type: 'refunded' },
    { id: 3, year: '2022', status: 'Đã nộp', amount: '3.100.000', date: '25/03/2022', type: 'finalized' },
  ];

  const quickServices = [
    { id: 1, title: 'Kê khai thuế TNCN năm 2024', icon: FileText, description: 'Nộp tờ khai thuế thu nhập cá nhân', color: '#059669' },
    { id: 2, title: 'Đăng ký người phụ thuộc', icon: Users, description: 'Thêm hoặc cập nhật thông tin người phụ thuộc', color: '#059669' },
    { id: 3, title: 'Yêu cầu hoàn thuế', icon: RefreshCw, description: 'Nộp đơn yêu cầu hoàn thuế TNCN', color: '#10B981' },
    { id: 4, title: 'Lịch sử khấu trừ thuế', icon: Calendar, description: 'Xem chi tiết thuế đã khấu trừ', color: '#34D399' },
  ];

  const dependents = [
    { id: 1, name: 'Nguyễn Thị Bình', relationship: 'Vợ/Chồng', status: 'Đã duyệt' },
    { id: 2, name: 'Nguyễn Văn Bình', relationship: 'Con', status: 'Đã duyệt' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <UniversalChatbot
        visible={showChatbot}
        onClose={() => setShowChatbot(false)}
        chatType="personal"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thuế Thu Nhập Cá Nhân</Text>
        <Text style={styles.headerSubtitle}>Quản lý thuế TNCN của bạn</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tax Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Tổng quan năm 2024</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Thu nhập chịu thuế</Text>
              <Text style={styles.summaryValue}>450.000.000 ₫</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Thuế đã khấu trừ</Text>
              <Text style={styles.summaryValue}>18.750.000 ₫</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Thuế phải nộp</Text>
              <Text style={[styles.summaryValue, styles.taxOwed]}>2.500.000 ₫</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Tình trạng</Text>
              <Text style={[styles.summaryValue, styles.statusCompleted]}>Đã hoàn thành</Text>
            </View>
          </View>
        </View>

        {/* Quick Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dịch vụ thuế TNCN</Text>
          {quickServices.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceCard}>
              <View style={[styles.serviceIcon, { backgroundColor: `${service.color}15` }]}>
                <service.icon size={24} color={service.color} />
              </View>
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <View style={styles.serviceArrow}>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tax Declarations History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lịch sử kê khai</Text>
          {taxDeclarations.map((declaration) => (
            <View key={declaration.id} style={styles.declarationCard}>
              <View style={styles.declarationHeader}>
                <Text style={styles.declarationYear}>Năm {declaration.year}</Text>
                <View style={[styles.statusBadge, (styles as any)[`status${declaration.type}`]]}>
                  <Text style={styles.statusText}>{declaration.status}</Text>
                </View>
              </View>
              <View style={styles.declarationDetails}>
                <Text style={styles.declarationAmount}>Số tiền: {declaration.amount} ₫</Text>
                <Text style={styles.declarationDate}>Ngày nộp: {declaration.date}</Text>
              </View>
              <View style={styles.declarationActions}>
                <TouchableOpacity style={[styles.actionButton, styles.firstActionButton]}>
                  <Eye size={16} color="#1E40AF" style={styles.actionIcon} />
                  <Text style={styles.actionText}>Xem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Download size={16} color="#1E40AF" style={styles.actionIcon} />
                  <Text style={styles.actionText}>Tải về</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Dependents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Người phụ thuộc</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Thêm</Text>
            </TouchableOpacity>
          </View>
          {dependents.map((dependent) => (
            <View key={dependent.id} style={styles.dependentCard}>
              <View style={styles.dependentInfo}>
                <Text style={styles.dependentName}>{dependent.name}</Text>
                <Text style={styles.dependentRelationship}>{dependent.relationship}</Text>
              </View>
              <View style={styles.dependentStatus}>
                <Text style={styles.dependentStatusText}>{dependent.status}</Text>
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
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  taxOwed: {
    color: '#DC2626',
  },
  statusCompleted: {
    color: '#059669',
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
  addButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  serviceArrow: {
    padding: 8,
  },
  arrowText: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  declarationCard: {
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
  declarationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  declarationYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusfinalized: {
    backgroundColor: '#D1FAE5',
  },
  statusrefunded: {
    backgroundColor: '#DBEAFE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
  },
  declarationDetails: {
    marginBottom: 12,
  },
  declarationAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  declarationDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  declarationActions: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  firstActionButton: {
    marginRight: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 2,
  },
  actionIcon: {
    marginRight: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '500',
  },
  dependentCard: {
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
  dependentInfo: {
    flex: 1,
  },
  dependentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  dependentRelationship: {
    fontSize: 14,
    color: '#6B7280',
  },
  dependentStatus: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dependentStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#059669',
  },
});
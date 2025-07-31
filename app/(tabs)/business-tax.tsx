import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Building2, FileText, Receipt, Calendar, TrendingUp, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import ChatbotButton from '@/components/ChatbotButton';
import UniversalChatbot from '@/components/UniversalChatbot';

export default function BusinessTaxScreen() {
  const [showChatbot, setShowChatbot] = useState(false);

  const businessServices = [
    { 
      id: 1, 
      title: 'Kê khai thuế GTGT tháng', 
      icon: Receipt, 
      description: 'Nộp tờ khai thuế GTGT hàng tháng',
      color: '#059669',
      urgent: false
    },
    { 
      id: 2, 
      title: 'Kê khai thuế môn bài', 
      icon: Building2, 
      description: 'Nộp thuế môn bài hàng năm',
      color: '#059669',
      urgent: true
    },
    { 
      id: 3, 
      title: 'Quản lý hóa đơn điện tử', 
      icon: FileText, 
      description: 'Xem và quản lý hóa đơn điện tử',
      color: '#10B981',
      urgent: false
    },
    { 
      id: 4, 
      title: 'Báo cáo tài chính', 
      icon: TrendingUp, 
      description: 'Nộp báo cáo tài chính định kỳ',
      color: '#34D399',
      urgent: false
    },
  ];

  const businessInfo = [
    {
      id: 1,
      name: 'Cửa hàng tạp hóa Hoa Mai',
      taxCode: '8765432109',
      address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
      businessType: 'Hộ kinh doanh cá thể',
      registrationDate: '15/01/2020',
      status: 'Hoạt động',
      revenue: '2.5 tỷ VNĐ'
    },
    {
      id: 2,
      name: 'Quán Cà Phê Sài Gòn',
      taxCode: '9876543210',
      address: '456 Đường DEF, Phường KLM, Quận 3, TP.HCM',
      businessType: 'Công ty TNHH',
      registrationDate: '20/08/2021',
      status: 'Hoạt động',
      revenue: '1.8 tỷ VNĐ'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <UniversalChatbot
        visible={showChatbot}
        onClose={() => setShowChatbot(false)}
        chatType="business"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thuế Doanh Nghiệp</Text>
        <Text style={styles.headerSubtitle}>Quản lý thuế hộ kinh doanh</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Business Info */}
        <View style={styles.section}>
          <Text style={styles.mainSectionTitle}>Danh sách doanh nghiệp</Text>
          {businessInfo.map((business) => (
            <View key={business.id} style={styles.businessCard}>
              <View style={styles.businessHeader}>
                <Text style={styles.sectionTitle}>{business.name}</Text>
                <View style={[styles.statusBadge, business.status === 'Hoạt động' ? styles.activeStatus : styles.inactiveStatus]}>
                  <Text style={styles.statusText}>{business.status}</Text>
                </View>
              </View>
              <View style={styles.businessInfo}>
                <Text style={styles.businessDetail}>MST: {business.taxCode}</Text>
                <Text style={styles.businessDetail}>Loại hình: {business.businessType}</Text>
                <Text style={styles.businessDetail}>Đăng ký từ: {business.registrationDate}</Text>
                <Text style={styles.businessDetail}>Doanh thu năm: {business.revenue}</Text>
              </View>
              <TouchableOpacity 
                style={styles.viewMoreButton} 
                onPress={() => router.push(`/business-details?id=${business.id}`)}
              >
                <Text style={styles.viewMoreText}>
                  Xem chi tiết
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Business Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dịch vụ thuế doanh nghiệp</Text>
          {businessServices.map((service) => (
            <TouchableOpacity key={service.id} style={[styles.serviceCard, service.urgent && styles.urgentService]}>
              <View style={[styles.serviceIcon, { backgroundColor: `${service.color}15` }]}>
                <service.icon size={24} color={service.color} />
              </View>
              <View style={styles.serviceContent}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  {service.urgent && (
                    <View style={styles.urgentBadge}>
                      <Text style={styles.urgentText}>Gấp</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <View style={styles.serviceArrow}>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </TouchableOpacity>
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
  businessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  mainSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeStatus: {
    backgroundColor: '#D1FAE5',
  },
  inactiveStatus: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  businessInfo: {
    marginBottom: 8,
  },
  businessName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  businessDetail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  section: {
    marginTop: 24,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
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
  urgentService: {
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
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
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  urgentBadge: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
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
  viewMoreButton: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
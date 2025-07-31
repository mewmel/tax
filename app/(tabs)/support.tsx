import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, FileText, MapPin, Phone, Search, BookOpen, Video, CircleHelp as HelpCircle } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import UniversalChatbot from '@/components/UniversalChatbot';
import ChatbotButton from '@/components/ChatbotButton';

export default function SupportScreen() {
  const [showChatbot, setShowChatbot] = useState(false);
  const quickHelp = [
    { 
      id: 1, 
      title: 'Cách kê khai thuế TNCN', 
      icon: FileText, 
      category: 'Hướng dẫn',
      color: '#059669' 
    },
    { 
      id: 2, 
      title: 'Tra cứu cơ quan thuế', 
      icon: MapPin, 
      category: 'Địa điểm',
      color: '#059669' 
    },
    { 
      id: 3, 
      title: 'Trợ lý ảo AI', 
      icon: MessageCircle, 
      category: 'Trợ lý ảo',
      color: '#10B981' 
    },
    { 
      id: 4, 
      title: 'Đặt lịch hẹn', 
      icon: Phone, 
      category: 'Tư vấn',
      color: '#34D399' 
    },
  ];

  const handleQuickHelpPress = (item: any) => {
    if (item.id === 3) {
      setShowChatbot(true);
    } else if (item.id === 4) {
      router.push('/support-channels');
    } else if (item.id === 2) {
      router.push('/tax-offices');
    }
    // Handle other quick help items if needed
  };

  const popularQuestions = [
    {
      id: 1,
      question: 'Làm thế nào để kê khai thuế TNCN online?',
      category: 'Kê khai thuế',
      views: '1.2k lượt xem'
    },
    {
      id: 2,
      question: 'Thời hạn nộp thuế TNCN năm 2024 là khi nào?',
      category: 'Thời hạn',
      views: '856 lượt xem'
    },
    {
      id: 3,
      question: 'Cách đăng ký người phụ thuộc giảm trừ gia cảnh?',
      category: 'Giảm trừ',
      views: '743 lượt xem'
    },
    {
      id: 4,
      question: 'Quy trình hoàn thuế TNCN như thế nào?',
      category: 'Hoàn thuế',
      views: '692 lượt xem'
    },
  ];

  const taxOffices = [
    {
      id: 1,
      name: 'Cục Thuế TP. Hồ Chí Minh',
      address: '126 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
      phone: '(028) 3930 3456',
      hours: '7:30 - 11:30, 13:30 - 17:00',
      distance: '2.5 km'
    },
    {
      id: 2,
      name: 'Chi cục Thuế Quận 1',
      address: '15-17 Nguyễn Huệ, Q.1, TP.HCM',
      phone: '(028) 3822 7890',
      hours: '7:30 - 11:30, 13:30 - 17:00',
      distance: '1.8 km'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <UniversalChatbot
        visible={showChatbot}
        onClose={() => setShowChatbot(false)}
        chatType="support"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông Tin & Hỗ Trợ</Text>
        <Text style={styles.headerSubtitle}>Trung tâm trợ giúp VN-Thuế</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm câu hỏi, hướng dẫn..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Quick Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trợ giúp nhanh</Text>
          <View style={styles.quickHelpGrid}>
            {quickHelp.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.quickHelpCard}
                onPress={() => handleQuickHelpPress(item)}
              >
                <View style={[styles.quickHelpIcon, { backgroundColor: `${item.color}15` }]}>
                  <item.icon size={24} color={item.color} />
                </View>
                <Text style={styles.quickHelpTitle}>{item.title}</Text>
                <Text style={styles.quickHelpCategory}>{item.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Questions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Câu hỏi phổ biến</Text>
          {popularQuestions.map((faq) => (
            <TouchableOpacity key={faq.id} style={styles.faqCard}>
              <View style={styles.faqContent}>
                <HelpCircle size={20} color="#1E40AF" />
                <View style={styles.faqText}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <View style={styles.faqMeta}>
                    <Text style={styles.faqCategory}>{faq.category}</Text>
                    <Text style={styles.faqViews}>{faq.views}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.faqArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>Liên hệ khẩn cấp</Text>
          <Text style={styles.emergencyDescription}>
            Nếu gặp sự cố nghiêm trọng hoặc cần hỗ trợ gấp, vui lòng liên hệ:
          </Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Phone size={20} color="#FFFFFF" />
            <Text style={styles.emergencyButtonText}>1900 9999</Text>
          </TouchableOpacity>
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
  searchContainer: {
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#064E3B',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 2,
  },
  viewAllIcon: {
    marginLeft: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  quickHelpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickHelpCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quickHelpIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickHelpTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickHelpCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  faqCard: {
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
  faqContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  faqText: {
    flex: 1,
    marginLeft: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 22,
  },
  faqMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  faqCategory: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '500',
  },
  faqViews: {
    fontSize: 12,
    color: '#6B7280',
  },
  faqArrow: {
    fontSize: 20,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  emergencyCard: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: '#B91C1C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emergencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
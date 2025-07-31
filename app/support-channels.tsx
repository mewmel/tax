import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Video, BookOpen, MessageCircle, ArrowLeft } from 'lucide-react-native';
import { Stack, router } from 'expo-router';

export default function SupportChannelsScreen() {
  const supportChannels = [
    {
      id: 1,
      title: 'Tổng đài 24/7',
      subtitle: '1900 9xxx',
      description: 'Hỗ trợ qua điện thoại',
      detailedDescription: 'Dịch vụ tổng đài hoạt động 24/7 để hỗ trợ các thắc mắc về thuế. Bạn có thể gọi bất cứ lúc nào để được tư vấn trực tiếp từ chuyên viên.',
      icon: Phone,
      color: '#1E40AF',
      available: true
    },
    {
      id: 2,
      title: 'Video call tư vấn',
      subtitle: 'Đặt lịch trước',
      description: 'Tư vấn trực tiếp qua video',
      detailedDescription: 'Đặt lịch hẹn để được tư vấn trực tiếp qua video call với chuyên viên thuế. Thời gian làm việc: 8:00 - 17:00, thứ 2 - thứ 6.',
      icon: Video,
      color: '#059669',
      available: false
    },
    {
      id: 3,
      title: 'Trung tâm trợ giúp',
      subtitle: 'Hướng dẫn chi tiết',
      description: 'Tài liệu và video hướng dẫn',
      detailedDescription: 'Kho tài liệu đầy đủ với các video hướng dẫn, biểu mẫu, và tài liệu pháp lý về thuế. Cập nhật liên tục theo quy định mới nhất.',
      icon: BookOpen,
      color: '#7C3AED',
      available: true
    },
    {
      id: 4,
      title: 'Email hỗ trợ',
      subtitle: 'support@vnthue.gov.vn',
      description: 'Gửi câu hỏi qua email',
      detailedDescription: 'Gửi câu hỏi chi tiết qua email và nhận phản hồi trong vòng 24 giờ. Thích hợp cho các vấn đề phức tạp cần giải thích kỹ.',
      icon: MessageCircle,
      color: '#EA580C',
      available: true
    },
  ];

  const handleBackPress = () => {
    router.back();
  };

  const handleChannelPress = (channel: any) => {
    // Handle different channel actions
    switch (channel.id) {
      case 1:
        // Handle phone call
        break;
      case 2:
        // Handle video call booking
        break;
      case 3:
        // Navigate to help center
        break;
      case 4:
        // Handle email
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Kênh hỗ trợ',
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

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kênh Hỗ Trợ</Text>
        <Text style={styles.headerSubtitle}>Chọn kênh phù hợp để được hỗ trợ nhanh nhất</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {supportChannels.map((channel) => (
          <TouchableOpacity 
            key={channel.id} 
            style={[styles.channelCard, !channel.available && styles.channelUnavailable]}
            onPress={() => handleChannelPress(channel)}
          >
            <View style={[styles.channelIcon, { backgroundColor: `${channel.color}15` }]}>
              <channel.icon size={28} color={channel.available ? channel.color : '#9CA3AF'} />
            </View>
            
            <View style={styles.channelContent}>
              <View style={styles.channelHeader}>
                <Text style={[styles.channelTitle, !channel.available && styles.unavailableText]}>
                  {channel.title}
                </Text>
                <View style={styles.channelStatus}>
                  {channel.available ? (
                    <View style={styles.availableBadge}>
                      <Text style={styles.availableText}>Hoạt động</Text>
                    </View>
                  ) : (
                    <View style={styles.unavailableBadge}>
                      <Text style={styles.unavailableStatusText}>Tạm nghỉ</Text>
                    </View>
                  )}
                </View>
              </View>
              
              <Text style={[styles.channelSubtitle, !channel.available && styles.unavailableText]}>
                {channel.subtitle}
              </Text>
              
              <Text style={styles.channelDescription}>{channel.description}</Text>
              
              <Text style={styles.channelDetailedDescription}>
                {channel.detailedDescription}
              </Text>
              
              {channel.available && (
                <View style={styles.actionButtonContainer}>
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: channel.color }]}
                    onPress={() => handleChannelPress(channel)}
                  >
                    <Text style={styles.actionButtonText}>
                      {channel.id === 1 && 'Gọi ngay'}
                      {channel.id === 2 && 'Đặt lịch hẹn'}
                      {channel.id === 3 && 'Xem tài liệu'}
                      {channel.id === 4 && 'Gửi email'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

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
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
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
    paddingTop: 20,
  },
  channelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  channelUnavailable: {
    opacity: 0.6,
  },
  channelIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  channelContent: {
    flex: 1,
  },
  channelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  channelTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  channelStatus: {
    marginLeft: 12,
  },
  channelSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  channelDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  channelDetailedDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  availableBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availableText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  unavailableBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  unavailableStatusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  unavailableText: {
    color: '#9CA3AF',
  },
  actionButtonContainer: {
    alignItems: 'flex-start',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emergencyCard: {
    backgroundColor: '#DC2626',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
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
    borderRadius: 10,
    gap: 8,
  },
  emergencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

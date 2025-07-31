import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Phone, Clock, ArrowLeft, Navigation } from 'lucide-react-native';
import { Stack, router } from 'expo-router';

export default function TaxOfficesScreen() {
  const taxOffices = [
    {
      id: 1,
      name: 'Cục Thuế TP. Hồ Chí Minh',
      address: '126 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
      phone: '(028) 3930 3456',
      hours: '7:30 - 11:30, 13:30 - 17:00',
      distance: '2.5 km',
      coordinates: {
        lat: 10.7769,
        lng: 106.6955
      },
      description: 'Cơ quan quản lý thuế chính của thành phố, xử lý các vấn đề thuế phức tạp và các doanh nghiệp lớn.',
      services: [
        'Kê khai thuế doanh nghiệp',
        'Tư vấn thuế chuyên sâu',
        'Xử lý tranh chấp thuế',
        'Hoàn thuế cho doanh nghiệp'
      ]
    },
    {
      id: 2,
      name: 'Chi cục Thuế Quận 1',
      address: '15-17 Nguyễn Huệ, Q.1, TP.HCM',
      phone: '(028) 3822 7890',
      hours: '7:30 - 11:30, 13:30 - 17:00',
      distance: '1.8 km',
      coordinates: {
        lat: 10.7740,
        lng: 106.7030
      },
      description: 'Chi cục thuế phục vụ khu vực quận 1, chuyên về thuế cá nhân và doanh nghiệp nhỏ.',
      services: [
        'Kê khai thuế TNCN',
        'Đăng ký thuế mới',
        'Thu thuế hàng tháng',
        'Tư vấn thuế cơ bản'
      ]
    },
    {
      id: 3,
      name: 'Chi cục Thuế Quận 3',
      address: '230 Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM',
      phone: '(028) 3932 1567',
      hours: '7:30 - 11:30, 13:30 - 17:00',
      distance: '3.2 km',
      coordinates: {
        lat: 10.7808,
        lng: 106.6964
      },
      description: 'Chi cục thuế khu vực quận 3, phục vụ cộng đồng doanh nghiệp và cá nhân tại khu vực.',
      services: [
        'Kê khai thuế GTGT',
        'Thuế môn bài',
        'Đăng ký kinh doanh',
        'Tư vấn pháp luật thuế'
      ]
    },
    {
      id: 4,
      name: 'Chi cục Thuế Quận Bình Thạnh',
      address: '45 Đặng Văn Ngữ, Q. Bình Thạnh, TP.HCM',
      phone: '(028) 3899 4521',
      hours: '7:30 - 11:30, 13:30 - 17:00',
      distance: '4.1 km',
      coordinates: {
        lat: 10.8018,
        lng: 106.7122
      },
      description: 'Chi cục thuế quận Bình Thạnh, hỗ trợ các doanh nghiệp và cá nhân trong khu vực.',
      services: [
        'Kê khai thuế doanh nghiệp',
        'Thuế thu nhập cá nhân',
        'Đăng ký mã số thuế',
        'Hoàn thuế GTGT'
      ]
    }
  ];

  const handleBackPress = () => {
    router.back();
  };

  const handleDirections = (office: any) => {
    const { lat, lng } = office.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${office.name}`;
    
    Linking.openURL(url).catch(err => {
      console.error('Error opening Google Maps:', err);
      // Fallback to address search
      const addressUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;
      Linking.openURL(addressUrl);
    });
  };

  const handleCall = (phone: string) => {
    const phoneUrl = `tel:${phone.replace(/[^\d+]/g, '')}`;
    Linking.openURL(phoneUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Cơ quan thuế gần bạn',
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
        <Text style={styles.headerTitle}>Cơ Quan Thuế Gần Bạn</Text>
        <Text style={styles.headerSubtitle}>Tìm và liên hệ với cơ quan thuế thuận tiện nhất</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {taxOffices.map((office) => (
          <View key={office.id} style={styles.officeCard}>
            <View style={styles.officeHeader}>
              <View style={styles.officeIconContainer}>
                <MapPin size={24} color="#059669" />
              </View>
              <View style={styles.officeHeaderInfo}>
                <Text style={styles.officeName}>{office.name}</Text>
                <Text style={styles.officeDistance}>{office.distance}</Text>
              </View>
            </View>

            <Text style={styles.officeDescription}>{office.description}</Text>

            <View style={styles.officeDetails}>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.detailText}>{office.address}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.detailRow}
                onPress={() => handleCall(office.phone)}
              >
                <Phone size={16} color="#6B7280" />
                <Text style={[styles.detailText, styles.phoneLink]}>{office.phone}</Text>
              </TouchableOpacity>
              
              <View style={styles.detailRow}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.detailText}>{office.hours}</Text>
              </View>
            </View>

            <View style={styles.servicesContainer}>
              <Text style={styles.servicesTitle}>Dịch vụ chính:</Text>
              <View style={styles.servicesList}>
                {office.services.map((service, index) => (
                  <View key={index} style={styles.serviceItem}>
                    <View style={styles.serviceBullet} />
                    <Text style={styles.serviceText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.directionsButton}
                onPress={() => handleDirections(office)}
              >
                <Navigation size={16} color="#FFFFFF" />
                <Text style={styles.directionsButtonText}>Chỉ đường</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.callButton}
                onPress={() => handleCall(office.phone)}
              >
                <Phone size={16} color="#059669" />
                <Text style={styles.callButtonText}>Gọi điện</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Info Section */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Lưu ý quan trọng</Text>
          <Text style={styles.infoText}>
            • Mang theo CCCD/CMND khi đến làm việc{'\n'}
            • Chuẩn bị đầy đủ hồ sơ theo yêu cầu{'\n'}
            • Có thể đặt lịch hẹn trước để tiết kiệm thời gian{'\n'}
            • Thời gian xử lý hồ sơ: 5-15 ngày làm việc
          </Text>
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
  officeCard: {
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
  officeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  officeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  officeHeaderInfo: {
    flex: 1,
  },
  officeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  officeDistance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  officeDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  officeDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 4,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  phoneLink: {
    color: '#059669',
    fontWeight: '500',
  },
  servicesContainer: {
    marginBottom: 20,
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  servicesList: {
    paddingVertical: 3,
  },
  servicesListItem: {
    marginBottom: 6,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 4,
  },
  serviceIcon: {
    marginRight: 8,
  },
  serviceBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  serviceText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  firstActionButton: {
    marginRight: 12,
  },
  directionsButton: {
    flex: 1,
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingRight: 4,
  },
  directionsIcon: {
    marginRight: 8,
  },
  directionsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  callButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    paddingRight: 4,
  },
  callIcon: {
    marginRight: 8,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  infoCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: '#1E40AF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

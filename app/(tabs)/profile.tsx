import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Shield, Bell, Eye, Fingerprint, Smartphone, Lock, FileText, LogOut, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import ChatbotButton from '@/components/ChatbotButton';
import UniversalChatbot from '@/components/UniversalChatbot';

export default function ProfileScreen() {
  const [showChatbot, setShowChatbot] = useState(false);

  const userInfo = {
    fullName: 'Nguyễn Văn An',
    taxId: '8765432109',
    citizenId: '079123456789',
    email: 'nguyenvanan@email.com',
    phone: '0912345678',
    address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
    registrationDate: '15/01/2020',
    lastLogin: '25/12/2024 14:30'
  };

  const securitySettings = [
    { id: 1, title: 'Đăng nhập bằng vân tay', icon: Fingerprint, enabled: true, type: 'switch' },
    { id: 2, title: 'Đăng nhập bằng Face ID', icon: Eye, enabled: false, type: 'switch' },
    { id: 3, title: 'Xác thực 2 bước', icon: Smartphone, enabled: true, type: 'switch' },
    { id: 4, title: 'Thay đổi mật khẩu', icon: Lock, enabled: false, type: 'action' },
  ];

  const notificationSettings = [
    { id: 1, title: 'Thông báo đến hạn nộp thuế', enabled: true },
    { id: 2, title: 'Cập nhật chính sách thuế mới', enabled: true },
    { id: 3, title: 'Xác nhận giao dịch thành công', enabled: true },
    { id: 4, title: 'Nhắc nhở kê khai thuế', enabled: false },
    { id: 5, title: 'Thông báo qua email', enabled: true },
    { id: 6, title: 'Thông báo qua SMS', enabled: false },
  ];

  const menuItems = [
    { id: 1, title: 'Lịch sử hoạt động', icon: FileText, description: 'Xem các thao tác đã thực hiện' },
    { id: 2, title: 'Tài liệu thuế', icon: FileText, description: 'Quản lý hồ sơ thuế cá nhân' },
    { id: 3, title: 'Cài đặt bảo mật', icon: Shield, description: 'Quản lý tài khoản và bảo mật' },
    { id: 4, title: 'Liên kết VNeID', icon: Smartphone, description: 'Kết nối với định danh điện tử' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <UniversalChatbot
        visible={showChatbot}
        onClose={() => setShowChatbot(false)}
        chatType="general"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hồ Sơ & Bảo Mật</Text>
        <Text style={styles.headerSubtitle}>Quản lý tài khoản cá nhân</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={32} color="#FFFFFF" />
            </View>
            <View style={styles.verifiedBadge}>
              <Shield size={16} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userInfo.fullName}</Text>
            <Text style={styles.userTaxId}>MST: {userInfo.taxId}</Text>
            <Text style={styles.userDetail}>CCCD: {userInfo.citizenId}</Text>
            <View style={styles.verificationStatus}>
              <Shield size={16} color="#059669" style={styles.verificationIcon} />
              <Text style={styles.verifiedText}>Đã xác thực VNeID</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userInfo.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Số điện thoại</Text>
              <Text style={styles.infoValue}>{userInfo.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Địa chỉ</Text>
              <Text style={styles.infoValue}>{userInfo.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngày đăng ký</Text>
              <Text style={styles.infoValue}>{userInfo.registrationDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Đăng nhập gần nhất</Text>
              <Text style={styles.infoValue}>{userInfo.lastLogin}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Yêu cầu cập nhật thông tin</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt bảo mật</Text>
          <View style={styles.securityCard}>
            {securitySettings.map((setting) => (
              <View key={setting.id} style={styles.securityRow}>
                <View style={styles.securityLeft}>
                  <View style={styles.securityIcon}>
                    <setting.icon size={20} color="#1E40AF" />
                  </View>
                  <Text style={styles.securityTitle}>{setting.title}</Text>
                </View>
                {setting.type === 'switch' ? (
                  <Switch
                    value={setting.enabled}
                    onValueChange={() => {}}
                    trackColor={{ false: '#E5E7EB', true: '#1E40AF' }}
                    thumbColor={setting.enabled ? '#FFFFFF' : '#FFFFFF'}
                  />
                ) : (
                  <ChevronRight size={20} color="#9CA3AF" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt thông báo</Text>
          <View style={styles.notificationCard}>
            {notificationSettings.map((setting) => (
              <View key={setting.id} style={styles.notificationRow}>
                <Text style={styles.notificationTitle}>{setting.title}</Text>
                <Switch
                  value={setting.enabled}
                  onValueChange={() => {}}
                  trackColor={{ false: '#E5E7EB', true: '#1E40AF' }}
                  thumbColor={setting.enabled ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quản lý tài khoản</Text>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuCard}>
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}>
                  <item.icon size={20} color="#1E40AF" />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#DC2626" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>VN-Thuế v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 Tổng cục Thuế Việt Nam</Text>
          <Text style={styles.appDescription}>
            Ứng dụng thuế điện tử chính thức của Tổng cục Thuế
          </Text>
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.46,
    elevation: 9,
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#064E3B',
    marginBottom: 4,
  },
  userTaxId: {
    fontSize: 16,
    fontWeight: '500',
    color: '#059669',
    marginBottom: 4,
  },
  userDetail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  verificationIcon: {
    marginRight: 6,
  },
  verifiedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#059669',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#064E3B',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    flex: 2,
    textAlign: 'right',
  },
  editButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  securityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  securityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  securityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  securityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  menuCard: {
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
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  appVersion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  appCopyright: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, FileText, CreditCard, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Clock, X } from 'lucide-react-native';
import { useState } from 'react';
import ChatbotButton from '@/components/ChatbotButton';
import UniversalChatbot from '@/components/UniversalChatbot';

export default function HomeScreen() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const upcomingDeadlines = [
    { id: 1, title: 'Kê khai thuế TNCN năm 2024', date: '31/03/2025', type: 'deadline', urgent: true },
    { id: 2, title: 'Nộp thuế môn bài Q1/2025', date: '31/01/2025', type: 'payment', urgent: false },
  ];

  const notifications = [
    { id: 1, title: 'Thông báo mới về thuế TNCN', content: 'Quy định mới về mức giảm trừ gia cảnh...', time: '2 giờ trước', unread: true },
    { id: 2, title: 'Xác nhận nộp thuế thành công', content: 'Giao dịch 1.500.000 VNĐ đã được xử lý...', time: '1 ngày trước', unread: false },
  ];

  const quickActions = [
    { id: 1, title: 'Kê khai TNCN', icon: FileText, color: '#059669' },
    { id: 2, title: 'Nộp thuế', icon: CreditCard, color: '#059669' },
    { id: 3, title: 'Tra cứu MST', icon: FileText, color: '#10B981' },
    { id: 4, title: 'Lịch hẹn', icon: Calendar, color: '#34D399' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <UniversalChatbot
        visible={showChatbot}
        onClose={() => setShowChatbot(false)}
        chatType="general"
      />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Xin chào,</Text>
            <Text style={styles.userName}>Nguyễn Văn An</Text>
            <Text style={styles.taxId}>MST: 8765432109</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationIcon}
            onPress={() => setShowNotifications(true)}
          >
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tax Status Summary */}
        <View style={styles.statusCard}>
          <Text style={styles.sectionTitle}>Tình trạng thuế</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusItem}>
              <CheckCircle size={20} color="#059669" />
              <Text style={styles.statusText}>Đã hoàn thành</Text>
              <Text style={styles.statusValue}>3/5</Text>
            </View>
            <View style={styles.statusItem}>
              <Clock size={20} color="#F59E0B" />
              <Text style={styles.statusText}>Sắp đến hạn</Text>
              <Text style={styles.statusValue}>2</Text>
            </View>
            <View style={styles.statusItem}>
              <AlertCircle size={20} color="#DC2626" />
              <Text style={styles.statusText}>Quá hạn</Text>
              <Text style={styles.statusValue}>0</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Deadlines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Các hạn sắp tới</Text>
          {upcomingDeadlines.map((deadline) => (
            <TouchableOpacity key={deadline.id} style={[styles.deadlineCard, deadline.urgent && styles.urgentCard]}>
              <View style={styles.deadlineContent}>
                <View style={styles.deadlineInfo}>
                  <Text style={[styles.deadlineTitle, deadline.urgent && styles.urgentText]}>
                    {deadline.title}
                  </Text>
                  <Text style={styles.deadlineDate}>Hạn cuối: {deadline.date}</Text>
                </View>
                {deadline.urgent && (
                  <View style={styles.urgentBadge}>
                    <Text style={styles.urgentBadgeText}>Gấp</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={styles.quickActionCard}>
                <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
      
      {/* Notifications Modal */}
      <Modal
        visible={showNotifications}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNotifications(false)}
        presentationStyle="overFullScreen"
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowNotifications(false)}
          />
          <SafeAreaView style={styles.modalSafeArea}>
            <View style={styles.notificationsModal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Thông báo</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setShowNotifications(false)}
                >
                  <X size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
                {notifications.map((notification) => (
                  <TouchableOpacity key={notification.id} style={styles.notificationModalCard}>
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationHeader}>
                        <Text style={[styles.notificationTitle, notification.unread && styles.unreadTitle]}>
                          {notification.title}
                        </Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                      </View>
                      <Text style={styles.notificationText}>{notification.content}</Text>
                      {notification.unread && <View style={styles.unreadDot} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
      
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#D1FAE5',
    fontWeight: '400',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 4,
  },
  taxId: {
    fontSize: 14,
    color: '#D1FAE5',
    marginTop: 4,
  },
  notificationIcon: {
    position: 'relative',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusCard: {
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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  statusValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#064E3B',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  deadlineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  urgentCard: {
    borderLeftColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  deadlineContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadlineInfo: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064E3B',
  },
  urgentText: {
    color: '#D97706',
  },
  deadlineDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  urgentBadge: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  urgentBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#064E3B',
    marginTop: 8,
    textAlign: 'center',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  notificationContent: {
    position: 'relative',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#064E3B',
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  notificationText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  unreadDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#059669',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSafeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  notificationsModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  notificationModalCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
});
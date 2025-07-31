import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertCircle, Clock, Calendar, QrCode, Copy, CheckCircle } from 'lucide-react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import ChatbotButton from '@/components/ChatbotButton';
import { useState } from 'react';

export default function TaxPaymentScreen() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const { id } = useLocalSearchParams();

  // Data cho các khoản thuế cần nộp
  const taxPayments = {
    '1': {
      type: 'Thuế GTGT Q4/2024',
      amount: '8.500.000',
      dueDate: '20/01/2025',
      status: 'urgent',
      daysLeft: 3,
      description: 'Thuế Giá trị gia tăng quý 4 năm 2024',
      businessName: 'Cửa hàng tạp hóa Hoa Mai',
      taxCode: '8765432109',
      penalty: '250.000',
      totalAmount: '8.750.000'
    },
    '2': {
      type: 'Thuế TNCN năm 2024',
      amount: '2.500.000',
      dueDate: '31/03/2025',
      status: 'normal',
      daysLeft: 65,
      description: 'Thuế Thu nhập cá nhân năm 2024',
      businessName: 'Cửa hàng tạp hóa Hoa Mai',
      taxCode: '8765432109',
      penalty: '0',
      totalAmount: '2.500.000'
    }
  };

  const currentTax = taxPayments[id as '1' | '2'] || taxPayments['1'];
  
  // Khởi tạo với số tiền tổng cộng đã được hiển thị sẵn
  const [paymentAmount, setPaymentAmount] = useState(currentTax.totalAmount.replace('.', ''));

  // Thông tin thanh toán Kho bạc Nhà nước
  const treasuryPaymentInfo = {
    bankName: 'Kho bạc Nhà nước Việt Nam',
    accountNumber: '12110001010001',
    accountName: 'Thu ngân sách Nhà nước',
    bankCode: 'TREASURY_VN',
    qrContent: `${currentTax.taxCode}|${currentTax.totalAmount.replace('.', '')}|${currentTax.type}`,
    transferNote: `${currentTax.taxCode} ${currentTax.type}`
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return <AlertCircle size={20} color="#DC2626" />;
      case 'normal':
        return <Clock size={20} color="#EA580C" />;
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
      default:
        return '#F3F4F6';
    }
  };

  const handlePayment = () => {
    if (!paymentAmount) {
      Alert.alert('Lỗi', 'Vui lòng nhập số tiền cần nộp!');
      return;
    }
    
    // Hiển thị QR Code để thanh toán
    setShowQRCode(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    // Trong ứng dụng thực tế, bạn sẽ sử dụng Clipboard API
    Alert.alert('Đã sao chép', `${label} đã được sao chép!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Nộp thuế',
          headerStyle: { backgroundColor: '#059669' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tax Details */}
        <View style={[styles.taxDetailsCard, { backgroundColor: getStatusColor(currentTax.status) }]}>
          <View style={styles.taxHeader}>
            <View style={styles.taxInfo}>
              {getStatusIcon(currentTax.status)}
              <Text style={styles.taxType}>{currentTax.type}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={[
                styles.statusText,
                currentTax.status === 'urgent' ? styles.urgentText : styles.normalText
              ]}>
                Còn {currentTax.daysLeft} ngày
              </Text>
            </View>
          </View>
          
          <Text style={styles.taxDescription}>{currentTax.description}</Text>
          
          <View style={styles.businessInfo}>
            <Text style={styles.businessName}>{currentTax.businessName}</Text>
            <Text style={styles.businessTaxCode}>MST: {currentTax.taxCode}</Text>
          </View>

          <View style={styles.amountBreakdown}>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Thuế gốc:</Text>
              <Text style={styles.amountValue}>{currentTax.amount} ₫</Text>
            </View>
            {currentTax.penalty !== '0' && (
              <View style={styles.amountRow}>
                <Text style={styles.amountLabel}>Tiền phạt chậm nộp:</Text>
                <Text style={[styles.amountValue, styles.penaltyAmount]}>+{currentTax.penalty} ₫</Text>
              </View>
            )}
            <View style={[styles.amountRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Tổng cộng:</Text>
              <Text style={styles.totalAmount}>{currentTax.totalAmount} ₫</Text>
            </View>
          </View>

          <View style={styles.dueDateContainer}>
            <Calendar size={16} color="#6B7280" />
            <Text style={styles.dueDate}>Hạn cuối: {currentTax.dueDate}</Text>
          </View>
        </View>

        {/* Quick Payment Form */}
        <View style={styles.quickPaymentCard}>
          <Text style={styles.sectionTitle}>Nộp thuế nhanh</Text>
          <View style={styles.quickPaymentForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mã số thuế</Text>
              <TextInput
                style={styles.textInput}
                value={currentTax.taxCode}
                editable={false}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Số tiền (VNĐ)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Nhập số tiền cần nộp"
                keyboardType="numeric"
                value={paymentAmount}
                onChangeText={setPaymentAmount}
              />
              <TouchableOpacity 
                style={styles.suggestAmountButton}
                onPress={() => setPaymentAmount(currentTax.totalAmount.replace('.', ''))}
              >
                <Text style={styles.suggestAmountText}>Sử dụng số tiền: {currentTax.totalAmount} ₫</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thanh toán qua Kho bạc Nhà nước</Text>
          
          {!showQRCode ? (
            <View style={styles.paymentInfoCard}>
              <View style={styles.treasuryInfo}>
                <Text style={styles.treasuryTitle}>Kho bạc Nhà nước Việt Nam</Text>
                <Text style={styles.treasurySubtitle}>Thanh toán thuế điện tử</Text>
              </View>
              
              <View style={styles.paymentDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Số tài khoản:</Text>
                  <View style={styles.detailValueContainer}>
                    <Text style={styles.detailValue}>{treasuryPaymentInfo.accountNumber}</Text>
                    <TouchableOpacity onPress={() => copyToClipboard(treasuryPaymentInfo.accountNumber, 'Số tài khoản')}>
                      <Copy size={16} color="#1E40AF" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Tên tài khoản:</Text>
                  <Text style={styles.detailValue}>{treasuryPaymentInfo.accountName}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Nội dung chuyển khoản:</Text>
                  <View style={styles.detailValueContainer}>
                    <Text style={styles.detailValue}>{treasuryPaymentInfo.transferNote}</Text>
                    <TouchableOpacity onPress={() => copyToClipboard(treasuryPaymentInfo.transferNote, 'Nội dung chuyển khoản')}>
                      <Copy size={16} color="#1E40AF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.qrCodeCard}>
              <Text style={styles.qrTitle}>Quét mã QR để thanh toán</Text>
              
              <View style={styles.qrCodeContainer}>
                <View style={styles.qrCodePlaceholder}>
                  <QrCode size={120} color="#059669" />
                  <Text style={styles.qrCodeText}>Mã QR thanh toán</Text>
                </View>
              </View>
              
              <View style={styles.qrInstructions}>
                <Text style={styles.instructionTitle}>Hướng dẫn thanh toán:</Text>
                <Text style={styles.instructionText}>1. Mở ứng dụng ngân hàng của bạn</Text>
                <Text style={styles.instructionText}>2. Chọn chức năng "Quét mã QR"</Text>
                <Text style={styles.instructionText}>3. Quét mã QR trên màn hình</Text>
                <Text style={styles.instructionText}>4. Xác nhận thông tin và hoàn tất thanh toán</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => setShowQRCode(false)}
              >
                <Text style={styles.backButtonText}>Quay lại</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Payment Button */}
        <View style={styles.paymentButtonContainer}>
          <TouchableOpacity 
            style={[
              styles.paymentButton,
              !paymentAmount && styles.disabledButton
            ]}
            onPress={handlePayment}
            disabled={!paymentAmount}
          >
            <Text style={styles.paymentButtonText}>
              {showQRCode ? 'Xác nhận thanh toán' : `Tạo mã QR thanh toán ${paymentAmount ? `${paymentAmount.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ₫` : ''}`}
            </Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taxDetailsCard: {
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
  taxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taxInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  taxType: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  urgentText: {
    color: '#DC2626',
  },
  normalText: {
    color: '#EA580C',
  },
  taxDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  businessInfo: {
    marginBottom: 16,
  },
  businessName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  businessTaxCode: {
    fontSize: 14,
    color: '#6B7280',
  },
  amountBreakdown: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  penaltyAmount: {
    color: '#DC2626',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dueDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  quickPaymentCard: {
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
  quickPaymentForm: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#064E3B',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1FAE5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  suggestAmountButton: {
    marginTop: 4,
  },
  suggestAmountText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
  },
  paymentMethodCard: {
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
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedMethod: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  methodBalance: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedIcon: {
    marginLeft: 8,
  },
  paymentButtonContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  paymentButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // QR Payment Styles
  paymentInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  treasuryInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  treasuryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 4,
  },
  treasurySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  paymentDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  detailValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 2,
    justifyContent: 'flex-end',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'right',
  },
  qrCodeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
    textAlign: 'center',
    marginBottom: 20,
  },
  qrCodeContainer: {
    marginBottom: 20,
  },
  qrCodePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  qrCodeText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  qrInstructions: {
    alignItems: 'center',
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

# Universal Chatbot Components

## Tổng quan

Tôi đã tạo ra một hệ thống chatbot tái sử dụng cho toàn bộ ứng dụng VN-Thuế, bao gồm:

1. **UniversalChatbot** - Component chatbot modal đầy đủ tính năng
2. **ChatbotButton** - Button floating để mở chatbot (đã cải tiến)

## Cách sử dụng

### 1. UniversalChatbot Component

```tsx
import UniversalChatbot from '@/components/UniversalChatbot';

// Trong component của bạn
const [showChatbot, setShowChatbot] = useState(false);

// JSX
<UniversalChatbot
  visible={showChatbot}
  onClose={() => setShowChatbot(false)}
  chatType="business" // hoặc "personal", "support", "general"
  title="Trợ lý ảo VN-Thuế" // optional
  subtitle="Chuyên gia thuế doanh nghiệp" // optional
/>
```

#### Props:
- `visible`: boolean - Hiển thị/ẩn chatbot
- `onClose`: function - Callback khi đóng chatbot
- `chatType`: string - Loại chatbot ("business" | "personal" | "support" | "general")
- `title`: string (optional) - Tiêu đề chatbot
- `subtitle`: string (optional) - Phụ đề chatbot

#### Chat Types:
- **business**: Chuyên về thuế doanh nghiệp (GTGT, TNDN, Môn bài)
- **personal**: Chuyên về thuế cá nhân (TNCN, giảm trừ gia cảnh)
- **support**: Hỗ trợ chung (hướng dẫn, thủ tục)
- **general**: Tổng quát về tất cả loại thuế

### 2. ChatbotButton Component (Cải tiến)

```tsx
import ChatbotButton from '@/components/ChatbotButton';

// JSX
<ChatbotButton 
  onPress={() => setShowChatbot(true)}
  backgroundColor="#059669" // optional, mặc định #059669
  iconColor="#FFFFFF" // optional, mặc định #FFFFFF
  size={24} // optional, mặc định 24
  style={customStyle} // optional, style tùy chỉnh
/>
```

#### Props:
- `onPress`: function - Callback khi nhấn button
- `backgroundColor`: string (optional) - Màu nền button
- `iconColor`: string (optional) - Màu icon
- `size`: number (optional) - Kích thước icon
- `style`: ViewStyle (optional) - Style tùy chỉnh

## Tính năng

### UniversalChatbot:
- ✅ Modal overlay với animation slide-up
- ✅ AI responses dựa trên loại chat
- ✅ Quick questions tự động theo context
- ✅ Message history với timestamps
- ✅ Input với multi-line support
- ✅ Scrollable message container
- ✅ Responsive design

### ChatbotButton:
- ✅ Floating button position
- ✅ Tùy chỉnh màu sắc và kích thước
- ✅ Shadow effects
- ✅ Customizable style

## Tích hợp sẵn trong các trang:

### Đã tích hợp:
- ✅ **business-details.tsx** - chatType: "business"
- ✅ **support.tsx** - chatType: "support"
- ✅ **personal-tax.tsx** - chatType: "personal"
- ✅ **business-tax.tsx** - chatType: "business"
- ✅ **index.tsx** - chatType: "general"
- ✅ **payment.tsx** - chatType: "general"
- ✅ **profile.tsx** - chatType: "general"

### AI Responses theo loại:

#### Business Tax:
- Thuế GTGT (cách tính, thuế suất, hạn nộp)
- Thuế TNDN (ưu đãi, thuế suất, quy định)
- Thuế Môn bài (mức thuế, điều kiện)
- Nghĩa vụ thuế hàng tháng/năm

#### Personal Tax:
- Kê khai thuế TNCN
- Giảm trừ gia cảnh và người phụ thuộc
- Biểu thuế suất theo bậc
- Thời hạn và quy trình

#### Support:
- Hướng dẫn sử dụng app
- Khôi phục mật khẩu
- Tra cứu hóa đơn điện tử
- Thông tin liên hệ hỗ trợ

#### General:
- Fallback responses thông minh
- Hướng dẫn chung về thuế
- Kết nối với chuyên viên

## Quick Questions tự động:

Mỗi loại chat có bộ câu hỏi gợi ý riêng:
- Business: "Thuế GTGT là gì?", "Hạn nộp thuế TNDN?", etc.
- Personal: "Cách kê khai thuế TNCN năm 2024?", "Mức giảm trừ gia cảnh?", etc.
- Support: "Làm thế nào để kê khai thuế online?", "Quên mật khẩu đăng nhập?", etc.

## Lợi ích:

1. **Tái sử dụng**: Một component cho toàn bộ app
2. **Consistency**: Giao diện và UX thống nhất
3. **Maintainability**: Dễ bảo trì và cập nhật
4. **Scalability**: Dễ thêm chat types mới
5. **Performance**: Tối ưu memory và rendering
6. **Customization**: Linh hoạt trong tùy chỉnh

## File Structure:
```
components/
├── UniversalChatbot.tsx    # Main chatbot component
└── ChatbotButton.tsx       # Floating button component
```

Bây giờ bạn có thể sử dụng chatbot ở bất kỳ trang nào trong app chỉ với vài dòng code!

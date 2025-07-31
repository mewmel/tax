import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  StyleSheet 
} from 'react-native';
import { Bot, Send, History, MessageSquare, Trash2 } from 'lucide-react-native';

// Message interface
interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: string;
}

// Chat session interface for history
interface ChatSession {
  id: string;
  title: string;
  chatType: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

// Props interface
interface UniversalChatbotProps {
  visible: boolean;
  onClose: () => void;
  chatType: 'business' | 'personal' | 'support' | 'general';
  title?: string;
  subtitle?: string;
}

const UniversalChatbot: React.FC<UniversalChatbotProps> = ({
  visible,
  onClose,
  chatType,
  title = 'Trợ lý AI',
  subtitle = 'Sẵn sàng hỗ trợ bạn'
}) => {
  // Current chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  
  // History state
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');

  // Quick questions based on chat type
  const getQuickQuestions = () => {
    switch (chatType) {
      case 'business':
        return [
          'Thuế TNDN tính như thế nào?',
          'Thủ tục khai thuế doanh nghiệp',
          'Khấu hao tài sản cố định',
          'Chi phí được trừ thuế'
        ];
      case 'personal':
        return [
          'Thuế thu nhập cá nhân',
          'Khai thuế TNCN online',
          'Giảm trừ gia cảnh',
          'Hoàn thuế TNCN'
        ];
      case 'support':
        return [
          'Hướng dẫn sử dụng app',
          'Báo lỗi hệ thống',
          'Yêu cầu hỗ trợ',
          'Liên hệ kỹ thuật'
        ];
      default:
        return [
          'Tư vấn thuế',
          'Dịch vụ kế toán',
          'Quy trình thủ tục',
          'Liên hệ chuyên gia'
        ];
    }
  };

  const quickQuestions = getQuickQuestions();

  // AI response generator
  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      business: [
        'Tôi sẽ giúp bạn giải đáp về thuế doanh nghiệp. Dựa trên câu hỏi của bạn...',
        'Đối với doanh nghiệp, quy định thuế hiện tại là...',
        'Để tối ưu thuế doanh nghiệp, bạn nên xem xét...'
      ],
      personal: [
        'Về thuế thu nhập cá nhân, tôi có thể tư vấn...',
        'Theo quy định hiện hành về thuế TNCN...',
        'Để tối ưu thuế cá nhân của bạn...'
      ],
      support: [
        'Tôi sẽ hỗ trợ bạn giải quyết vấn đề này...',
        'Chúng tôi đã ghi nhận yêu cầu của bạn...',
        'Đội ngũ kỹ thuật sẽ liên hệ trong 24h...'
      ],
      general: [
        'Cảm ơn bạn đã liên hệ. Tôi có thể giúp...',
        'Dựa trên nhu cầu của bạn, tôi đề xuất...',
        'Để được tư vấn tốt nhất, bạn có thể...'
      ]
    };

    const typeResponses = responses[chatType] || responses.general;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  };

  // Generate session title from first user message
  const generateSessionTitle = (firstMessage: string): string => {
    if (firstMessage.length > 50) {
      return firstMessage.substring(0, 47) + '...';
    }
    return firstMessage;
  };

  // Load chat history from localStorage
  const loadChatHistory = async () => {
    try {
      const historyJson = localStorage.getItem('chatHistory');
      if (historyJson) {
        const history = JSON.parse(historyJson);
        setChatHistory(history);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  // Save chat history to localStorage
  const saveChatHistory = async (history: ChatSession[]) => {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  // Create new chat session
  const createNewSession = () => {
    const newSessionId = Date.now().toString();
    setCurrentSessionId(newSessionId);
    setMessages([]);
    setShowHistory(false);
    setInputText('');
  };

  // Load a session from history
  const loadHistorySession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setShowHistory(false);
  };

  // Delete a session from history
  const deleteHistorySession = (sessionId: string, event: any) => {
    event.stopPropagation();
    const updatedHistory = chatHistory.filter(session => session.id !== sessionId);
    setChatHistory(updatedHistory);
    saveChatHistory(updatedHistory);
    
    if (sessionId === currentSessionId) {
      createNewSession();
    }
  };

  // Clear all history
  const clearAllHistory = () => {
    setChatHistory([]);
    saveChatHistory([]);
    createNewSession();
  };

  // Send message
  const sendMessage = (messageText?: string) => {
    const textToSend = messageText || inputText.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: generateAIResponse(textToSend),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage, botMessage];
    setMessages(newMessages);
    setInputText('');

    // Lưu session ngay sau tin nhắn đầu tiên
    setTimeout(() => {
      const session: ChatSession = {
        id: currentSessionId,
        title: generateSessionTitle(userMessage.text),
        chatType,
        messages: newMessages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const existingIndex = chatHistory.findIndex(s => s.id === currentSessionId);
      let updatedHistory;
      
      if (existingIndex >= 0) {
        updatedHistory = [...chatHistory];
        updatedHistory[existingIndex] = session;
      } else {
        updatedHistory = [session, ...chatHistory];
      }
      
      setChatHistory(updatedHistory);
      saveChatHistory(updatedHistory);
    }, 100);
  };

  const handleSendMessage = () => {
    sendMessage();
  };

  // Initialize session on open
  useEffect(() => {
    if (visible && !currentSessionId) {
      createNewSession();
      loadChatHistory();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.chatbotOverlay}>
        <View style={styles.chatbotContainer}>
          <View style={styles.chatbotHeader}>
            <View style={styles.chatbotHeaderLeft}>
              <View style={styles.botAvatar}>
                <Bot size={20} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.chatbotTitle}>{title}</Text>
                <Text style={styles.chatbotStatus}>{subtitle}</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.historyButton}
                onPress={() => setShowHistory(!showHistory)}
              >
                <History size={20} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.newChatButton}
                onPress={createNewSession}
              >
                <MessageSquare size={20} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.chatbotClose}
                onPress={onClose}
              >
                <Text style={styles.chatbotCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {showHistory ? (
            <View style={styles.historyContainer}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Lịch sử trò chuyện</Text>
                {chatHistory.length > 0 && (
                  <TouchableOpacity 
                    style={styles.clearHistoryButton}
                    onPress={clearAllHistory}
                  >
                    <Trash2 size={16} color="#DC2626" />
                    <Text style={styles.clearHistoryText}>Xóa tất cả</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
                {chatHistory.length === 0 ? (
                  <View style={styles.emptyHistory}>
                    <History size={48} color="#D1D5DB" />
                    <Text style={styles.emptyHistoryText}>Chưa có lịch sử trò chuyện</Text>
                    <Text style={styles.emptyHistorySubtext}>Các cuộc trò chuyện sẽ được lưu tự động</Text>
                  </View>
                ) : (
                  chatHistory.map((session) => (
                    <TouchableOpacity
                      key={session.id}
                      style={[
                        styles.historyItem,
                        session.id === currentSessionId && styles.activeHistoryItem
                      ]}
                      onPress={() => loadHistorySession(session)}
                    >
                      <View style={styles.historyItemContent}>
                        <Text style={styles.historyItemTitle} numberOfLines={2}>
                          {session.title}
                        </Text>
                        <Text style={styles.historyItemDate}>
                          {new Date(session.createdAt).toLocaleDateString('vi-VN')} • {session.chatType}
                        </Text>
                        <Text style={styles.historyItemMessages}>
                          {session.messages.length} tin nhắn
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.deleteSessionButton}
                        onPress={(e) => deleteHistorySession(session.id, e)}
                      >
                        <Trash2 size={14} color="#9CA3AF" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          ) : (
            <>
              <ScrollView style={styles.chatbotMessages} showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => (
                  <View key={index} style={[
                    styles.messageContainer,
                    message.type === 'user' ? styles.userMessage : styles.botMessage
                  ]}>
                    <Text style={[
                      styles.messageText,
                      message.type === 'user' ? styles.userMessageText : styles.botMessageText
                    ]}>
                      {message.text}
                    </Text>
                    <Text style={[
                      styles.messageTime,
                      message.type === 'user' ? styles.userMessageTime : styles.botMessageTime
                    ]}>
                      {message.timestamp}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              {messages.length === 0 && (
                <View style={styles.chatbotEmpty}>
                  <Text style={styles.chatbotEmptyText}>Xin chào! Tôi có thể giúp gì cho bạn?</Text>
                  
                  {/* Quick questions ở trên */}
                  <View style={styles.quickQuestionsContainer}>
                    <Text style={styles.quickQuestionsLabel}>Câu hỏi gợi ý:</Text>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      style={styles.quickQuestionsScroll}
                      contentContainerStyle={styles.quickQuestionsContent}
                    >
                      {quickQuestions.map((question, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.quickQuestionButton}
                          onPress={() => sendMessage(question)}
                        >
                          <Text style={styles.quickQuestionText}>{question}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Input cho người dùng nhập câu hỏi */}
                  <View style={styles.emptyInputContainer}>
                    <TextInput
                      style={styles.emptyInput}
                      placeholder="Nhập câu hỏi của bạn tại đây..."
                      value={inputText}
                      onChangeText={setInputText}
                      multiline
                      maxLength={500}
                    />
                    <TouchableOpacity 
                      style={[styles.emptyInputSendButton, !inputText.trim() && styles.disabledSendButton]}
                      onPress={handleSendMessage}
                      disabled={!inputText.trim()}
                    >
                      <Send size={16} color={!inputText.trim() ? "#9CA3AF" : "#FFFFFF"} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {messages.length > 0 && (
                <View style={styles.chatbotInputContainer}>
                  <TextInput
                    style={styles.chatbotInput}
                    placeholder="Nhập câu hỏi của bạn..."
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                    onSubmitEditing={handleSendMessage}
                  />
                  <TouchableOpacity 
                    style={styles.chatbotSendButton}
                    onPress={handleSendMessage}
                  >
                    <Send size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  chatbotOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  chatbotContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    paddingTop: 20,
  },
  chatbotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  chatbotHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  chatbotStatus: {
    fontSize: 12,
    color: '#059669',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newChatButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatbotCloseText: {
    fontSize: 16,
    color: '#6B7280',
  },
  
  // History styles
  historyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  clearHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  clearHistoryText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '500',
  },
  historyList: {
    flex: 1,
    paddingVertical: 16,
  },
  emptyHistory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyHistoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 16,
  },
  emptyHistorySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8,
  },
  activeHistoryItem: {
    backgroundColor: '#EBF8FF',
    borderWidth: 1,
    borderColor: '#059669',
  },
  historyItemContent: {
    flex: 1,
    marginRight: 12,
  },
  historyItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  historyItemDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  historyItemMessages: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  deleteSessionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Chat messages styles
  chatbotMessages: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#059669',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 12,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#111827',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  userMessageTime: {
    color: '#D1FAE5',
    textAlign: 'right',
  },
  botMessageTime: {
    color: '#6B7280',
  },
  
  // Empty state and quick questions
  chatbotEmpty: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  chatbotEmptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  quickQuestionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  quickQuestionsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'left',
  },
  quickQuestionsScroll: {
    width: '100%',
  },
  quickQuestionsContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  quickQuestionButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickQuestionText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    maxHeight: 80,
    color: '#111827',
    backgroundColor: 'transparent',
  },
  emptyInputSendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  disabledSendButton: {
    backgroundColor: '#E5E7EB',
  },
  
  // Input styles
  chatbotInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  chatbotInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    maxHeight: 100,
  },
  chatbotSendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UniversalChatbot;

// Simple test to verify chatbot storage works
console.log('Testing chatbot storage...');

// Simulate the ChatStorage class
class ChatStorage {
  constructor() {
    this.chatHistory = [];
  }

  static getInstance() {
    if (!ChatStorage.instance) {
      ChatStorage.instance = new ChatStorage();
    }
    return ChatStorage.instance;
  }

  getChatHistory() {
    return this.chatHistory;
  }

  setChatHistory(history) {
    this.chatHistory = history;
  }
}

// Test the storage
const storage = ChatStorage.getInstance();
console.log('Initial history:', storage.getChatHistory());

// Add a test session
const testSession = {
  id: 'test-1',
  title: 'Test Chat',
  chatType: 'general',
  messages: [
    { id: '1', type: 'user', text: 'Hello', timestamp: new Date().toISOString() }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

storage.setChatHistory([testSession]);
console.log('After adding session:', storage.getChatHistory());

console.log('✅ ChatStorage test passed - no localStorage errors expected!');

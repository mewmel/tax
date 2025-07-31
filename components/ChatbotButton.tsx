import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Bot } from 'lucide-react-native';

interface ChatbotButtonProps {
  onPress: () => void;
  backgroundColor?: string;
  iconColor?: string;
  size?: number;
  style?: ViewStyle;
}

export default function ChatbotButton({ 
  onPress, 
  backgroundColor = '#059669',
  iconColor = '#FFFFFF',
  size = 24,
  style
}: ChatbotButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.floatingButton, 
        { backgroundColor },
        style
      ]} 
      onPress={onPress}
    >
      <Bot size={size} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
  },
});
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function MessagingScreen() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your PawBite assistant. How can I help you with your pet today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch('http://172.20.10.2:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: 'Sorry, I encountered an error while processing your request.', sender: 'bot' }
      ]);
    }

    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E1" />
      <LinearGradient
        colors={['#FFF8E1', '#FFECB3']}
        style={styles.background}
      />
      
      <View style={styles.mainContainer}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FF9800" />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Image source={require('../assets/pawo.png')} style={styles.logoImage} />
            <Text style={styles.logoText}>PawBite</Text>
          </View>
          
          <View style={styles.placeholder} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Chat Assistant</Text>
          <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardAvoidView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          {/* CHAT MESSAGES */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View 
                style={[
                  styles.message, 
                  item.sender === 'user' ? styles.userMessage : styles.botMessage
                ]}
              >
                {item.sender === 'bot' && (
                  <View style={styles.botAvatarContainer}>
                    <Image source={require('../assets/paw1.png')} style={styles.botAvatar} />
                  </View>
                )}
                <View 
                  style={[
                    styles.messageBubble,
                    item.sender === 'user' ? styles.userBubble : styles.botBubble
                  ]}
                >
                  <Text 
                    style={[
                      styles.messageText,
                      item.sender === 'user' ? styles.userMessageText : styles.botMessageText
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            )}
            contentContainerStyle={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
          />

          {/* INPUT AREA */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask about your pet..."
              placeholderTextColor="#9E9E9E"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              returnKeyType="send"
              multiline
            />
            <TouchableOpacity 
              onPress={handleSend} 
              style={styles.sendButton}
              activeOpacity={0.8}
              disabled={!input.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color="#FFF" 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF8E1',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  logoImage: { 
    width: 30, 
    height: 30, 
    marginRight: 8 
  },
  logoText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#FF9800' 
  },
  placeholder: {
    width: 40,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#FF9800',
    letterSpacing: 1.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  messagesContainer: { 
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  message: { 
    flexDirection: 'row',
    marginVertical: 8,
    maxWidth: '85%',
  },
  userMessage: { 
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  botMessage: { 
    alignSelf: 'flex-start',
  },
  botAvatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  botAvatar: {
    width: 20,
    height: 20,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    maxWidth: '90%',
  },
  userBubble: {
    backgroundColor: '#FF9800',
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFF',
  },
  botMessageText: {
    color: '#212121',
  },
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginBottom: 0, // Add space for bottom navigation
  },
  input: { 
    flex: 1, 
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: { 
    backgroundColor: '#FF9800', 
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionsContainer: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    flexDirection: 'row',
  },
  
});
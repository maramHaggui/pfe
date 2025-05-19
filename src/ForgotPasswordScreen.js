import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  
  const handleResetPassword = () => {
    if (!email.trim()) {
      alert('Please enter your email address.');
      return;
    }
    
    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Show success message and navigate back to login
    alert('Password reset instructions have been sent to your email.');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E1" />
      <LinearGradient
        colors={['#FFF8E1', '#FFECB3']}
        style={styles.background}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
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

          <View style={styles.topContainer}>
            <Image
              source={require('../assets/lock.png')}
              style={styles.lockIcon}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>RESET YOUR PASSWORD</Text>
            
            <Text style={styles.description}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>
            
            <View style={styles.inputSection}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={handleResetPassword}
              activeOpacity={0.8}
            >
              <Text style={styles.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backToLoginButton}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}
            >
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    zIndex: 10,
    marginBottom:70
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
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  lockIcon: {
    width: 100,
    height: 100,
    tintColor: '#FF9800',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  inputSection: {
    width: '100%',
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 28,
    paddingHorizontal: 20,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  resetButton: {
    backgroundColor: '#FF9800',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  backToLoginButton: {
    marginTop: 10,
  },
  backToLoginText: {
    color: '#FF9800',
    fontSize: 16,
    fontWeight: '500',
  },
});
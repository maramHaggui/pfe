import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatVisible, setRepeatVisible] = useState(false);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSignUp = () => {
    // Validate inputs
    if (!fullName.trim()) {
      Alert.alert('Missing Information', 'Please enter your full name');
      return;
    }
    
    if (!email.trim()) {
      Alert.alert('Missing Information', 'Please enter your email');
      return;
    }
    
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    
    if (!username.trim()) {
      Alert.alert('Missing Information', 'Please enter a username');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password should be at least 6 characters long');
      return;
    }
    
    if (password !== repeatPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }
    
    // If all validations pass, navigate to the next screen
    navigation.navigate('WelcomeMessageScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E1" />
      <LinearGradient
        colors={['#FFF8E1', '#FFECB3']}
        style={styles.background}
      />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
          </View>

          <View style={styles.formContainer}>
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.inputSection}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#9E9E9E"
                    value={fullName}
                    onChangeText={setFullName}
                    style={styles.input}
                  />
                </View>
              </View>
              
              <View style={styles.inputSection}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Email Address"
                    placeholderTextColor="#9E9E9E"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
              </View>
              
              <View style={styles.inputSection}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor="#9E9E9E"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
              </View>
              
              <View style={styles.inputSection}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#9E9E9E"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    style={styles.input}
                  />
                  <TouchableOpacity 
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.eyeButton}
                  >
                    <Ionicons 
                      name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} 
                      size={20} 
                      color="#9E9E9E" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.inputSection}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#9E9E9E"
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                    secureTextEntry={!repeatVisible}
                    style={styles.input}
                  />
                  <TouchableOpacity 
                    onPress={() => setRepeatVisible(!repeatVisible)}
                    style={styles.eyeButton}
                  >
                    <Ionicons 
                      name={repeatVisible ? 'eye-off-outline' : 'eye-outline'} 
                      size={20} 
                      color="#9E9E9E" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.signupButton}
                onPress={handleSignUp}
                activeOpacity={0.8}
              >
                <Text style={styles.signupButtonText}>Sign Up</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Already have an account? Log In</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
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
  mainContainer: {
    flex: 1,
    paddingTop: 20,
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
    marginRight: 8,
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
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
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  inputSection: {
    marginBottom: 16,
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
  eyeButton: {
    padding: 8,
  },
  termsContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#FF9800',
    fontWeight: '500',
  },
  signupButton: {
    backgroundColor: '#FF9800',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: 'white',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#FF9800',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButtonText: {
    color: '#FF9800',
    fontSize: 16,
    fontWeight: '600',
  },
});
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
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const emailRegex = /^\S+@\S+\.\S+$/;

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert('Please fill in your email and password.');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address, ex: example@gmail.com');
      return;
    }
    navigation.navigate('MorePets');
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
          <View style={styles.topContainer}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#FF9800" />
              </TouchableOpacity>
              
              <View style={styles.logoContainer}>
                <Image source={require('../assets/pawo.png')} style={styles.icon} />
                <Text style={styles.title}>PawBite</Text>
              </View>
              
              <View style={styles.placeholder} />
            </View>

            <Image
              source={require('../assets/soura.png')}
              style={styles.petImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subtitleText}>SNACK TIME, ANYTIME!</Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#757575" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#9E9E9E"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#757575" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#9E9E9E"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#757575" 
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.optionsRow}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={isRememberMe}
                    onValueChange={setIsRememberMe}
                    color={isRememberMe ? '#FF9800' : undefined}
                    style={styles.checkbox}
                  />
                  <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.loginButton} 
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={20} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={20} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-apple" size={20} color="#000000" />
                </TouchableOpacity>
              </View>

              <View style={styles.signupRow}>
                <Text style={styles.accountText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  },
  topContainer: {
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  placeholder: {
    width: 40,
  },
  petImage: {
    width: width * 0.7,
    height: height * 0.15,
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 14,
    color: '#FF9800',
    letterSpacing: 1.5,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 56,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    width: '100%',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  eyeIcon: {
    padding: 5,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 4,
    width: 18,
    height: 18,
  },
  rememberText: {
    color: '#757575',
    fontSize: 14,
  },
  forgotPassword: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
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
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    color: '#9E9E9E',
    paddingHorizontal: 15,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountText: {
    fontSize: 14,
    color: '#757575',
  },
  signupText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: 'bold',
  },
});
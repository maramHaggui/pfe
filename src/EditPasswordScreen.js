import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function EditPasswordScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleUpdatePassword = () => {
    // Validate passwords
    if (!currentPassword) {
      Alert.alert('Missing Information', 'Please enter your current password');
      return;
    }
    
    if (!newPassword) {
      Alert.alert('Missing Information', 'Please enter a new password');
      return;
    }
    
    if (newPassword !== repeatPassword) {
      Alert.alert('Password Mismatch', 'New passwords do not match');
      return;
    }
    
    // Password update logic would go here
    
    // Show success message and navigate back
    Alert.alert('Success', 'Password updated successfully', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
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

          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Change Password</Text>
              <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
            </View>
            
            <View style={styles.contentContainer}>
              <View style={styles.formContainer}>
                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionTitleText}>Security Settings</Text>
                </View>
                
                <Text style={styles.formSubtitle}>
                  Create a new password that is at least 8 characters long
                </Text>

                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Current Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="Enter current password"
                      placeholderTextColor="#9E9E9E"
                      secureTextEntry={!showPassword}
                      style={styles.input}
                      value={currentPassword}
                      onChangeText={setCurrentPassword}
                    />
                    <TouchableOpacity 
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons 
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                        size={22} 
                        color="#757575" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>New Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="Enter new password"
                      placeholderTextColor="#9E9E9E"
                      secureTextEntry={!showNewPassword}
                      style={styles.input}
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />
                    <TouchableOpacity 
                      onPress={() => setShowNewPassword(!showNewPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons 
                        name={showNewPassword ? 'eye-off-outline' : 'eye-outline'} 
                        size={22} 
                        color="#757575" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Confirm New Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="Confirm new password"
                      placeholderTextColor="#9E9E9E"
                      secureTextEntry={!showRepeatPassword}
                      style={styles.input}
                      value={repeatPassword}
                      onChangeText={setRepeatPassword}
                    />
                    <TouchableOpacity 
                      onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons 
                        name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'} 
                        size={22} 
                        color="#757575" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={handleUpdatePassword}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Update Password</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.securityTipsContainer}>
                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionTitleText}>Password Tips</Text>
                </View>
                
                <View style={styles.tipsCard}>
                  <View style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                    <Text style={styles.tipText}>Use at least 6 characters</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                    <Text style={styles.tipText}>Include uppercase and lowercase letters</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                    <Text style={styles.tipText}>Include at least one number</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                    <Text style={styles.tipText}>Include at least one special character</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* QUICK ACTIONS */}
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={styles.quickActionButton} 
              onPress={() => navigation.navigate('MessagingScreen')}
            >
              <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate("Voice")}
            >
              <Ionicons name="mic" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* BOTTOM NAVIGATION */}
          <View style={styles.bottomNav}>
            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigation.navigate("Home")}
            >
              <Ionicons name="home-outline" size={24} color="#9E9E9E" />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.navItem}>
              <Ionicons name="camera-outline" size={24} color="#9E9E9E" />
              <Text style={styles.navText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigation.navigate('PetProfile2')}
            >
              <View style={styles.pawButtonContainer}>
                <Image source={require('../assets/petprofilg.png')} style={styles.pawButton} />
              </View>
              <Text style={styles.navText}>Pet</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigation.navigate('UserScreen')}
            >
              <MaterialIcons name="person" size={24} color="#FF9800" />
              <Text style={styles.navTextActive}>Profile</Text>
            </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  contentContainer: {
    paddingHorizontal: 20,
  },
  formContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  formSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
    marginBottom: 8,
    paddingLeft: 4,
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
  primaryButton: {
    backgroundColor: '#FF9800',
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  securityTipsContainer: {
    marginBottom: 30,
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 10,
  },
  quickActionsContainer: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    flexDirection: 'row',
  },
  quickActionButton: {
    backgroundColor: '#FF9800',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#FF9800',
    marginTop: 4,
    fontWeight: '500',
  },
  pawButtonContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pawButton: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
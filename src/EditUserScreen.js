import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function EditUserProfileScreen({ route }) {
  const navigation = useNavigation();
  
  // Get user data from route params or use defaults
  const userData = route?.params?.user || {};
  
  const [selectedImage, setSelectedImage] = useState(userData.image || null);
  const [name, setName] = useState(userData.name || 'UserName');
  const [email, setEmail] = useState(userData.email || 'username@gmail.com');
  const [phone, setPhone] = useState(userData.phone || '');
  const [location, setLocation] = useState(userData.location || '');

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access gallery is required!');
      return;
    }

    // Open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSave = () => {
    // Validate inputs
    if (!name.trim()) {
      Alert.alert('Missing Information', 'Please enter your name');
      return;
    }
    
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    
    // Save user profile logic would go here
    
    // Show success message and navigate back
    Alert.alert('Success', 'Profile updated successfully', [
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
              <Text style={styles.title}>Edit Profile</Text>
              <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
            </View>
            
            <View style={styles.contentContainer}>
              
              
              {/* FORM FIELDS */}
              <View style={styles.formContainer}>
                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionTitleText}>Personal Information</Text>
                </View>
                
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>UserName</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
                    <TextInput
                      placeholder="Enter your name"
                      placeholderTextColor="#9E9E9E"
                      value={name}
                      onChangeText={setName}
                      style={styles.input}
                    />
                  </View>
                </View>
                
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={20} color="#9E9E9E" style={styles.inputIcon} />
                    <TextInput
                      placeholder="Enter your email"
                      placeholderTextColor="#9E9E9E"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.input}
                    />
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={handleSave}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Save Changes</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.secondaryButton}
                  onPress={() => navigation.navigate('EditPasswordScreen')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.secondaryButtonText}>Change Password</Text>
                </TouchableOpacity>
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
    marginBottom:65
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
  },
  sectionTitle: {
    marginBottom: 15,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
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
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  primaryButton: {
    backgroundColor: '#FF9800',
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 16,
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
  secondaryButton: {
    backgroundColor: 'white',
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF9800',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#FF9800',
    fontSize: 18,
    fontWeight: '600',
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
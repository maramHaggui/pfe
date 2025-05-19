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

export default function EditPetProfileScreen({ route }) {
  const navigation = useNavigation();
  
  // Get pet data from route params or use defaults
  const petData = route?.params?.pet || {};
  
  const [selectedImage, setSelectedImage] = useState(petData.image || null);
  const [name, setName] = useState(petData.name || '');
  const [age, setAge] = useState(petData.age || '');
  const [weight, setWeight] = useState(petData.weight || '');
  const [breed, setBreed] = useState(petData.breed || '');
  const [gender, setGender] = useState(petData.gender || '');

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
  
  const handleSave = () => {
    // Validate inputs
    if (!name.trim()) {
      Alert.alert('Missing Information', 'Please enter your pet\'s name');
      return;
    }
    
    // Save pet profile logic would go here
    
    // Show success message and navigate back
    Alert.alert('Success', 'Pet profile updated successfully', [
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
              <Text style={styles.title}>Edit Pet Profile</Text>
              <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
            </View>
            
            <View style={styles.contentContainer}>
              {/* PROFILE IMAGE */}
              <View style={styles.imageContainer}>
                <LinearGradient
                  colors={['rgba(255,152,0,0.2)', 'rgba(255,152,0,0.1)']}
                  style={styles.imageGradient}
                  borderRadius={85}
                />
                <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                  <Image
                    source={
                      selectedImage
                        ? { uri: selectedImage }
                        : require('../assets/image.png')
                    }
                    style={styles.profileImage}
                  />
                  <View style={styles.cameraIconContainer}>
                    <Ionicons name="camera" size={18} color="#FFF" />
                  </View>
                </TouchableOpacity>
              </View>
              
              {/* FORM FIELDS */}
              <View style={styles.formContainer}>
                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionTitleText}>Pet Information</Text>
                </View>
                
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Pet Name</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="Enter pet name"
                      placeholderTextColor="#9E9E9E"
                      value={name}
                      onChangeText={setName}
                      style={styles.input}
                    />
                  </View>
                </View>
                
                <View style={styles.rowInputs}>
                  <View style={[styles.inputSection, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.inputLabel}>Age</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        placeholder="Years"
                        placeholderTextColor="#9E9E9E"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                        style={styles.input}
                      />
                    </View>
                  </View>
                  
                  <View style={[styles.inputSection, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.inputLabel}>Weight</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        placeholder="kg"
                        placeholderTextColor="#9E9E9E"
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric"
                        style={styles.input}
                      />
                    </View>
                  </View>
                </View>
                
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Breed</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      placeholder="Enter breed"
                      placeholderTextColor="#9E9E9E"
                      value={breed}
                      onChangeText={setBreed}
                      style={styles.input}
                    />
                  </View>
                </View>
                
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Gender</Text>
                  <View style={styles.genderOptions}>
                    <TouchableOpacity 
                      style={[
                        styles.genderButton,
                        gender === 'male' && styles.genderButtonSelected,
                      ]}
                      onPress={() => setGender('male')}
                    >
                      <Ionicons 
                        name="male" 
                        size={20} 
                        color={gender === 'male' ? "#FF9800" : "#757575"} 
                      />
                      <Text style={[
                        styles.genderText,
                        gender === 'male' && styles.genderTextSelected,
                      ]}>
                        Male
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.genderButton,
                        gender === 'female' && styles.genderButtonSelected,
                      ]}
                      onPress={() => setGender('female')}
                    >
                      <Ionicons 
                        name="female" 
                        size={20} 
                        color={gender === 'female' ? "#FF9800" : "#757575"} 
                      />
                      <Text style={[
                        styles.genderText,
                        gender === 'female' && styles.genderTextSelected,
                      ]}>
                        Female
                      </Text>
                    </TouchableOpacity>
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
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
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
              <Text style={styles.navTextActive}>Pet</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.navItem}
              onPress={() => navigation.navigate('UserScreen')}
            >
              <MaterialIcons name="person-outline" size={24} color="#9E9E9E" />
              <Text style={styles.navText}>Profile</Text>
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
    paddingBottom: 100,
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
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 30,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#FF9800',
    backgroundColor: '#fff',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF9800',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
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
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 28,
    paddingHorizontal: 20,
    height: 56,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: '#212121',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 28,
    paddingVertical: 15,
    paddingHorizontal: 24,
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  genderButtonSelected: {
    borderColor: '#FF9800',
    borderWidth: 2,
  },
  genderText: {
    fontSize: 16,
    color: '#757575',
    marginLeft: 8,
  },
  genderTextSelected: {
    color: '#FF9800',
    fontWeight: '600',
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
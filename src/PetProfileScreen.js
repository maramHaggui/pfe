import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Modal,
  SafeAreaView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { width, height } = Dimensions.get('window');

export default function PetProfileScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [birthday, setBirthday] = useState(null);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [sex, setSex] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [modalType, setModalType] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const openModal = (type) => {
    let options = [];
    if (type === 'species') {
      options = ['Dog', 'Cat', 'Rabbit', 'Other'];
    } else if (type === 'breed') {
      if (species === 'Dog') {
        options = [
          'Poodle', 'Maltese', 'French Bulldog', 'Cairn Terrier',
          'Cavalier King Charles', 'Chihuahua', 'Pug', 'Coton de Tulear', 'Pekingese', 'Lhasa Apso'
        ];
      } else if (species === 'Cat') {
        options = [
          'Abyssinian', 'American Curl', 'American Shorthair', 'Anatolian',
          'Turkish Angora', 'British Longhair'
        ];
      } else if (species === 'Rabbit') {
        options = [
          'Flemish Giant', 'French Lop', 'Burgundy Fawn', 'Mini Lop', 'Angora Rabbit'
        ];
      } else {
        options = ['Other breed'];
      }
    } else if (type === 'sex') {
      options = ['Male', 'Female'];
    }
    setModalOptions(options);
    setModalType(type);
    setModalVisible(true);
  };

  const selectOption = (option) => {
    if (modalType === 'species') {
      setSpecies(option);
      setBreed(''); // reset breed when species changes
    } else if (modalType === 'breed') {
      setBreed(option);
    } else if (modalType === 'sex') {
      setSex(option);
    }
    setModalVisible(false);
  };

  const handleSubmit = () => {
    // Validate form
    if (!name.trim()) {
      alert('Please enter your pet\'s name');
      return;
    }
    if (!species) {
      alert('Please select your pet\'s species');
      return;
    }
    if (!breed) {
      alert('Please select your pet\'s breed');
      return;
    }
    if (!birthday) {
  alert('Please select your pet\'s birthday');
  return;
}
    if (!sex) {
      alert('Please select your pet\'s sex');
      return;
    }
    
    // Navigate to home screen
    navigation.navigate('Home');
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
            <Text style={styles.title}>Pet Profile</Text>
            <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
          </View>
          
          <View style={styles.photoContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.photoWrapper}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.petPhoto} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="paw-outline" size={40} color="#FF9800" />
                  <Text style={styles.photoText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Pet Information</Text>
            
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Enter pet's name"
                  placeholderTextColor="#9E9E9E"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
            
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Species</Text>
              <TouchableOpacity 
                style={styles.inputWrapper}
                onPress={() => openModal('species')}
              >
                <Text style={species ? styles.inputText : styles.inputPlaceholder}>
                  {species || "Select species"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#9E9E9E" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Breed</Text>
              <TouchableOpacity 
                style={styles.inputWrapper}
                onPress={() => openModal('breed')}
                disabled={!species}
              >
                <Text style={breed ? styles.inputText : styles.inputPlaceholder}>
                  {breed || (species ? "Select breed" : "Select species first")}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#9E9E9E" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputSection}>
  <Text style={styles.inputLabel}>Birthday</Text>
  <TouchableOpacity
    style={styles.inputWrapper}
    onPress={() => setDatePickerVisibility(true)}
  >
    <Text style={birthday ? styles.inputText : styles.inputPlaceholder}>
      {birthday ? new Date(birthday).toLocaleDateString() : 'Select birth date'}
    </Text>
    <Ionicons name="calendar-outline" size={20} color="#9E9E9E" />
  </TouchableOpacity>
</View>

            
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Sex</Text>
              <TouchableOpacity 
                style={styles.inputWrapper}
                onPress={() => openModal('sex')}
              >
                <Text style={sex ? styles.inputText : styles.inputPlaceholder}>
                  {sex || "Select sex"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#9E9E9E" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Save Pet Profile</Text>
            </TouchableOpacity>
            
      
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Modal for selection options */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {modalType === 'species' ? 'Species' : modalType === 'breed' ? 'Breed' : 'Sex'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              {modalOptions.map((option, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.modalOption} 
                  onPress={() => selectOption(option)}
                >
                  <Text style={styles.modalOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
  isVisible={isDatePickerVisible}
  mode="date"
  onConfirm={(date) => {
    setBirthday(date.toISOString());
    setDatePickerVisibility(false);
  }}
  onCancel={() => setDatePickerVisibility(false)}
  maximumDate={new Date()}
/>

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
  placeholder: {
    width: 40,
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
  scrollContent: {
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
  photoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petPhoto: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  photoText: {
    color: '#FF9800',
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
    marginBottom: 8,
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
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  inputPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#9E9E9E',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  primaryButton: {
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
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  modalScrollView: {
    maxHeight: height * 0.5,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#212121',
  },
});
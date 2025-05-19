import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function PetProfileScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

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

  const handleDeletePet = () => {
    Alert.alert(
      "Delete Pet",
      "Are you sure you want to delete this pet's profile?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            // Add your delete logic here
            console.log("Pet account deleted");
            navigation.navigate('MorePets');
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E1" />
      <LinearGradient
        colors={['#FFF8E1', '#FFECB3']}
        style={styles.background}
      />
      
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/pawo.png')} style={styles.logoImage} />
            <Text style={styles.logoText}>PawBite</Text>
          </View>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setShowMenu(true)}
          >
            <Entypo name="menu" size={24} color="#FF9800" />
          </TouchableOpacity>
        </View>

        <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
          {/* TITLE */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Pet Profile</Text>
            <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
          </View>
          
          {/* PROFILE CONTENT */}
          <View style={styles.profileContainer}>
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
            
            <Text style={styles.petName}>Petname</Text>
            
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => navigation.navigate("EditPetProfile")}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Edit Pet Profile</Text>
            </TouchableOpacity>

            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>Pet Information</Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Species</Text>
                <Text style={styles.infoValue}>Dog</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Breed</Text>
                <Text style={styles.infoValue}>Golden Retriever</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Age</Text>
                <Text style={styles.infoValue}>2 years</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Sex</Text>
                <Text style={styles.infoValue}>Male</Text>
              </View>
            </View>

            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>Options</Text>
            </View>

            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={() => navigation.navigate('MorePets')}
              >
                <Ionicons name="paw-outline" size={22} color="#FF9800" style={styles.optionIcon} />
                <Text style={styles.optionText}>Pets List</Text>
                <Ionicons name="chevron-forward" size={22} color="#9E9E9E" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionButton}
                onPress={handleDeletePet}
              >
                <Ionicons name="trash-outline" size={22} color="#F44336" style={styles.optionIcon} />
                <Text style={[styles.optionText, styles.deleteText]}>Delete Pet Profile</Text>
                <Ionicons name="chevron-forward" size={22} color="#9E9E9E" />
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

          <TouchableOpacity style={styles.navItem}>
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
      

      {/* SIDE MENU MODAL */}
      {showMenu && (
        <View style={styles.menuOverlay}>
          <TouchableOpacity 
            style={styles.menuDismissArea} 
            onPress={() => setShowMenu(false)}
          />
          <View style={styles.sideMenu}>
            <View style={styles.menuHeader}>
              <Image source={require('../assets/pawo.png')} style={styles.menuLogo} />
              <Text style={styles.menuTitle}>PawBite</Text>
            </View>
            
            <View style={styles.menuItems}>
              <TouchableOpacity style={styles.menuItemRow}>
                <Ionicons name="warning-outline" size={24} color="#FF9800" />
                <Text style={styles.menuItem}>Alerts</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItemRow}
                onPress={() => {
                  setShowMenu(false);
                  navigation.navigate('Settings');
                }}
              >
                <Ionicons name="settings-outline" size={24} color="#FF9800" />
                <Text style={styles.menuItem}>Settings</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItemRow}>
                <Ionicons name="time-outline" size={24} color="#FF9800" />
                <Text style={styles.menuItem}>History</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItemRow}>
                <Ionicons name="help-circle-outline" size={24} color="#FF9800" />
                <Text style={styles.menuItem}>Help & Support</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItemRow}
                onPress={() => { 
                  setShowMenu(false); 
                  setTimeout(() => { navigation.navigate("Welcome"); }, 500); 
                }}
              >
                <Ionicons name="log-out-outline" size={24} color="#FF9800" />
                <Text style={styles.menuItem}>Disconnect</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.closeMenuButton} 
              onPress={() => setShowMenu(false)}
            >
              <Text style={styles.closeMenuText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
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
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
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
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
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
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#FF9800',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
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
  sectionTitle: {
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#757575',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  deleteText: {
    color: '#F44336',
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
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 1000,
  },
  menuDismissArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sideMenu: {
    backgroundColor: '#fff',
    width: width * 0.75,
    maxWidth: 300,
    paddingTop: 50,
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 10,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  menuItems: {
    marginTop: 20,
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItem: {
    fontSize: 16,
    color: '#212121',
    marginLeft: 15,
  },
  closeMenuButton: {
    marginTop: 40,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  closeMenuText: {
    fontSize: 16,
    color: '#757575',
  },
});
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Modal, 
  Pressable,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();

  const handleManual = () => {
    console.log("Manual Mode Selected");
    setShowDistributionModal(false);
    navigation.navigate('ManualModeScreen');
  };

  const handleAutomatic = () => {
    console.log("Automatic Mode Selected");
    setShowDistributionModal(false);
    navigation.navigate('AutomaticModeScreen');
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
        {/* WELCOME TEXT */}
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Hello, Pet Parent!</Text>
          <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
        </View>

        {/* PET IMAGE */}
        <View style={styles.imageWrapper}>
          <LinearGradient
            colors={['rgba(255,152,0,0.2)', 'rgba(255,152,0,0.1)']}
            style={styles.imageGradient}
            borderRadius={85}
          />
          <Image source={require('../assets/image.png')} style={styles.petImage} />
        </View>

        

        {/* DISTRIBUTION BUTTON */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setShowDistributionModal(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Method of Distribution</Text>
        </TouchableOpacity>
        
        {/* QUICK ACTIONS */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={() => navigation.navigate('MessagingScreen')}
            >
              <View style={styles.quickActionIconContainer}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FF9800" />
              </View>
              <Text style={styles.quickActionText}>Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={() => navigation.navigate('Voice')}
            >
              <View style={styles.quickActionIconContainer}>
                <Ionicons name="mic-outline" size={24} color="#FF9800" />
              </View>
              <Text style={styles.quickActionText}>Voice</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={() => navigation.navigate('PetProfile2')}
            >
              <View style={styles.quickActionIconContainer}>
                <Ionicons name="paw-outline" size={24} color="#FF9800" />
              </View>
              <Text style={styles.quickActionText}>Pet Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionItem}
              onPress={() => navigation.navigate('Settings')}
            >
              <View style={styles.quickActionIconContainer}>
                <Ionicons name="settings-outline" size={24} color="#FF9800" />
              </View>
              <Text style={styles.quickActionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#FF9800" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} >
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
          <MaterialIcons name="person-outline" size={24} color="#9E9E9E" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* DISTRIBUTION MODAL */}
      <Modal visible={showDistributionModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Mode</Text>
              <TouchableOpacity onPress={() => setShowDistributionModal(false)}>
                <Ionicons name="close" size={24} color="#757575" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.modalOption} 
              onPress={handleManual}
            >
              <View style={styles.modalIconContainer}>
                <Ionicons name="hand-left-outline" size={24} color="#FF9800" />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalOptionTitle}>Manual Mode</Text>
                <Text style={styles.modalOptionDescription}>
                  Control feeding manually whenever you want
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalOption} 
              onPress={handleAutomatic}
            >
              <View style={styles.modalIconContainer}>
                <Ionicons name="timer-outline" size={24} color="#FF9800" />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalOptionTitle}>Automatic Mode</Text>
                <Text style={styles.modalOptionDescription}>
                  Set up scheduled feeding times
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* SIDE MENU MODAL */}
      <Modal visible={showMenu} transparent animationType="slide">
        <View style={styles.menuOverlay}>
          <Pressable 
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
            
            <Pressable 
              style={styles.closeMenuButton} 
              onPress={() => setShowMenu(false)}
            >
              <Text style={styles.closeMenuText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  welcomeSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
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
  imageWrapper: { 
    alignItems: 'center', 
    marginVertical: 20,
    position: 'relative',
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#FF9800',
    backgroundColor: '#fff',
  },
  
  primaryButton: {
    backgroundColor: '#FF9800',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.1,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 18 
  },
  quickActionsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: width * 0.85,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
  },
  modalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  modalTextContainer: {
    flex: 1,
  },
  modalOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  modalOptionDescription: {
    fontSize: 14,
    color: '#757575',
  },
  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
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
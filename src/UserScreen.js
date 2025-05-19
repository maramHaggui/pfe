import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Modal, 
  Pressable, 
  Linking,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function UserScreen() {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();

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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>User Profile</Text>
            <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
          </View>
          
          {/* USER INFO */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <LinearGradient
                colors={['rgba(255,152,0,0.2)', 'rgba(255,152,0,0.1)']}
                style={styles.imageGradient}
                borderRadius={85}
              />
              <Image 
                source={require('../assets/user.png')} 
                style={styles.profileImage}
              />
            </View>
            
            <Text style={styles.userName}>UserName</Text>
            <View style={styles.emailContainer}>
              <Text style={styles.userEmail}>username@gmail.com</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Edituser")}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* OPTIONS */}
          <View style={styles.optionsContainer}>
            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>Account Settings</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => navigation.navigate("EditPasswordScreen")}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name="lock-closed-outline" size={22} color="#FF9800" />
              </View>
              <Text style={styles.optionText}>Change Password</Text>
              <Ionicons name="chevron-forward" size={22} color="#9E9E9E" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => navigation.navigate("Settings")}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name="settings-outline" size={22} color="#FF9800" />
              </View>
              <Text style={styles.optionText}>Settings</Text>
              <Ionicons name="chevron-forward" size={22} color="#9E9E9E" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => navigation.navigate("Welcome")}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name="log-out-outline" size={22} color="#F44336" />
              </View>
              <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
              <Ionicons name="chevron-forward" size={22} color="#9E9E9E" />
            </TouchableOpacity>
          </View>

          {/* SOCIAL MEDIA */}
          <View style={styles.socialMediaContainer}>
            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>Connect With Us</Text>
            </View>
            
            <View style={styles.socialCard}>
              <Text style={styles.socialText}>Find us on social media</Text>
              <View style={styles.iconsRow}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://www.facebook.com/maaramhaggui')}
                >
                  <Entypo name="facebook-with-circle" size={40} color="#3b5998" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://www.instagram.com/pawbite1')}
                >
                  <Entypo name="instagram-with-circle" size={40} color="#C13584" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => Linking.openURL('https://twitter.com')}
                >
                  <Entypo name="twitter-with-circle" size={40} color="#1DA1F2" />
                </TouchableOpacity>
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

          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="person" size={24} color="#FF9800" />
            <Text style={styles.navTextActive}>Profile</Text>
          </TouchableOpacity>
        </View>
      

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
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderColor: '#FF9800',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  emailContainer: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.3)',
  },
  userEmail: {
    color: '#FF9800',
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#FF9800',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
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
  optionsContainer: {
    paddingHorizontal: 20,
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
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  logoutText: {
    color: '#F44336',
  },
  socialMediaContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  socialCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  socialText: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    marginHorizontal: 12,
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
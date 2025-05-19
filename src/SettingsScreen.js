import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [darkTheme, setDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  useEffect(() => {
    // Load preferences on startup
    const loadPreferences = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme');
        const lang = await AsyncStorage.getItem('language');
        const alerts = await AsyncStorage.getItem('alerts');
        const notifications = await AsyncStorage.getItem('notifications');
        const sound = await AsyncStorage.getItem('sound');
  
        if (theme !== null) setDarkTheme(theme === 'dark');
        if (lang !== null) setSelectedLanguage(lang);
        if (alerts !== null) setAlertsEnabled(alerts === 'true');
        if (notifications !== null) setNotificationsEnabled(notifications === 'true');
        if (sound !== null) setSoundEnabled(sound === 'true');
      } catch (e) {
        console.log('Error loading preferences', e);
      }
    };
  
    loadPreferences();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };
  
  const toggleAlerts = async () => {
    const newValue = !alertsEnabled;
    setAlertsEnabled(newValue);
    await AsyncStorage.setItem('alerts', newValue.toString());
  };
  
  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem('notifications', newValue.toString());
  };
  
  const toggleSound = async () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    await AsyncStorage.setItem('sound', newValue.toString());
  };
  
  const changeLanguage = async (lang) => {
    setSelectedLanguage(lang);
    await AsyncStorage.setItem('language', lang);
  };

  return (
    <SafeAreaView style={[styles.container, darkTheme && { backgroundColor: '#222' }]}>
      <StatusBar barStyle={darkTheme ? "light-content" : "dark-content"} backgroundColor={darkTheme ? "#222" : "#FFF8E1"} />
      
      {!darkTheme && (
        <LinearGradient
          colors={['#FFF8E1', '#FFECB3']}
          style={styles.background}
        />
      )}
      
      
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.backButton, darkTheme && styles.backButtonDark]}
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
            <Text style={[styles.title, darkTheme && { color: '#fff' }]}>Settings</Text>
            <Text style={[styles.subtitle, darkTheme && { color: '#FF9800' }]}>SNACK TIME, ANYTIME!</Text>
          </View>

          {/* SETTINGS CONTENT */}
          <View style={styles.settingsContainer}>
            <View style={styles.settingSection}>
              <Text style={[styles.sectionTitle, darkTheme && { color: '#fff' }]}>Appearance</Text>
              
              <View style={[styles.settingCard, darkTheme && styles.settingCardDark]}>
                <View style={styles.settingItem}>
                  <View style={styles.settingLabelContainer}>
                    <Ionicons 
                      name="moon-outline" 
                      size={22} 
                      color={darkTheme ? "#FF9800" : "#757575"} 
                      style={styles.settingIcon}
                    />
                    <Text style={[styles.label, darkTheme && { color: '#fff' }]}>
                      Dark Theme
                    </Text>
                  </View>
                  <Switch 
                    value={darkTheme} 
                    onValueChange={toggleTheme}
                    trackColor={{ false: "#E0E0E0", true: "rgba(255, 152, 0, 0.5)" }}
                    thumbColor={darkTheme ? "#FF9800" : "#BDBDBD"}
                  />
                </View>
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={[styles.sectionTitle, darkTheme && { color: '#fff' }]}>Language</Text>
              
              <View style={[styles.settingCard, darkTheme && styles.settingCardDark]}>
                <View style={styles.settingItem}>
                  <View style={styles.settingLabelContainer}>
                    <Ionicons 
                      name="globe-outline" 
                      size={22} 
                      color={darkTheme ? "#FF9800" : "#757575"} 
                      style={styles.settingIcon}
                    />
                    <Text style={[styles.label, darkTheme && { color: '#fff' }]}>
                      Select Language
                    </Text>
                  </View>
                  
                  <View style={styles.languageOptions}>
                    {['ar', 'en', 'fr'].map(lang => (
                      <TouchableOpacity
                        key={lang}
                        onPress={() => changeLanguage(lang)}
                        style={[
                          styles.langButton,
                          selectedLanguage === lang && styles.langButtonSelected,
                          darkTheme && styles.langButtonDark,
                          selectedLanguage === lang && darkTheme && styles.langButtonSelectedDark,
                        ]}
                      >
                        <Text
                          style={[
                            styles.langText,
                            selectedLanguage === lang && styles.langTextSelected,
                            darkTheme && { color: '#E0E0E0' },
                            selectedLanguage === lang && darkTheme && { color: '#fff' },
                          ]}
                        >
                          {lang.toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={[styles.sectionTitle, darkTheme && { color: '#fff' }]}>Notifications</Text>
              
              <View style={[styles.settingCard, darkTheme && styles.settingCardDark]}>
                <View style={styles.settingItem}>
                  <View style={styles.settingLabelContainer}>
                    <Ionicons 
                      name="notifications-outline" 
                      size={22} 
                      color={darkTheme ? "#FF9800" : "#757575"} 
                      style={styles.settingIcon}
                    />
                    <Text style={[styles.label, darkTheme && { color: '#fff' }]}>
                      Push Notifications
                    </Text>
                  </View>
                  <Switch 
                    value={notificationsEnabled} 
                    onValueChange={toggleNotifications}
                    trackColor={{ false: "#E0E0E0", true: "rgba(255, 152, 0, 0.5)" }}
                    thumbColor={notificationsEnabled ? "#FF9800" : "#BDBDBD"}
                  />
                </View>
                
                <View style={[styles.divider, darkTheme && styles.dividerDark]} />
                
                <View style={styles.settingItem}>
                  <View style={styles.settingLabelContainer}>
                    <Ionicons 
                      name="warning-outline" 
                      size={22} 
                      color={darkTheme ? "#FF9800" : "#757575"} 
                      style={styles.settingIcon}
                    />
                    <Text style={[styles.label, darkTheme && { color: '#fff' }]}>
                      Feeding Alerts
                    </Text>
                  </View>
                  <Switch 
                    value={alertsEnabled} 
                    onValueChange={toggleAlerts}
                    trackColor={{ false: "#E0E0E0", true: "rgba(255, 152, 0, 0.5)" }}
                    thumbColor={alertsEnabled ? "#FF9800" : "#BDBDBD"}
                  />
                </View>
                
                <View style={[styles.divider, darkTheme && styles.dividerDark]} />
                
                <View style={styles.settingItem}>
                  <View style={styles.settingLabelContainer}>
                    <Ionicons 
                      name="volume-medium-outline" 
                      size={22} 
                      color={darkTheme ? "#FF9800" : "#757575"} 
                      style={styles.settingIcon}
                    />
                    <Text style={[styles.label, darkTheme && { color: '#fff' }]}>
                      Sound Effects
                    </Text>
                  </View>
                  <Switch 
                    value={soundEnabled} 
                    onValueChange={toggleSound}
                    trackColor={{ false: "#E0E0E0", true: "rgba(255, 152, 0, 0.5)" }}
                    thumbColor={soundEnabled ? "#FF9800" : "#BDBDBD"}
                  />
                </View>
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={[styles.sectionTitle, darkTheme && { color: '#fff' }]}>About</Text>
              
              <View style={[styles.settingCard, darkTheme && styles.settingCardDark]}>
                <TouchableOpacity style={styles.settingItemButton}>
                  <View style={styles.settingLabelContainer}>
                    <Ionicons 
                      name="information-circle-outline" 
                      size={22} 
                      color={darkTheme ? "#FF9800" : "#757575"} 
                      style={styles.settingIcon}
                    />
                    <Text style={[styles.label, darkTheme && { color: '#fff' }]}>
                      App Version
                    </Text>
                  </View>
                  <View style={styles.versionContainer}>
                    <Text style={[styles.versionText, darkTheme && { color: '#BDBDBD' }]}>1.0.0</Text>
                    <Ionicons name="chevron-forward" size={20} color={darkTheme ? "#BDBDBD" : "#9E9E9E"} />
                  </View>
                </TouchableOpacity>
                
                <View style={[styles.divider, darkTheme && styles.dividerDark]} />
                
                <TouchableOpacity style={styles.settingItemButton}>
                  <View style={styles.settingLabelContainer}>
                    <Ionicons 
                      name="document-text-outline" 
                      size={22} 
                      color={darkTheme ? "#FF9800" : "#757575"} 
                      style={styles.settingIcon}
                    />
                    <Text style={[styles.label, darkTheme && { color: '#fff' }]}>
                      Terms of Service
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={darkTheme ? "#BDBDBD" : "#9E9E9E"} />
                </TouchableOpacity>
                
                <View style={[styles.divider, darkTheme && styles.dividerDark]} />
                
                <TouchableOpacity style={styles.settingItemButton}>
                  <View style={styles.settingLabelContainer}>
                    <Ionicons 
                      name="shield-outline" 
                      size={22} 
                      color={darkTheme ? "#FF9800" : "#757575"} 
                      style={styles.settingIcon}
                    />
                    <Text style={[styles.label, darkTheme && { color: '#fff' }]}>
                      Privacy Policy
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={darkTheme ? "#BDBDBD" : "#9E9E9E"} />
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
        <View style={[styles.bottomNav, darkTheme && styles.bottomNavDark]}>
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
            <MaterialIcons name="person-outline" size={24} color="#9E9E9E" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      
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
  backButtonDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  settingsContainer: {
    paddingHorizontal: 20,
  },
  settingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
    paddingLeft: 4,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingCardDark: {
    backgroundColor: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  settingItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    color: '#212121',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 4,
  },
  dividerDark: {
    backgroundColor: '#444',
  },
  languageOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  langButtonDark: {
    borderColor: '#555',
    backgroundColor: '#444',
  },
  langButtonSelected: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  langButtonSelectedDark: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  langText: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  langTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#9E9E9E',
    marginRight: 4,
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
  bottomNavDark: {
    backgroundColor: '#222',
    borderColor: '#444',
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
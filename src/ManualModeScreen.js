import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  TouchableWithoutFeedback, 
  Keyboard,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ManualModeScreen({ navigation }) {
  const [foodQuantity, setFoodQuantity] = useState('');
  const [waterVolume, setWaterVolume] = useState('');
  const [foodUnit, setFoodUnit] = useState('g');
  const [waterUnit, setWaterUnit] = useState('ml');

  const toggleFoodUnit = () => {
    setFoodUnit(foodUnit === 'g' ? 'oz' : 'g');
  };

  const toggleWaterUnit = () => {
    setWaterUnit(waterUnit === 'ml' ? 'oz' : 'ml');
  };

  const handleDistribute = () => {
    // Implement distribution logic here
    alert(`Distributing ${foodQuantity}${foodUnit} of food and ${waterVolume}${waterUnit} of water`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E1" />
      <LinearGradient
        colors={['#FFF8E1', '#FFECB3']}
        style={styles.background}
      />
      
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              <Text style={styles.title}>Manual Mode</Text>
              <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
            </View>
            
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                Choose the quantity of food and volume of water for your pet
              </Text>
            </View>

            {/* Pet Image */}
            <View style={styles.petImageContainer}>
              <LinearGradient
                colors={['rgba(255,152,0,0.2)', 'rgba(255,152,0,0.1)']}
                style={styles.imageGradient}
                borderRadius={85}
              />
              
            </View>

            {/* Input Section */}
            <View style={styles.inputSection}>
              <View style={styles.sectionTitle}>
                <Text style={styles.sectionTitleText}>Feeding Settings</Text>
              </View>
              
              <View style={styles.inputCard}>
                <View style={styles.inputHeader}>
                  <Ionicons name="fast-food-outline" size={24} color="#FF9800" />
                  <Text style={styles.inputTitle}>Food Quantity</Text>
                </View>
                
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Enter amount"
                    placeholderTextColor="#9E9E9E"
                    value={foodQuantity}
                    onChangeText={setFoodQuantity}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity 
                    style={styles.unitButton}
                    onPress={toggleFoodUnit}
                  >
                    <Text style={styles.unitText}>{foodUnit}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputCard}>
                <View style={styles.inputHeader}>
                  <Ionicons name="water-outline" size={24} color="#FF9800" />
                  <Text style={styles.inputTitle}>Water Volume</Text>
                </View>
                
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Enter amount"
                    placeholderTextColor="#9E9E9E"
                    value={waterVolume}
                    onChangeText={setWaterVolume}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity 
                    style={styles.unitButton}
                    onPress={toggleWaterUnit}
                  >
                    <Text style={styles.unitText}>{waterUnit}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Distribution Button */}
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleDistribute}
              activeOpacity={0.8}
            >
              <Ionicons name="paw-outline" size={20} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Distribute Now</Text>
            </TouchableOpacity>

            {/* Information Card */}
            <View style={styles.infoCard}>
              <Ionicons name="information-circle-outline" size={20} color="#757575" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Make sure your pet's food and water containers are properly positioned under the dispensers.
              </Text>
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
              <MaterialIcons name="person-outline" size={24} color="#9E9E9E" />
              <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  mainContainer: {
    flex: 1,
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
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
  descriptionContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  
  inputSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginLeft: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#212121',
  },
  unitButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginLeft: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  unitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#FF9800',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
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
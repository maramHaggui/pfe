import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function WelcomeMessageScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E1" />
      <LinearGradient
        colors={['#FFF8E1', '#FFECB3']}
        style={styles.background}
      />
      
      <View style={styles.header}>
        <View style={styles.placeholder} />
        
        <View style={styles.logoContainer}>
          <Image source={require('../assets/pawo.png')} style={styles.logoImage} />
          <Text style={styles.logoText}>PawBite</Text>
        </View>
        
        <View style={styles.placeholder} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/soura.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to PawBite!</Text>
          <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
          
          <Text style={styles.description}>
            Take care of your pet and have fun meeting other pet owners. We're excited to have you join our community!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('AddPetScreen')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Explore App</Text>
          </TouchableOpacity>
          
        </View>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  illustration: {
    width: width * 0.8,
    height: height * 0.3,
  },
  textContainer: {
    alignItems: 'center',
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
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 40,
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
  secondaryButton: {
    backgroundColor: 'white',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  skipButton: {
    marginTop: 10,
  },
  skipButtonText: {
    color: '#757575',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
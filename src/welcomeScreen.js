import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <LinearGradient
        colors={['#FFF8E1', '#FFECB3']}
        style={styles.background}
      />
      
      <View style={styles.topContainer}>
        <Image
          source={require('../assets/pawo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>PawBite</Text>
        <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
      </View>
      
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../assets/soura.png')} // You'll need to add this image
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.guestButton}
          onPress={() => navigation.navigate('Home')} // Assuming you have a Home screen
        >
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
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
  topContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.05,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 5,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 14,
    color: '#FF9800',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  illustrationContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: width * 0.8,
    height: height * 0.3,
  },
  bottomContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: height * 0.05,
  },
  loginButton: {
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
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signupButton: {
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
  signupButtonText: {
    color: '#FF9800',
    fontSize: 18,
    fontWeight: '600',
  },
  guestButton: {
    marginTop: 10,
  },
  guestButtonText: {
    color: '#757575',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
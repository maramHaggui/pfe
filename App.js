// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/context/ThemeContext'; // adapte si besoin

import WelcomeScreen from './src/welcomeScreen';  // même nom de fichier, sans .js
import LoginScreen   from './src/loginScreen';
import SignupScreen from './src/signupScreen';
import ForgotPasswordScreen from './src/ForgotPasswordScreen';
import PetProfileScreen from './src/PetProfileScreen';
import HomeScreen from './src/Homescreen';
import WelcomeMessageScreen from './src/welcomemessageScreen';
import PetProfile2Screen from './src/petprofile2screen';
import ManualModeScreen from './src/ManualModeScreen';
import AddPetScreen from './src/AddPetScreen';
import MorePetsScreen from './src/MorePetsScreen'; 
import AutomaticModeScreen from './src/AutomaticModeScreen';
import EditPetProfil from './src/EditPetProfile';
import MessagingScreen from './src/MessagingScreen';
import UserScreen from './src/UserScreen';
import EditPasswordScreen from './src/EditPasswordScreen';
import SettingsScreen from './src/SettingsScreen';
import VoiceRecorderScreen from './src/VoiceRecorderScreen';
import EditUserScreen from './src/EditUserScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login"   component={LoginScreen} />
        <Stack.Screen name="SignUp"  component={SignupScreen} /> 
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="PetProfile" component={PetProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeMessageScreen" component={WelcomeMessageScreen} />
        <Stack.Screen name="PetProfile2" component={PetProfile2Screen} />
        <Stack.Screen name="ManualModeScreen" component={ManualModeScreen} />
        <Stack.Screen name="AddPetScreen" component={AddPetScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MorePets"component={MorePetsScreen} />   
        <Stack.Screen name="AutomaticModeScreen" component={AutomaticModeScreen} />
        <Stack.Screen name="EditPetProfile" component={EditPetProfil} />
        <Stack.Screen name="MessagingScreen" component={MessagingScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="EditPasswordScreen" component={EditPasswordScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Voice" component={VoiceRecorderScreen} />
        <Stack.Screen name="Edituser" component={EditUserScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
    
    
  );
}

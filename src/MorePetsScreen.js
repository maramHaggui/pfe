import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function MorePetsScreenScreen() {
  const navigation = useNavigation();
  
  // Sample pet data with more details
  const pets = [
    { 
      id: '1', 
      name: 'Zarga', 
      type: 'Dog', 
      breed: 'Golden Retriever',
      age: '3 years',
      image: require('../assets/image.png') // Assuming this is a dog image
    },
    { 
      id: '2', 
      name: 'Khzila', 
      type: 'Cat',
      breed: 'Persian',
      age: '2 years',
      image: require('../assets/image.png') // Replace with actual cat image
    },
    { 
      id: '3', 
      name: 'Chbaya7', 
      type: 'Dog',
      breed: 'Husky',
      age: '1 year',
      image: require('../assets/image.png') // Replace with actual dog image
    }
  ];

  const renderPetItem = ({ item }) => (
    <TouchableOpacity
      style={styles.petCard}
      onPress={() => navigation.navigate('Home', { pet: item })}
    >
      <View style={styles.petImageContainer}>
        <LinearGradient
          colors={['rgba(255,152,0,0.2)', 'rgba(255,152,0,0.1)']}
          style={styles.imageGradient}
          borderRadius={40}
        />
        <Image source={item.image} style={styles.petImage} />
      </View>
      
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{item.name}</Text>
        <Text style={styles.petDetails}>{item.type} • {item.breed}</Text>
        <Text style={styles.petAge}>{item.age}</Text>
      </View>
      
      <TouchableOpacity style={styles.petActionButton}>
        <Ionicons name="chevron-forward" size={24} color="#FF9800" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E1" />
      <LinearGradient
        colors={['#FFF8E1', '#FFECB3']}
        style={styles.background}
      />
      
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

        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Pets</Text>
          <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
        </View>

        {/* PETS LIST */}
        <FlatList
          data={pets}
          renderItem={renderPetItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.petsList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('PetProfile')}
              activeOpacity={0.8}
            >
              <Ionicons name="add-circle-outline" size={20} color="#FFF" style={styles.addIcon} />
              <Text style={styles.addButtonText}>ADD NEW PET</Text>
            </TouchableOpacity>
          }
        />

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
    marginBottom:90
  },
  petsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  petImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  imageGradient: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  petAge: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  petActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
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
  addIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsContainer: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    flexDirection: 'row',
  },
  
});
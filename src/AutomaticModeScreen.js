import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Modal, 
  Pressable, 
  Platform, 
  TextInput, 
  SafeAreaView, 
  ScrollView, 
  Switch, 
  FlatList,
  StatusBar,
  Dimensions, Alert 
} from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { width, height } = Dimensions.get('window');

export default function AutomaticModeScreen() {
    const navigation = useNavigation();
    const [foodQty, setFoodQty] = useState('');
    const [waterQty, setWaterQty] = useState('');
    const [selectedDays, setSelectedDays] = useState({});
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [currentSelectedDay, setCurrentSelectedDay] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState({});
    const [time, setTime] = useState(new Date());
    const [isAutomaticMode, setIsAutomaticMode] = useState(false);

    const toggleDay = (day) => {
    const updated = { ...selectedDays };
    const wasSelected = updated[day]?.selected;

    updated[day] = { selected: !wasSelected, selectedColor: '#FF9800' };
    setSelectedDays(updated);

    // Supprimer les horaires liés si on désélectionne le jour
    if (wasSelected) {
      const updatedTimes = { ...selectedTimes };
      delete updatedTimes[day];
      setSelectedTimes(updatedTimes);
    }
  };
const [modalVisible, setModalVisible] = useState(false);

const openTimePicker = (day) => {
  setCurrentSelectedDay(day);
  setModalVisible(true);
};

const handleConfirm = (selectedDate) => {
  const formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  setSelectedTimes(prev => {
    const existing = prev[currentSelectedDay] || [];
    return {
      ...prev,
      [currentSelectedDay]: [...new Set([...existing, formattedTime])]
    };
  });
  setModalVisible(false);
};

const hidePicker = () => {
  setModalVisible(false);
};
    
    const onTimeSelected = (event, selectedDate) => {
        if (event.type === 'dismissed') {
            setTimePickerVisible(false);
            return;
        }
        if (selectedDate) {
            const formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setSelectedTimes(prev => {
                const existingTimes = prev[currentSelectedDay] || [];
                return {
                    ...prev,
                    [currentSelectedDay]: [...new Set([...existingTimes, formattedTime])],
                };
            });
        }
        setTimePickerVisible(false);
    };

    const addTimeForSelectedDay = () => {
        if (currentSelectedDay) {
            showTimePicker(currentSelectedDay);
        }
    };
    const isFormValid = () => {
  const hasFood = foodQty.trim() !== '';
  const hasWater = waterQty.trim() !== '';
  const hasDates = Object.keys(selectedDays).some(
    (day) => selectedDays[day].selected
  );
  const hasTimes = Object.keys(selectedTimes).every(
    (day) => selectedTimes[day] && selectedTimes[day].length > 0
  );
  return hasFood && hasWater && hasDates && hasTimes;
};
    const handleSaveSchedule = () => {
  if (!isFormValid()) {
    Alert.alert("Incomplete Form", "Please fill all fields: food, water, date, and time.");
    return;
  }

  Alert.alert(
    "Done!",
    `Distributing ${foodQty} of food and ${waterQty} of water at the scheduled time will start.`,
    [{ text: "OK" }]
  );
};
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

          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Automatic Mode</Text>
              <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
            </View>
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable Automatic Feeding</Text>
              <Switch 
                value={isAutomaticMode} 
                onValueChange={setIsAutomaticMode}
                trackColor={{ false: '#E0E0E0', true: 'rgba(255, 152, 0, 0.4)' }}
                thumbColor={isAutomaticMode ? '#FF9800' : '#BDBDBD'}
              />
            </View>
            
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                Choose the quantity of food and volume of water for scheduled feedings
              </Text>
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
                    keyboardType="numeric" 
                    placeholder="e.g. 100g" 
                    placeholderTextColor="#9E9E9E"
                    value={foodQty} 
                    onChangeText={setFoodQty} 
                  />
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
                    keyboardType="numeric" 
                    placeholder="e.g. 250ml" 
                    placeholderTextColor="#9E9E9E"
                    value={waterQty} 
                    onChangeText={setWaterQty} 
                  />
                </View>
              </View>
            </View>

            {/* Calendar Section */}
            <View style={styles.calendarSection}>
              <View style={styles.sectionTitle}>
                <Text style={styles.sectionTitleText}>Select Feeding Days</Text>
              </View>
              
              <View style={styles.calendarCard}>
                <Calendar 
                  onDayPress={(day) => { 
                    toggleDay(day.dateString); 
                    setCurrentSelectedDay(day.dateString);
                    if (!selectedDays[day.dateString]?.selected) {
                      openTimePicker(day.dateString);
                    }
                  }} 
                  markedDates={selectedDays} 
                  style={styles.calendar}
                  theme={{
                    todayTextColor: '#FF9800',
                    selectedDayBackgroundColor: '#FF9800',
                    dotColor: '#FF9800',
                    arrowColor: '#FF9800',
                    monthTextColor: '#212121',
                    textMonthFontWeight: 'bold',
                    textDayFontSize: 14,
                    textMonthFontSize: 16,
                  }}
                />
              </View>
            </View>

            {/* Selected Times Section */}
            {Object.keys(selectedTimes).length > 0 && (
              <View style={styles.scheduledTimesSection}>
                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionTitleText}>Scheduled Feeding Times</Text>
                </View>
                
                {Object.entries(selectedTimes).map(([day, times]) => (
                  <View key={day} style={styles.timeListCard}>
                    <View style={styles.dayHeader}>
                      <Text style={styles.dayText}>{day}</Text>
                      <TouchableOpacity 
                        style={styles.addTimeButton}
                        onPress={() => openTimePicker(day)}
                      >
                        <Ionicons name="add-circle-outline" size={20} color="#FF9800" />
                        <Text style={styles.addTimeText}>Add Time</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.timesList}>
                      {times.map((time, index) => (
                        <View key={index} style={styles.timeItem}>
                          <Ionicons name="time-outline" size={18} color="#FF9800" />
                          <Text style={styles.timeText}>{time}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Save Button */}
            <TouchableOpacity 
  style={[
    styles.primaryButton,
    { backgroundColor: isFormValid() ? '#FF9800' : '#BDBDBD' }
  ]}
  activeOpacity={0.8}
  onPress={handleSaveSchedule}
  disabled={!isFormValid()}
>
  <Text style={styles.primaryButtonText}>Save Schedule</Text>
</TouchableOpacity>



            <DateTimePickerModal
  isVisible={modalVisible}
  mode="time"
  onConfirm={handleConfirm}
  onCancel={hidePicker}
  is24Hour={true}
  headerTextIOS="Pick a time"
  confirmTextIOS="Confirm"
  cancelTextIOS="Cancel"
/>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginRight: 10,
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
    marginBottom: 20,
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
  calendarSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  calendar: {
    borderRadius: 12,
  },
  scheduledTimesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timeListCard: {
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
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  addTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTimeText: {
    fontSize: 14,
    color: '#FF9800',
    marginLeft: 4,
    fontWeight: '500',
  },
  timesList: {
    marginLeft: 8,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  timeText: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: '#FF9800',
    width: width * 0.8,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
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
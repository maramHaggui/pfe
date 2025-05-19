import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function VoiceRecorderScreen() {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Check for audio recording permissions when component mounts
    (async () => {
      const permission = await Audio.requestPermissionsAsync();
      setPermissionGranted(permission.status === 'granted');
    })();

    // Clean up function to unload sound when component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  // Timer for recording duration
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      if (!permissionGranted) {
        const permission = await Audio.requestPermissionsAsync();
        if (permission.status !== 'granted') {
          Alert.alert(
            "Permission Required", 
            "Please grant microphone access to record audio.",
            [{ text: "OK" }]
          );
          return;
        }
        setPermissionGranted(true);
      }

      await Audio.setAudioModeAsync({ 
        allowsRecordingIOS: true, 
        playsInSilentModeIOS: true 
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording', error);
      Alert.alert("Recording Error", "Could not start recording. Please try again.");
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const name = `Recording ${recordings.length + 1} (${timestamp})`;
      setRecordings([...recordings, { uri, name, duration: recordingDuration }]);
      setRecording(null);
    } catch (error) {
      console.error('Error stopping recording', error);
      Alert.alert("Recording Error", "Could not save recording. Please try again.");
    }
  };

  const playRecording = async (uri, index) => {
    try {
      // Stop current playback if any
      if (sound) {
        await sound.unloadAsync();
      }
      
      setPlayingIndex(index);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing recording', error);
      Alert.alert("Playback Error", "Could not play recording. Please try again.");
      setPlayingIndex(null);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setPlayingIndex(null);
    }
  };

  const renameRecording = (index) => {
    Alert.prompt(
      'Rename Recording', 
      'Enter a new name:',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Rename',
          onPress: (newName) => {
            if (newName && newName.trim()) {
              const updated = [...recordings];
              updated[index].name = newName.trim();
              setRecordings(updated);
            }
          }
        }
      ],
      'plain-text',
      recordings[index].name
    );
  };

  const deleteRecording = (index) => {
    Alert.alert(
      "Delete Recording",
      "Are you sure you want to delete this recording?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            const updated = [...recordings];
            updated.splice(index, 1);
            setRecordings(updated);
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="mic-outline" size={64} color="#BDBDBD" />
      <Text style={styles.emptyText}>No recordings yet</Text>
      <Text style={styles.emptySubtext}>Tap the microphone button below to start recording</Text>
    </View>
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
          <Text style={styles.title}>Voice Recorder</Text>
          <Text style={styles.subtitle}>SNACK TIME, ANYTIME!</Text>
        </View>

        <View style={styles.contentContainer}>
          {isRecording && (
            <View style={styles.recordingStatusContainer}>
              <View style={styles.recordingIndicator}>
                <View style={styles.recordingDot} />
              </View>
              <Text style={styles.recordingText}>Recording... {formatDuration(recordingDuration)}</Text>
            </View>
          )}

          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>All Recordings</Text>
          </View>

          <FlatList
            data={recordings}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.recordingItem}>
                <TouchableOpacity 
                  onPress={() => playRecording(item.uri, index)} 
                  style={[
                    styles.playButton,
                    playingIndex === index && styles.playingButton
                  ]}
                >
                  {playingIndex === index ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Ionicons 
                      name="play" 
                      size={20} 
                      color={playingIndex === index ? "#FFFFFF" : "#FF9800"} 
                    />
                  )}
                </TouchableOpacity>
                
                <View style={styles.recordingInfo}>
                  <Text style={styles.recordingTitle}>{item.name}</Text>
                  <Text style={styles.recordingDuration}>
                    {formatDuration(item.duration)}
                  </Text>
                </View>
                
                <View style={styles.iconsContainer}>
                  <TouchableOpacity 
                    onPress={() => renameRecording(index)} 
                    style={styles.iconButton}
                  >
                    <Ionicons name="pencil-outline" size={20} color="#757575" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => deleteRecording(index)} 
                    style={styles.iconButton}
                  >
                    <Ionicons name="trash-outline" size={20} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={renderEmptyList}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>


        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            onPress={isRecording ? stopRecording : startRecording}
            style={[
              styles.recordButton,
              isRecording && styles.stopButton
            ]}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={isRecording ? 'stop' : 'mic'} 
              size={32} 
              color="white" 
            />
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
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  recordingStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  recordingIndicator: {
    marginRight: 10,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F44336',
    opacity: 1,
  },
  recordingText: {
    color: '#F44336',
    fontWeight: '500',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playingButton: {
    backgroundColor: '#FF9800',
  },
  recordingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recordingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  recordingDuration: {
    fontSize: 12,
    color: '#757575',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  recordButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: '#FF9800',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#757575',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  quickActionsContainer: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    flexDirection: 'row',
  },
});
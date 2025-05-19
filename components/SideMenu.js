// components/SideMenu.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';

export default function SideMenu({ visible, onClose, navigation }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.menuOverlay}>
        <View style={styles.sideMenu}>
          <TouchableOpacity onPress={() => console.log("Notifications")}>
            <Text style={styles.menuItem}>⚠️ Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.menuItem}>⚙️ Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("History")}>
            <Text style={styles.menuItem}>📃 History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {onClose();setTimeout(() => {navigation.navigate("Welcome");}, 500);}}>
            <Text style={styles.menuItem}> Disconnected </Text>
          </TouchableOpacity>
          <Pressable onPress={onClose}>
            <Text style={styles.closeMenu}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 11, 11, 0.2)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sideMenu: {
    backgroundColor: '#fff',
    width: 240,
    paddingTop: 80,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 6,
  },
  menuItem: {
    fontSize: 18,
    color: '#ffbd59',
    marginVertical: 14,
    fontWeight: 'bold',
  },
  closeMenu: {
    marginTop: 30,
    fontSize: 16,
    color: '#999',
    textAlign: 'right',
  },
});

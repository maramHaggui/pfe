import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  // Charger le thème depuis AsyncStorage au démarrage
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setDarkTheme(storedTheme === 'dark');
      }
    };
    loadTheme();
  }, []);

  // Basculer le thème et le sauvegarder
  const toggleTheme = async () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

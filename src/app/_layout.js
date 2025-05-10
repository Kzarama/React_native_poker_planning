import { Slot } from 'expo-router';
import { View } from 'react-native';
import '../../global.css';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <View>
      <StatusBar style='light' />
      <Slot />
    </View>
  );
}

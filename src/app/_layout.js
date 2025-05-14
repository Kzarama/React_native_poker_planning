import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import '../../global.css';

export default function Layout() {
  return (
    <View>
      <StatusBar style='light' />
      <Slot />
    </View>
  );
}

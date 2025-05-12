import RadialBackground from '@/shared/core/images/RadialBackground';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScreenLayout({ children }) {
  const { width, height } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        width,
        height,
      }}
    >
      <RadialBackground />
      <View
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          flex: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
}

import RadialBackground from '@/shared/core/images/RadialBackground';
import { useOrientation } from '@/table/core/hooks/useOrientation';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScreenLayout({ children }) {
  const orientation = useOrientation();
  const insets = useSafeAreaInsets();

  const orientationClasses = () => {
    const className = 'flex-row';
    if (orientation === 'landscape-left') {
      return `${className} mr-16`;
    } else if (orientation === 'landscape-right') {
      return `${className} ml-16`;
    }
  };

  return (
    <View
      className='w-full h-full bg-[#1f0d3f]'
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: insets.bottom,
      }}
    >
      <RadialBackground />

      <View className={`flex-1 ${orientationClasses()}`}>{children}</View>
    </View>
  );
}

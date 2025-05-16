import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text } from 'react-native';

interface IProps {
  score: number | string;
  active: boolean;
  selectCard?: React.Dispatch<React.SetStateAction<number | string>>;
}

export default function Card({ score, active, selectCard }: IProps) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: active ? -10 : 0,
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start();
  }, [active]);

  return (
    <Pressable onPress={() => selectCard?.(score)}>
      <Animated.View
        style={{ transform: [{ translateY }] }}
        className={`w-12 h-20 border border-theme_purple items-center justify-center rounded-md
      ${active ? 'bg-theme_purple' : 'bg-theme_dark_purple'}`}
      >
        <Text className={`font-bold ${active ? 'text-black' : 'text-white'}`}>
          {score}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

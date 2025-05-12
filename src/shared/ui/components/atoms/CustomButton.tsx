import { Pressable, Text } from 'react-native';

interface IProps {
  className?: string;
  text: string;
  disabled?: boolean;
  action: () => void;
}

export default function CustomButton({
  className,
  text,
  disabled = false,
  action,
}: IProps) {
  return (
    <Pressable
      className={`py-2 px-4 rounded-full bg-white font-bold
          disabled:text-white disabled:bg-theme_purple disabled:opacity-40 ${className}`}
      onPress={() => action()}
      disabled={disabled}
    >
      <Text
        className='text-gray-800 disabled:text-white text-center'
        disabled={disabled}
      >
        {text}
      </Text>
    </Pressable>
  );
}

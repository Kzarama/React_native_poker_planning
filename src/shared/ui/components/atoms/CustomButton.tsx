import { Pressable, Text } from 'react-native';

interface IProps {
  className?: string;
  text: string;
  disabled?: boolean;
  action: () => void;
  variable?: 'white' | 'purple' | 'transparent';
}

export default function CustomButton({
  className,
  text,
  disabled = false,
  action,
  variable,
}: IProps) {
  const colors = () => {
    switch (variable) {
      case 'purple':
        return { button: 'bg-theme_purple_bg', text: 'text-white' };

      case 'transparent':
        return { button: '', text: 'text-white' };
      default:
        return { button: 'bg-white', text: 'text-theme_text_gray' };
    }
  };

  return (
    <Pressable
      className={`py-2 px-4 rounded-full font-bold disabled:text-white
        disabled:bg-theme_purple disabled:opacity-40 ${colors().button} ${className}`}
      onPress={() => action()}
      disabled={disabled}
    >
      <Text
        className={`font-bold text-center disabled:text-white ${colors().text}`}
        disabled={disabled}
      >
        {text}
      </Text>
    </Pressable>
  );
}

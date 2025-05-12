import { IRadioSelected } from '@/shared/core/utils/interfaces';
import RadioButton from '@/shared/ui/components/atoms/RadioButton';
import { useState } from 'react';
import { View } from 'react-native';

interface IProps {
  buttonsInfo: IRadioSelected[];
  setValue: (value: string) => void;
}

export default function RadioGroup({ buttonsInfo, setValue }: IProps) {
  const [radioSelected, setRadioSelected] = useState<
    IRadioSelected | undefined
  >();

  const selectValue = (selected: IRadioSelected) => {
    setRadioSelected(selected);
    setValue(selected.value);
  };

  return (
    <View className='flex-row justify-center gap-4'>
      {buttonsInfo.map((button) => (
        <RadioButton
          key={button.value}
          radioInfo={button}
          radioSelected={radioSelected}
          selectValue={selectValue}
        />
      ))}
    </View>
  );
}

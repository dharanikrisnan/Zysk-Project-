import React from 'react';
import { View, TextInput } from 'react-native';
import useColorScheme from '@/components/useColorScheme';

type SearchBoxProps = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={{ width: '100%' }}>
      <TextInput
        placeholder="Search products..."
        placeholderTextColor={colorScheme === 'dark' ? '#999' : '#666'}
        value={value}
        onChangeText={onChange}
        style={{
          width: '100%',  
          height: 40,
          borderRadius: 15,
          paddingHorizontal: 12,
          fontSize: 14,
          borderColor: "#740894ff",
          borderWidth: 2,
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
          marginTop:10,
          marginBottom:20
        }}
      />
    </View>
  );
}
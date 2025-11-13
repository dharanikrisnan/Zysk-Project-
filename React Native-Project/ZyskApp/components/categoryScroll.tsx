import React from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { ImageSourcePropType } from 'react-native';

interface Category {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

const categories: Category[] = [
  { id: '1', title: 'Skincare', image: require('@/assets/images/beauty.jpg') },
  { id: '2', title: 'Dress', image: require('@/assets/images/dress.jpg') },
  { id: '3', title: 'Footwear', image: require('@/assets/images/footwear.jpg') },
  { id: '4', title: 'Gadgets', image: require('@/assets/images/gadget.jpg') },
  { id: '5', title: 'Kitchen', image: require('@/assets/images/kitchen.jpg') },
];

interface CategoryScrollProps {
  categories?: Category[];
  onCategoryPress?: (category: Category) => void;
}

export default function CategoryScroll({
  categories: customCategories,
  onCategoryPress,
}: CategoryScrollProps) {
  const categoryData = customCategories || categories;

  const handlePress = (category: Category) => {
    onCategoryPress?.(category);
    console.log('Category pressed:', category.title);
  };

  return (
    <View className="py-4 bg-white">
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 12,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            className="items-center active:opacity-70"
          >
            <View
              className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 8,
              }}
            >
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            <Text
              className="text-xs font-extrabold text-gray-800 mt-2 text-center"
              numberOfLines={2}
              style={{ maxWidth: 96 }}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

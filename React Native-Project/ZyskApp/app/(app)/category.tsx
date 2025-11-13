import { View, Text, ScrollView, Image, Pressable } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

interface CategoryItem {
  id: string;
  title: string;
  image: any; 
}

const categories: CategoryItem[] = [
  {
    id: '1',
    title: 'Beauty',
    image: require('@/assets/images/beauty.jpg'),
    
  },
  {
    id: '2',
    title: 'Dress',
    image: require('@/assets/images/dress.jpg'),
  },
  {
    id: '3',
    title: 'Footwear',
    image: require('@/assets/images/footwear.jpg'),
  },
  {
    id: '4',
    title: 'Gadget',
    image: require('@/assets/images/gadget.jpg'),
  },
  {
    id: '5',
    title: 'Kitchen',
    image: require('@/assets/images/kitchen.jpg'),
  },
];

export default function Category() {
  const handleCategoryPress = (category: CategoryItem) => {
    router.navigate('/product/products');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 pt-6">
        {categories.map((category) => (
          <Pressable
            key={category.id}
            onPress={() => handleCategoryPress(category)}
            className="mb-4"
          >
            <View
              className="flex-row items-center justify-between bg-purple-100 rounded-2xl overflow-hidden p-4"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View className="w-24 h-24 rounded-xl overflow-hidden">
                <Image
                  source={category.image}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              <View className="flex-1 flex-row items-center justify-between px-6">
                <Text className="text-xl font-bold text-gray-900">
                  {category.title}
                </Text>
                
                <View className="w-10 h-10 rounded-full bg-purple-600 items-center justify-center">
                  <FontAwesome name="chevron-right" size={16} color="#fff" />
                </View>
              </View>
            </View>
          </Pressable>
        ))}

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
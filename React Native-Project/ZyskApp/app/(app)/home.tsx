
import { ScrollView, View, Image, Dimensions } from 'react-native';
import CategoryScroll from '../../components/categoryScroll';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';



const { width } = Dimensions.get('window');

export default function HomeScreen() {

  const handleCategoryPress = (category: any) => {
    router.navigate('/product/products')

  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const images = [
    require('@/assets/images/sales5.png'),
    require('@/assets/images/sales6.png'),
    require('@/assets/images/sales7.png'),
    require('@/assets/images/sales8.png'),


  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);


  return (
    <ScrollView className="flex-1 bg-white">
      <View className="h-4" />
      <CategoryScroll onCategoryPress={handleCategoryPress} />


      <View className="h-3" /> 
      <View className="mx-4  rounded-2xl overflow-hidden bg-gray-100 shadow-md">
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="w-full h-60"
        >
          {images.map((imgSrc, index) => (
            <Image
              key={index}
              source={imgSrc}
              className="w-full h-60"
              resizeMode="cover"
              style={{ width }}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
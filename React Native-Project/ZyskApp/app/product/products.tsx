import SearchBox from '@/components/SearchBox';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import CategoryScroll from '../../components/categoryScroll';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    const result = await axios.get('https://dummyjson.com/products');
    if (!result.status || result.status !== 200) {
      throw new Error('Page not found');
    }
    return result.data.products;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchData,
  });

  const handleCategoryPress = (category: any) => {
    console.log('Category pressed:', category.title);
  };



  if (isLoading) {
    return (
      <View className="flex-1 bg-white">
        <Text className="text-center py-10">Loading products...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-white">
        <Text className="text-center py-10 text-red-500">
          Failed to load products.
        </Text>
      </View>
    );
  }

  const filteredProducts =
    data?.filter((product: any) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const leftColumnProducts = currentProducts.filter((_: any, index: number) => index % 2 === 0);
  const rightColumnProducts = currentProducts.filter((_: any, index: number) => index % 2 === 1);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  const ProductCard = ({ product }: { product: any }) => (
    <View
      className="mb-4 bg-white rounded-2xl overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View className="w-full h-48 bg-gray-100 relative">
        <Image
          source={{ uri: product.images[0] }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <Pressable
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full active:bg-white"
          onPress={() =>
            Toast.show({
              type: 'success',
              text1: 'Added to Whislist',
              text2: `${product.title} was successfully added!`,
              visibilityTime: 2000,

              text1Style: {
                fontWeight: 'bold',
                fontSize: 15,
              },
              text2Style: {
                fontWeight: '600',
                fontSize: 13,
                color: '#4B5563',
                flexWrap: 'wrap'
              },
              props: {
                height: 100,
              },

            })
          }
        >
          <FontAwesome name="heart-o" size={16} color="#9333ea" />
        </Pressable>
        <Pressable
          className="absolute right-2 top-11 bg-white/90 backdrop-blur-sm p-2 rounded-full active:bg-white"
          onPress={() =>
            Toast.show({
              type: 'success',
              text1: 'Added to Cart',
              text2: `${product.title} was successfully added!`,
              visibilityTime: 2000,

              text1Style: {
                fontWeight: 'bold',
                fontSize: 15,
              },
              text2Style: {
                fontWeight: '600',
                fontSize: 13,
                color: '#4B5563',
                flexWrap: 'wrap'
              },
              props: {
                height: 100,
              },

            })
          }
        >

          <FontAwesome name="shopping-cart" size={16} color="#9333ea" />

        </Pressable>
      </View>

      <View className="p-3">
        <Text
          className="text-sm font-bold text-gray-900 mb-1"
          numberOfLines={2}
        >
          {product.title}
        </Text>

        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold text-purple-600">
            ₹{product.price}
          </Text>
          <View className="flex-row items-center bg-gray-100 px-2 py-0.5 rounded-full">
            <FontAwesome name="star" size={10} color="#FFA500" />
            <Text className="text-xs font-semibold text-gray-700 ml-1">
              {product.rating}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center mb-2">
          <View className="bg-purple-100 px-2 py-0.5 rounded-full">
            <Text className="text-xs font-semibold text-purple-700 lowercase">
              {product.category}
            </Text>
          </View>
        </View>


        <Pressable
          className="bg-purple-600 py-2 rounded-xl active:bg-purple-700"
          onPress={() => router.push(`/product/${product.id}`)}
        >
          <Text className="text-white text-center font-bold text-sm">
            View
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="h-4" />

      <View className="px-4">
        <SearchBox value={searchText} onChange={setSearchText} />
      </View>

      <View className="h-4" />

      <CategoryScroll onCategoryPress={handleCategoryPress} />

      <View className="h-6" />

      <View className="px-4">
        {searchText ? (
          <Text className="text-sm text-gray-600 mb-4">
            Showing results for: "{searchText}"
          </Text>
        ) : null}

        <View className="flex-row gap-3">
          <View className="flex-1">
            {leftColumnProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>

          <View className="flex-1">
            {rightColumnProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>

        <View className="flex-row justify-between items-center py-6 px-4">
          <Pressable
            className={`flex-row items-center px-6 py-3 rounded-xl ${currentPage === 1
              ? 'bg-gray-200'
              : 'bg-gray-600 active:bg-gray-700'
              }`}
            onPress={handlePrevPage}
            disabled={currentPage === 1}
          >
            <FontAwesome
              name="chevron-left"
              size={16}
              color={currentPage === 1 ? '#9CA3AF' : '#fff'}
            />
            <Text
              className={`ml-2 font-bold ${currentPage === 1 ? 'text-gray-400' : 'text-white'
                }`}
            >
              Prev
            </Text>
          </Pressable>

          <View className="bg-white px-4 py-3 rounded-xl border border-gray-200">
            <Text className="text-sm font-bold text-gray-700">
              Page {currentPage} of {totalPages}
            </Text>
          </View>

          <Pressable
            className={`flex-row items-center px-6 py-3 rounded-xl ${currentPage === totalPages
              ? 'bg-gray-200'
              : 'bg-indigo-600 active:bg-indigo-700'
              }`}
            onPress={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <Text
              className={`mr-2 font-bold ${currentPage === totalPages ? 'text-gray-400' : 'text-white'
                }`}
            >
              Next
            </Text>
            <FontAwesome
              name="chevron-right"
              size={16}
              color={currentPage === totalPages ? '#9CA3AF' : '#fff'}
            />
          </Pressable>
        </View>
      </View>

      <View className="h-32" />
    </ScrollView>
  );
}

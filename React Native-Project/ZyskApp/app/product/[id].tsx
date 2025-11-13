import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { View, Text, Image, ScrollView, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();

  const fetchProduct = async () => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProduct,
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-700">Loading product details...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500 font-semibold">
          Failed to load product.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Image
        source={{ uri: data.thumbnail }}
        className="w-full h-64 rounded-2xl mb-4"
        resizeMode="cover"
      />

      <Text className="text-2xl font-extrabold text-gray-900 mb-1">
        {data.title}
      </Text>
      <Text className="text-sm text-gray-500 mb-2">Brand: {data.brand}</Text>

      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-baseline">
          <Text className="text-2xl font-bold text-purple-700 mr-2">
            ₹{data.price}
          </Text>
          <Text className="text-sm text-gray-400 line-through">
            ₹{(data.price / (1 - data.discountPercentage / 100)).toFixed(2)}
          </Text>
        </View>
        <Text
          className={`text-sm font-semibold ${
            data.availabilityStatus === 'In Stock'
              ? 'text-green-600'
              : 'text-red-500'
          }`}
        >
          {data.availabilityStatus}
        </Text>
      </View>

      <View className="flex-row items-center mb-3">
        <FontAwesome name="star" size={16} color="#FFA500" />
        <Text className="ml-1 font-semibold text-gray-700">
          {data.rating.toFixed(1)}
        </Text>
        <Text className="ml-2 text-gray-500 text-sm">
          ({data.stock} available)
        </Text>
      </View>

      <Text className="text-base text-gray-700 leading-6 mb-6">
        {data.description}
      </Text>

      <View className="bg-white p-4 rounded-2xl mb-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Product Info
        </Text>
        <Text className="text-gray-700">
          Category:{' '}
          <Text className="font-semibold capitalize">{data.category}</Text>
        </Text>
        <Text className="text-gray-700">
          SKU: <Text className="font-semibold">{data.sku}</Text>
        </Text>
        <Text className="text-gray-700 mt-1">
          Tags: {data.tags?.map((tag: string) => `#${tag}`).join(', ')}
        </Text>
      </View>

      <View className="bg-white p-4 rounded-2xl mb-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Shipping & Warranty
        </Text>
        <Text className="text-gray-700 mb-1">
          {data.shippingInformation}
        </Text>
        <Text className="text-gray-700 mb-1">
          {data.warrantyInformation}
        </Text>
        <Text className="text-gray-700">{data.returnPolicy}</Text>
      </View>

      <View className="bg-white p-4 rounded-2xl mb-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          Dimensions
        </Text>
        <Text className="text-gray-700">
          Width: {data.dimensions.width} cm
        </Text>
        <Text className="text-gray-700">
          Height: {data.dimensions.height} cm
        </Text>
        <Text className="text-gray-700">
          Depth: {data.dimensions.depth} cm
        </Text>
        <Text className="text-gray-700 mt-1">Weight: {data.weight}g</Text>
      </View>

      <View className="bg-white p-4 rounded-2xl mb-4 items-center shadow-sm">
        <Image
          source={{ uri: data.meta.qrCode }}
          className="w-32 h-32 mb-2"
          resizeMode="contain"
        />
        <Text className="text-gray-700 text-sm">
          Barcode: {data.meta.barcode}
        </Text>
      </View>

      <View className="bg-white p-4 rounded-2xl mb-10 shadow-sm">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Customer Reviews
        </Text>

        {data.reviews?.length > 0 ? (
          <FlatList
            data={data.reviews}
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled
            scrollEnabled={false} 
            renderItem={({ item }) => (
              <View className="border-b border-gray-200 py-3">
                <View className="flex-row items-center mb-1">
                  <FontAwesome name="user-circle-o" size={16} color="#9333ea" />
                  <Text className="ml-2 font-semibold text-gray-800">
                    {item.reviewerName}
                  </Text>
                  <View className="flex-row ml-auto">
                    {[...Array(item.rating)].map((_, i) => (
                      <FontAwesome
                        key={i}
                        name="star"
                        size={12}
                        color="#FFA500"
                      />
                    ))}
                  </View>
                </View>
                <Text className="text-gray-600 text-sm">{item.comment}</Text>
              </View>
            )}
          />
        ) : (
          <Text className="text-gray-500 text-sm">No reviews yet.</Text>
        )}
      </View>
    </ScrollView>
  );
}

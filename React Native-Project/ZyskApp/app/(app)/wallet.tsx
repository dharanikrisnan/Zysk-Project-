import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Wallet() {
  const balance = 1560.45;

  const transactions = [
    { id: "1", title: "Order Payment", amount: -299.99, date: "Nov 10, 2025" },
    { id: "2", title: "Wallet Added", amount: 1000.0, date: "Nov 8, 2025" },
    { id: "3", title: "Refund Processed", amount: 250.0, date: "Nov 7, 2025" },
    { id: "4", title: "Food Delivery", amount: -180.0, date: "Nov 6, 2025" },
  ];

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-10">
      <View className="bg-purple-600 rounded-3xl p-6 mb-6 shadow-lg">
        <Text className="text-white text-lg font-medium">Wallet Balance</Text>
        <Text className="text-white text-4xl font-extrabold mt-2">
          ₹{balance.toFixed(2)}
        </Text>
        <Text className="text-white/70 mt-1">Available to use</Text>

        <View className="flex-row justify-between mt-6">
          <Pressable className="flex-1 bg-white/20 rounded-xl py-3 mr-2 items-center">
            <Ionicons name="add-circle-outline" size={22} color="white" />
            <Text className="text-white mt-1 font-semibold text-sm">
              Add Money
            </Text>
          </Pressable>

          <Pressable className="flex-1 bg-white/20 rounded-xl py-3 mx-1 items-center">
            <Ionicons name="paper-plane-outline" size={22} color="white" />
            <Text className="text-white mt-1 font-semibold text-sm">
              Send
            </Text>
          </Pressable>

          <Pressable className="flex-1 bg-white/20 rounded-xl py-3 ml-2 items-center">
            <MaterialIcons name="history" size={22} color="white" />
            <Text className="text-white mt-1 font-semibold text-sm">
              History
            </Text>
          </Pressable>
        </View>
      </View>

      <Text className="text-xl font-semibold text-gray-800 mb-4">
        Recent Transactions
      </Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 rounded-2xl p-4 flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-base font-semibold text-gray-700">
                {item.title}
              </Text>
              <Text className="text-xs text-gray-500 mt-1">{item.date}</Text>
            </View>
            <Text
              className={`text-base font-bold ${
                item.amount > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.amount > 0 ? "+" : "-"}₹{Math.abs(item.amount).toFixed(2)}
            </Text>
          </View>
        )}
        scrollEnabled={false}
      />

     <View className="h-32"></View>
    </ScrollView>
  );
}

import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CartScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Shopping Cart</ThemedText>
      <ThemedText style={styles.subtitle}>Your cart is empty</ThemedText>
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Continue Shopping</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    opacity: 0.7,
  },
  link: {
    marginTop: 20,
    paddingVertical: 15,
  },
});
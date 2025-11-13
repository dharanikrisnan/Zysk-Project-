import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WishlistScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My Wishlist</ThemedText>
      <ThemedText style={styles.subtitle}>No items in your wishlist yet</ThemedText>
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Browse Products</ThemedText>
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
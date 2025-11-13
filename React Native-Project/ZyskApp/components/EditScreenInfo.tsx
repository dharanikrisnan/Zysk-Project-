import { View, Text, StyleSheet } from 'react-native';

type Props = {
  path?: string;
};

export default function EditScreenInfo({ path }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up the file
        {path ? ` ${path}` : ''} to start working on your app!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

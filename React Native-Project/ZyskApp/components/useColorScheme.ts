import { useColorScheme as _useColorScheme } from 'react-native';

export default function useColorScheme() {
  const scheme = _useColorScheme();
  return scheme === null ? 'light' : scheme;
}

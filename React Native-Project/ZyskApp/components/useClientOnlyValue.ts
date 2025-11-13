import { useEffect, useState } from 'react';

/**
 * Returns initial value on server and only applies clientValue on client.
 * Useful for conditional client-only rendering.
 */
export function useClientOnlyValue<T>(initialValue: T, clientValue: T): T {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(clientValue);
  }, [clientValue]);

  return value;
}

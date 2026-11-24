import { useState } from "react";

export const useFetching = <T extends unknown[]>(
  callback: (...args: T) => Promise<void> | void
  ) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async (...args: T): Promise<void> => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};

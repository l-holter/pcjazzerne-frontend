import { useState, useEffect } from "react";
import { pb } from "../lib/pocketbase";

function useCollection<T>({
  collection,
  filter,
  firstItemOnly,
}: {
  collection: string;
  filter?: string;
  firstItemOnly?: boolean;
}) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const col = pb.collection(collection);
    setIsLoading(true);

    col
      .getList(1, 48, { filter: filter })
      .then((res) => {
        setData(res as T);
        setIsLoading(false);
        setError(false);
      })
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));

    if (firstItemOnly && filter) {
      setIsLoading(true);
      col
        .getFirstListItem(filter)
        .then((res) => {
          setData(res as T);
          setIsLoading(false);
          setError(false);
        })
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    }
  }, [collection, filter]);

  return { data, isLoading, error };
}

export default useCollection;
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFirestore } from "../firebase/config";

const useCollection = (transition, myQuery) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let q;
    if (myQuery) {
      q = query(
        collection(appFirestore, transition),
        where(...myQuery),
        orderBy("createdTime", "desc")
      );
    }

    const unsubscribe = onSnapshot(
      myQuery ? q : collection(appFirestore, transition),
      (snapshot) => {
        let result = [];

        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(result);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );

    return unsubscribe;
  }, [collection]);

  return { documents, error };
};

export default useCollection;

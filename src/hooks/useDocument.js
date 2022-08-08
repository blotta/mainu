import { useEffect, useState } from "react";

// firebase imports
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useDocument = (_collectionName, _docId) => {
  const [document, setDocument] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!_collectionName || !_docId) {
      return;
    }
    setIsPending(true);

    let docRef = doc(db, _collectionName, _docId);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setError("Not found");
        } else {
          setDocument({ ...snapshot.data(), id: snapshot.id });
        }
        setIsPending(false);
      },
      (err) => {
        console.log(err);
        setError("Something went wrong");
      }
    );

    return () => unsub();
  }, [_collectionName, _docId]);

  return { document, isPending, error };
};

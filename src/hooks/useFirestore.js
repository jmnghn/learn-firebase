import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useReducer } from "react";
import { appFirestore, timestamp } from "../firebase/config";

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case "isPending":
      return { isPending: true, document: null, success: false, error: null };
    case "addDoc":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "error":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case "deleteDoc":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      break;
  }
};

const useFirestore = (transcation) => {
  const [response, dispatch] = useReducer(storeReducer, initState);

  // '컬렉션(collection)'의 '참조'를 요구(!)함. (컬렉션 > 도큐먼트 > 데이터)
  // 컬렉션이 없으면, 만들어서 그 참조주소를 반환하고
  // 컬렉션이 있으면 있는 참조 주소를 반환한다.
  // ※ 한편으론 편하고 한편으로는 철자하나 잘못 넣으면 새로운 컬렉션이 생성되버리고 마는 ^^;
  const colRef = collection(appFirestore, transcation);

  // '컬렉션(collection)'에 '문서(document)'를 추가함.
  const addDocument = async (doc) => {
    dispatch({ type: "isPending" });

    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log("docRefD: ", docRef);
      console.log("Document written with ID: ", docRef.id);
      dispatch({ type: "addDoc", payload: docRef });
    } catch (e) {
      console.error("Error adding document: ", e);
      dispatch({ type: "error", payload: e.message });
    }
  };

  // '컬렉션'에 '문서'를 제거함.
  const deleteDocument = async (id) => {
    dispatch({ type: "isPending" });

    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (e) {
      console.error("Error delete document: ", e);
      dispatch({ type: "error", payload: e.message });
    }
  };

  return { addDocument, deleteDocument, response };
};

export default useFirestore;

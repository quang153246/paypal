import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getData = async (collectionName: string) => {
  return await getDocs(collection(db, collectionName));
}
export const updateDocument = (collectionName: string, data: any, id: string) => {
  setDoc(doc(db, collectionName, id), {
    ...data,
  },{ merge: true });
};

export async function getAuths() {
  let arrs:any[] = [];
  const querySnapshot = await getDocs(collection(db, "auth"));
  querySnapshot.forEach((doc) => {
    arrs = [...arrs, doc.data()];
  });
  return arrs;
}
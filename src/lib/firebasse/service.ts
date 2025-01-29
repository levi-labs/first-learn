import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);
export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}
export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signUp(userData:{
    name:string,
    email:string,
    password:string,
    role?:string,
  },
    callback:Function){
      const q = query(collection(firestore, "users"),where("email","==",userData.email));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if(userData.email === '' || userData.password === '' || userData.name === ''){
        callback({
          status:false, 
          message:"All fields are requireds",
          validationError:[
            {
              field: 'name',
              rules: `${userData.name} is required`
            },
            {
              field: 'email',
              rules: `${userData.email} is required`
            },
            {
              field: 'password',
              rules: `${userData.password} is required`
            }
          ]
        });
        return;
      }
      if(data.length>0){
        callback({
          status:false, 
          message:"Email already exists"})
      }else{
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.role = "member";
        await addDoc(collection(firestore, "users"), userData).then(() => {
          callback({
            status:true, 
            message:"User created successfully"})
        }).catch((error) => {
          callback({
            status:false, 
            message:error.message})
        });
      }
    }


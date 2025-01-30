import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";
import { use } from "react";

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

export async function signIn(userData:{email:string,password:string}){
  if (userData.email === "" || userData.password === "") {
    throw new Error("Email and password are required");
  }
  const q = query(collection(firestore, "users"),where("email","==",userData.email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as {id:string, email:string, password:string}[];
 
  
  if (data.length > 0) {
    const isMatch = await bcrypt.compare(userData.password, data[0].password);
    if (isMatch) {
      return data[0];
    } else {
      throw new Error("Credentials do not match");
    }
  }else{
    throw new Error("Credentials do not match");
  }
}
/**
 * @description Signs in a user using their Google account. If the user already
 * exists in the database, their information is updated. If the user does not
 * exist, a new user document is created.
 * @param {Object} userData - The user data to be used for signing in. It must
 * contain at least the email property. Additional properties such as name and
 * image can be included.
 * @param {Function} callback - The callback function to be called after the
 * sign-in process. It takes an object with two properties: status and message.
 * The status property is a boolean indicating whether the operation was
 * successful. The message property is a string with the result of the operation.
 * @returns {void}
 */

export async function signInWithGoogle(userData: any,callback:any){
  const q = query(collection(firestore, "users"),where("email","==",userData.email));
  const snapshot = await getDocs(q);
  const data:any  = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "users", data[0].id), userData).then(() => {
      callback({
        status:true,
        message:"Sign in with Google successfully",
        data: userData
      });
    }).catch(() => {
      callback({
        status:false,
        message:"Sign in with Google failed"
      });
    });
  }else{
    userData.role = "member";
   await addDoc(collection(firestore, "users"),userData).then(() => {
    callback({
      status:true,
      message:"Sign in with Google successfully",
      data: userData
    });
   }).catch(() => {
    callback({
      status:false,
      message:"Sign in with Google failed"
    });
   });
  }
}

  /**
   * @description Creates a new user with the given data. If the email already exists, it will throw an error.
   * @param {Object} userData - The user data to be created. It must have the following properties: name, email, password. The role property is optional and defaults to "member".
   * @param {Function} callback - The callback function to be called after the user is created. It takes an object with two properties: status and message. The status property is a boolean indicating whether the user was created successfully or not. The message property is a string with the result of the operation.
   * @returns {void}
   */
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



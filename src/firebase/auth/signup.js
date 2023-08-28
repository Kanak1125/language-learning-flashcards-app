import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

export default async function signUp(email, password) {
    let result = null, err = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        err = e;
    }

    return { result, err };
}
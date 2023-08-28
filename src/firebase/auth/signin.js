import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

export default async function signIn(email, password) {
    let result = null, err = null;

    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        err = e;
    }

    return { result, err };
}
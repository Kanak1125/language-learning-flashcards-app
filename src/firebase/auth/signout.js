import { signOut } from "firebase/auth";
import { auth } from "../config";

export default async function logOut() {
    let err = null;

    try {
        await signOut(auth);
    } catch (e) {
        err = e;
    }

    return { err };
}
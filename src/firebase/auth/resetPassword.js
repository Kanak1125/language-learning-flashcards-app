import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config";

export default async function resetPassword(email) {
    let result = null, err = null;

    try {
        result = await sendPasswordResetEmail(auth, email);
    } catch (e) {
        err = e;
    }

    return { result, err };
}
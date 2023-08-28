import { signOut } from "firebase/auth";

export default async function logOut() {
    let err = null;

    try {
        await signOut();
    } catch (e) {
        err = e;
    }

    return { err };
}
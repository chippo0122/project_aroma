import "./firebase";
import { actionCodeSetting } from "./actionCodingSetting"
import {
    getAuth
    , createUserWithEmailAndPassword
    , signInWithEmailAndPassword
    , updateProfile
    , signOut
    , sendEmailVerification
    , sendPasswordResetEmail
} from "firebase/auth";

const Auth = getAuth();

const createAuth = async (userData) => {
    const { email, password, username } = userData;
    try {
        const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
        //update username after creating account
        await updateAuthName(username);
        const user = await userCredential.user;
        return user;
    } catch (error) {
        return error;
    }

}

const loginAuth = async (userData) => {
    const { email, password } = userData;
    try {
        const userCredential = await signInWithEmailAndPassword(Auth, email, password);
        const user = await userCredential;
        return user
    } catch (error) {
        return error
    }
}

const signoutAuth = async () => {
    try {
        await signOut(Auth);
        return 1
    } catch (error) {
        return 0
    }
}

const getUserAuth = async (clientToken) => {
    try {
        const user = Auth.currentUser;
        if (user) {
            if (clientToken === user.accessToken) {
                return user
            } else {
                return { message: 'Account is not match' }
            }
        } else {
            return { message: 'Please Login First' }
        }
    } catch (error) {
        return error
    }
}

const updateAuthName = async (name) => {
    try {
        await updateProfile(Auth.currentUser, { displayName: name });
        return 1
    } catch (error) {
        return 0
    }
}

const verifyMail = async () => {
    const user = Auth.currentUser;
    actionCodeSetting.url = `${actionCodeSetting.url}/verify/${user.uid}`;
    try {
        await sendEmailVerification(user, actionCodeSetting);
        return 1
    } catch (error) {
        return 0
    }
}

const verifyMailForgot = async (emailLink) => {
    try {
        await sendPasswordResetEmail(Auth, emailLink);
        return 1
    } catch (error) {
        return 0
    }
}

export {
    Auth
    , createAuth
    , loginAuth
    , signoutAuth
    , getUserAuth
    , verifyMail
    , verifyMailForgot
}


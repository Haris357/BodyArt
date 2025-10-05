import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { toast } from 'sonner';

export const signIn = async (email: string, password: string) => {
  try {
    if (!auth) {
      throw new Error('Firebase not configured. Please check your environment variables.');
    }
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message || 'Authentication failed' };
  }
};

export const signOut = async () => {
  try {
    if (!auth) {
      console.warn('Firebase not configured');
      return { success: true };
    }
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
};
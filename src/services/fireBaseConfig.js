import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAcaTy0Ac5AOgLRvfx5BtbPe5VFbo5ccT8',
  authDomain: 'drivent-5eae5.firebaseapp.com',
  projectId: 'drivent-5eae5',
  storageBucket: 'drivent-5eae5.appspot.com',
  messagingSenderId: '232917016561',
  appId: '1:232917016561:web:9dabb864bc84d7195b6e50',
  measurementId: 'G-0GNKTKGHGP'
};

export const app = initializeApp(firebaseConfig);
getAnalytics(app);

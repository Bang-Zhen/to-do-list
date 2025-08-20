import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAB1HPjlSc4wwcba3dwjutDJwjSfhjwjMM',
	authDomain: 'bangzhen-todo-list.firebaseapp.com',
	projectId: 'bangzhen-todo-list',
	storageBucket: 'bangzhen-todo-list.firebasestorage.app',
	messagingSenderId: '296464369558',
	appId: '1:296464369558:web:9a1ffa32054eebc262bfb7',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

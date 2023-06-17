import { initializeApp } from "firebase/app";
import { v4 as uuid } from 'uuid';
import { 
	getAuth, 
	signInWithPopup, 
	GoogleAuthProvider, 
	signOut,
	onAuthStateChanged, 
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
	signInWithPopup(auth, provider)
	.catch(console.error);
}

export function logout() {
	signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
	onAuthStateChanged(auth, async(user) => {
		//1.사용자가 있는 경우에 (로그인한 경우)
		const updatedUser = user ? await adminUser(user) : null;
		callback(updatedUser);
	});
}

async function adminUser(user) {
		//2. 사용자가 어드민 권한을 가지고 있는지 확인
		//3. {...user, isAdmin: true/false}
		return get(ref(database, 'admins')).then((snapshot) => {
			if (snapshot.exists()) {
				const admins = snapshot.val();
				const isAdmin = admins.includes(user.uid);
				return {...user, isAdmin}
			}
			return user;
		});
}

export async function addNewProduct(product, image) {
	const id = uuid();
	return set(ref(database, `products/${id}`), {
		...product,
		id,
		price: parseInt(product.price),
		image,
		options: product.options.split(','),
	});
}
 

export async function getProducts() {
	return get(ref(database, 'products')).then(snapshot => {
		if(snapshot.exists()) {
			return Object.values(snapshot.val());
		}
		return [];
	});
}
//쇼핑카트에 필요한 파이어베이스 3가지
//1. 특정한 사용자의 쇼핑카트를 읽어오는것
export async function getCart(userId) {
	return get(ref(database, `carts/${userId}`))
	.then((snapshot) => {
		const items = snapshot.val() || {};
		return Object.values(items);
	});
}

// 2. 특정한 사용자의 쇼핑카트에 제품을 추가하는것
export async function addOrUpdateToCart(userId, product) {
	return set(ref(database, `carts/${userId}/${product.id}`),  product);
}

// 3. 특정한 사용자의 쇼핑카트에 제품을 삭제하는것
export async function removeFromCart(userId, productId) {
	return remove(ref(database, `carts/${userId}/${productId}`));
}
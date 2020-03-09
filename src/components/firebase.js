import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_DATABASEURL,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket:process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`user_app_data/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		
			
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`user_app_data/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()
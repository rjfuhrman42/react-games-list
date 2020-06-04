import app from "firebase/app"
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDtof3OFk4dSxITiOOTWAlvqFWuPW9YQ18",
    authDomain: "react-games-list.firebaseapp.com",
    databaseURL: "https://react-games-list.firebaseio.com",
    projectId: "react-games-list",
    storageBucket: "react-games-list.appspot.com",
    messagingSenderId: "344765003988",
    appId: "1:344765003988:web:df4947f471b67f2e3a6341",
    measurementId: "G-XVHD9673QK"
  };

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
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

  isInitialized() {

    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
    // fire.auth.onAuthStateChanged((user) => {

    //   // if the user is logged in set is to be true
    //   if(user){
    //             setLoggedIn(true)  
    //             setUserID(user.uid)  
    //   }
    //   else setLoggedIn(false);
    // })
  }
}

export default new Firebase()
import app from "firebase/app"
import firebase from "firebase"
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

    this.getDatabase().ref(`users/${this.auth.currentUser.uid}`).set({
      list: {},
      username: name
    })

    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  addGame(game, rating){
    let ref = this.getListRef().push()     
    ref.set({
        image: game.image,
        title: game.title,                                                                    // append the game into the list 
        rating: rating,
        genres: game.genres
    })
  }

  getListRef()
  {
    return this.getDatabase()
               .ref(`users/${this.auth.currentUser.uid}/list/`)                              // returns a reference to the user's game list      
  }

  getDatabase() {
    return firebase.database()
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
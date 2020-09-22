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

    let ref = this.getListRef() 

    let gameData = {
          image: game.image,
          title: game.title,                                                                    // append the game into the list 
          rating: rating,
          genres: game.genres
      }

    let updated = {}

    ref.once('value', (snapshot) => {
      let match = false
     snapshot.forEach(snap => {

        let currentTitle = snap.val().title
        if(game.title === currentTitle)
        {
          match = true
          updated[snap.key] = gameData                                                         // Check the current game title against all other game titles in the database!
          ref.update(updated)                                                                  // If there is a match then update that match
        }
     })
     if(!match)                                                                                // No match ~
     {
        ref.push().set({
          image: game.image,
          title: game.title,                                                                   // append the game into the list 
          rating: rating,
          genres: game.genres
      })
     }   

 })

}

  removeGame(key) {
    var ref = this.getListRef().child(key)
    ref.remove()
  }

  getListRef()
  {
    return this.getDatabase()
               .ref(`users/${this.auth.currentUser.uid}/list/`)                              // returns a reference to the user's game list      
  }

  getDatabase() {
    return firebase.database()
  }

  async isGameAlreadyInList(title) {

    let ref = this.getListRef()
    let match = false
    
    await ref.once('value', (snapshot) => {
     snapshot.forEach(snap => {

        let currentTitle = snap.val().title
        if(title === currentTitle)
        {
          match = true
        }
                                                                    // Check the current game title against all other game titles in the database!
                                                                    // If there is a match then dissallow the ability to add and rate the game.
     })
 })

 return match

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
import * as firebase from 'firebase'

console.log('url', process.env.REACT_APP_databaseURL)

const app = firebase.initializeApp({ 
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
})

const Database = app.database()

// // const data = {
// //   helloworld: 'hello world!'
// // }

// // database.ref('test').set(data);

export default Database
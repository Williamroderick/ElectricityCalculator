// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDsKo1pppnp77rgSz4xKhxEdxL6ZG1cDs8",
    authDomain: "login-3aeb1.firebaseapp.com",
    databaseURL: "https://login-3aeb1-default-rtdb.firebaseio.com",
    projectId: "login-3aeb1",
    storageBucket: "login-3aeb1.appspot.com",
    messagingSenderId: "855790629037",
    appId: "1:855790629037:web:f048f269311f011caad624",
    measurementId: "G-643WZLW8DQ"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  // Sign Up Function
  function signUp() {
    const name = document.getElementById('fname').value;
    const email = document.getElementById('eemail').value;
    const password = document.getElementById('lpassword').value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
  
        // Write user data to database
        database.child('users').push({
          name,
          email
        });
  
        alert(`Welcome ${name}! You are now signed up.`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        alert(`Sign up failed. Error: ${errorMessage}`);
      });
  }
  
  // Add Event Listener to Sign Up Button
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', signUp);
  
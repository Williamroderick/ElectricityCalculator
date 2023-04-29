const firebaseConfig = {
  apiKey: "AIzaSyAzycrrZY9W5Sq820a0ke23YHIPDZhVUms",
  authDomain: "ecohabits-login.firebaseapp.com",
  databaseURL: "https://ecohabits-login-default-rtdb.firebaseio.com",
  projectId: "ecohabits-login",
  storageBucket: "ecohabits-login.appspot.com",
  messagingSenderId: "300618586932",
  appId: "1:300618586932:web:fb5a17e9d6b05468b3a361",
  measurementId: "G-ZSV64JXD9H",
};

const app = firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    console.log('User is logged in:', user);
    const userEmail = user.email;
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];

    const snapshot = await firebase.database().ref(`results/${userEmail.replace('.', ',')}`).once('value');

    const results = snapshot.val();
    console.log('Results:', results);

    const resultDate = new Date(results.timestamp);
    const formattedDate = `${resultDate.getDate()}/${resultDate.getMonth() + 1}/${resultDate.getFullYear()}`;
    const newRow = historyTable.insertRow();
    
    newRow.insertCell().innerText = formattedDate;
    newRow.insertCell().innerText = `Total cost: ${results.totalCost}, Total kilowatts: ${results.totalKilowatts}`;
    
  } else {
    console.log('User is not logged in');
    window.location.replace('index.html');
  }
});

function goBack() {
  window.location.replace('results.html');
}

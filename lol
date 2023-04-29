const firebaseConfig = {
            apiKey: "AIzaSyAzycrrZY9W5Sq820a0ke23YHIPDZhVUms",
            authDomain: "ecohabits-login.firebaseapp.com",
            databaseURL: "https://ecohabits-login-default-rtdb.firebaseio.com",
            projectId: "ecohabits-login",
            storageBucket: "ecohabits-login.appspot.com",
            messagingSenderId: "300618586932",
            appId: "1:300618586932:web:fb5a17e9d6b05468b3a361",
            measurementId: "G-ZSV64JXD9H"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
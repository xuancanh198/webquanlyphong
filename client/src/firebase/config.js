import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDk1vyXxAsRM6PWhMyPX_semnNTQUhzOYo",
  authDomain: "projectroom-fcd04.firebaseapp.com",
  projectId: "projectroom-fcd04",
  storageBucket: "projectroom-fcd04.appspot.com",
  messagingSenderId: "488884096857",
  appId: "1:488884096857:web:75ba4bd807cfcccd7bc648",
  measurementId: "G-L0MCL6P5CL"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
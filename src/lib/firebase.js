import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGVwY2XD9Spu89XVPO5HRO_j4TrrwbcWs",
  authDomain: "saas-chatbot-dashboard.firebaseapp.com",
  databaseURL: "https://saas-chatbot-dashboard-default-rtdb.firebaseio.com",
  projectId: "saas-chatbot-dashboard",
  storageBucket: "saas-chatbot-dashboard.firebasestorage.app",
  messagingSenderId: "292849698722",
  appId: "1:292849698722:web:7ec4b386b5a872268c14fb"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

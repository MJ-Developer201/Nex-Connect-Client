// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

//
const firebaseConfigData = import.meta.env.VITE_FIREBASE_CONFIG
const firebaseConfigDomain = import.meta.env.VITE_FIREBASE_DOMAIN
const firebaseConfigProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
const firebaseConfigBucket = import.meta.env.VITE_FIREBASE_BUCKET
const firebaseConfigMessaging = import.meta.env.VITE_FIREBASE_MESSAGING
const firebaseConfigAppId = import.meta.env.VITE_FIREBASE_APPID
const firebaseConfigMeasurement = import.meta.env.VITE_FIREBASE_MEASUREMENT
///
const firebaseConfig = {
  apiKey: `${firebaseConfigData}`,
  authDomain: ` ${firebaseConfigDomain}`,
  projectId: `${firebaseConfigProjectId}`,
  storageBucket: `${firebaseConfigBucket}`,
  messagingSenderId: `${firebaseConfigMessaging}`,
  appId: `${firebaseConfigAppId}`,
  measurementId: `${firebaseConfigMeasurement}`,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

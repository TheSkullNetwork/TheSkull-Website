const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

let db = null;
let configured = false;

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
  try {
    const app = initializeApp({
      credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      })
    });
    db = getFirestore(app);
    configured = true;
    console.log("[firebase] connected — using Firestore for resources/submissions");
  } catch (err) {
    console.log("[firebase] failed to initialize (" + err.message + ") — using in-memory storage");
  }
} else {
  console.log("[firebase] not configured — using in-memory storage (resets on restart)");
}

module.exports = { db, isConfigured: () => configured };

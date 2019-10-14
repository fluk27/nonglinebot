const admin = require('firebase-admin');

let serviceAccount = require('./My First Project-83ff4d002f5a.json');

module.exports={ DB:admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}),
}
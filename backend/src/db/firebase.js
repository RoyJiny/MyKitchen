const fb_admin = require('firebase-admin');
const {initializeApp} = require('firebase-admin/app');
const {getAuth} = require('firebase-admin/auth');
const serviceAccount = require('../../config/firebase-adminsdk.json');

const init = () => {
    fb_app = initializeApp({
        credential: fb_admin.credential.cert(serviceAccount)
    });
};

const getUserRecords = (user_id) => {
    getAuth(fb_app).getUser(user_id)
        .then((userRecord) => {
            console.log(`Successfully fetched user data: ${userRecord.email}`);
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
            res.status(401).send('Wrong data provided');
            return;
        });
};

const verifyToken = (token) => {

};

module.exports = {
    init,
    getUserRecords,
    verifyToken
};

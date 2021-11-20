import * as Google from 'expo-google-app-auth';
import { saveAuthToken } from './async_storage';

const signin = (successCB,isSeller) => {
  const config = {
    androidClientId: '225045444277-o7k85cn5613jru2vm2qnlgfa74gpbe8a.apps.googleusercontent.coma',
    scopes: ['profile','email']
  };

  Google.logInAsync(config)
    .then(result => {
      const {type,idToken,accessToken,user} = result;
      if (type == 'success') {
        userDetails = {
          email: user.email,
          name: user.givenName,
          imgUrl: user.photoUrl,
          isSeller: isSeller
        };
  
        console.log('details to send:',userDetails);

        /* send to server and get a token back */
        // saveAuthToken(token);

        successCB();
      } else {
        console.log('no success');
      }
    })
    .catch(err => console.log(err));
};

export {signin};
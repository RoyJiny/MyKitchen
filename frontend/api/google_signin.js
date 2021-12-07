import * as Google from 'expo-google-app-auth';
import { saveAuthToken } from './async_storage';

const signin = (successCB,stopLoadingCB,isSeller,setUser) => {
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
          isSeller: isSeller,
          googleId: idToken,
          addresses: [],
          favourites: []
        };
  
        console.log('details to send:',userDetails);
        setUser(userDetails); // later get that from the server response or request from /users/me 
        
        /* send to server and get a token back */
        
        saveAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTllOTFjOTU2NmUzOTc1NmVmNjI5MGIiLCJpYXQiOjE2Mzc3ODE5NjF9.5D2E1KXY1y63Rrw6KmBF7xIdctx_aDZACR_H5fGbJlQ').then(successCB).catch(err => console.log(err));
      } else {
        stopLoadingCB();
      }
    })
    .catch(err => {console.log(err); stopLoadingCB();});
};

export {signin};
import * as Google from 'expo-google-app-auth';
import { send_post_request, send_get_request } from '../utils/requests';
import { saveAuthToken } from './async_storage';

const signin = (successCB,stopLoadingCB,isSeller,setUser) => {
  const config = {
    androidClientId: '225045444277-o7k85cn5613jru2vm2qnlgfa74gpbe8a.apps.googleusercontent.coma',
    scopes: ['profile','email'],
    serviceConfiguration: {
      authorizationEndpoint: ''
    }
  };

  Google.logInAsync(config)
    .then(result => {
      const {type,idToken,accessToken,user: googleUser} = result;
      if (type == 'success') {
        send_post_request('users/signin',{googleId: googleUser.id},false)
          .then(data => {
            saveAuthToken(data.token)
              .then(() => {
                send_get_request('users/me')
                  .then(user_data => {
                    setUser({...user_data});
                    successCB(user_data.isSeller);
                  })
                  .catch(err => console.log(err))
              })
              .catch(err => {console.log(err);})
          })
          .catch(_ => { // failed to sign in -> try registering
            const userDetails = {
              email: googleUser.email,
              name: googleUser.givenName,
              imgUrl: googleUser.photoUrl,
              isSeller: isSeller,
              googleId: googleUser.id,
              addresses: [],
              favorites: []
            };

            if (isSeller) { // dont register yet, just pass information for the next screens
              setUser({...userDetails});
              successCB(); // move to kitchen registration
              return;
            }
      
            send_post_request(`users/${'customer'}/register`,userDetails,false)
              .then(data => {
                setUser({...userDetails});
                saveAuthToken(data.token).then(successCB).catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          });
      } else {
        stopLoadingCB();
      }
    })
    .catch(err => {console.log(err); stopLoadingCB();});
};

export {signin};
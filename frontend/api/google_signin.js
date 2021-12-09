import * as Google from 'expo-google-app-auth';
import { send_post_request, send_get_request } from '../utils/requests';
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
        send_post_request('users/signin',{googleId: user.id},false)
          .then(data => {
            saveAuthToken(data.token)
              .then(() => {
                send_get_request('users/me')
                  .then(user_data => {
                    setUser({...user, ...user_data});
                    successCB(user.isSeller);
                  })
                  .catch(err => console.log(err))
              })
              .catch(err => {console.log(err);})
          })
          .catch(_ => { // failed to sign in -> try registering
            const userDetails = {
              email: user.email,
              name: user.givenName,
              imgUrl: user.photoUrl,
              isSeller: isSeller,
              googleId: user.id,
              addresses: [],
              favorites: []
            };

            if (isSeller) { // dont register yet, just pass information for the next screens
              setUser({...user, ...userDetails});
              successCB(); // move to kitchen registration
              return;
            }
      
            send_post_request(`users/${'customer'}/register`,userDetails,false)
              .then(data => {
                setUser({...user, ...userDetails});
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
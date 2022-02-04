import * as Google from 'expo-google-app-auth';
import { send_post_request, send_get_request } from '../utils/requests';
import { saveAuthToken } from './async_storage';

const config = {
  androidClientId: '225045444277-o7k85cn5613jru2vm2qnlgfa74gpbe8a.apps.googleusercontent.coma',
  androidStandaloneAppClientId: '225045444277-gv1psl300pug4set71c46lnebtj3jpes.apps.googleusercontent.com',
  scopes: ['profile','email']
};

const register = (successCB,stopLoadingCB,isSeller,setUser,onFail=(msg) => {}) => {
  Google.logInAsync(config)
    .then(result => {
      const {type,idToken,accessToken,user: googleUser} = result;
      if (type == 'success') {
        const userDetails = {
          email: googleUser.email,
          name: googleUser.givenName,
          imgUrl: googleUser.photoUrl,
          isSeller: isSeller,
          googleId: googleUser.id,
          addresses: [],
          favorites: []
        };

        if (isSeller) { // dont register yet, just pass information for the next registration screens
          // verify that the user does not exist
          send_post_request('users/signin',{googleId: googleUser.id},false)
            .then(() => {onFail('You already have an account, please use sign-in');stopLoadingCB()})
            .catch(_ => { // user does not exists so we can move on
              setUser({...userDetails});
              successCB(); // move to kitchen registration
            })
          return;
        }
  
        // for a customer, send registration details to the server now, to create a new user
        send_post_request(`users/customer/register`,userDetails,false)
          .then(data => {
            setUser({...userDetails});
            saveAuthToken(data.token).then(successCB).catch(err => {console.log(err); stopLoadingCB();});
          })
          .catch(err => {console.log(err); stopLoadingCB(); onFail(err.response.status === 401 ? 'You already have an account, please use sign-in' : 'Connection failed')});
      } else {
        stopLoadingCB(); onFail('Failed to load Google account information')
      }
    })
    .catch(err => {console.log(err); stopLoadingCB(); onFail('Failed to connect to Google')});
}

const signin = (successCB,stopLoadingCB,setUser,onFail=(msg)=>{}) => {
  Google.logInAsync(config)
    .then(result => {
      const {type,idToken,accessToken,user: googleUser} = result;
      if (type === 'success') {
        send_post_request('users/signin',{googleId: googleUser.id},false)
          .then(data => {
            saveAuthToken(data.token)
              .then(() => {
                send_get_request('users/me')
                  .then(user_data => {
                    setUser({...user_data});
                    successCB(user_data.isSeller);
                  })
                  .catch(err => {console.log(err); stopLoadingCB(); onFail('Failed to sign in, please try again');})
              })
              .catch(err => {console.log(err); stopLoadingCB();})
          })
          .catch(err => {console.log(err); stopLoadingCB(); onFail('Failed to sign in, please try again');});
      } else {
        stopLoadingCB(); onFail('Failed to load Google account information');
      }
    })
    .catch(err => {console.log(err); stopLoadingCB(); onFail('Failed to connect to Google');});
};

export {signin,register};
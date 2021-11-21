import AsyncStorage from '@react-native-async-storage/async-storage';

const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    console.log('failed to save token');
  }
};

// will return null if there is no token saved
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('@auth_token', token);
  } catch (e) {
    console.log('failed to save token');
  }
};

export {
  saveAuthToken,
  getAuthToken
};
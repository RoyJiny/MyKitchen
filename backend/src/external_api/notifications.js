const {Expo} = require('expo-server-sdk');

const send_notification = async (expoPushToken,title,body,extra_data) => {
  let expo = new Expo()
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
    return;
  }

  const notification_obj = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: extra_data
  };

  try {
    expo.sendPushNotificationsAsync([notification_obj]);
  } catch (err) {
    console.log('Failed to send expo push notification:',err);
  }
};

const send_notification_to_user = async (user,title,body,extra_data={}) => {
  send_notification(user.expoPushToken,title,body,extra_data)
}

module.exports = {send_notification_to_user};

import ENV from './env.json'

export const actionCodeSetting = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `${ENV.HOST_URL}`,
    // This must be true.
    handleCodeInApp: true
  };
import axios from 'axios';

export const getIntentionFromDialogflow = text => {
  return axios.post(
    'https://us-central1-sinsi-vbvp.cloudfunctions.net/connectChat',
    {
      text,
    }
  );
};

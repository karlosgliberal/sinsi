import axios from 'axios';

export const addSinsiResponseFirestore = text => {
  return axios.post(
    'https://us-central1-sinsi-vbvp.cloudfunctions.net/addSinsiResponse',
    {
      text,
    }
  );
};

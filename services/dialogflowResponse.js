import axios from 'axios';

export default function dialogflowResponse(text, ctx) {
  axios
    .post('https://us-central1-sinsi-vbvp.cloudfunctions.net/connectChat', {
      text: text,
    })
    .then(res => {
      ctx.setState({
        messages: [
          ...ctx.state.messages,
          { me: true, author: 'You', body: res.data.fulfillmentText },
        ],
      });
    });
}

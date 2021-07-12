import axios from '../../../lib';

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
}).then((res) => {
  console.log('res',res);
});

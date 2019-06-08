console.log('this is script from /1.js');
fetch('/api/getUserById', {
  body: {
    id: 201906081740
  },
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'user-agent': 'Okc',
    'content-type': 'application/json'
  },
  method: 'POST',
  mode: 'cors', // no-cors, cors, *same-origin
  redirect: 'follow',
  referrer: 'no-referrer',
}).then(res0 => {
  return res0.json(); // 这里必须要转化格式，不然拿到的不是 json
}).then(res1 => {
  console.log(res1);
});
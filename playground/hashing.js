const jwt = require('jsonwebtoken');

const data = {
  id: 4
};

const token = jwt.sign(data, '123abc');
console.log(`token: ${token}`);

const token2 = jwt.sign(data, '123abc').toString();
console.log(`token 2: ${token2}`);

const decoded = jwt.verify(token, '123abc');
console.log(`decoded: ${JSON.stringify(decoded)}`);

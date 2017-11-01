const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc';

/*bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(`hash: ${hash}`);
  });
});*/

hashedPassword = '$2a$10$XI3B26FLzbajUnHgmiQSWOppL/VOEzUxbrxcVVPUtfC3vIA/7ppwq';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

const data = {
  id: 4
};

const token = jwt.sign(data, '123abc');
console.log(`token: ${token}`);

const token2 = jwt.sign(data, '123abc').toString();
console.log(`token 2: ${token2}`);

const decoded = jwt.verify(token, '123abc');
console.log(`decoded: ${JSON.stringify(decoded)}`);

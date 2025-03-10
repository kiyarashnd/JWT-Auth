// const usersDB = {
//   users: require('../model/users.json'),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
const User = require('../model/User');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  // const foundUsers = usersDB.users.find(
  //   (person) => person.refreshToken === refreshToken
  // );

  const foundUsers = await User.findOne({ refreshToken }).exec();
  if (!foundUsers) return res.sendStatus(403); //Frobidden
  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUsers.username !== decoded.username)
      return res.sendStatus(403);

    const roles = Object.values(foundUsers.roles);

    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };

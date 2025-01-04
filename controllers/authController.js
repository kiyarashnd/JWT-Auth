// const usersDB = {
//   users: require('../model/users.json'),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
const User = require('../model/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const fsPromisees = require('fs').promises;
// const path = require('path');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  // const foundUsers = usersDB.users.find((person) => person.username === user);
  const foundUsers = await User.findOne({ username: user }).exec();
  if (!foundUsers) return res.sendStatus(401); //Unauthorized
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUsers.password);
  if (match) {
    const roles = Object?.values(foundUsers?.roles);
    //create JWTs
    const accessToken = jwt.sign(
      { userInfo: { username: foundUsers.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    const refreshToken = jwt.sign(
      { username: foundUsers.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    //saving refresh token with current user
    // const otherUsers = usersDB.users.filter(
    //   (person) => person.username !== foundUsers.username
    // );
    // const currentUser = { ...foundUsers, refreshToken };
    // usersDB.setUsers([...otherUsers, currentUser]);
    // await fsPromisees.writeFile(
    //   path.join(__dirname, '..', 'model', 'users.json'),
    //   JSON.stringify(usersDB.users)
    // );

    foundUsers.refreshToken = refreshToken;
    const result = await foundUsers.save();
    console.log(result);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // res.json({ success: `User ${user} is logged in!` });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };

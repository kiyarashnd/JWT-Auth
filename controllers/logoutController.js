// const usersDB = {
//   users: require('../model/users.json'),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

// const fsPromisees = require('fs').promises;
// const path = require('path');

const User = require('../model/User');

const handleLogout = async (req, res) => {
  //on client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No Content
  const refreshToken = cookies.jwt;

  //Is Refresh token in db?

  // const foundUsers = usersDB.users.find(
  //   (person) => person.refreshToken === refreshToken
  // );
  const foundUsers = await User.findOne({ refreshToken }).exec();

  if (!foundUsers) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  }

  //Delete refreshToken in db

  // const otherUsers = usersDB.users.filter(
  //   (person) => person.refreshToken !== foundUsers.refreshToken
  // );
  // const currentUser = { ...foundUsers, refreshToken: '' };
  // usersDB.setUsers([...otherUsers, currentUser]);
  // await fsPromisees.writeFile(
  //   path.join(__dirname, '..', 'model', 'users.json'),
  //   JSON.stringify(usersDB.users)
  // );
  foundUsers.refreshToken = '';
  const result = await foundUsers.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //secure: true - only serves on https
  res.sendStatus(204);
};

module.exports = { handleLogout };

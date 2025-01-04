// const usersDB = {
//   users: require('../model/users.json'),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const User = require('../model/User');

// const fsPromises = require('fs').promises;
// const paht = require('path');
const bcrypt = require('bcrypt');
const path = require('path');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  //check for duplicate usernames in the db
  // const duplicate = usersDB.users.find((person) => person.uername === user)
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Confilict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store the new user
    const result = await User.create({
      username: user,
      // roles: { User: 2001 },
      password: hashedPwd,
    });
    console.log(result);
    // const newUser = new User();
    // const result = await newUser.save();

    // usersDB.setUsers([...usersDB.users, newUser]);
    // await fsPromises.writeFile(
    //   path.join(__dirname, '..', 'model', 'users.json'),
    //   JSON.stringify(usersDB.users)
    // );
    // console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };

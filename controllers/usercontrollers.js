const { User, Thought } = require('../models');

//aggregate function to get the total of users overall
const userCount = async () => {
  const numberOfUsers = await User.aggregate().count('UserCount')
  return numberOfUsers;
}

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        userCount: await userCount(),
      };

      res.json(userObj);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ id: req.params._id }).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ user });

    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a user
  async updateAUser(req, res) {
    try {

      const user = await User.findOneAndUpdate({ id: req.params._id }, { $set: req.body }, { new: true })
      res.json(user);

    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);

    } catch (err) {
      // console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ id: req.params._id });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      const reaction = await User.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: 'User deleted. No reactions found.' });
      }

      res.json({ message: 'User deleted.' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

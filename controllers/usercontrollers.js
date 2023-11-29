const { User } = require('../models');

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
  },
  // create a new friend
  async addNewFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ error: "User or friend does not exist" });
      }

      user.friends.push(friendId);

      await user.save();

      res.status(200).json({ response: "Friend was added" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a friend and remove them 
  async removeNewFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!friend) {
        return res.status(404).json({
          message: 'No friends found',
        });
      }

      res.json({ message: 'Friend was deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};


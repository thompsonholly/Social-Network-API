const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


//aggregate function get the total number of thoughts overall
const thoughtCount = async () => {
  const totalThoughts = await Thought.aggregate().count('ThoughtCount');
  return totalThoughts;
}


module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
        thoughtCount: await thoughtCount(),
      };

      res.json(thoughtObj);

    } catch (err) {
      console.log(err);

      return res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ id: req.params._id }).select('-__v');
      console.log(req.params._id);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json({ thought });
    } catch (err) {
      console.log(err);

      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const updateUser = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } }, { new: true })
      res.json({ thought, updateUser });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({ id: req.params._id }, { $set: req.body }, { new: true });
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error, try again' })
    }
  },
  // Delete a reaction and remove them from the thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtsId });
      const updatedUser = await User.findOneAndUpdate({ thoughts: req.params.thoughtsId }, { $pull: { thoughts: req.params.thoughtsId } }, { new: true })
      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {

    try {
      const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtsId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
      console.log(thought);

      res.json(thought);

    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $pull: { reactions: { reactionID: req.params.reactionId } } },
        { new: true }
      );
      console.log(thoughtData)
      // if (!reaction) {
      //   return res.status(404).json({ message: 'No reactions found :(' });
      // }

      res.json({ message: 'Reaction deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

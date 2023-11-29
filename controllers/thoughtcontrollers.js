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
        thoughtCount: await thoughtCount();
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
      res.json(thought);
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
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      const thought = await Thought.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtIdId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'Thought deleted, but no reaction found',
        });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an reaction to a thought
  async addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a thought
  async removeAssignment(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

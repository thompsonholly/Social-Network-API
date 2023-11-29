const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');


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
      const thought = await Thought.findOneAndDelete({ id: req.params._id });

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
      const thought = await Thought.findOne({ id: req.params._id });
      console.log(thought);

      //calling reaction thru Thought model
      const reaction = thought.reactions;
      console.log(reaction);

      // create new reaction
      const newReaction = {
        reactionID: req.params._id,
        reactionBody: req.body.reactionbody,
        username: req.body.username,
        createdAt: req.body.createdAt
      }
      console.log(newReaction);

      //update reaction

      thought.reactions = reaction;

      // add new reaction
      reaction.push(newReaction);

      // save thought
      await thought.save();

      res.json(newReaction);

    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a thought
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { id: req.params._id },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: 'No reactions found :(' });
      }

      res.json({ message: 'Reaction deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

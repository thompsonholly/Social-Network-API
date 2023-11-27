const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thought_text: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    created_at: {
      type: Date,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  reactions = [reactionSchema],
  {
    // * Use a getter method to format the timestamp on query
    toJSON: {
      getters: true,
    },
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query. 

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
module.exports = thoughtSchema;

/*
** Thought **:

* `thoughtText`
  * String
  * Required
  * Must be between 1 and 280 characters

    * `createdAt`
    * Date
    * Set default value to the current timestamp


        * `username`(The user that created this thought)
        * String
        * Required

        * `reactions`(These are like replies)
        * Array of nested documents created with the`reactionSchema`

        ** Schema Settings **:


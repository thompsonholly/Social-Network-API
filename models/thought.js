const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thought_text: {
      type: String,
      required: true,
      max_length: 50,
    },
    created_at: {
      type: Date,
      required: true,
      max_length: 280,
      min_length: 1
    },
    username: {
      type: String,
      required: true,
    },
  },
  reactions = [reactionSchema],
  {
    toJSON: {
      getters: true,
    },
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

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
      * Use a getter method to format the timestamp on query

        * `username`(The user that created this thought)
        * String
        * Required

        * `reactions`(These are like replies)
        * Array of nested documents created with the`reactionSchema`

        ** Schema Settings **:

Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query. */
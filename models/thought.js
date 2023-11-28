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


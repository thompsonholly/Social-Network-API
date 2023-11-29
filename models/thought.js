const { Schema, model } = require('mongoose');

//reactionSchema subdocument
const reactionSchema = new Schema({
  reactionID: { type: Schema.Types.ObjectId },
  reactionBody: { type: String, required: true, max_length: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thought_text: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },

    //array of docs created with reactionSchema
    reactions: [reactionSchema],
  },
  {
    // * Use a getter method 
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query. 

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema)
module.exports = Thought;


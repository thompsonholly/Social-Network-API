const { Schema, model } = require('mongoose');

// Schema to create a user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      required: true,
      trimmed: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],

    toJSON: {
      virtuals: true,
    },
    id: false,

  });

//   ** Schema Settings **:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.


userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const user = model('user', userSchema);

module.exports = userSchema


/* **User**:

* `username`
  * String
  * Unique
  * Required
  * Trimmed

* `email`
  * String
  * Required
  * Unique
  * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
  * Array of `_id` values referencing the `Thought` model

* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)

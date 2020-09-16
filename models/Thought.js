const { Schema, model } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: "You better think",
        minLength: 1,
        maxLength: [280, 'Must be 280 characters or less']
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
      username: {
          type: String,
          required: 'Enter that Username',
          
      },
    //   reactions: []
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
);

const Thought = model('Thought', ThoughtSchema);

// ThoughtSchema.virtual('reactionsCount').get(function() {
//     return this.reactions.length;
// });

module.exports = Thought;

const { Schema, model } = require('mongoose');
const moment = require('moment');
const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: 'Thought is Required',
        minlength: 1,
        maxlength: [280, "Thought must be 280 characters or less (don't over think it!)"]
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
     username: {
       type: String,
       required: 'Please enter your Username'
     }
    //  reactions: []
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );
// create the User model using the UserSchema
const Thought = model('Thought', ThoughtSchema);
// ThoughtSchema.virtual('reactionsCount').get(function() {
//   return this.reactions.length;
// });
// export the User model
module.exports = Thought;
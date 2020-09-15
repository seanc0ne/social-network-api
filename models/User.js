const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
    {
      username: {
        type: String
      },
      email: {
        type: String
      },
    },
    // {
    //   toJSON: {
    //     virtuals: true,
    //     getters: true
    //   },
    //   id: false
    // }
  );

  // create User model using UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;
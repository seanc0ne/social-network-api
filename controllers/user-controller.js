const { User } = require('../models');
const { db } = require('../models/User');
const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    // get one user by id
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
        .populate({
          path: 'friends',
          select: '-__v'
        })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },

    // createUser
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update User by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add friend
    addFriend({ params }, res) {
      User.findOne({ _id: params.userId }).then(user => {
        if (user.friends.includes(params.friendId)) {
          res.status(500).send('Users are already friends.')
        }
      });

      User.findOneAndUpdate({ _id: params.userId }, {
        $push: {
          friends: params.friendId
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID.' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete friend
    deleteFriend({ params }, res) {
      User.findOne({ _id: params.userId }).then(user => {
        if (user.friends.includes(params.friendId)) {
          res.status(500).send('Users are already friends.')
        }
      });

      User.findOneAndUpdate({ _id: params.userId }, {
        $push: {
          friends: params.friendId
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID. '});
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;

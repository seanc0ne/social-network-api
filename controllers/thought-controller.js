const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create thought and add it to a user - POST /api/thoughts/:userId
    createThought({ body }, res) {
        console.log(body)
        Thought.create(body)
            .then((dbThoughtData) => {        // pass the _id of the newly created thought
                return User.findOneAndUpdate(   // and update the array of thoughts of the associated user
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }   // b/c we want to return the updated user data
                )
                    .select('-__v');
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                console.log(dbUserData)
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    
    // delete Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
}
module.exports = thoughtController;
const router = require('express').Router();

const {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,

} = require('../../controllers/thoughtcontrollers');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought)

// /api/thoughts/:thoughtsId/
//new thought
// router.route('/:thoughtsId').post(createThought);

// /api/thoughts/:thoughtsId
//delete a thought
// router.route('/:thoughtsId').delete(deleteThought);

// /api/thoughts/:thoughtsId
//update a thought
// router.route('/:thoughtsId').put(updateThought);

// /api/thoughts/:thoughtsId/reactions
// create a new reaction
router.route('/:thoughtsId/reactions').post(addReaction)

// delete a reaction
router.route('/:thoughtsId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;


/*
** `/api/thoughts` **

* `GET` to get all thoughts

  * `GET` to get a single thought by its`_id`

    * `POST` to create a new thought(don't forget to push the created thought's`_id` to the associated user's `thoughts` array field)

      ```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

      * `PUT` to update a thought by its`_id`

    * `DELETE` to remove a thought by its`_id`


**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

*/

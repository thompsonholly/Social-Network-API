const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addThought,
  removeThoughtText,
} = require('../../controllers/thoughtcontrollers');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughts
router.route('/:id').get(getSingleThought).delete(deleteThought);

// /api/thoughts/:id/thoughts
router.route('/:id/thoughts').post(addThought);

// /api/thoughts/:thoughts/thoughts/:thought_text
router.route('/:id/thoughts/:thought_text').delete(removeThoughtText);

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

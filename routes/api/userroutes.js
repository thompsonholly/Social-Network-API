const router = require('express').Router();

const {

  // get all users
  getAllUsers,

  // get a single user by _id
  getSingleUser,

  // post a new user
  createUser,

  // put update by _id
  updateAUser,

  // delete user
  deleteUser,

  // add friend
  addNewFriend,

  // delete new friend
  deleteNewFriend,

} = require('../../controllers/usercontrollers.js');

// /api/users 
router.route('/').get(getAllUsers)

// /api/users get single user/:userId
router.route('/:userId').get(getSingleUser)

// /api/users/:userId
router.route('/').post(createUser)

// /api/users/:userId
router.route('/:userId').put(updateAUser)

// /api/users/:userId
router.route('/:userId').delete(deleteUser)

// api/users/:userId/friends/:friendId

router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteNewFriend)


module.exports = router;
/*
**`/api/users`**

* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a create user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`
*/


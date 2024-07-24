const express = require('express');

const router = express.Router();

let users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'wick',
    email: 'johnwick@gamil.com',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'smith',
    email: 'johnsmith@gamil.com',
  },
  {
    id: 3,
    firstName: 'Joyal',
    lastName: 'white',
    email: 'joyalwhite@gamil.com',
  },
];

// GET request: Retrieve all the users
router.get('/', (_req, res) => {
  return res.status(200).json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  // Retrieve the id parameter from the request url
  const userId = Number(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (!user)
    res.status(404).json({ status: 'fail', message: 'User not found!' });

  return res.json(user);
});

// POST request: Create a new user
router.post('/', (req, res) => {
  const { email } = req.body;
  const existingId = users.length;

  const userWithSameEmail = users.find((user) => user.email === email);

  if (userWithSameEmail)
    return res.status(409).json({
      status: 'conflict',
      message: 'User with the same email already exists',
    });

  users.push({
    id: existingId + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  return res.status(201).json({
    status: 'success',
    message: `The user ${req.body.firstName} has been added!`,
  });
});

// PUT request: Update the details of a user based on its ID
router.put('/:id', (req, res) => {
  const { id: userId, firstName, lastName, email } = req.body;
  const matchedUser = users.find((user) => user.id === userId);

  if (!matchedUser)
    return res.status(404).json({ status: 'fail', message: 'User not found!' });

  if (firstName) matchedUser.firstName = firstName;
  if (lastName) matchedUser.lastName = lastName;
  if (email) matchedUser.email = email;

  users = users.filter((user) => user.id !== userId);
  users.push(matchedUser);

  res.send(`User ${matchedUser.id} updated successfully!`);
});

router.delete('/:id', (req, res) => {
  console.log('-----------')
  const userId = Number(req.params.id);
console.log(userId)
  const user = users.find((user) => user.id === userId);

  if (!user)
    return res.status(404).json({ status: 'fail', message: 'User not found' });

  users = users.filter((user) => user.id !== userId);

  res
    .status(204)
    .json({ status: 'success', message: `User was deleted successfully` });
});

module.exports = router;

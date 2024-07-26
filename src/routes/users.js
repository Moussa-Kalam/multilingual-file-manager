import express from 'express';
import { getUsers, getUserById, findUserByEmail,
  createUser,
  updateUser,
  deleteUser
 } from '../controllers/users.js'

const userRoutes = express.Router();


userRoutes.get('/', async (_req, res) => {
  const users = await getUsers();
  return res.status(200).json(users[0]);
});

// GET user by ID
userRoutes.get('/:id', async (req, res) => {
  // Retrieve the id parameter from the request url
  const userId = Number(req.params.id);
try{
  const user = await getUserById(userId);
  return res.status(200).json(user);
} catch (error){
  return res.status(404).json({ status: 'fail', message: 'User not found!' });
}
});

// POST request: Create a new user
userRoutes.post('/', async (req, res) => {
  const { email,password,language } = req.body;
  const userWithSameEmail = await findUserByEmail(email);

  if (userWithSameEmail.length > 0)
    return res.status(409).json({
      status: 'conflict',
      message: 'User with the same email already exists',
    });

  try {
    await createUser({
      email:email,
      password:password,
      language:language,
    })
    return res.status(201).json({
      status: 'success',
      message: `The user with ${email} has been added!`,
    });
    
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
  
});

// PUT request: Update the details of a user based on its ID
userRoutes.put('/:id', async (req, res) => {
  const userId = Number(req.params.id);
  const {email,password,language } = req.body;
  
  try {
    const matchedUser = await getUserById(userId);

      if (language) matchedUser.language = language;
      if (password) matchedUser.password = password;
      if (email) matchedUser.email = email;
      
      await updateUser(userId, matchedUser)
      res.json(`User ${userId} updated successfully!`);
  } catch (error) {
    return res.status(404).json({ status: 'fail', message: 'User not found!' });
  } 
});

userRoutes.delete('/:id',async (req, res) => {
  const userId = Number(req.params.id);
  try {
    const user = await getUserById(userId);
    await deleteUser(user.id)
    return res.status(200).json({ status: 'success', message: 'User deleted successfully' });
  } catch (error) {
   return res.status(404).json({ status: 'fail', message: 'User not found' });
  }
});

export default userRoutes
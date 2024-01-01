import express from 'express';
import { deleteUserById, getUserById, getUsers, updateUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }
    const updatedUser = await updateUserById(id, { username });
    const user = await getUserById(id);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

    // user.username = username;
    // await user.save();
    return res.json({
      status: 200,
      data: user,
      message: `User ${updatedUser?.username} updated successfully as ${username}`
    }).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);

  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    return res.json({
      status: 200,
      data: deletedUser,
      message: `User with username: ${deletedUser?.username} deleted successfully`
    }).end();
    // return {
    //   status: 200,
    //   data: deletedUser,
    //   message: `User with id ${deletedUser?.username} deleted successfully`
    // }

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);

  }
}
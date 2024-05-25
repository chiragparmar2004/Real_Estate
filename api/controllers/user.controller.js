import prisma from "../lib/prisma.js";
import sendResponse from "../lib/responseHelper.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    sendResponse(res, 200, "successfully fetched users", users);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, " Failed to get users !");
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    sendResponse(res, 200, "successfully fetched user", user);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, " Failed to get user !");
  }
};

export const updateUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;

    console.log(id);
    console.log(tokenUserId);
    if (id !== tokenUserId) {
      return sendResponse(res, 403, "Not Authorized !");
    }
    let updatedPassword = null;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, " Failed to update user !");
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;

    if (id !== tokenUserId) {
      return sendResponse(res, 403, "Not Authorized !");
    }

    await prisma.user.delete({
      where: { id },
    });
    sendResponse(res, 200, "User Deleted Successfully");
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, " Failed to Delete user  !");
  }
};

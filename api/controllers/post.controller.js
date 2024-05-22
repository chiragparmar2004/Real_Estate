import prisma from "../lib/prisma.js";
import sendResponse from "../lib/responseHelper.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    // sendResponse(res, 200, "Fetched Posts Successfully", posts);
    res.status(200).json({
      message: "Fetched Posts Successfully",
      data: posts,
    });
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Failed to get Posts");
  }
};

export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
      where: { id },
    });

    sendResponse(res, 200, "Fetched Post Successfully", post);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Failed to get Post");
  }
};

export const addPost = async (req, res) => {
  try {
    const body = req.body;
    const tokenUserId = req.userId;

    const newPost = await prisma.post.create({
      data: {
        ...body,
        userId: tokenUserId,
      },
    });

    sendResponse(res, 200, "added Post Successfully", newPost);
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Failed to add Post");
  }
};

export const updatePost = async (req, res) => {
  try {
    sendResponse(res, 200, "update Post Successfully");
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Failed to update Post");
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenUserId = req.userId;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.id !== tokenUserId) {
      return sendResponse(res, 403, "You are not authorized");
    }

    await prisma.post.delete({
      where: { id },
    });
    sendResponse(res, 200, "delete Post Successfully");
  } catch (error) {
    console.log(error);
    sendResponse(res, 500, "Failed to delete Post");
  }
};

import prisma from "../lib/prisma.js";
import sendResponse from "../lib/responseHelper.js";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });
    console.log(posts);
    res.status(200).json({
      message: "Fetched Posts Successfully",
      posts,
    });
    // res.status(200).json(posts);
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
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
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
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
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
    console.log(post);
    if (post.userId !== tokenUserId) {
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

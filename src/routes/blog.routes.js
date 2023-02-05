import express from "express";
import blogController from "../controller/blog.controller";
import verifyAdmin from "../middlewares/verify.admin";
const blogRoute = express.Router();

/**
 * @swagger
 * components:
 *  responses:
 *           200:
 *               description: Success
 *           400:
 *               description: Bad request
 *           401:
 *               description: Authorization
 *           404:
 *               description: Not found
 *           500:
 *               description: Unexpected error.
 *  schemas:
 *      Blog:
 *          type: object
 *          required:
 *              -title
 *              -blogBody
 *              -id
 *          properties:
 *            title:
 *                  type: string
 *                  description: title of blog
 *            blogBody:
 *                  type: string
 *                  description: Body of blog
 *            id:
 *                  type: string
 *                  description: Id of the blog
 *          example:
 *              title: Coding is gonna be fun.
 *              blogBody: for real education hide everything we need
 *  parameters:
 *           blogId:
 *              name: id
 *              in: path
 *              description: Id for specified blogId
 *              required: true
 *              schema:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *  name: Blog
 *  description: All Blogs created
 */

/**
 * @swagger
 * /api/blogs:
 *    post:
 *      summary: creating blog
 *      tags: [Blog]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Blog'
 *      responses:
 *          200:
 *              description: Blogs Created Successfully!
 *          400:
 *              $ref: '#/components/responses/400'
 */

/**
 * @swagger
 * /api/blogs:
 *  get:
 *    summary: getting all blogs published
 *    tags: [Blog]
 *    responses:
 *          200:
 *            description: All blogs is here!
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                items:
 *                  $ref: '#/components/schemas/schemas/Blog'
 */
blogRoute.get("/blogs", blogController.getAllBlogs); //Get all blogs
blogRoute.post("/blogs", blogController.createBlog); // create new blog
//updating blogs
/**
 * @swagger
 * /api/blogs/{id}:
 *  patch:
 *      summary: updating blogs
 *      tags: [Blog]
 *      parameters:
 *          - $ref: '#/components/parameters/blogId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Blog'
 *      responses:
 *          200:
 *              description: Success update
 *          400:
 *              $ref: '#/components/responses/400'
 *          401: 
 *              $ref: '#/components/responses/401'
 *          404:
 *              description: not found  
 */
blogRoute.patch("/blogs/:id", verifyAdmin, blogController.updateBlog); //update existing blog
blogRoute.get("/blogs/:id", blogController.getSingleBlog); //get single blog
//deleting blog

/**
 * @swagger
 * /api/blogs/{id}:
 *  delete:
 *   summary: Delete one blog
 *   tags: [Blog]
 *   parameters:
 *          - $ref: '#/components/parameters/blogId'
 *   responses:
 *      200:
 *        description: Blog deleted
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: not found 
 */
blogRoute.delete("/blogs/:id", blogController.deleteBlog); //delete single blog


export default blogRoute;
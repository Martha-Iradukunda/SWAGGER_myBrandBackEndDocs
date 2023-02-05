import express from 'express'
import UserController from '../Controller/user.controller'
import User from '../middleware/Models/user.model';
import verifyAdmin from '../middlewares/verify.admin'

const userRoute = express.Router();

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
 *      User:
 *          type: object
 *          required:
 *              -username
 *              -email
 *              -password
 *              -repeatPassword
 *              -id
 *          properties:
 *            username:
 *                  type: string
 *                  description: The username of the user
 *            
 *            email: 
 *                  type: string
 *                  description: user email address 
 *            password:
 *                  type: string
 *                  description: password
 *            repeatPassword:
 *                  type: string
 *                  description: Repeat password
 *            id:
 *                  type: string
 *                  description: User Id
 * 
 *          example:
 *              username:marita
 *              email:marthairadukunda1@gmail.com
 *              password:12345
 *              repeatPassword:12345
 *  parameters:
 *           userId:
 *              name: id
 *              in: path
 *              description: The Id for specified userId
 *              required: true
 *              schema:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: All users signed up
 */

/**
 * @swagger
 * /api/signUp:
 *    post:
 *      summary: creating user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: User signed up Successfully!
 *          400:
 *              $ref: '#/components/responses/400'
 */
//LOGIN


/**
 * @swagger
 * /api/login:
 *    post:
 *      summary: Login user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: User logged in Successfully!
 *          400:
 *              $ref: '#/components/responses/400'
 */

/**
 * @swagger
 * /api/getAllUsers:
 *  get:
 *    summary: getting all users signed up
 *    tags: [User]
 *    responses:
 *          200:
 *            description: All the users are here!
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                items:
 *                  $ref: '#/components/schemas/schemas/User'
 */

///


userRoute.post("/login", UserController.login);
userRoute.post("/signUp", UserController.createUser);
userRoute.get("/getAllUsers", verifyAdmin, UserController.getAllUsers)

//updating users

/**
 * @swagger
 * /api/getSingleUser/{id}:
 *  patch:
 *      summary: updating User
 *      tags: [User]
 *      parameters:
 *          - $ref: '#/components/parameters/userId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/User'
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

userRoute.get("/getSingleUser/:id", verifyAdmin, UserController.getSingleUser);
userRoute.patch("/updateUsers/:id", verifyAdmin, UserController.updateUser);

/**
 * @swagger
 * /api/deleteUser/{id}:
 *  delete:
 *   summary: Delete one user
 *   tags: [User]
 *   parameters:
 *          - $ref: '#/components/parameters/userId'
 *   responses:
 *      200:
 *        description: Message deleted
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: not found 
 */
userRoute.delete("/deleteUser/:id", verifyAdmin, UserController.deleteUser);

export default userRoute
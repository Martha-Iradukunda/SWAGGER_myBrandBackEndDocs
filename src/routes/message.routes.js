import express from "express";
import messageController from "../controller/message.controller";

const messageRoute = express.Router();

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
 *      Message:
 *          type: object
 *          required:
 *              -fname
 *              -lname
 *              -email
 *              -message
 *              -id
 *          properties:
 *            fname:
 *                  type: string
 *                  description: The first name of the user
 *            lname:
 *                  type: string
 *                  description: Second name of user
 *            email: 
 *                  type: string
 *                  description: user email address 
 *            id:
 *                  type: string
 *                  description: Message Id
 * 
 *          example:
 *              fname:marita
 *              lname:iradukunda
 *              othername:dukunda
 *              email:marthairadukunda1@gmail.com
 *              message:How can i become a full stack developer?
 *  parameters:
 *           messageId:
 *              name: id
 *              in: path
 *              description: The Id for specified messageId
 *              required: true
 *              schema:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *  name: Message
 *  description: All Messages created
 */

/**
 * @swagger
 * /api/messages:
 *    post:
 *      summary: creating message
 *      tags: [Message]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Message'
 *      responses:
 *          200:
 *              description: Message Created Successfully!
 *          400:
 *              $ref: '#/components/responses/400'
 */

/**
 * @swagger
 * /api/messages:
 *  get:
 *    summary: getting all message sent
 *    tags: [Message]
 *    responses:
 *          200:
 *            description: All the Messages are here!
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                items:
 *                  $ref: '#/components/schemas/schemas/Message'
 */

messageRoute.post("/messages", messageController.createMessage);
messageRoute.get("/messages", messageController.getAllMessages)

//updating Messages
/**
 * @swagger
 * /api/messages/{id}:
 *  patch:
 *      summary: updating messages
 *      tags: [Message]
 *      parameters:
 *          - $ref: '#/components/parameters/messageId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Message'
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
messageRoute.patch("/messages/:id", messageController.updateMessage)
messageRoute.get("/messages/:id", messageController.getSingleMessage);
//deleting message

/**
 * @swagger
 * /api/messages/{id}:
 *  delete:
 *   summary: Delete one message
 *   tags: [Message]
 *   parameters:
 *          - $ref: '#/components/parameters/messageId'
 *   responses:
 *      200:
 *        description: Message deleted
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: not found 
 */
messageRoute.delete("/messages/:id", messageController.deleteMessage)

export default messageRoute;
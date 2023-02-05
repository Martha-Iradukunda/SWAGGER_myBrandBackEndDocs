import express from "express";
import databaseConnection from "./src/database/dataBase";
// import cors from "cors";
import dotenv from "dotenv";
import SwaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import messageRoute from "./src/routes/message.routes";
import blogRoute from "./src/routes/blog.routes";
import userRoute from "./src/routes/user.routes";

const bcrypt = require('bcrypt')
const app = express();
const port = process.env.PORT;

// app.use(cors());
app.use(express.json());
dotenv.config(); //importing contents of .env file

//define a banch of options eg authenication, authorization
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Martha\'s Express APIs documentation',
            version: '1.0.0',
            description: 'This Is my Brand backend documentation',
            contact: {
                name: 'Martha Iradukunda',
                email: '\nSEmail: marthairadukunda1@gmail.com'
            },

        },
        servers: [
            { url: 'http://localhost:4500' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: 'header',
                    bearerformat: 'JWT',
                }
            }
        },

        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js'], //all routes are documented
}

const specs = swaggerJSDoc(options)
databaseConnection().then(() => {

    app.use("/api", messageRoute);
    app.use("/api", blogRoute);
    // app.use("/images", express.static("images"));
    app.use('/api', userRoute)
    app.get('/', (req, res) => {
        res.json({ message: "Welcome on our route" })
    })
    app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(specs));

    app.listen(port, () => {
        console.log("The app is listening on : " + port)
    })
}).catch((error) => {
    console.log(error)
})

export default app

// app.use("/images", express.static("images"))
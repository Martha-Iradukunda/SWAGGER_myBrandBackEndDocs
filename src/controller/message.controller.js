import Message from "../middleware/Models/message.model";

class messageController {
    //create a contact message
    static async createMessage(req, res) {
        try {
            const message = new Message({
                fname: req.body.fname,
                lname: req.body.lname,
                othername: req.body.othername,
                email: req.body.email,
                message: req.body.message,
            });
            await message.save();
            res.status(201).json(message);
            console.log("message sent!!!");
        } catch (error) {
            res.status(401).json(error.message);
        }
    }

    //get single message
    static async getSingleMessage(req, res) {
        try {
            const message = await Message.findById(req.param.id);
            res.status(200).json(message)
        } catch (error) {
            res.status(404).json(error.message);
        }
    }

    //get all messages
    static async getAllMessages(req, res) {
            try {
                const messages = await Message.find();
                res.status(200).json(messages)
            } catch (error) {
                res.status(404).json(error.message);
            }
        }
        //delete messages

    static async deleteMessage(req, res) {
        try {

            const deletemessage = await Message.findOneAndDelete({ _id: req.params.id })
            res.status(200).json({
                status: "success",
                message: "Message deleted successfully!",
                data: deletemessage
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //update message

    static async updateMessage(req, res) {
        try {

            // const imageUrl = `http://localhost:5000/images/${req.file.filename}`

            const updatedMessage = await Message.findByIdAndUpdate(req.params.id, {
                $set: {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    othername: req.body.othername,
                    email: req.body.email,
                    message: req.body.message
                }
            }, { new: true });
            res.status(200).json({
                status: "success",
                data: updatedMessage
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}



export default messageController;
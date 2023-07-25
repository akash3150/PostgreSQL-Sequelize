const db = require("../../models");
const userPics = db.userPics;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {

        // Create a User
        const data = {
            url: req.body.url,
            userId: req.body._user
        };

        // Save User in the database
        let userPic = await userPics.create(data);
        console.log(userPic);
        res.send({
            status: true,
            message: 'User Pics created successfully',
            data: userPic
        });
    } catch (error) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
        });
    }
};
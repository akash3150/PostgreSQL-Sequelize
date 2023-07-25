const db = require("../../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {

        // Create a User
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isActive: true
        };

        // Save User in the database
        let user = await Users.create(data)
        res.send({
            status: true,
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while creating the Tutorial."
        });
    }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    try {
        var condition = { isDeleted: false, };
        if (req.query.name) {
            condition.name = { [Op.regexp]: req.query.name };
        }
        // if (req.query.ids) {
        //     console.log("Found ", JSON.parse(req.query.ids))
        //     condition.id = { [Op.in]: JSON.parse(req.query.ids) };
        // }
        let { count, rows } = await Users.findAndCountAll({
            where: condition,
            include: db.userPics,
            order: [['createdAt', 'DESC']],
            offset: (req.query.page - 1) * req.query.limit,
            limit: req.query.limit
        });
        return res.send({
            status: true,
            message: 'Get successfully',
            data: rows,
            count: count
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users"
        });
    }
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Users.findByPk(id)
        .then(data => {
            if (data) {
                res.send({
                    status: true,
                    message: 'Get successfully',
                    data: data
                });
            } else {
                res.status(404).send({
                    message: `Not Found`
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message: "Error retrieving Users with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Users.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    status: true,
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    status: false,
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                message: "Could not delete user with id=" + id
            });
        });
};
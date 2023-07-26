module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                // customValidator(value) {  // you can addd custom validations also
                //     if (value === null || value === undefined) {
                //         throw new Error("name can't be null ");
                //     }
                // },
                notNull: {    // Not allowed to be null message 
                    msg: 'Please enter your name'
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,  // Value should not be null
            unique: { args: true, msg: "Email already exists" } // Unique email validation message
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                len: [5, 10]   //Length validation for password
            }
        },
        userName: {
            type: Sequelize.VIRTUAL,
            get() {
                return `${this.name}18`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            }
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        deletedAt: 'deletedAt',
        timestamps: true,
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['email']
            }
        ]
    });

    return User;
};
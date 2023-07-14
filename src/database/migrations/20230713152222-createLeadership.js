'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('leadership', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            leaderEmail: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            subordinateEmail: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });

        await queryInterface.addConstraint('leadership', {
            fields: ['leaderEmail'],
            type: 'foreign key',
            references: {
                table: 'employees',
                field: 'email',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('leadership');
    }
};
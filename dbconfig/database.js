require('dotenv').config();

const Knex = require('knex');

const knexConfig = require('./knexfile');

const { Model } = require('objection');

module.exports = function connectToDb () {
    let knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
    Model.knex(knex);
    return knex;
};
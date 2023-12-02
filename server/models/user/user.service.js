const User = require('../../models/user/user.model');
const IDGenerator = require('../../utils/idGenerator');
const { AlabalaError, AlabalaErrorTypes } = require('../../utils/AlaBalaError');

exports.validateEmail = function (email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

exports.createUser = async function (email, username, password) {
    const user = await User.query()
        .insert({
            id: IDGenerator.generateUUID(),
            email: email,
            username: username,
            password: IDGenerator.generateUUIDHash(password),
        });
    return user;
}

exports.loginUser = async function (userWithTheSameCredentials, password) {
    const hashedPassword = IDGenerator.generateUUIDHash(password);
    const hashedUserPassword = userWithTheSameCredentials.password;

    if (hashedUserPassword !== hashedPassword) {
        throw new AlabalaError(AlabalaErrorTypes.BAD_INPUTS, 'Wrong Password!');
    }

    return userWithTheSameCredentials;
}

exports.getUserByUsername = async function (username) {
    const user = await User.query()
        .select('id', 'email', 'username')
        .where('username', username)
        .limit(1)
        .first();

    return user;
}


exports.getUserIdByUsername = async function (username) {
    const user = await User.query()
        .select('id')
        .where('username', username)
        .limit(1)
        .first();

    return user;
}

exports.getUserUsernameById = async function (userId) {
    const user = await User.query()
        .select('username')
        .where('id', userId)
        .limit(1)
        .first();

    return user ? user.username : null;
}
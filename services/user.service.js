const db = require('../_helpers/database');
const User = db.User;

module.exports = {
    getAll,
    getById,
    delete: _delete
};

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function _delete(id){
    await User.findByIdAndDelete(id);
}
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {type: String, required: true, maxLength: 20},
    password: {type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;
    next();
})

UserSchema.methods.validPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

module.exports = mongoose.model('User', UserSchema);

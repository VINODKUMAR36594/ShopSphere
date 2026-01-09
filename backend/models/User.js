const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+@.+\..+/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer"
        },
    },
    { timestamps: true }
);

// password hash middleware (FIXED)
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);   // ✅ generate salt
    this.password = await bcrypt.hash(this.password, salt); // ✅ hash & assign

    next();
});

// match user entered password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

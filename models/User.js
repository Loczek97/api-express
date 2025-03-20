const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const salt = 10; //salt for hashing password - bcrypt

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//hash password before saving
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, salt, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

//compare password with hashed password
userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);

  return isPasswordCorrect;
};

//check if email exists
userSchema.statics.checkEmail = async function (email) {
  const user = await this.findOne({ email });
  return user;
};

//prepare user object to send
userSchema.methods.toSend = function () {
  const userObject = this.toObject();
  delete userObject.password;

  return userObject;
};

module.exports = mongoose.model("User", userSchema);

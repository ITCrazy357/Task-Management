const User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({
      code: 400,
      message: "Vui lòng gửi token trong header Authorization",
    });
  } else {
    const token = req.headers.authorization.split(" ")[1];

    const user = await User.findOne({
      token: token,
      deleted: false,
    }).select("-password -__v -deleted -token  ");

    if (!user) {
      return res.json({
        code: 400,
        message: "Token không hợp lệ hoặc đã hết hạn",
      });
    }
    req.user = user;
  }
  next();
};

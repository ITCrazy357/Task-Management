const md5 = require("md5");
const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");
const sendEmailHelper = require("../../../helpers/sendMail");
const generateHelper = require("../../../helpers/generate");

//[POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  req.body.password = md5(req.body.password);
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (existEmail) {
    return res.json({
      code: 400,
      message: "Email đã tồn tại",
    });
  } else {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      token: generateHelper.generateRandomString(30),
    });
    await user.save();

    const token = user.token;
    res.cookie("token", token);

    res.json({
      code: 200,
      message: "Đăng ký thành công",
      token: token,
    });
  }
};

//[POST] /api/v1/users/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    return res.json({
      code: 400,
      message: "Email không tồn tại",
    });
    return;
  }

  if (password !== user.password) {
    return res.json({
      code: 400,
      message: "Mật khẩu không đúng",
    });
    return;
  }

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Đăng nhập thành công",
    token: token,
  });
};

//[POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    return res.json({
      code: 400,
      message: "Email không tồn tại",
    });
    return;
  }

  const otp = generateHelper.generateRandomNumber(6);

  const timeExpire = 5;
  // Lưu thông tin OTP vào cơ sở dữ liệu
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expiresAt: Date.now() + timeExpire * 60 * 1000,
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  // Gửi email chứa OTP
  const subject = "Mã OTP đặt lại mật khẩu";
  const html = `<p>Mã OTP của bạn là: <b>${otp}</b>. Mã này sẽ hết hạn sau ${timeExpire} phút.
  Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>`;

  sendEmailHelper.sendMail(email, subject, html);
  res.json({
    code: 200,
    message: "Đã gửi mã OTP đến email của bạn. Vui lòng kiểm tra email.",
  });
};

//[POST] /api/v1/users/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    return res.json({
      code: 400,
      message: "Không tìm thấy người dùng",
    });
  }

  // Hủy mã OTP sau khi sử dụng thành công để tránh tình trạng dùng lại mã
  await ForgotPassword.deleteOne({
    email: email,
    otp: otp,
  });

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Xác thực OTP thành công",
    token: token,
  });
};

//[POST] /api/v1/users/password/reset
module.exports.resetPassword = async (req, res) => {
  const password = req.body.password;
  const token = req.cookies.token;

  const user = await User.findOne({
    token: token,
    deleted: false,
  });

  if (!user) {
    return res.json({
      code: 400,
      message: "Người dùng không tồn tại hoặc token không hợp lệ",
    });
  }

  if (md5(password) === user.password) {
    return res.json({
      code: 400,
      message: "Mật khẩu mới không được trùng với mật khẩu cũ",
    });
  }

  await User.updateOne(
    {
      token: token,
      deleted: false,
    },
    {
      password: md5(password),
    },
  );

  res.json({
    code: 200,
    message: "Đặt lại mật khẩu thành công",
  });
};

//[GET] /api/v1/users/detail
module.exports.detail = async (req, res) => {
  try {
    res.json({
      code: 200,
      message: "Lấy thông tin người dùng thành công",
      info: req.user,
    });
  } catch (error) {
    res.json({
      code: 500,
      message: "Lỗi server",
    });
  }
};

//[GET] /api/v1/users/list
module.exports.list = async (req, res) => {
  try {
    const users = await User.find({ deleted: false }).select("fullname email");
    res.json({
      code: 200,
      message: "Lấy danh sách người dùng thành công",
      users: users,
    });
  } catch (error) {
    res.json({
      code: 500,
      message: "Lỗi server",
    });
  }
};

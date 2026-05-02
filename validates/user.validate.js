const ForgotPassword = require("../api/v1/models/forgot-password.model");

module.exports.registerValidate = (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.json({
      code: 400,
      message: "Vui lòng nhập đầy đủ thông tin",
    });
  }

  if (password.length < 6) {
    return res.json({
      code: 400,
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    });
  } else if (!/[a-z]/.test(password)) {
    return res.json({
      code: 400,
      message: "Mật khẩu phải có ít nhất 1 ký tự thường",
    });
  } else if (!/[A-Z]/.test(password)) {
    return res.json({
      code: 400,
      message: "Mật khẩu phải có ít nhất 1 ký tự viết hoa",
    });
  } else if (!/\d/.test(password)) {
    return res.json({
      code: 400,
      message: "Mật khẩu phải có ít nhất 1 số",
    });
  } else if (!/[@$!%*?&]/.test(password)) {
    return res.json({
      code: 400,
      message: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt",
    });
  }
  next();
};

module.exports.loginValidate = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      code: 400,
      message: "Vui lòng nhập đầy đủ thông tin",
    });
  }
  next();
};

module.exports.forgotPasswordValidate = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      code: 400,
      message: "Vui lòng nhập email",
    });
  }
  next();
};

module.exports.otpValidate = async (req, res, next) => {
  const email = req.body.email;
  const otp = req.body.otp;

  if (!email || !otp) {
    return res.json({
      code: 400,
      message: "Vui lòng cung cấp email và mã OTP",
    });
  }

  const otpRecord = await ForgotPassword.findOne({
    email: email,
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    return res.json({
      code: 400,
      message: "Chưa yêu cầu OTP. Vui lòng thử lại.",
    });
  }

  if (otpRecord.otp !== otp) {
    return res.json({
      code: 400,
      message: "Mã OTP không chính xác hoặc đã hết hạn",
    });
  }

  next();
};

module.exports.resetPasswordValidate = (req, res, next) => {
  const password = req.body.password;
  const rePassword = req.body.rePassword;

  if (!password || !rePassword) {
    return res.json({
      code: 400,
      message: "Vui lòng nhập đầy đủ thông tin",
    });
  }

  if (password !== rePassword) {
    return res.json({
      code: 400,
      message: "Mật khẩu xác nhận không khớp",
    });
  }

  next();
};

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
      message: "Vui lòng nhập email và mã OTP",
    });
  }

  const otpRecord = await ForgotPassword.findOne({
    email: email,
    deleted: false,
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    return res.json({
      code: 400,
      message: "Email không tồn tại hoặc chưa yêu cầu OTP",
    });
  }

  if (otpRecord.otp !== otp) {
    return res.json({
      code: 400,
      message: "Mã OTP không chính xác",
    });
  }

  if (otpRecord.expiresAt && new Date() > new Date(otpRecord.expiresAt)) {
    return res.json({
      code: 400,
      message: "Mã OTP đã hết hạn",
    });
  }

  next();
};

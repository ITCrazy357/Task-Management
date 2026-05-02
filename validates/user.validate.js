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

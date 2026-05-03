module.exports.taskValidate = (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    res.json({
      code: 400,
      message: "Tiêu đề không được để trống",
    });
    return;
  }
  if (!content) {
    res.json({
      code: 400,
      message: "Nội dung không được để trống",
    });
    return;
  }
  if (content.length < 10) {
    res.json({
      code: 400,
      message: "Nội dung phải có ít nhất 10 ký tự",
    });
    return;
  }
  next();
};

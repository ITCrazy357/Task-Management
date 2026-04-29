const Task = require("../models/task.model");

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  const tasks = await Task.find(find);

  res.json(tasks);
};

//[GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });

    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy công việc này" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "ID không hợp lệ hoặc có lỗi xảy ra" });
  }
};

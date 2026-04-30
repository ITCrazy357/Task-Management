module.exports = (objectPagination, query, countRecord) => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  if (query.limit) {
    objectPagination.limitItems = parseInt(query.limit);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;

  const totalPage = Math.ceil(countRecord / objectPagination.limitItems);
  objectPagination.totalPage = totalPage;

  return objectPagination;
};

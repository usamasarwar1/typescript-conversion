const pagination = (
  pageIndex: number,
  pageSize: number,
  data_count: number,
): {
  paginationObject: {
    page_size: number;
    page_index: number;
    page_count: number;
    data_count: number;
    data: any[]; // Adjust the type of 'data' as per your use case
  };
  skip: number;
  limit: number;
} => {
  let paginationObject = {
    page_size: 0,
    page_index: 0,
    page_count: 0,
    data_count: 0,
    data: [], // You should adjust the type of 'data' to match your data structure
  };

  pageIndex = parseInt(String(pageIndex));
  pageSize = parseInt(String(pageSize));

  if (!pageIndex) pageIndex = 1;
  if (!pageSize) pageSize = 10;

  const limit = pageSize;
  const skip = (pageIndex - 1) * pageSize;

  paginationObject.page_index = pageIndex;
  paginationObject.page_size = pageSize;

  let page_count = Math.ceil(data_count / paginationObject.page_size);
  paginationObject.data_count = data_count;
  paginationObject.page_count = page_count;
  return {
    paginationObject,
    skip,
    limit,
  };
};

export { pagination };

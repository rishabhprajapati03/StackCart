export const ratingsCount = (ratingArr) => {
  if (!ratingArr) return;
  const result = {
    one: {
      value: 1,
      count: 0,
      percentage: 0,
    },
    two: {
      value: 2,
      count: 0,
      percentage: 0,
    },
    three: {
      value: 3,
      count: 0,
      percentage: 0,
    },
    four: {
      value: 4,
      count: 0,
      percentage: 0,
    },
    five: {
      value: 5,
      count: 0,
      percentage: 0,
    },
  };
  const total = ratingArr.length;

  const mapObj = { 1: "one", 2: "two", 3: "three", 4: "four", 5: "five" };

  ratingArr.forEach((item) => {
    if (mapObj[item]) result[mapObj[item]].count++;
  });

  Object.values(result).forEach((item) => {
    item.percentage =
      total > 0 ? Math.round(((item.count * 100) / total) * 100) / 100 : 0;
  });

  return result;
};

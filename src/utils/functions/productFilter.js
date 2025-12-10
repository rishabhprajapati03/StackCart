export const productFilter = (products, filters) => {
  let result = [...products];

  // check the category
  if (filters.category !== "") {
    result = result.filter((d) => {
      return d.category == filters.category;
    });
  }

  //Check Price Filter
  result = result.filter((d) => {
    return (
      d.price >= filters.priceRange.min && d.price <= filters.priceRange.max
    );
  });

  //Search Value check
  if (filters.filterChips.searchValue !== "") {
    result = result.filter((d) => {
      const normalizeTitle = d?.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, "");
      const normalizeSearchValue = filters.filterChips.searchValue
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, "");

      const normalizeCategory = d?.category
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]+/g, "");
      return (
        normalizeTitle.includes(normalizeSearchValue) ||
        normalizeCategory.includes(normalizeSearchValue)
      );
    });
  }

  // sort the result
  switch (filters.sortBy) {
    case "price-asc":
      result = result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result = result.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      result = result.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
      break;
  }
  return result;
};

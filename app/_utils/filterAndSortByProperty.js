export default function filterAndSortByProperty(
  array,
  inclusionArray,
  searchValue,
  property
) {
  return array
    .filter(
      (item) =>
        inclusionArray.includes(item[property]) &&
        JSON.stringify(item).toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => a[property] - b[property]);
}

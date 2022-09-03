export const getId = (preId) => {
  return preId
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_")
    .toLowerCase();
};






export function isEmptyObject(target) {
  try {
    return JSON.stringify(target) === "{}";
  } catch(err) {
    return false;
  }
}
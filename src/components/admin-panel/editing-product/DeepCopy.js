
export function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
      // Return primitive values and null as is
      return obj;
    }
  
    // Create a new object/array
    const copy = Array.isArray(obj) ? [] : {};
  
    // Copy each property recursively
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key]);
      }
    }
  
    return copy;
  }
  
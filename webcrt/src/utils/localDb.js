class LocalDB {
    /**
     * Retrieves a string value from localStorage
     * @param {string} key - The key of the item to retrieve
     * @returns {string | null} - The value associated with the key, or null if not found
     */
    getVal(key) {
      if (!key) return null;
      return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    }
  
    /**
     * Sets a string value in localStorage
     * @param {string} key - The key to associate with the value
     * @param {string} val - The string value to store
     */
    setVal(key, val) {
      if (!key || val === undefined) return;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, val);
      }
    }
  
    /**
     * Retrieves an object from localStorage
     * @param {string} key - The key of the item to retrieve
     * @returns {Object} - The parsed object, or an empty object if not found or if parsing fails
     */
    getObject(key) {
      if (!key) return {};
      try {
        const item = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
        return item ? JSON.parse(item) : {};
      } catch (error) {
        console.warn(`Error parsing JSON for key "${key}":`, error);
        return {};
      }
    }
  
    /**
     * Sets an object in localStorage
     * @param {string} key - The key to associate with the object
     * @param {Object} val - The object to store (will be stringified)
     */
    setObject(key, val) {
      if (!key || val === undefined) return;
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem(key, JSON.stringify(val));
        } catch (error) {
          console.warn(`Error stringifying value for key "${key}":`, error);
        }
      }
    }
  
    /**
     * Removes an item from localStorage
     * @param {string} key - The key of the item to remove
     */
    remove(key) {
      if (!key) return;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    }
  
    /**
     * Clears all items in localStorage
     */
    clear() {
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
    }
  }
  
  // Export a singleton instance of LocalDB for use across the app
  const LocalDBObj = new LocalDB();
  export default LocalDBObj;
  
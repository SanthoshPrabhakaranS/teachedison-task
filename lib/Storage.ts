export class Storage {
  setItem<T>(key: string, value: T) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  removeItem(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  clearStorage() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
}

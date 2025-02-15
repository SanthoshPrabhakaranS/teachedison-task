export class Storage {
  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }
}

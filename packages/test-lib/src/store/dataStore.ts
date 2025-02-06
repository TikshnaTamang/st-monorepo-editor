export const dataStore = {
  textAreaContent: {
    content: [{}],
  },
  listeners: [],
  linkModalValue: [{ linkUrl: '', linkName: '' }],
  updateData(newData) {
    this.textAreaContent.content = newData;
    this.notifyListeners();
  },
  getData() {
    return this.textAreaContent.content
  },
  subscribe(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
    }
  },

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.textAreaContent));
  },
};

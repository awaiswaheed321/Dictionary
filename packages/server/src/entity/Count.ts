import Entry from "./Entry";

export default class Count {
  private word: Entry;
  private count: number;

  constructor(word: Entry, count: number) {
    this.word = word;
    this.count = count;
  }

  getWord(): Entry {
    return this.word;
  }

  getCount(): number {
    return this.count;
  }
}

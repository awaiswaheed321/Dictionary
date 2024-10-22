export default class Count {
  private word: string;
  private count: number;

  constructor(word: string, count: number) {
    this.word = word;
    this.count = count;
  }

  getWord(): string {
    return this.word;
  }

  getCount(): number {
    return this.count;
  }

  incrementCount(): void {
    this.count++;
  }
}

export default class Entry {
  private word: string;
  private wordType: string;
  private definition: string;

  constructor(word: string, wordType: string, definition: string) {
    this.word = word;
    this.wordType = wordType;
    this.definition = definition;
  }

  getWord(): string {
    return this.word;
  }

  getWordType(): string {
    return this.wordType;
  }

  getDefinition(): string {
    return this.definition;
  }
}

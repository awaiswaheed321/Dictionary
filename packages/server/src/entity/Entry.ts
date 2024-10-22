export default class Entry {
  private id: number;
  private word: string;
  private wordType: string;
  private definition: string;

  constructor(id: number, word: string, wordType: string, definition: string) {
    this.id = id;
    this.word = word;
    this.wordType = wordType;
    this.definition = definition;
  }

  getId(): number {
    return this.id;
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

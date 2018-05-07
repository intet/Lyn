export class Word {
  readonly original: String;
  readonly translation: String;
  readonly id: String;

  constructor(id: String, original: String, translation: String) {
    this.id = id;
    this.original = original;
    this.translation = translation;
  }

  private _countAttempts: number = 0;

  get countAttempts(): number {
    return this._countAttempts;
  }

  private _countSuccess: number = 0;

  get countSuccess(): number {
    return this._countSuccess;
  }

  private _countFail: number = 0;

  get countFail(): number {
    return this._countFail;
  }

  private _lineSuccess: number = 0;

  get lineSuccess(): number {
    return this._lineSuccess;
  }

  attempt(success: boolean) {
    this._countAttempts++;
    if (success) {
      this._lineSuccess++;
      this._countSuccess++;
    }
    else {
      this._lineSuccess = 0;
      this._countFail++;
    }
  }
}

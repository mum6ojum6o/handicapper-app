export class RoundDetail {
  private _shotsTaken: number;
  private _holeId: number;
  private _timestamp: number;
  private _roundId: number;

  get shotsTaken() { return this._shotsTaken; }
  set shotsTaken(value) {
    if ( value <= 0) {
      return;
    }
    this._shotsTaken = value;
  }

  get holeId() { return this._holeId; }
  set holeId(value) {
    if ( value <= 0) {
      return;
    }
    this._holeId = value;
  }

  get timestamp() { return this._timestamp; }
  set timestamp(value) {
    if(value <= 0) return;

    this._timestamp = value;
  }
  get roundId() { return this._roundId; }
  set roundId(value) {
    if (value <= 0) { return; }
    this._roundId = value;
  }


}

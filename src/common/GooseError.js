


export class GooseError extends Error {
  constructor(message = "", httpRes) {
    super(message);
    this.httpRes = httpRes;
  }
}
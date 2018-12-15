





export default class LocomonError {
  constructor(name, message, body) {
    this.name = name;
    this.body = body;
    this.message= this.buildMessage(message, body.body);
  }

  buildMessage(message, detail) {
    return `${message}: ${detail}`;
  }
}
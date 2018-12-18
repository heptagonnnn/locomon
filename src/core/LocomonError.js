





export default class LocomonError {
  constructor(name, body, message) {
    this.name = name;
    this.body = body;
    this.message= message || this.buildMessage(name, body.body);
  }

  buildMessage(name, detail) {
    return `${name}: ${detail}`;
  }
}
import { Injectable } from '@nestjs/common';

@Injectable()
export class PoktaService {
  #poktaMessages: { id: number, msg: string }[] = [];

  async saveMessage(message: string) {
    if (Math.random() < .5) {
      throw new Error(`Connection Problem is occured when message is recieving [${message}]`);
    }

    this.#poktaMessages.push({ id: this.#poktaMessages.length, msg: message });
  }

  async removeMessage(id: number) {
    if (Math.random() < .2) {
      throw new Error(`Cannot remove message by id ${id}`);
    }

    this.#poktaMessages.splice(id, 1);
  }

  async getAllMessages() {
    return this.#poktaMessages;
  }
}

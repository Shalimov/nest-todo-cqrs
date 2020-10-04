import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import {
  PoktaMsgCreationFailedEvent,
  PoktaMsgCreationSuccessEvent,
} from '@/application/events/defs';
import { PoktaService } from '@/infrastructure/services/PoktaService';

import { CreatePoktaMessageCommand } from '../defs';

@CommandHandler(CreatePoktaMessageCommand)
export class CreatePoktaMessageCommandHandler
  implements ICommandHandler<CreatePoktaMessageCommand, boolean> {
  constructor(
    private readonly poktaService: PoktaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreatePoktaMessageCommand): Promise<boolean> {
    try {
      await this.poktaService.saveMessage(command.message);

      this.eventBus.publish(new PoktaMsgCreationSuccessEvent(command.todoId));
    } catch (error) {
      this.eventBus.publish(new PoktaMsgCreationFailedEvent(command.todoId));
    }

    return true;
  }
}

import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { AllPoktaMessagesQuery } from '../defs';
import { PoktaService } from '@/infrastructure/services/PoktaService';

@QueryHandler(AllPoktaMessagesQuery)
export class AllPoktaMessagesQueryHandler
  implements
    IQueryHandler<AllPoktaMessagesQuery, { id: number; msg: string }[]> {
  constructor(private readonly poktaService: PoktaService) {}

  async execute(
    _query: AllPoktaMessagesQuery,
  ): Promise<{ id: number; msg: string }[]> {
    const messages = await this.poktaService.getAllMessages();
    return messages;
  }
}


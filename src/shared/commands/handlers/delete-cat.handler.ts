import {ICommandHandler, CommandHandler, EventBus} from '@nestjs/cqrs';

import {Cat} from 'src/cats/models/schemas/cat.schema';
import {CatDeletedEvent} from 'src/shared/events/implementations/cat-deleted.event';
import {CatRepository} from 'src/cats/repositories/cat.repository';
import {DeleteCatCommand} from 'src/shared/commands/implementations/delete-cat.command';
import {CatNotFoundException} from 'src/shared/exceptions/cat.not-found.exception';
import {CatDto} from 'src/cats/models/dto/cat.dto';

@CommandHandler(DeleteCatCommand)
export class DeleteCatHandler implements ICommandHandler<DeleteCatCommand> {
  constructor(
    private readonly catRepository: CatRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: DeleteCatCommand): Promise<Cat> {
    const {catId}: DeleteCatCommand = command;
    const destroyed: Cat = await this.catRepository.destroy(catId);

    if (!destroyed) {
      throw new CatNotFoundException();
    }

    this.eventBus.publish(
      new CatDeletedEvent({
        catId: JSON.stringify(destroyed._id),
        catInfos: {
          name: destroyed.name,
          age: destroyed.age,
          breed: destroyed.breed
        } as unknown as CatDto
      })
    );

    return destroyed;
  }
}

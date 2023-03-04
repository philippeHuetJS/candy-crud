import {ICommandHandler, CommandHandler, EventBus} from '@nestjs/cqrs';

import {Cat} from 'src/cats/models/schemas/cat.schema';
import {CatUpdatedEvent} from 'src/shared/events/implementations/cat-updated-event';
import {CatRepository} from 'src/cats/repositories/cat.repository';
import {UpdateCatCommand} from 'src/shared/commands/implementations/update-cat.command';
import {CatNotFoundException} from 'src/shared/exceptions/cat.not-found.exception';
import {CatDto} from 'src/cats/models/dto/cat.dto';

@CommandHandler(UpdateCatCommand)
export class UpdateCatHandler implements ICommandHandler<UpdateCatCommand> {
  constructor(
    private readonly catRepository: CatRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: UpdateCatCommand): Promise<Cat> {
    const {catId, catInfos}: UpdateCatCommand = command;
    const edited: Cat = await this.catRepository.edit(catId, catInfos);

    if (!edited) {
      throw new CatNotFoundException();
    }

    this.eventBus.publish(
      new CatUpdatedEvent({
        catId: JSON.stringify(edited._id),
        catInfos: {
          name: edited.name,
          age: edited.age,
          breed: edited.breed
        } as unknown as CatDto
      })
    );

    return edited;
  }
}

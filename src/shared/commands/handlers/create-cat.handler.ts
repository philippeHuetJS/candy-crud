import {ICommandHandler, CommandHandler, EventBus} from '@nestjs/cqrs';

import {Cat} from 'src/cats/models/schemas/cat.schema';
import {CatCreatedEvent} from 'src/shared/events/implementations/cat-created.event';
import {CatRepository} from 'src/cats/repositories/cat.repository';
import {CreateCatCommand} from 'src/shared/commands/implementations/create-cat.command';
import {CatDto} from 'src/cats/models/dto/cat.dto';

@CommandHandler(CreateCatCommand)
export class CreateCatHandler implements ICommandHandler<CreateCatCommand> {
  constructor(
    private readonly catRepository: CatRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateCatCommand): Promise<Cat> {
    const {catInfos}: CreateCatCommand = command;
    const added: Cat = await this.catRepository.add(catInfos);

    this.eventBus.publish(
      new CatCreatedEvent({
        catId: JSON.stringify(added._id),
        catInfos: {
          name: added.name,
          age: added.age,
          breed: added.breed
        } as unknown as CatDto
      })
    );

    return added;
  }
}

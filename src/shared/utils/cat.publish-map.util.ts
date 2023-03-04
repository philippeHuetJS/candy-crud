import {CatDto} from 'src/cats/models/dto/cat.dto';
import {Cat} from 'src/cats/models/schemas/cat.schema';

export class CatPublishMapUtil {
  public static convertAndListMappedId(data: Cat[]): string[] {
    return Array.from(data).map(({_id}) =>
      JSON.stringify(_id)
    ) as unknown as string[];
  }

  public static convertAndListMappedInfos(data: Cat[]): CatDto[] {
    return Array.from(data).map(({name, age, breed}) =>
      JSON.stringify({name, age, breed})
    ) as unknown as CatDto[];
  }
}

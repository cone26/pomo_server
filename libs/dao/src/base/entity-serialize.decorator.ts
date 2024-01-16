import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';

function fromEntity<T, V>(cls: ClassConstructor<T>, entity: V): T {
  return plainToInstance(cls, instanceToPlain(entity));
}

function fromEntities<T, V>(cls: ClassConstructor<T>, entities: V[]): T[] {
  return plainToInstance(cls, instanceToPlain(entities)) as any as T[];
}

export function EntitySerializeImpl<T>() {
  return function (cls: any) {
    cls.fromEntity = function (entity: any): T {
      return fromEntity(cls, entity);
    };

    cls.fromEntities = function (entities: any[]): T[] {
      return fromEntities(cls, entities);
    };
  };
}

import { DynamicModule, Provider } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, ObjectType } from 'typeorm';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { TYPEORM_ENTITY_REPOSITORY } from '@app/common/database/typeorm/typeorm-ex.decorator';

const dataSources: Record<string, DataSource> = {};
const customRepositories: Record<string, Record<string, any>> = {};

export class TypeOrmExModule {
  public static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    return TypeOrmModule.forRoot(options);
  }

  public static forRootAsync(
    options: TypeOrmModuleAsyncOptions,
  ): DynamicModule {
    return TypeOrmModule.forRootAsync(options);
  }

  public static forFeature<T extends new (...args: any[]) => any>(
    repositories: T[],
    dataSourceName?: string,
  ): DynamicModule {
    console.log(dataSourceName);
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(TYPEORM_ENTITY_REPOSITORY, repository);

      if (!entity) {
        continue;
      }

      providers.push({
        inject: [getDataSourceToken(dataSourceName)],
        provide: getRepositoryToken(entity, dataSourceName),
        useFactory: (dataSource: DataSource): typeof repository => {
          if (!(dataSourceName in dataSources)) {
            dataSources[dataSourceName] = dataSource;
          }

          const baseRepository = dataSource.getRepository<any>(entity);
          const customRepository = new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );

          if (!(dataSourceName in customRepositories))
            customRepositories[dataSourceName] = {};
          customRepositories[dataSourceName][repository.name] =
            customRepository;

          return customRepository;
        },
      });
    }

    return {
      exports: providers,
      module: TypeOrmExModule,
      providers,
    };
  }
}

export function getCustomRepository<T>(
  repository: ObjectType<T>,
  dataSourceName: string,
): T {
  if (customRepositories.hasOwnProperty(dataSourceName)) {
    if (customRepositories[dataSourceName].hasOwnProperty(repository.name)) {
      return customRepositories[dataSourceName][repository.name];
    }
  }
  return null;
}

export function getDataSource(dataSourceName: string): DataSource {
  if (dataSourceName in dataSources) {
    return dataSources[dataSourceName];
  }
  return null;
}

export type QueryMethodUpdateOptions = {
  code?: number;
  message?: string;
  manager?: EntityManager;
};

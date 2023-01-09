import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  ObjectLiteral,
  QueryRunner,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<E extends ObjectLiteral> {
  protected abstract _repo: Repository<E>;

  createQueryBuilder(
    alias = 'main',
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<E> {
    return this._repo.createQueryBuilder(alias, queryRunner);
  }

  /**
   * Find single entity
   */
  findOne(findData: FindConditions<E> | FindOneOptions<E>): Promise<E> {
    return this._repo.findOne(findData);
  }

  /**
   * Find many entities
   */
  findMany(findData: FindConditions<E> | FindManyOptions<E>): Promise<E[]> {
    return this._repo.find(findData);
  }

  /**
   * Creates a new entity instance.
   */
  create(
    entityOrEntityLikeArray?: Array<DeepPartial<E>> | DeepPartial<E>,
  ): E | E[] {
    return this._repo.create(<any>entityOrEntityLikeArray);
  }

  /**
   * Saves an entity
   */
  async save(entity: E, options?: SaveOptions): Promise<E> {
    return this._repo.save<E>(entity, options);
  }

  merge(mergeIntoEntity: E, ...entityLikes: Array<DeepPartial<E>>): E {
    return this._repo.merge(mergeIntoEntity, ...entityLikes);
  }

  async update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<E>,
    partialEntity: QueryDeepPartialEntity<E>,
  ): Promise<UpdateResult> {
    return this._repo.update(criteria, partialEntity);
  }

  async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<E>,
  ): Promise<DeleteResult> {
    return this._repo.delete(criteria);
  }
}

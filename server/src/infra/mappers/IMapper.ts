export interface IMapper<T, U> {
  toDTO?: (DatabaseEntity: U) => T
  toPersistence?: (DTO: T) => U
}

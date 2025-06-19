type CamelToSnakeCase<S extends string> = S extends `${infer Head}${infer Rest}`
  ? `${Head extends '_'
      ? ''
      : Head extends Capitalize<Head>
      ? '_'
      : ''}${Lowercase<Head>}${CamelToSnakeCase<Rest>}`
  : S;

type SnakeCase<T> = {
  [K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};


/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model GithubProfile
 * 
 */
export type GithubProfile = $Result.DefaultSelection<Prisma.$GithubProfilePayload>
/**
 * Model Repository
 * 
 */
export type Repository = $Result.DefaultSelection<Prisma.$RepositoryPayload>
/**
 * Model Analysis
 * 
 */
export type Analysis = $Result.DefaultSelection<Prisma.$AnalysisPayload>
/**
 * Model AnalysisScore
 * 
 */
export type AnalysisScore = $Result.DefaultSelection<Prisma.$AnalysisScorePayload>
/**
 * Model RepositoryScore
 * 
 */
export type RepositoryScore = $Result.DefaultSelection<Prisma.$RepositoryScorePayload>
/**
 * Model AiConversation
 * 
 */
export type AiConversation = $Result.DefaultSelection<Prisma.$AiConversationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.githubProfile`: Exposes CRUD operations for the **GithubProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GithubProfiles
    * const githubProfiles = await prisma.githubProfile.findMany()
    * ```
    */
  get githubProfile(): Prisma.GithubProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repository`: Exposes CRUD operations for the **Repository** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Repositories
    * const repositories = await prisma.repository.findMany()
    * ```
    */
  get repository(): Prisma.RepositoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analysis`: Exposes CRUD operations for the **Analysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Analyses
    * const analyses = await prisma.analysis.findMany()
    * ```
    */
  get analysis(): Prisma.AnalysisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analysisScore`: Exposes CRUD operations for the **AnalysisScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalysisScores
    * const analysisScores = await prisma.analysisScore.findMany()
    * ```
    */
  get analysisScore(): Prisma.AnalysisScoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.repositoryScore`: Exposes CRUD operations for the **RepositoryScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RepositoryScores
    * const repositoryScores = await prisma.repositoryScore.findMany()
    * ```
    */
  get repositoryScore(): Prisma.RepositoryScoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiConversation`: Exposes CRUD operations for the **AiConversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiConversations
    * const aiConversations = await prisma.aiConversation.findMany()
    * ```
    */
  get aiConversation(): Prisma.AiConversationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    Verification: 'Verification',
    GithubProfile: 'GithubProfile',
    Repository: 'Repository',
    Analysis: 'Analysis',
    AnalysisScore: 'AnalysisScore',
    RepositoryScore: 'RepositoryScore',
    AiConversation: 'AiConversation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verification" | "githubProfile" | "repository" | "analysis" | "analysisScore" | "repositoryScore" | "aiConversation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      GithubProfile: {
        payload: Prisma.$GithubProfilePayload<ExtArgs>
        fields: Prisma.GithubProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GithubProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GithubProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload>
          }
          findFirst: {
            args: Prisma.GithubProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GithubProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload>
          }
          findMany: {
            args: Prisma.GithubProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload>[]
          }
          create: {
            args: Prisma.GithubProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload>
          }
          createMany: {
            args: Prisma.GithubProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GithubProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload>[]
          }
          delete: {
            args: Prisma.GithubProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload>
          }
          update: {
            args: Prisma.GithubProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload>
          }
          deleteMany: {
            args: Prisma.GithubProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GithubProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GithubProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload>[]
          }
          upsert: {
            args: Prisma.GithubProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GithubProfilePayload>
          }
          aggregate: {
            args: Prisma.GithubProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGithubProfile>
          }
          groupBy: {
            args: Prisma.GithubProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<GithubProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.GithubProfileCountArgs<ExtArgs>
            result: $Utils.Optional<GithubProfileCountAggregateOutputType> | number
          }
        }
      }
      Repository: {
        payload: Prisma.$RepositoryPayload<ExtArgs>
        fields: Prisma.RepositoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepositoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepositoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          findFirst: {
            args: Prisma.RepositoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepositoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          findMany: {
            args: Prisma.RepositoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[]
          }
          create: {
            args: Prisma.RepositoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          createMany: {
            args: Prisma.RepositoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepositoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[]
          }
          delete: {
            args: Prisma.RepositoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          update: {
            args: Prisma.RepositoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          deleteMany: {
            args: Prisma.RepositoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepositoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepositoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[]
          }
          upsert: {
            args: Prisma.RepositoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>
          }
          aggregate: {
            args: Prisma.RepositoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepository>
          }
          groupBy: {
            args: Prisma.RepositoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepositoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepositoryCountArgs<ExtArgs>
            result: $Utils.Optional<RepositoryCountAggregateOutputType> | number
          }
        }
      }
      Analysis: {
        payload: Prisma.$AnalysisPayload<ExtArgs>
        fields: Prisma.AnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          findFirst: {
            args: Prisma.AnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          findMany: {
            args: Prisma.AnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>[]
          }
          create: {
            args: Prisma.AnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          createMany: {
            args: Prisma.AnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>[]
          }
          delete: {
            args: Prisma.AnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          update: {
            args: Prisma.AnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          deleteMany: {
            args: Prisma.AnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>[]
          }
          upsert: {
            args: Prisma.AnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          aggregate: {
            args: Prisma.AnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalysis>
          }
          groupBy: {
            args: Prisma.AnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<AnalysisCountAggregateOutputType> | number
          }
        }
      }
      AnalysisScore: {
        payload: Prisma.$AnalysisScorePayload<ExtArgs>
        fields: Prisma.AnalysisScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalysisScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalysisScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload>
          }
          findFirst: {
            args: Prisma.AnalysisScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalysisScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload>
          }
          findMany: {
            args: Prisma.AnalysisScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload>[]
          }
          create: {
            args: Prisma.AnalysisScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload>
          }
          createMany: {
            args: Prisma.AnalysisScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalysisScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload>[]
          }
          delete: {
            args: Prisma.AnalysisScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload>
          }
          update: {
            args: Prisma.AnalysisScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload>
          }
          deleteMany: {
            args: Prisma.AnalysisScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalysisScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalysisScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload>[]
          }
          upsert: {
            args: Prisma.AnalysisScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisScorePayload>
          }
          aggregate: {
            args: Prisma.AnalysisScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalysisScore>
          }
          groupBy: {
            args: Prisma.AnalysisScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalysisScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalysisScoreCountArgs<ExtArgs>
            result: $Utils.Optional<AnalysisScoreCountAggregateOutputType> | number
          }
        }
      }
      RepositoryScore: {
        payload: Prisma.$RepositoryScorePayload<ExtArgs>
        fields: Prisma.RepositoryScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RepositoryScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RepositoryScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload>
          }
          findFirst: {
            args: Prisma.RepositoryScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RepositoryScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload>
          }
          findMany: {
            args: Prisma.RepositoryScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload>[]
          }
          create: {
            args: Prisma.RepositoryScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload>
          }
          createMany: {
            args: Prisma.RepositoryScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RepositoryScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload>[]
          }
          delete: {
            args: Prisma.RepositoryScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload>
          }
          update: {
            args: Prisma.RepositoryScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload>
          }
          deleteMany: {
            args: Prisma.RepositoryScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RepositoryScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RepositoryScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload>[]
          }
          upsert: {
            args: Prisma.RepositoryScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RepositoryScorePayload>
          }
          aggregate: {
            args: Prisma.RepositoryScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRepositoryScore>
          }
          groupBy: {
            args: Prisma.RepositoryScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<RepositoryScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.RepositoryScoreCountArgs<ExtArgs>
            result: $Utils.Optional<RepositoryScoreCountAggregateOutputType> | number
          }
        }
      }
      AiConversation: {
        payload: Prisma.$AiConversationPayload<ExtArgs>
        fields: Prisma.AiConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload>
          }
          findFirst: {
            args: Prisma.AiConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload>
          }
          findMany: {
            args: Prisma.AiConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload>[]
          }
          create: {
            args: Prisma.AiConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload>
          }
          createMany: {
            args: Prisma.AiConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload>[]
          }
          delete: {
            args: Prisma.AiConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload>
          }
          update: {
            args: Prisma.AiConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload>
          }
          deleteMany: {
            args: Prisma.AiConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload>[]
          }
          upsert: {
            args: Prisma.AiConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiConversationPayload>
          }
          aggregate: {
            args: Prisma.AiConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiConversation>
          }
          groupBy: {
            args: Prisma.AiConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiConversationCountArgs<ExtArgs>
            result: $Utils.Optional<AiConversationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verification?: VerificationOmit
    githubProfile?: GithubProfileOmit
    repository?: RepositoryOmit
    analysis?: AnalysisOmit
    analysisScore?: AnalysisScoreOmit
    repositoryScore?: RepositoryScoreOmit
    aiConversation?: AiConversationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    analyses: number
    conversations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    analyses?: boolean | UserCountOutputTypeCountAnalysesArgs
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiConversationWhereInput
  }


  /**
   * Count Type GithubProfileCountOutputType
   */

  export type GithubProfileCountOutputType = {
    repositories: number
  }

  export type GithubProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repositories?: boolean | GithubProfileCountOutputTypeCountRepositoriesArgs
  }

  // Custom InputTypes
  /**
   * GithubProfileCountOutputType without action
   */
  export type GithubProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfileCountOutputType
     */
    select?: GithubProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GithubProfileCountOutputType without action
   */
  export type GithubProfileCountOutputTypeCountRepositoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepositoryWhereInput
  }


  /**
   * Count Type RepositoryCountOutputType
   */

  export type RepositoryCountOutputType = {
    repoScores: number
    analyses: number
  }

  export type RepositoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repoScores?: boolean | RepositoryCountOutputTypeCountRepoScoresArgs
    analyses?: boolean | RepositoryCountOutputTypeCountAnalysesArgs
  }

  // Custom InputTypes
  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryCountOutputType
     */
    select?: RepositoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountRepoScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepositoryScoreWhereInput
  }

  /**
   * RepositoryCountOutputType without action
   */
  export type RepositoryCountOutputTypeCountAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisWhereInput
  }


  /**
   * Count Type AnalysisCountOutputType
   */

  export type AnalysisCountOutputType = {
    scores: number
    repositories: number
    repoScores: number
  }

  export type AnalysisCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scores?: boolean | AnalysisCountOutputTypeCountScoresArgs
    repositories?: boolean | AnalysisCountOutputTypeCountRepositoriesArgs
    repoScores?: boolean | AnalysisCountOutputTypeCountRepoScoresArgs
  }

  // Custom InputTypes
  /**
   * AnalysisCountOutputType without action
   */
  export type AnalysisCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisCountOutputType
     */
    select?: AnalysisCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnalysisCountOutputType without action
   */
  export type AnalysisCountOutputTypeCountScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisScoreWhereInput
  }

  /**
   * AnalysisCountOutputType without action
   */
  export type AnalysisCountOutputTypeCountRepositoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepositoryWhereInput
  }

  /**
   * AnalysisCountOutputType without action
   */
  export type AnalysisCountOutputTypeCountRepoScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepositoryScoreWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    githubProfile?: boolean | User$githubProfileArgs<ExtArgs>
    analyses?: boolean | User$analysesArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    githubProfile?: boolean | User$githubProfileArgs<ExtArgs>
    analyses?: boolean | User$analysesArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      githubProfile: Prisma.$GithubProfilePayload<ExtArgs> | null
      analyses: Prisma.$AnalysisPayload<ExtArgs>[]
      conversations: Prisma.$AiConversationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    githubProfile<T extends User$githubProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$githubProfileArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    analyses<T extends User$analysesArgs<ExtArgs> = {}>(args?: Subset<T, User$analysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.githubProfile
   */
  export type User$githubProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    where?: GithubProfileWhereInput
  }

  /**
   * User.analyses
   */
  export type User$analysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    where?: AnalysisWhereInput
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    cursor?: AnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    where?: AiConversationWhereInput
    orderBy?: AiConversationOrderByWithRelationInput | AiConversationOrderByWithRelationInput[]
    cursor?: AiConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiConversationScalarFieldEnum | AiConversationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    ipAddress: number
    userAgent: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    ipAddress: string | null
    userAgent: string | null
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "ipAddress" | "userAgent" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      ipAddress: string | null
      userAgent: string | null
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model GithubProfile
   */

  export type AggregateGithubProfile = {
    _count: GithubProfileCountAggregateOutputType | null
    _avg: GithubProfileAvgAggregateOutputType | null
    _sum: GithubProfileSumAggregateOutputType | null
    _min: GithubProfileMinAggregateOutputType | null
    _max: GithubProfileMaxAggregateOutputType | null
  }

  export type GithubProfileAvgAggregateOutputType = {
    githubId: number | null
    publicRepos: number | null
    publicGists: number | null
    followers: number | null
    following: number | null
    shareCount: number | null
    viewCount: number | null
  }

  export type GithubProfileSumAggregateOutputType = {
    githubId: number | null
    publicRepos: number | null
    publicGists: number | null
    followers: number | null
    following: number | null
    shareCount: number | null
    viewCount: number | null
  }

  export type GithubProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    githubId: number | null
    login: string | null
    displayName: string | null
    bio: string | null
    avatarUrl: string | null
    blog: string | null
    location: string | null
    company: string | null
    publicRepos: number | null
    publicGists: number | null
    followers: number | null
    following: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSyncedAt: Date | null
    shareCount: number | null
    viewCount: number | null
  }

  export type GithubProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    githubId: number | null
    login: string | null
    displayName: string | null
    bio: string | null
    avatarUrl: string | null
    blog: string | null
    location: string | null
    company: string | null
    publicRepos: number | null
    publicGists: number | null
    followers: number | null
    following: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSyncedAt: Date | null
    shareCount: number | null
    viewCount: number | null
  }

  export type GithubProfileCountAggregateOutputType = {
    id: number
    userId: number
    githubId: number
    login: number
    displayName: number
    bio: number
    avatarUrl: number
    blog: number
    location: number
    company: number
    publicRepos: number
    publicGists: number
    followers: number
    following: number
    createdAt: number
    updatedAt: number
    lastSyncedAt: number
    shareCount: number
    viewCount: number
    _all: number
  }


  export type GithubProfileAvgAggregateInputType = {
    githubId?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
    shareCount?: true
    viewCount?: true
  }

  export type GithubProfileSumAggregateInputType = {
    githubId?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
    shareCount?: true
    viewCount?: true
  }

  export type GithubProfileMinAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    login?: true
    displayName?: true
    bio?: true
    avatarUrl?: true
    blog?: true
    location?: true
    company?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
    createdAt?: true
    updatedAt?: true
    lastSyncedAt?: true
    shareCount?: true
    viewCount?: true
  }

  export type GithubProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    login?: true
    displayName?: true
    bio?: true
    avatarUrl?: true
    blog?: true
    location?: true
    company?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
    createdAt?: true
    updatedAt?: true
    lastSyncedAt?: true
    shareCount?: true
    viewCount?: true
  }

  export type GithubProfileCountAggregateInputType = {
    id?: true
    userId?: true
    githubId?: true
    login?: true
    displayName?: true
    bio?: true
    avatarUrl?: true
    blog?: true
    location?: true
    company?: true
    publicRepos?: true
    publicGists?: true
    followers?: true
    following?: true
    createdAt?: true
    updatedAt?: true
    lastSyncedAt?: true
    shareCount?: true
    viewCount?: true
    _all?: true
  }

  export type GithubProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubProfile to aggregate.
     */
    where?: GithubProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubProfiles to fetch.
     */
    orderBy?: GithubProfileOrderByWithRelationInput | GithubProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GithubProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GithubProfiles
    **/
    _count?: true | GithubProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GithubProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GithubProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GithubProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GithubProfileMaxAggregateInputType
  }

  export type GetGithubProfileAggregateType<T extends GithubProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateGithubProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGithubProfile[P]>
      : GetScalarType<T[P], AggregateGithubProfile[P]>
  }




  export type GithubProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GithubProfileWhereInput
    orderBy?: GithubProfileOrderByWithAggregationInput | GithubProfileOrderByWithAggregationInput[]
    by: GithubProfileScalarFieldEnum[] | GithubProfileScalarFieldEnum
    having?: GithubProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GithubProfileCountAggregateInputType | true
    _avg?: GithubProfileAvgAggregateInputType
    _sum?: GithubProfileSumAggregateInputType
    _min?: GithubProfileMinAggregateInputType
    _max?: GithubProfileMaxAggregateInputType
  }

  export type GithubProfileGroupByOutputType = {
    id: string
    userId: string
    githubId: number
    login: string
    displayName: string | null
    bio: string | null
    avatarUrl: string | null
    blog: string | null
    location: string | null
    company: string | null
    publicRepos: number
    publicGists: number
    followers: number
    following: number
    createdAt: Date
    updatedAt: Date
    lastSyncedAt: Date | null
    shareCount: number
    viewCount: number
    _count: GithubProfileCountAggregateOutputType | null
    _avg: GithubProfileAvgAggregateOutputType | null
    _sum: GithubProfileSumAggregateOutputType | null
    _min: GithubProfileMinAggregateOutputType | null
    _max: GithubProfileMaxAggregateOutputType | null
  }

  type GetGithubProfileGroupByPayload<T extends GithubProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GithubProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GithubProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GithubProfileGroupByOutputType[P]>
            : GetScalarType<T[P], GithubProfileGroupByOutputType[P]>
        }
      >
    >


  export type GithubProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubId?: boolean
    login?: boolean
    displayName?: boolean
    bio?: boolean
    avatarUrl?: boolean
    blog?: boolean
    location?: boolean
    company?: boolean
    publicRepos?: boolean
    publicGists?: boolean
    followers?: boolean
    following?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncedAt?: boolean
    shareCount?: boolean
    viewCount?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    repositories?: boolean | GithubProfile$repositoriesArgs<ExtArgs>
    _count?: boolean | GithubProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["githubProfile"]>

  export type GithubProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubId?: boolean
    login?: boolean
    displayName?: boolean
    bio?: boolean
    avatarUrl?: boolean
    blog?: boolean
    location?: boolean
    company?: boolean
    publicRepos?: boolean
    publicGists?: boolean
    followers?: boolean
    following?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncedAt?: boolean
    shareCount?: boolean
    viewCount?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["githubProfile"]>

  export type GithubProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    githubId?: boolean
    login?: boolean
    displayName?: boolean
    bio?: boolean
    avatarUrl?: boolean
    blog?: boolean
    location?: boolean
    company?: boolean
    publicRepos?: boolean
    publicGists?: boolean
    followers?: boolean
    following?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncedAt?: boolean
    shareCount?: boolean
    viewCount?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["githubProfile"]>

  export type GithubProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    githubId?: boolean
    login?: boolean
    displayName?: boolean
    bio?: boolean
    avatarUrl?: boolean
    blog?: boolean
    location?: boolean
    company?: boolean
    publicRepos?: boolean
    publicGists?: boolean
    followers?: boolean
    following?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncedAt?: boolean
    shareCount?: boolean
    viewCount?: boolean
  }

  export type GithubProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "githubId" | "login" | "displayName" | "bio" | "avatarUrl" | "blog" | "location" | "company" | "publicRepos" | "publicGists" | "followers" | "following" | "createdAt" | "updatedAt" | "lastSyncedAt" | "shareCount" | "viewCount", ExtArgs["result"]["githubProfile"]>
  export type GithubProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    repositories?: boolean | GithubProfile$repositoriesArgs<ExtArgs>
    _count?: boolean | GithubProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GithubProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GithubProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GithubProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GithubProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      repositories: Prisma.$RepositoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      githubId: number
      login: string
      displayName: string | null
      bio: string | null
      avatarUrl: string | null
      blog: string | null
      location: string | null
      company: string | null
      publicRepos: number
      publicGists: number
      followers: number
      following: number
      createdAt: Date
      updatedAt: Date
      lastSyncedAt: Date | null
      shareCount: number
      viewCount: number
    }, ExtArgs["result"]["githubProfile"]>
    composites: {}
  }

  type GithubProfileGetPayload<S extends boolean | null | undefined | GithubProfileDefaultArgs> = $Result.GetResult<Prisma.$GithubProfilePayload, S>

  type GithubProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GithubProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GithubProfileCountAggregateInputType | true
    }

  export interface GithubProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GithubProfile'], meta: { name: 'GithubProfile' } }
    /**
     * Find zero or one GithubProfile that matches the filter.
     * @param {GithubProfileFindUniqueArgs} args - Arguments to find a GithubProfile
     * @example
     * // Get one GithubProfile
     * const githubProfile = await prisma.githubProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GithubProfileFindUniqueArgs>(args: SelectSubset<T, GithubProfileFindUniqueArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GithubProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GithubProfileFindUniqueOrThrowArgs} args - Arguments to find a GithubProfile
     * @example
     * // Get one GithubProfile
     * const githubProfile = await prisma.githubProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GithubProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, GithubProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GithubProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubProfileFindFirstArgs} args - Arguments to find a GithubProfile
     * @example
     * // Get one GithubProfile
     * const githubProfile = await prisma.githubProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GithubProfileFindFirstArgs>(args?: SelectSubset<T, GithubProfileFindFirstArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GithubProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubProfileFindFirstOrThrowArgs} args - Arguments to find a GithubProfile
     * @example
     * // Get one GithubProfile
     * const githubProfile = await prisma.githubProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GithubProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, GithubProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GithubProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GithubProfiles
     * const githubProfiles = await prisma.githubProfile.findMany()
     * 
     * // Get first 10 GithubProfiles
     * const githubProfiles = await prisma.githubProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const githubProfileWithIdOnly = await prisma.githubProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GithubProfileFindManyArgs>(args?: SelectSubset<T, GithubProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GithubProfile.
     * @param {GithubProfileCreateArgs} args - Arguments to create a GithubProfile.
     * @example
     * // Create one GithubProfile
     * const GithubProfile = await prisma.githubProfile.create({
     *   data: {
     *     // ... data to create a GithubProfile
     *   }
     * })
     * 
     */
    create<T extends GithubProfileCreateArgs>(args: SelectSubset<T, GithubProfileCreateArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GithubProfiles.
     * @param {GithubProfileCreateManyArgs} args - Arguments to create many GithubProfiles.
     * @example
     * // Create many GithubProfiles
     * const githubProfile = await prisma.githubProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GithubProfileCreateManyArgs>(args?: SelectSubset<T, GithubProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GithubProfiles and returns the data saved in the database.
     * @param {GithubProfileCreateManyAndReturnArgs} args - Arguments to create many GithubProfiles.
     * @example
     * // Create many GithubProfiles
     * const githubProfile = await prisma.githubProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GithubProfiles and only return the `id`
     * const githubProfileWithIdOnly = await prisma.githubProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GithubProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, GithubProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GithubProfile.
     * @param {GithubProfileDeleteArgs} args - Arguments to delete one GithubProfile.
     * @example
     * // Delete one GithubProfile
     * const GithubProfile = await prisma.githubProfile.delete({
     *   where: {
     *     // ... filter to delete one GithubProfile
     *   }
     * })
     * 
     */
    delete<T extends GithubProfileDeleteArgs>(args: SelectSubset<T, GithubProfileDeleteArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GithubProfile.
     * @param {GithubProfileUpdateArgs} args - Arguments to update one GithubProfile.
     * @example
     * // Update one GithubProfile
     * const githubProfile = await prisma.githubProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GithubProfileUpdateArgs>(args: SelectSubset<T, GithubProfileUpdateArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GithubProfiles.
     * @param {GithubProfileDeleteManyArgs} args - Arguments to filter GithubProfiles to delete.
     * @example
     * // Delete a few GithubProfiles
     * const { count } = await prisma.githubProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GithubProfileDeleteManyArgs>(args?: SelectSubset<T, GithubProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GithubProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GithubProfiles
     * const githubProfile = await prisma.githubProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GithubProfileUpdateManyArgs>(args: SelectSubset<T, GithubProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GithubProfiles and returns the data updated in the database.
     * @param {GithubProfileUpdateManyAndReturnArgs} args - Arguments to update many GithubProfiles.
     * @example
     * // Update many GithubProfiles
     * const githubProfile = await prisma.githubProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GithubProfiles and only return the `id`
     * const githubProfileWithIdOnly = await prisma.githubProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GithubProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, GithubProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GithubProfile.
     * @param {GithubProfileUpsertArgs} args - Arguments to update or create a GithubProfile.
     * @example
     * // Update or create a GithubProfile
     * const githubProfile = await prisma.githubProfile.upsert({
     *   create: {
     *     // ... data to create a GithubProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GithubProfile we want to update
     *   }
     * })
     */
    upsert<T extends GithubProfileUpsertArgs>(args: SelectSubset<T, GithubProfileUpsertArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GithubProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubProfileCountArgs} args - Arguments to filter GithubProfiles to count.
     * @example
     * // Count the number of GithubProfiles
     * const count = await prisma.githubProfile.count({
     *   where: {
     *     // ... the filter for the GithubProfiles we want to count
     *   }
     * })
    **/
    count<T extends GithubProfileCountArgs>(
      args?: Subset<T, GithubProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GithubProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GithubProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GithubProfileAggregateArgs>(args: Subset<T, GithubProfileAggregateArgs>): Prisma.PrismaPromise<GetGithubProfileAggregateType<T>>

    /**
     * Group by GithubProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GithubProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GithubProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GithubProfileGroupByArgs['orderBy'] }
        : { orderBy?: GithubProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GithubProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGithubProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GithubProfile model
   */
  readonly fields: GithubProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GithubProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GithubProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    repositories<T extends GithubProfile$repositoriesArgs<ExtArgs> = {}>(args?: Subset<T, GithubProfile$repositoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GithubProfile model
   */
  interface GithubProfileFieldRefs {
    readonly id: FieldRef<"GithubProfile", 'String'>
    readonly userId: FieldRef<"GithubProfile", 'String'>
    readonly githubId: FieldRef<"GithubProfile", 'Int'>
    readonly login: FieldRef<"GithubProfile", 'String'>
    readonly displayName: FieldRef<"GithubProfile", 'String'>
    readonly bio: FieldRef<"GithubProfile", 'String'>
    readonly avatarUrl: FieldRef<"GithubProfile", 'String'>
    readonly blog: FieldRef<"GithubProfile", 'String'>
    readonly location: FieldRef<"GithubProfile", 'String'>
    readonly company: FieldRef<"GithubProfile", 'String'>
    readonly publicRepos: FieldRef<"GithubProfile", 'Int'>
    readonly publicGists: FieldRef<"GithubProfile", 'Int'>
    readonly followers: FieldRef<"GithubProfile", 'Int'>
    readonly following: FieldRef<"GithubProfile", 'Int'>
    readonly createdAt: FieldRef<"GithubProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"GithubProfile", 'DateTime'>
    readonly lastSyncedAt: FieldRef<"GithubProfile", 'DateTime'>
    readonly shareCount: FieldRef<"GithubProfile", 'Int'>
    readonly viewCount: FieldRef<"GithubProfile", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * GithubProfile findUnique
   */
  export type GithubProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    /**
     * Filter, which GithubProfile to fetch.
     */
    where: GithubProfileWhereUniqueInput
  }

  /**
   * GithubProfile findUniqueOrThrow
   */
  export type GithubProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    /**
     * Filter, which GithubProfile to fetch.
     */
    where: GithubProfileWhereUniqueInput
  }

  /**
   * GithubProfile findFirst
   */
  export type GithubProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    /**
     * Filter, which GithubProfile to fetch.
     */
    where?: GithubProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubProfiles to fetch.
     */
    orderBy?: GithubProfileOrderByWithRelationInput | GithubProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubProfiles.
     */
    cursor?: GithubProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubProfiles.
     */
    distinct?: GithubProfileScalarFieldEnum | GithubProfileScalarFieldEnum[]
  }

  /**
   * GithubProfile findFirstOrThrow
   */
  export type GithubProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    /**
     * Filter, which GithubProfile to fetch.
     */
    where?: GithubProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubProfiles to fetch.
     */
    orderBy?: GithubProfileOrderByWithRelationInput | GithubProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GithubProfiles.
     */
    cursor?: GithubProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GithubProfiles.
     */
    distinct?: GithubProfileScalarFieldEnum | GithubProfileScalarFieldEnum[]
  }

  /**
   * GithubProfile findMany
   */
  export type GithubProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    /**
     * Filter, which GithubProfiles to fetch.
     */
    where?: GithubProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GithubProfiles to fetch.
     */
    orderBy?: GithubProfileOrderByWithRelationInput | GithubProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GithubProfiles.
     */
    cursor?: GithubProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GithubProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GithubProfiles.
     */
    skip?: number
    distinct?: GithubProfileScalarFieldEnum | GithubProfileScalarFieldEnum[]
  }

  /**
   * GithubProfile create
   */
  export type GithubProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a GithubProfile.
     */
    data: XOR<GithubProfileCreateInput, GithubProfileUncheckedCreateInput>
  }

  /**
   * GithubProfile createMany
   */
  export type GithubProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GithubProfiles.
     */
    data: GithubProfileCreateManyInput | GithubProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GithubProfile createManyAndReturn
   */
  export type GithubProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * The data used to create many GithubProfiles.
     */
    data: GithubProfileCreateManyInput | GithubProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GithubProfile update
   */
  export type GithubProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a GithubProfile.
     */
    data: XOR<GithubProfileUpdateInput, GithubProfileUncheckedUpdateInput>
    /**
     * Choose, which GithubProfile to update.
     */
    where: GithubProfileWhereUniqueInput
  }

  /**
   * GithubProfile updateMany
   */
  export type GithubProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GithubProfiles.
     */
    data: XOR<GithubProfileUpdateManyMutationInput, GithubProfileUncheckedUpdateManyInput>
    /**
     * Filter which GithubProfiles to update
     */
    where?: GithubProfileWhereInput
    /**
     * Limit how many GithubProfiles to update.
     */
    limit?: number
  }

  /**
   * GithubProfile updateManyAndReturn
   */
  export type GithubProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * The data used to update GithubProfiles.
     */
    data: XOR<GithubProfileUpdateManyMutationInput, GithubProfileUncheckedUpdateManyInput>
    /**
     * Filter which GithubProfiles to update
     */
    where?: GithubProfileWhereInput
    /**
     * Limit how many GithubProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GithubProfile upsert
   */
  export type GithubProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the GithubProfile to update in case it exists.
     */
    where: GithubProfileWhereUniqueInput
    /**
     * In case the GithubProfile found by the `where` argument doesn't exist, create a new GithubProfile with this data.
     */
    create: XOR<GithubProfileCreateInput, GithubProfileUncheckedCreateInput>
    /**
     * In case the GithubProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GithubProfileUpdateInput, GithubProfileUncheckedUpdateInput>
  }

  /**
   * GithubProfile delete
   */
  export type GithubProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
    /**
     * Filter which GithubProfile to delete.
     */
    where: GithubProfileWhereUniqueInput
  }

  /**
   * GithubProfile deleteMany
   */
  export type GithubProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GithubProfiles to delete
     */
    where?: GithubProfileWhereInput
    /**
     * Limit how many GithubProfiles to delete.
     */
    limit?: number
  }

  /**
   * GithubProfile.repositories
   */
  export type GithubProfile$repositoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    where?: RepositoryWhereInput
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    cursor?: RepositoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * GithubProfile without action
   */
  export type GithubProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GithubProfile
     */
    select?: GithubProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GithubProfile
     */
    omit?: GithubProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GithubProfileInclude<ExtArgs> | null
  }


  /**
   * Model Repository
   */

  export type AggregateRepository = {
    _count: RepositoryCountAggregateOutputType | null
    _avg: RepositoryAvgAggregateOutputType | null
    _sum: RepositorySumAggregateOutputType | null
    _min: RepositoryMinAggregateOutputType | null
    _max: RepositoryMaxAggregateOutputType | null
  }

  export type RepositoryAvgAggregateOutputType = {
    githubId: number | null
    stargazersCount: number | null
    forksCount: number | null
    openIssuesCount: number | null
    watchersCount: number | null
    size: number | null
  }

  export type RepositorySumAggregateOutputType = {
    githubId: number | null
    stargazersCount: number | null
    forksCount: number | null
    openIssuesCount: number | null
    watchersCount: number | null
    size: number | null
  }

  export type RepositoryMinAggregateOutputType = {
    id: string | null
    githubId: number | null
    profileId: string | null
    name: string | null
    fullName: string | null
    description: string | null
    htmlUrl: string | null
    homepage: string | null
    language: string | null
    stargazersCount: number | null
    forksCount: number | null
    openIssuesCount: number | null
    watchersCount: number | null
    size: number | null
    defaultBranch: string | null
    isPrivate: boolean | null
    isFork: boolean | null
    license: string | null
    hasReadme: boolean | null
    hasIssues: boolean | null
    hasWiki: boolean | null
    hasPages: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastPushedAt: Date | null
  }

  export type RepositoryMaxAggregateOutputType = {
    id: string | null
    githubId: number | null
    profileId: string | null
    name: string | null
    fullName: string | null
    description: string | null
    htmlUrl: string | null
    homepage: string | null
    language: string | null
    stargazersCount: number | null
    forksCount: number | null
    openIssuesCount: number | null
    watchersCount: number | null
    size: number | null
    defaultBranch: string | null
    isPrivate: boolean | null
    isFork: boolean | null
    license: string | null
    hasReadme: boolean | null
    hasIssues: boolean | null
    hasWiki: boolean | null
    hasPages: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastPushedAt: Date | null
  }

  export type RepositoryCountAggregateOutputType = {
    id: number
    githubId: number
    profileId: number
    name: number
    fullName: number
    description: number
    htmlUrl: number
    homepage: number
    language: number
    stargazersCount: number
    forksCount: number
    openIssuesCount: number
    watchersCount: number
    size: number
    defaultBranch: number
    isPrivate: number
    isFork: number
    topics: number
    license: number
    hasReadme: number
    hasIssues: number
    hasWiki: number
    hasPages: number
    createdAt: number
    updatedAt: number
    lastPushedAt: number
    _all: number
  }


  export type RepositoryAvgAggregateInputType = {
    githubId?: true
    stargazersCount?: true
    forksCount?: true
    openIssuesCount?: true
    watchersCount?: true
    size?: true
  }

  export type RepositorySumAggregateInputType = {
    githubId?: true
    stargazersCount?: true
    forksCount?: true
    openIssuesCount?: true
    watchersCount?: true
    size?: true
  }

  export type RepositoryMinAggregateInputType = {
    id?: true
    githubId?: true
    profileId?: true
    name?: true
    fullName?: true
    description?: true
    htmlUrl?: true
    homepage?: true
    language?: true
    stargazersCount?: true
    forksCount?: true
    openIssuesCount?: true
    watchersCount?: true
    size?: true
    defaultBranch?: true
    isPrivate?: true
    isFork?: true
    license?: true
    hasReadme?: true
    hasIssues?: true
    hasWiki?: true
    hasPages?: true
    createdAt?: true
    updatedAt?: true
    lastPushedAt?: true
  }

  export type RepositoryMaxAggregateInputType = {
    id?: true
    githubId?: true
    profileId?: true
    name?: true
    fullName?: true
    description?: true
    htmlUrl?: true
    homepage?: true
    language?: true
    stargazersCount?: true
    forksCount?: true
    openIssuesCount?: true
    watchersCount?: true
    size?: true
    defaultBranch?: true
    isPrivate?: true
    isFork?: true
    license?: true
    hasReadme?: true
    hasIssues?: true
    hasWiki?: true
    hasPages?: true
    createdAt?: true
    updatedAt?: true
    lastPushedAt?: true
  }

  export type RepositoryCountAggregateInputType = {
    id?: true
    githubId?: true
    profileId?: true
    name?: true
    fullName?: true
    description?: true
    htmlUrl?: true
    homepage?: true
    language?: true
    stargazersCount?: true
    forksCount?: true
    openIssuesCount?: true
    watchersCount?: true
    size?: true
    defaultBranch?: true
    isPrivate?: true
    isFork?: true
    topics?: true
    license?: true
    hasReadme?: true
    hasIssues?: true
    hasWiki?: true
    hasPages?: true
    createdAt?: true
    updatedAt?: true
    lastPushedAt?: true
    _all?: true
  }

  export type RepositoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repository to aggregate.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Repositories
    **/
    _count?: true | RepositoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepositoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepositorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepositoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepositoryMaxAggregateInputType
  }

  export type GetRepositoryAggregateType<T extends RepositoryAggregateArgs> = {
        [P in keyof T & keyof AggregateRepository]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepository[P]>
      : GetScalarType<T[P], AggregateRepository[P]>
  }




  export type RepositoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepositoryWhereInput
    orderBy?: RepositoryOrderByWithAggregationInput | RepositoryOrderByWithAggregationInput[]
    by: RepositoryScalarFieldEnum[] | RepositoryScalarFieldEnum
    having?: RepositoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepositoryCountAggregateInputType | true
    _avg?: RepositoryAvgAggregateInputType
    _sum?: RepositorySumAggregateInputType
    _min?: RepositoryMinAggregateInputType
    _max?: RepositoryMaxAggregateInputType
  }

  export type RepositoryGroupByOutputType = {
    id: string
    githubId: number
    profileId: string
    name: string
    fullName: string
    description: string | null
    htmlUrl: string
    homepage: string | null
    language: string | null
    stargazersCount: number
    forksCount: number
    openIssuesCount: number
    watchersCount: number
    size: number
    defaultBranch: string
    isPrivate: boolean
    isFork: boolean
    topics: string[]
    license: string | null
    hasReadme: boolean
    hasIssues: boolean
    hasWiki: boolean
    hasPages: boolean
    createdAt: Date
    updatedAt: Date
    lastPushedAt: Date | null
    _count: RepositoryCountAggregateOutputType | null
    _avg: RepositoryAvgAggregateOutputType | null
    _sum: RepositorySumAggregateOutputType | null
    _min: RepositoryMinAggregateOutputType | null
    _max: RepositoryMaxAggregateOutputType | null
  }

  type GetRepositoryGroupByPayload<T extends RepositoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepositoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepositoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepositoryGroupByOutputType[P]>
            : GetScalarType<T[P], RepositoryGroupByOutputType[P]>
        }
      >
    >


  export type RepositorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    profileId?: boolean
    name?: boolean
    fullName?: boolean
    description?: boolean
    htmlUrl?: boolean
    homepage?: boolean
    language?: boolean
    stargazersCount?: boolean
    forksCount?: boolean
    openIssuesCount?: boolean
    watchersCount?: boolean
    size?: boolean
    defaultBranch?: boolean
    isPrivate?: boolean
    isFork?: boolean
    topics?: boolean
    license?: boolean
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastPushedAt?: boolean
    profile?: boolean | GithubProfileDefaultArgs<ExtArgs>
    repoScores?: boolean | Repository$repoScoresArgs<ExtArgs>
    analyses?: boolean | Repository$analysesArgs<ExtArgs>
    _count?: boolean | RepositoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repository"]>

  export type RepositorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    profileId?: boolean
    name?: boolean
    fullName?: boolean
    description?: boolean
    htmlUrl?: boolean
    homepage?: boolean
    language?: boolean
    stargazersCount?: boolean
    forksCount?: boolean
    openIssuesCount?: boolean
    watchersCount?: boolean
    size?: boolean
    defaultBranch?: boolean
    isPrivate?: boolean
    isFork?: boolean
    topics?: boolean
    license?: boolean
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastPushedAt?: boolean
    profile?: boolean | GithubProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repository"]>

  export type RepositorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubId?: boolean
    profileId?: boolean
    name?: boolean
    fullName?: boolean
    description?: boolean
    htmlUrl?: boolean
    homepage?: boolean
    language?: boolean
    stargazersCount?: boolean
    forksCount?: boolean
    openIssuesCount?: boolean
    watchersCount?: boolean
    size?: boolean
    defaultBranch?: boolean
    isPrivate?: boolean
    isFork?: boolean
    topics?: boolean
    license?: boolean
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastPushedAt?: boolean
    profile?: boolean | GithubProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["repository"]>

  export type RepositorySelectScalar = {
    id?: boolean
    githubId?: boolean
    profileId?: boolean
    name?: boolean
    fullName?: boolean
    description?: boolean
    htmlUrl?: boolean
    homepage?: boolean
    language?: boolean
    stargazersCount?: boolean
    forksCount?: boolean
    openIssuesCount?: boolean
    watchersCount?: boolean
    size?: boolean
    defaultBranch?: boolean
    isPrivate?: boolean
    isFork?: boolean
    topics?: boolean
    license?: boolean
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastPushedAt?: boolean
  }

  export type RepositoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "githubId" | "profileId" | "name" | "fullName" | "description" | "htmlUrl" | "homepage" | "language" | "stargazersCount" | "forksCount" | "openIssuesCount" | "watchersCount" | "size" | "defaultBranch" | "isPrivate" | "isFork" | "topics" | "license" | "hasReadme" | "hasIssues" | "hasWiki" | "hasPages" | "createdAt" | "updatedAt" | "lastPushedAt", ExtArgs["result"]["repository"]>
  export type RepositoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | GithubProfileDefaultArgs<ExtArgs>
    repoScores?: boolean | Repository$repoScoresArgs<ExtArgs>
    analyses?: boolean | Repository$analysesArgs<ExtArgs>
    _count?: boolean | RepositoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RepositoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | GithubProfileDefaultArgs<ExtArgs>
  }
  export type RepositoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | GithubProfileDefaultArgs<ExtArgs>
  }

  export type $RepositoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Repository"
    objects: {
      profile: Prisma.$GithubProfilePayload<ExtArgs>
      repoScores: Prisma.$RepositoryScorePayload<ExtArgs>[]
      analyses: Prisma.$AnalysisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      githubId: number
      profileId: string
      name: string
      fullName: string
      description: string | null
      htmlUrl: string
      homepage: string | null
      language: string | null
      stargazersCount: number
      forksCount: number
      openIssuesCount: number
      watchersCount: number
      size: number
      defaultBranch: string
      isPrivate: boolean
      isFork: boolean
      topics: string[]
      license: string | null
      hasReadme: boolean
      hasIssues: boolean
      hasWiki: boolean
      hasPages: boolean
      createdAt: Date
      updatedAt: Date
      lastPushedAt: Date | null
    }, ExtArgs["result"]["repository"]>
    composites: {}
  }

  type RepositoryGetPayload<S extends boolean | null | undefined | RepositoryDefaultArgs> = $Result.GetResult<Prisma.$RepositoryPayload, S>

  type RepositoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepositoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepositoryCountAggregateInputType | true
    }

  export interface RepositoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Repository'], meta: { name: 'Repository' } }
    /**
     * Find zero or one Repository that matches the filter.
     * @param {RepositoryFindUniqueArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepositoryFindUniqueArgs>(args: SelectSubset<T, RepositoryFindUniqueArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Repository that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepositoryFindUniqueOrThrowArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepositoryFindUniqueOrThrowArgs>(args: SelectSubset<T, RepositoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repository that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindFirstArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepositoryFindFirstArgs>(args?: SelectSubset<T, RepositoryFindFirstArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Repository that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindFirstOrThrowArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepositoryFindFirstOrThrowArgs>(args?: SelectSubset<T, RepositoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Repositories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Repositories
     * const repositories = await prisma.repository.findMany()
     * 
     * // Get first 10 Repositories
     * const repositories = await prisma.repository.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repositoryWithIdOnly = await prisma.repository.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepositoryFindManyArgs>(args?: SelectSubset<T, RepositoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Repository.
     * @param {RepositoryCreateArgs} args - Arguments to create a Repository.
     * @example
     * // Create one Repository
     * const Repository = await prisma.repository.create({
     *   data: {
     *     // ... data to create a Repository
     *   }
     * })
     * 
     */
    create<T extends RepositoryCreateArgs>(args: SelectSubset<T, RepositoryCreateArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Repositories.
     * @param {RepositoryCreateManyArgs} args - Arguments to create many Repositories.
     * @example
     * // Create many Repositories
     * const repository = await prisma.repository.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepositoryCreateManyArgs>(args?: SelectSubset<T, RepositoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Repositories and returns the data saved in the database.
     * @param {RepositoryCreateManyAndReturnArgs} args - Arguments to create many Repositories.
     * @example
     * // Create many Repositories
     * const repository = await prisma.repository.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Repositories and only return the `id`
     * const repositoryWithIdOnly = await prisma.repository.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepositoryCreateManyAndReturnArgs>(args?: SelectSubset<T, RepositoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Repository.
     * @param {RepositoryDeleteArgs} args - Arguments to delete one Repository.
     * @example
     * // Delete one Repository
     * const Repository = await prisma.repository.delete({
     *   where: {
     *     // ... filter to delete one Repository
     *   }
     * })
     * 
     */
    delete<T extends RepositoryDeleteArgs>(args: SelectSubset<T, RepositoryDeleteArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Repository.
     * @param {RepositoryUpdateArgs} args - Arguments to update one Repository.
     * @example
     * // Update one Repository
     * const repository = await prisma.repository.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepositoryUpdateArgs>(args: SelectSubset<T, RepositoryUpdateArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Repositories.
     * @param {RepositoryDeleteManyArgs} args - Arguments to filter Repositories to delete.
     * @example
     * // Delete a few Repositories
     * const { count } = await prisma.repository.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepositoryDeleteManyArgs>(args?: SelectSubset<T, RepositoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Repositories
     * const repository = await prisma.repository.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepositoryUpdateManyArgs>(args: SelectSubset<T, RepositoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Repositories and returns the data updated in the database.
     * @param {RepositoryUpdateManyAndReturnArgs} args - Arguments to update many Repositories.
     * @example
     * // Update many Repositories
     * const repository = await prisma.repository.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Repositories and only return the `id`
     * const repositoryWithIdOnly = await prisma.repository.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepositoryUpdateManyAndReturnArgs>(args: SelectSubset<T, RepositoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Repository.
     * @param {RepositoryUpsertArgs} args - Arguments to update or create a Repository.
     * @example
     * // Update or create a Repository
     * const repository = await prisma.repository.upsert({
     *   create: {
     *     // ... data to create a Repository
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Repository we want to update
     *   }
     * })
     */
    upsert<T extends RepositoryUpsertArgs>(args: SelectSubset<T, RepositoryUpsertArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Repositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryCountArgs} args - Arguments to filter Repositories to count.
     * @example
     * // Count the number of Repositories
     * const count = await prisma.repository.count({
     *   where: {
     *     // ... the filter for the Repositories we want to count
     *   }
     * })
    **/
    count<T extends RepositoryCountArgs>(
      args?: Subset<T, RepositoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepositoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Repository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepositoryAggregateArgs>(args: Subset<T, RepositoryAggregateArgs>): Prisma.PrismaPromise<GetRepositoryAggregateType<T>>

    /**
     * Group by Repository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepositoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepositoryGroupByArgs['orderBy'] }
        : { orderBy?: RepositoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepositoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepositoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Repository model
   */
  readonly fields: RepositoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Repository.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepositoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends GithubProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GithubProfileDefaultArgs<ExtArgs>>): Prisma__GithubProfileClient<$Result.GetResult<Prisma.$GithubProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    repoScores<T extends Repository$repoScoresArgs<ExtArgs> = {}>(args?: Subset<T, Repository$repoScoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    analyses<T extends Repository$analysesArgs<ExtArgs> = {}>(args?: Subset<T, Repository$analysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Repository model
   */
  interface RepositoryFieldRefs {
    readonly id: FieldRef<"Repository", 'String'>
    readonly githubId: FieldRef<"Repository", 'Int'>
    readonly profileId: FieldRef<"Repository", 'String'>
    readonly name: FieldRef<"Repository", 'String'>
    readonly fullName: FieldRef<"Repository", 'String'>
    readonly description: FieldRef<"Repository", 'String'>
    readonly htmlUrl: FieldRef<"Repository", 'String'>
    readonly homepage: FieldRef<"Repository", 'String'>
    readonly language: FieldRef<"Repository", 'String'>
    readonly stargazersCount: FieldRef<"Repository", 'Int'>
    readonly forksCount: FieldRef<"Repository", 'Int'>
    readonly openIssuesCount: FieldRef<"Repository", 'Int'>
    readonly watchersCount: FieldRef<"Repository", 'Int'>
    readonly size: FieldRef<"Repository", 'Int'>
    readonly defaultBranch: FieldRef<"Repository", 'String'>
    readonly isPrivate: FieldRef<"Repository", 'Boolean'>
    readonly isFork: FieldRef<"Repository", 'Boolean'>
    readonly topics: FieldRef<"Repository", 'String[]'>
    readonly license: FieldRef<"Repository", 'String'>
    readonly hasReadme: FieldRef<"Repository", 'Boolean'>
    readonly hasIssues: FieldRef<"Repository", 'Boolean'>
    readonly hasWiki: FieldRef<"Repository", 'Boolean'>
    readonly hasPages: FieldRef<"Repository", 'Boolean'>
    readonly createdAt: FieldRef<"Repository", 'DateTime'>
    readonly updatedAt: FieldRef<"Repository", 'DateTime'>
    readonly lastPushedAt: FieldRef<"Repository", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Repository findUnique
   */
  export type RepositoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository findUniqueOrThrow
   */
  export type RepositoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository findFirst
   */
  export type RepositoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repositories.
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repositories.
     */
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Repository findFirstOrThrow
   */
  export type RepositoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repository to fetch.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Repositories.
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Repositories.
     */
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Repository findMany
   */
  export type RepositoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter, which Repositories to fetch.
     */
    where?: RepositoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Repositories.
     */
    cursor?: RepositoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Repositories.
     */
    skip?: number
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Repository create
   */
  export type RepositoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Repository.
     */
    data: XOR<RepositoryCreateInput, RepositoryUncheckedCreateInput>
  }

  /**
   * Repository createMany
   */
  export type RepositoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Repositories.
     */
    data: RepositoryCreateManyInput | RepositoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Repository createManyAndReturn
   */
  export type RepositoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * The data used to create many Repositories.
     */
    data: RepositoryCreateManyInput | RepositoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Repository update
   */
  export type RepositoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Repository.
     */
    data: XOR<RepositoryUpdateInput, RepositoryUncheckedUpdateInput>
    /**
     * Choose, which Repository to update.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository updateMany
   */
  export type RepositoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Repositories.
     */
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyInput>
    /**
     * Filter which Repositories to update
     */
    where?: RepositoryWhereInput
    /**
     * Limit how many Repositories to update.
     */
    limit?: number
  }

  /**
   * Repository updateManyAndReturn
   */
  export type RepositoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * The data used to update Repositories.
     */
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyInput>
    /**
     * Filter which Repositories to update
     */
    where?: RepositoryWhereInput
    /**
     * Limit how many Repositories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Repository upsert
   */
  export type RepositoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Repository to update in case it exists.
     */
    where: RepositoryWhereUniqueInput
    /**
     * In case the Repository found by the `where` argument doesn't exist, create a new Repository with this data.
     */
    create: XOR<RepositoryCreateInput, RepositoryUncheckedCreateInput>
    /**
     * In case the Repository was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepositoryUpdateInput, RepositoryUncheckedUpdateInput>
  }

  /**
   * Repository delete
   */
  export type RepositoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    /**
     * Filter which Repository to delete.
     */
    where: RepositoryWhereUniqueInput
  }

  /**
   * Repository deleteMany
   */
  export type RepositoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Repositories to delete
     */
    where?: RepositoryWhereInput
    /**
     * Limit how many Repositories to delete.
     */
    limit?: number
  }

  /**
   * Repository.repoScores
   */
  export type Repository$repoScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    where?: RepositoryScoreWhereInput
    orderBy?: RepositoryScoreOrderByWithRelationInput | RepositoryScoreOrderByWithRelationInput[]
    cursor?: RepositoryScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepositoryScoreScalarFieldEnum | RepositoryScoreScalarFieldEnum[]
  }

  /**
   * Repository.analyses
   */
  export type Repository$analysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    where?: AnalysisWhereInput
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    cursor?: AnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Repository without action
   */
  export type RepositoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
  }


  /**
   * Model Analysis
   */

  export type AggregateAnalysis = {
    _count: AnalysisCountAggregateOutputType | null
    _avg: AnalysisAvgAggregateOutputType | null
    _sum: AnalysisSumAggregateOutputType | null
    _min: AnalysisMinAggregateOutputType | null
    _max: AnalysisMaxAggregateOutputType | null
  }

  export type AnalysisAvgAggregateOutputType = {
    overallScore: number | null
    confidenceScore: number | null
    costCents: number | null
  }

  export type AnalysisSumAggregateOutputType = {
    overallScore: number | null
    confidenceScore: number | null
    costCents: number | null
  }

  export type AnalysisMinAggregateOutputType = {
    id: string | null
    userId: string | null
    status: string | null
    overallScore: number | null
    engineerLevel: string | null
    confidenceScore: number | null
    summary: string | null
    costCents: number | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type AnalysisMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    status: string | null
    overallScore: number | null
    engineerLevel: string | null
    confidenceScore: number | null
    summary: string | null
    costCents: number | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type AnalysisCountAggregateOutputType = {
    id: number
    userId: number
    status: number
    overallScore: number
    engineerLevel: number
    confidenceScore: number
    strengths: number
    gaps: number
    summary: number
    costCents: number
    createdAt: number
    updatedAt: number
    completedAt: number
    _all: number
  }


  export type AnalysisAvgAggregateInputType = {
    overallScore?: true
    confidenceScore?: true
    costCents?: true
  }

  export type AnalysisSumAggregateInputType = {
    overallScore?: true
    confidenceScore?: true
    costCents?: true
  }

  export type AnalysisMinAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    overallScore?: true
    engineerLevel?: true
    confidenceScore?: true
    summary?: true
    costCents?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type AnalysisMaxAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    overallScore?: true
    engineerLevel?: true
    confidenceScore?: true
    summary?: true
    costCents?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type AnalysisCountAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    overallScore?: true
    engineerLevel?: true
    confidenceScore?: true
    strengths?: true
    gaps?: true
    summary?: true
    costCents?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    _all?: true
  }

  export type AnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analysis to aggregate.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Analyses
    **/
    _count?: true | AnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnalysisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalysisMaxAggregateInputType
  }

  export type GetAnalysisAggregateType<T extends AnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalysis[P]>
      : GetScalarType<T[P], AggregateAnalysis[P]>
  }




  export type AnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisWhereInput
    orderBy?: AnalysisOrderByWithAggregationInput | AnalysisOrderByWithAggregationInput[]
    by: AnalysisScalarFieldEnum[] | AnalysisScalarFieldEnum
    having?: AnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalysisCountAggregateInputType | true
    _avg?: AnalysisAvgAggregateInputType
    _sum?: AnalysisSumAggregateInputType
    _min?: AnalysisMinAggregateInputType
    _max?: AnalysisMaxAggregateInputType
  }

  export type AnalysisGroupByOutputType = {
    id: string
    userId: string
    status: string
    overallScore: number | null
    engineerLevel: string | null
    confidenceScore: number | null
    strengths: string[]
    gaps: string[]
    summary: string | null
    costCents: number
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    _count: AnalysisCountAggregateOutputType | null
    _avg: AnalysisAvgAggregateOutputType | null
    _sum: AnalysisSumAggregateOutputType | null
    _min: AnalysisMinAggregateOutputType | null
    _max: AnalysisMaxAggregateOutputType | null
  }

  type GetAnalysisGroupByPayload<T extends AnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], AnalysisGroupByOutputType[P]>
        }
      >
    >


  export type AnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    overallScore?: boolean
    engineerLevel?: boolean
    confidenceScore?: boolean
    strengths?: boolean
    gaps?: boolean
    summary?: boolean
    costCents?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    scores?: boolean | Analysis$scoresArgs<ExtArgs>
    repositories?: boolean | Analysis$repositoriesArgs<ExtArgs>
    repoScores?: boolean | Analysis$repoScoresArgs<ExtArgs>
    _count?: boolean | AnalysisCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysis"]>

  export type AnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    overallScore?: boolean
    engineerLevel?: boolean
    confidenceScore?: boolean
    strengths?: boolean
    gaps?: boolean
    summary?: boolean
    costCents?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysis"]>

  export type AnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    overallScore?: boolean
    engineerLevel?: boolean
    confidenceScore?: boolean
    strengths?: boolean
    gaps?: boolean
    summary?: boolean
    costCents?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysis"]>

  export type AnalysisSelectScalar = {
    id?: boolean
    userId?: boolean
    status?: boolean
    overallScore?: boolean
    engineerLevel?: boolean
    confidenceScore?: boolean
    strengths?: boolean
    gaps?: boolean
    summary?: boolean
    costCents?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }

  export type AnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "status" | "overallScore" | "engineerLevel" | "confidenceScore" | "strengths" | "gaps" | "summary" | "costCents" | "createdAt" | "updatedAt" | "completedAt", ExtArgs["result"]["analysis"]>
  export type AnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    scores?: boolean | Analysis$scoresArgs<ExtArgs>
    repositories?: boolean | Analysis$repositoriesArgs<ExtArgs>
    repoScores?: boolean | Analysis$repoScoresArgs<ExtArgs>
    _count?: boolean | AnalysisCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Analysis"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      scores: Prisma.$AnalysisScorePayload<ExtArgs>[]
      repositories: Prisma.$RepositoryPayload<ExtArgs>[]
      repoScores: Prisma.$RepositoryScorePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      status: string
      overallScore: number | null
      engineerLevel: string | null
      confidenceScore: number | null
      strengths: string[]
      gaps: string[]
      summary: string | null
      costCents: number
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["analysis"]>
    composites: {}
  }

  type AnalysisGetPayload<S extends boolean | null | undefined | AnalysisDefaultArgs> = $Result.GetResult<Prisma.$AnalysisPayload, S>

  type AnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalysisCountAggregateInputType | true
    }

  export interface AnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Analysis'], meta: { name: 'Analysis' } }
    /**
     * Find zero or one Analysis that matches the filter.
     * @param {AnalysisFindUniqueArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalysisFindUniqueArgs>(args: SelectSubset<T, AnalysisFindUniqueArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Analysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalysisFindUniqueOrThrowArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisFindFirstArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalysisFindFirstArgs>(args?: SelectSubset<T, AnalysisFindFirstArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisFindFirstOrThrowArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Analyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Analyses
     * const analyses = await prisma.analysis.findMany()
     * 
     * // Get first 10 Analyses
     * const analyses = await prisma.analysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analysisWithIdOnly = await prisma.analysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalysisFindManyArgs>(args?: SelectSubset<T, AnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Analysis.
     * @param {AnalysisCreateArgs} args - Arguments to create a Analysis.
     * @example
     * // Create one Analysis
     * const Analysis = await prisma.analysis.create({
     *   data: {
     *     // ... data to create a Analysis
     *   }
     * })
     * 
     */
    create<T extends AnalysisCreateArgs>(args: SelectSubset<T, AnalysisCreateArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Analyses.
     * @param {AnalysisCreateManyArgs} args - Arguments to create many Analyses.
     * @example
     * // Create many Analyses
     * const analysis = await prisma.analysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalysisCreateManyArgs>(args?: SelectSubset<T, AnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Analyses and returns the data saved in the database.
     * @param {AnalysisCreateManyAndReturnArgs} args - Arguments to create many Analyses.
     * @example
     * // Create many Analyses
     * const analysis = await prisma.analysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Analyses and only return the `id`
     * const analysisWithIdOnly = await prisma.analysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Analysis.
     * @param {AnalysisDeleteArgs} args - Arguments to delete one Analysis.
     * @example
     * // Delete one Analysis
     * const Analysis = await prisma.analysis.delete({
     *   where: {
     *     // ... filter to delete one Analysis
     *   }
     * })
     * 
     */
    delete<T extends AnalysisDeleteArgs>(args: SelectSubset<T, AnalysisDeleteArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Analysis.
     * @param {AnalysisUpdateArgs} args - Arguments to update one Analysis.
     * @example
     * // Update one Analysis
     * const analysis = await prisma.analysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalysisUpdateArgs>(args: SelectSubset<T, AnalysisUpdateArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Analyses.
     * @param {AnalysisDeleteManyArgs} args - Arguments to filter Analyses to delete.
     * @example
     * // Delete a few Analyses
     * const { count } = await prisma.analysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalysisDeleteManyArgs>(args?: SelectSubset<T, AnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Analyses
     * const analysis = await prisma.analysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalysisUpdateManyArgs>(args: SelectSubset<T, AnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analyses and returns the data updated in the database.
     * @param {AnalysisUpdateManyAndReturnArgs} args - Arguments to update many Analyses.
     * @example
     * // Update many Analyses
     * const analysis = await prisma.analysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Analyses and only return the `id`
     * const analysisWithIdOnly = await prisma.analysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Analysis.
     * @param {AnalysisUpsertArgs} args - Arguments to update or create a Analysis.
     * @example
     * // Update or create a Analysis
     * const analysis = await prisma.analysis.upsert({
     *   create: {
     *     // ... data to create a Analysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Analysis we want to update
     *   }
     * })
     */
    upsert<T extends AnalysisUpsertArgs>(args: SelectSubset<T, AnalysisUpsertArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Analyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisCountArgs} args - Arguments to filter Analyses to count.
     * @example
     * // Count the number of Analyses
     * const count = await prisma.analysis.count({
     *   where: {
     *     // ... the filter for the Analyses we want to count
     *   }
     * })
    **/
    count<T extends AnalysisCountArgs>(
      args?: Subset<T, AnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Analysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalysisAggregateArgs>(args: Subset<T, AnalysisAggregateArgs>): Prisma.PrismaPromise<GetAnalysisAggregateType<T>>

    /**
     * Group by Analysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalysisGroupByArgs['orderBy'] }
        : { orderBy?: AnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Analysis model
   */
  readonly fields: AnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Analysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    scores<T extends Analysis$scoresArgs<ExtArgs> = {}>(args?: Subset<T, Analysis$scoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    repositories<T extends Analysis$repositoriesArgs<ExtArgs> = {}>(args?: Subset<T, Analysis$repositoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    repoScores<T extends Analysis$repoScoresArgs<ExtArgs> = {}>(args?: Subset<T, Analysis$repoScoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Analysis model
   */
  interface AnalysisFieldRefs {
    readonly id: FieldRef<"Analysis", 'String'>
    readonly userId: FieldRef<"Analysis", 'String'>
    readonly status: FieldRef<"Analysis", 'String'>
    readonly overallScore: FieldRef<"Analysis", 'Int'>
    readonly engineerLevel: FieldRef<"Analysis", 'String'>
    readonly confidenceScore: FieldRef<"Analysis", 'Float'>
    readonly strengths: FieldRef<"Analysis", 'String[]'>
    readonly gaps: FieldRef<"Analysis", 'String[]'>
    readonly summary: FieldRef<"Analysis", 'String'>
    readonly costCents: FieldRef<"Analysis", 'Int'>
    readonly createdAt: FieldRef<"Analysis", 'DateTime'>
    readonly updatedAt: FieldRef<"Analysis", 'DateTime'>
    readonly completedAt: FieldRef<"Analysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Analysis findUnique
   */
  export type AnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis findUniqueOrThrow
   */
  export type AnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis findFirst
   */
  export type AnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analyses.
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analyses.
     */
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Analysis findFirstOrThrow
   */
  export type AnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analyses.
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analyses.
     */
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Analysis findMany
   */
  export type AnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analyses to fetch.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Analyses.
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Analysis create
   */
  export type AnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a Analysis.
     */
    data: XOR<AnalysisCreateInput, AnalysisUncheckedCreateInput>
  }

  /**
   * Analysis createMany
   */
  export type AnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Analyses.
     */
    data: AnalysisCreateManyInput | AnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Analysis createManyAndReturn
   */
  export type AnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many Analyses.
     */
    data: AnalysisCreateManyInput | AnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Analysis update
   */
  export type AnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a Analysis.
     */
    data: XOR<AnalysisUpdateInput, AnalysisUncheckedUpdateInput>
    /**
     * Choose, which Analysis to update.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis updateMany
   */
  export type AnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Analyses.
     */
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyInput>
    /**
     * Filter which Analyses to update
     */
    where?: AnalysisWhereInput
    /**
     * Limit how many Analyses to update.
     */
    limit?: number
  }

  /**
   * Analysis updateManyAndReturn
   */
  export type AnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * The data used to update Analyses.
     */
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyInput>
    /**
     * Filter which Analyses to update
     */
    where?: AnalysisWhereInput
    /**
     * Limit how many Analyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Analysis upsert
   */
  export type AnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the Analysis to update in case it exists.
     */
    where: AnalysisWhereUniqueInput
    /**
     * In case the Analysis found by the `where` argument doesn't exist, create a new Analysis with this data.
     */
    create: XOR<AnalysisCreateInput, AnalysisUncheckedCreateInput>
    /**
     * In case the Analysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalysisUpdateInput, AnalysisUncheckedUpdateInput>
  }

  /**
   * Analysis delete
   */
  export type AnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter which Analysis to delete.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis deleteMany
   */
  export type AnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analyses to delete
     */
    where?: AnalysisWhereInput
    /**
     * Limit how many Analyses to delete.
     */
    limit?: number
  }

  /**
   * Analysis.scores
   */
  export type Analysis$scoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    where?: AnalysisScoreWhereInput
    orderBy?: AnalysisScoreOrderByWithRelationInput | AnalysisScoreOrderByWithRelationInput[]
    cursor?: AnalysisScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalysisScoreScalarFieldEnum | AnalysisScoreScalarFieldEnum[]
  }

  /**
   * Analysis.repositories
   */
  export type Analysis$repositoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Repository
     */
    omit?: RepositoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null
    where?: RepositoryWhereInput
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[]
    cursor?: RepositoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[]
  }

  /**
   * Analysis.repoScores
   */
  export type Analysis$repoScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    where?: RepositoryScoreWhereInput
    orderBy?: RepositoryScoreOrderByWithRelationInput | RepositoryScoreOrderByWithRelationInput[]
    cursor?: RepositoryScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RepositoryScoreScalarFieldEnum | RepositoryScoreScalarFieldEnum[]
  }

  /**
   * Analysis without action
   */
  export type AnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
  }


  /**
   * Model AnalysisScore
   */

  export type AggregateAnalysisScore = {
    _count: AnalysisScoreCountAggregateOutputType | null
    _avg: AnalysisScoreAvgAggregateOutputType | null
    _sum: AnalysisScoreSumAggregateOutputType | null
    _min: AnalysisScoreMinAggregateOutputType | null
    _max: AnalysisScoreMaxAggregateOutputType | null
  }

  export type AnalysisScoreAvgAggregateOutputType = {
    score: number | null
    confidence: number | null
  }

  export type AnalysisScoreSumAggregateOutputType = {
    score: number | null
    confidence: number | null
  }

  export type AnalysisScoreMinAggregateOutputType = {
    id: string | null
    analysisId: string | null
    category: string | null
    score: number | null
    confidence: number | null
    evidence: string | null
    suggestions: string | null
  }

  export type AnalysisScoreMaxAggregateOutputType = {
    id: string | null
    analysisId: string | null
    category: string | null
    score: number | null
    confidence: number | null
    evidence: string | null
    suggestions: string | null
  }

  export type AnalysisScoreCountAggregateOutputType = {
    id: number
    analysisId: number
    category: number
    score: number
    confidence: number
    evidence: number
    suggestions: number
    _all: number
  }


  export type AnalysisScoreAvgAggregateInputType = {
    score?: true
    confidence?: true
  }

  export type AnalysisScoreSumAggregateInputType = {
    score?: true
    confidence?: true
  }

  export type AnalysisScoreMinAggregateInputType = {
    id?: true
    analysisId?: true
    category?: true
    score?: true
    confidence?: true
    evidence?: true
    suggestions?: true
  }

  export type AnalysisScoreMaxAggregateInputType = {
    id?: true
    analysisId?: true
    category?: true
    score?: true
    confidence?: true
    evidence?: true
    suggestions?: true
  }

  export type AnalysisScoreCountAggregateInputType = {
    id?: true
    analysisId?: true
    category?: true
    score?: true
    confidence?: true
    evidence?: true
    suggestions?: true
    _all?: true
  }

  export type AnalysisScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalysisScore to aggregate.
     */
    where?: AnalysisScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalysisScores to fetch.
     */
    orderBy?: AnalysisScoreOrderByWithRelationInput | AnalysisScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalysisScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalysisScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalysisScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalysisScores
    **/
    _count?: true | AnalysisScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnalysisScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnalysisScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalysisScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalysisScoreMaxAggregateInputType
  }

  export type GetAnalysisScoreAggregateType<T extends AnalysisScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalysisScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalysisScore[P]>
      : GetScalarType<T[P], AggregateAnalysisScore[P]>
  }




  export type AnalysisScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisScoreWhereInput
    orderBy?: AnalysisScoreOrderByWithAggregationInput | AnalysisScoreOrderByWithAggregationInput[]
    by: AnalysisScoreScalarFieldEnum[] | AnalysisScoreScalarFieldEnum
    having?: AnalysisScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalysisScoreCountAggregateInputType | true
    _avg?: AnalysisScoreAvgAggregateInputType
    _sum?: AnalysisScoreSumAggregateInputType
    _min?: AnalysisScoreMinAggregateInputType
    _max?: AnalysisScoreMaxAggregateInputType
  }

  export type AnalysisScoreGroupByOutputType = {
    id: string
    analysisId: string
    category: string
    score: number
    confidence: number
    evidence: string | null
    suggestions: string | null
    _count: AnalysisScoreCountAggregateOutputType | null
    _avg: AnalysisScoreAvgAggregateOutputType | null
    _sum: AnalysisScoreSumAggregateOutputType | null
    _min: AnalysisScoreMinAggregateOutputType | null
    _max: AnalysisScoreMaxAggregateOutputType | null
  }

  type GetAnalysisScoreGroupByPayload<T extends AnalysisScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalysisScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalysisScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalysisScoreGroupByOutputType[P]>
            : GetScalarType<T[P], AnalysisScoreGroupByOutputType[P]>
        }
      >
    >


  export type AnalysisScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    analysisId?: boolean
    category?: boolean
    score?: boolean
    confidence?: boolean
    evidence?: boolean
    suggestions?: boolean
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysisScore"]>

  export type AnalysisScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    analysisId?: boolean
    category?: boolean
    score?: boolean
    confidence?: boolean
    evidence?: boolean
    suggestions?: boolean
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysisScore"]>

  export type AnalysisScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    analysisId?: boolean
    category?: boolean
    score?: boolean
    confidence?: boolean
    evidence?: boolean
    suggestions?: boolean
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysisScore"]>

  export type AnalysisScoreSelectScalar = {
    id?: boolean
    analysisId?: boolean
    category?: boolean
    score?: boolean
    confidence?: boolean
    evidence?: boolean
    suggestions?: boolean
  }

  export type AnalysisScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "analysisId" | "category" | "score" | "confidence" | "evidence" | "suggestions", ExtArgs["result"]["analysisScore"]>
  export type AnalysisScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
  }
  export type AnalysisScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
  }
  export type AnalysisScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    analysis?: boolean | AnalysisDefaultArgs<ExtArgs>
  }

  export type $AnalysisScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalysisScore"
    objects: {
      analysis: Prisma.$AnalysisPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      analysisId: string
      category: string
      score: number
      confidence: number
      evidence: string | null
      suggestions: string | null
    }, ExtArgs["result"]["analysisScore"]>
    composites: {}
  }

  type AnalysisScoreGetPayload<S extends boolean | null | undefined | AnalysisScoreDefaultArgs> = $Result.GetResult<Prisma.$AnalysisScorePayload, S>

  type AnalysisScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalysisScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalysisScoreCountAggregateInputType | true
    }

  export interface AnalysisScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalysisScore'], meta: { name: 'AnalysisScore' } }
    /**
     * Find zero or one AnalysisScore that matches the filter.
     * @param {AnalysisScoreFindUniqueArgs} args - Arguments to find a AnalysisScore
     * @example
     * // Get one AnalysisScore
     * const analysisScore = await prisma.analysisScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalysisScoreFindUniqueArgs>(args: SelectSubset<T, AnalysisScoreFindUniqueArgs<ExtArgs>>): Prisma__AnalysisScoreClient<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnalysisScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalysisScoreFindUniqueOrThrowArgs} args - Arguments to find a AnalysisScore
     * @example
     * // Get one AnalysisScore
     * const analysisScore = await prisma.analysisScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalysisScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalysisScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalysisScoreClient<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalysisScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisScoreFindFirstArgs} args - Arguments to find a AnalysisScore
     * @example
     * // Get one AnalysisScore
     * const analysisScore = await prisma.analysisScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalysisScoreFindFirstArgs>(args?: SelectSubset<T, AnalysisScoreFindFirstArgs<ExtArgs>>): Prisma__AnalysisScoreClient<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalysisScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisScoreFindFirstOrThrowArgs} args - Arguments to find a AnalysisScore
     * @example
     * // Get one AnalysisScore
     * const analysisScore = await prisma.analysisScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalysisScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalysisScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalysisScoreClient<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnalysisScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalysisScores
     * const analysisScores = await prisma.analysisScore.findMany()
     * 
     * // Get first 10 AnalysisScores
     * const analysisScores = await prisma.analysisScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analysisScoreWithIdOnly = await prisma.analysisScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalysisScoreFindManyArgs>(args?: SelectSubset<T, AnalysisScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnalysisScore.
     * @param {AnalysisScoreCreateArgs} args - Arguments to create a AnalysisScore.
     * @example
     * // Create one AnalysisScore
     * const AnalysisScore = await prisma.analysisScore.create({
     *   data: {
     *     // ... data to create a AnalysisScore
     *   }
     * })
     * 
     */
    create<T extends AnalysisScoreCreateArgs>(args: SelectSubset<T, AnalysisScoreCreateArgs<ExtArgs>>): Prisma__AnalysisScoreClient<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnalysisScores.
     * @param {AnalysisScoreCreateManyArgs} args - Arguments to create many AnalysisScores.
     * @example
     * // Create many AnalysisScores
     * const analysisScore = await prisma.analysisScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalysisScoreCreateManyArgs>(args?: SelectSubset<T, AnalysisScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalysisScores and returns the data saved in the database.
     * @param {AnalysisScoreCreateManyAndReturnArgs} args - Arguments to create many AnalysisScores.
     * @example
     * // Create many AnalysisScores
     * const analysisScore = await prisma.analysisScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalysisScores and only return the `id`
     * const analysisScoreWithIdOnly = await prisma.analysisScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalysisScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalysisScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnalysisScore.
     * @param {AnalysisScoreDeleteArgs} args - Arguments to delete one AnalysisScore.
     * @example
     * // Delete one AnalysisScore
     * const AnalysisScore = await prisma.analysisScore.delete({
     *   where: {
     *     // ... filter to delete one AnalysisScore
     *   }
     * })
     * 
     */
    delete<T extends AnalysisScoreDeleteArgs>(args: SelectSubset<T, AnalysisScoreDeleteArgs<ExtArgs>>): Prisma__AnalysisScoreClient<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnalysisScore.
     * @param {AnalysisScoreUpdateArgs} args - Arguments to update one AnalysisScore.
     * @example
     * // Update one AnalysisScore
     * const analysisScore = await prisma.analysisScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalysisScoreUpdateArgs>(args: SelectSubset<T, AnalysisScoreUpdateArgs<ExtArgs>>): Prisma__AnalysisScoreClient<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnalysisScores.
     * @param {AnalysisScoreDeleteManyArgs} args - Arguments to filter AnalysisScores to delete.
     * @example
     * // Delete a few AnalysisScores
     * const { count } = await prisma.analysisScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalysisScoreDeleteManyArgs>(args?: SelectSubset<T, AnalysisScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalysisScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalysisScores
     * const analysisScore = await prisma.analysisScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalysisScoreUpdateManyArgs>(args: SelectSubset<T, AnalysisScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalysisScores and returns the data updated in the database.
     * @param {AnalysisScoreUpdateManyAndReturnArgs} args - Arguments to update many AnalysisScores.
     * @example
     * // Update many AnalysisScores
     * const analysisScore = await prisma.analysisScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnalysisScores and only return the `id`
     * const analysisScoreWithIdOnly = await prisma.analysisScore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalysisScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalysisScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnalysisScore.
     * @param {AnalysisScoreUpsertArgs} args - Arguments to update or create a AnalysisScore.
     * @example
     * // Update or create a AnalysisScore
     * const analysisScore = await prisma.analysisScore.upsert({
     *   create: {
     *     // ... data to create a AnalysisScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalysisScore we want to update
     *   }
     * })
     */
    upsert<T extends AnalysisScoreUpsertArgs>(args: SelectSubset<T, AnalysisScoreUpsertArgs<ExtArgs>>): Prisma__AnalysisScoreClient<$Result.GetResult<Prisma.$AnalysisScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnalysisScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisScoreCountArgs} args - Arguments to filter AnalysisScores to count.
     * @example
     * // Count the number of AnalysisScores
     * const count = await prisma.analysisScore.count({
     *   where: {
     *     // ... the filter for the AnalysisScores we want to count
     *   }
     * })
    **/
    count<T extends AnalysisScoreCountArgs>(
      args?: Subset<T, AnalysisScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalysisScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalysisScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalysisScoreAggregateArgs>(args: Subset<T, AnalysisScoreAggregateArgs>): Prisma.PrismaPromise<GetAnalysisScoreAggregateType<T>>

    /**
     * Group by AnalysisScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalysisScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalysisScoreGroupByArgs['orderBy'] }
        : { orderBy?: AnalysisScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalysisScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalysisScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalysisScore model
   */
  readonly fields: AnalysisScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalysisScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalysisScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    analysis<T extends AnalysisDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnalysisDefaultArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnalysisScore model
   */
  interface AnalysisScoreFieldRefs {
    readonly id: FieldRef<"AnalysisScore", 'String'>
    readonly analysisId: FieldRef<"AnalysisScore", 'String'>
    readonly category: FieldRef<"AnalysisScore", 'String'>
    readonly score: FieldRef<"AnalysisScore", 'Int'>
    readonly confidence: FieldRef<"AnalysisScore", 'Float'>
    readonly evidence: FieldRef<"AnalysisScore", 'String'>
    readonly suggestions: FieldRef<"AnalysisScore", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AnalysisScore findUnique
   */
  export type AnalysisScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisScore to fetch.
     */
    where: AnalysisScoreWhereUniqueInput
  }

  /**
   * AnalysisScore findUniqueOrThrow
   */
  export type AnalysisScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisScore to fetch.
     */
    where: AnalysisScoreWhereUniqueInput
  }

  /**
   * AnalysisScore findFirst
   */
  export type AnalysisScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisScore to fetch.
     */
    where?: AnalysisScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalysisScores to fetch.
     */
    orderBy?: AnalysisScoreOrderByWithRelationInput | AnalysisScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalysisScores.
     */
    cursor?: AnalysisScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalysisScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalysisScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalysisScores.
     */
    distinct?: AnalysisScoreScalarFieldEnum | AnalysisScoreScalarFieldEnum[]
  }

  /**
   * AnalysisScore findFirstOrThrow
   */
  export type AnalysisScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisScore to fetch.
     */
    where?: AnalysisScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalysisScores to fetch.
     */
    orderBy?: AnalysisScoreOrderByWithRelationInput | AnalysisScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalysisScores.
     */
    cursor?: AnalysisScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalysisScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalysisScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalysisScores.
     */
    distinct?: AnalysisScoreScalarFieldEnum | AnalysisScoreScalarFieldEnum[]
  }

  /**
   * AnalysisScore findMany
   */
  export type AnalysisScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    /**
     * Filter, which AnalysisScores to fetch.
     */
    where?: AnalysisScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalysisScores to fetch.
     */
    orderBy?: AnalysisScoreOrderByWithRelationInput | AnalysisScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalysisScores.
     */
    cursor?: AnalysisScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalysisScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalysisScores.
     */
    skip?: number
    distinct?: AnalysisScoreScalarFieldEnum | AnalysisScoreScalarFieldEnum[]
  }

  /**
   * AnalysisScore create
   */
  export type AnalysisScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a AnalysisScore.
     */
    data: XOR<AnalysisScoreCreateInput, AnalysisScoreUncheckedCreateInput>
  }

  /**
   * AnalysisScore createMany
   */
  export type AnalysisScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalysisScores.
     */
    data: AnalysisScoreCreateManyInput | AnalysisScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalysisScore createManyAndReturn
   */
  export type AnalysisScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * The data used to create many AnalysisScores.
     */
    data: AnalysisScoreCreateManyInput | AnalysisScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalysisScore update
   */
  export type AnalysisScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a AnalysisScore.
     */
    data: XOR<AnalysisScoreUpdateInput, AnalysisScoreUncheckedUpdateInput>
    /**
     * Choose, which AnalysisScore to update.
     */
    where: AnalysisScoreWhereUniqueInput
  }

  /**
   * AnalysisScore updateMany
   */
  export type AnalysisScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalysisScores.
     */
    data: XOR<AnalysisScoreUpdateManyMutationInput, AnalysisScoreUncheckedUpdateManyInput>
    /**
     * Filter which AnalysisScores to update
     */
    where?: AnalysisScoreWhereInput
    /**
     * Limit how many AnalysisScores to update.
     */
    limit?: number
  }

  /**
   * AnalysisScore updateManyAndReturn
   */
  export type AnalysisScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * The data used to update AnalysisScores.
     */
    data: XOR<AnalysisScoreUpdateManyMutationInput, AnalysisScoreUncheckedUpdateManyInput>
    /**
     * Filter which AnalysisScores to update
     */
    where?: AnalysisScoreWhereInput
    /**
     * Limit how many AnalysisScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalysisScore upsert
   */
  export type AnalysisScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the AnalysisScore to update in case it exists.
     */
    where: AnalysisScoreWhereUniqueInput
    /**
     * In case the AnalysisScore found by the `where` argument doesn't exist, create a new AnalysisScore with this data.
     */
    create: XOR<AnalysisScoreCreateInput, AnalysisScoreUncheckedCreateInput>
    /**
     * In case the AnalysisScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalysisScoreUpdateInput, AnalysisScoreUncheckedUpdateInput>
  }

  /**
   * AnalysisScore delete
   */
  export type AnalysisScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
    /**
     * Filter which AnalysisScore to delete.
     */
    where: AnalysisScoreWhereUniqueInput
  }

  /**
   * AnalysisScore deleteMany
   */
  export type AnalysisScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalysisScores to delete
     */
    where?: AnalysisScoreWhereInput
    /**
     * Limit how many AnalysisScores to delete.
     */
    limit?: number
  }

  /**
   * AnalysisScore without action
   */
  export type AnalysisScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalysisScore
     */
    select?: AnalysisScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalysisScore
     */
    omit?: AnalysisScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisScoreInclude<ExtArgs> | null
  }


  /**
   * Model RepositoryScore
   */

  export type AggregateRepositoryScore = {
    _count: RepositoryScoreCountAggregateOutputType | null
    _avg: RepositoryScoreAvgAggregateOutputType | null
    _sum: RepositoryScoreSumAggregateOutputType | null
    _min: RepositoryScoreMinAggregateOutputType | null
    _max: RepositoryScoreMaxAggregateOutputType | null
  }

  export type RepositoryScoreAvgAggregateOutputType = {
    qualityScore: number | null
    archScore: number | null
    docScore: number | null
    testScore: number | null
    securityScore: number | null
    maintainScore: number | null
    deployReady: number | null
  }

  export type RepositoryScoreSumAggregateOutputType = {
    qualityScore: number | null
    archScore: number | null
    docScore: number | null
    testScore: number | null
    securityScore: number | null
    maintainScore: number | null
    deployReady: number | null
  }

  export type RepositoryScoreMinAggregateOutputType = {
    id: string | null
    repositoryId: string | null
    analysisId: string | null
    qualityScore: number | null
    archScore: number | null
    docScore: number | null
    testScore: number | null
    securityScore: number | null
    maintainScore: number | null
    deployReady: number | null
    techDebt: string | null
    createdAt: Date | null
  }

  export type RepositoryScoreMaxAggregateOutputType = {
    id: string | null
    repositoryId: string | null
    analysisId: string | null
    qualityScore: number | null
    archScore: number | null
    docScore: number | null
    testScore: number | null
    securityScore: number | null
    maintainScore: number | null
    deployReady: number | null
    techDebt: string | null
    createdAt: Date | null
  }

  export type RepositoryScoreCountAggregateOutputType = {
    id: number
    repositoryId: number
    analysisId: number
    qualityScore: number
    archScore: number
    docScore: number
    testScore: number
    securityScore: number
    maintainScore: number
    deployReady: number
    techDebt: number
    createdAt: number
    _all: number
  }


  export type RepositoryScoreAvgAggregateInputType = {
    qualityScore?: true
    archScore?: true
    docScore?: true
    testScore?: true
    securityScore?: true
    maintainScore?: true
    deployReady?: true
  }

  export type RepositoryScoreSumAggregateInputType = {
    qualityScore?: true
    archScore?: true
    docScore?: true
    testScore?: true
    securityScore?: true
    maintainScore?: true
    deployReady?: true
  }

  export type RepositoryScoreMinAggregateInputType = {
    id?: true
    repositoryId?: true
    analysisId?: true
    qualityScore?: true
    archScore?: true
    docScore?: true
    testScore?: true
    securityScore?: true
    maintainScore?: true
    deployReady?: true
    techDebt?: true
    createdAt?: true
  }

  export type RepositoryScoreMaxAggregateInputType = {
    id?: true
    repositoryId?: true
    analysisId?: true
    qualityScore?: true
    archScore?: true
    docScore?: true
    testScore?: true
    securityScore?: true
    maintainScore?: true
    deployReady?: true
    techDebt?: true
    createdAt?: true
  }

  export type RepositoryScoreCountAggregateInputType = {
    id?: true
    repositoryId?: true
    analysisId?: true
    qualityScore?: true
    archScore?: true
    docScore?: true
    testScore?: true
    securityScore?: true
    maintainScore?: true
    deployReady?: true
    techDebt?: true
    createdAt?: true
    _all?: true
  }

  export type RepositoryScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepositoryScore to aggregate.
     */
    where?: RepositoryScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepositoryScores to fetch.
     */
    orderBy?: RepositoryScoreOrderByWithRelationInput | RepositoryScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RepositoryScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepositoryScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepositoryScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RepositoryScores
    **/
    _count?: true | RepositoryScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RepositoryScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RepositoryScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RepositoryScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RepositoryScoreMaxAggregateInputType
  }

  export type GetRepositoryScoreAggregateType<T extends RepositoryScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateRepositoryScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepositoryScore[P]>
      : GetScalarType<T[P], AggregateRepositoryScore[P]>
  }




  export type RepositoryScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RepositoryScoreWhereInput
    orderBy?: RepositoryScoreOrderByWithAggregationInput | RepositoryScoreOrderByWithAggregationInput[]
    by: RepositoryScoreScalarFieldEnum[] | RepositoryScoreScalarFieldEnum
    having?: RepositoryScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RepositoryScoreCountAggregateInputType | true
    _avg?: RepositoryScoreAvgAggregateInputType
    _sum?: RepositoryScoreSumAggregateInputType
    _min?: RepositoryScoreMinAggregateInputType
    _max?: RepositoryScoreMaxAggregateInputType
  }

  export type RepositoryScoreGroupByOutputType = {
    id: string
    repositoryId: string
    analysisId: string | null
    qualityScore: number | null
    archScore: number | null
    docScore: number | null
    testScore: number | null
    securityScore: number | null
    maintainScore: number | null
    deployReady: number | null
    techDebt: string | null
    createdAt: Date
    _count: RepositoryScoreCountAggregateOutputType | null
    _avg: RepositoryScoreAvgAggregateOutputType | null
    _sum: RepositoryScoreSumAggregateOutputType | null
    _min: RepositoryScoreMinAggregateOutputType | null
    _max: RepositoryScoreMaxAggregateOutputType | null
  }

  type GetRepositoryScoreGroupByPayload<T extends RepositoryScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepositoryScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RepositoryScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepositoryScoreGroupByOutputType[P]>
            : GetScalarType<T[P], RepositoryScoreGroupByOutputType[P]>
        }
      >
    >


  export type RepositoryScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repositoryId?: boolean
    analysisId?: boolean
    qualityScore?: boolean
    archScore?: boolean
    docScore?: boolean
    testScore?: boolean
    securityScore?: boolean
    maintainScore?: boolean
    deployReady?: boolean
    techDebt?: boolean
    createdAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
    analysis?: boolean | RepositoryScore$analysisArgs<ExtArgs>
  }, ExtArgs["result"]["repositoryScore"]>

  export type RepositoryScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repositoryId?: boolean
    analysisId?: boolean
    qualityScore?: boolean
    archScore?: boolean
    docScore?: boolean
    testScore?: boolean
    securityScore?: boolean
    maintainScore?: boolean
    deployReady?: boolean
    techDebt?: boolean
    createdAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
    analysis?: boolean | RepositoryScore$analysisArgs<ExtArgs>
  }, ExtArgs["result"]["repositoryScore"]>

  export type RepositoryScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    repositoryId?: boolean
    analysisId?: boolean
    qualityScore?: boolean
    archScore?: boolean
    docScore?: boolean
    testScore?: boolean
    securityScore?: boolean
    maintainScore?: boolean
    deployReady?: boolean
    techDebt?: boolean
    createdAt?: boolean
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
    analysis?: boolean | RepositoryScore$analysisArgs<ExtArgs>
  }, ExtArgs["result"]["repositoryScore"]>

  export type RepositoryScoreSelectScalar = {
    id?: boolean
    repositoryId?: boolean
    analysisId?: boolean
    qualityScore?: boolean
    archScore?: boolean
    docScore?: boolean
    testScore?: boolean
    securityScore?: boolean
    maintainScore?: boolean
    deployReady?: boolean
    techDebt?: boolean
    createdAt?: boolean
  }

  export type RepositoryScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "repositoryId" | "analysisId" | "qualityScore" | "archScore" | "docScore" | "testScore" | "securityScore" | "maintainScore" | "deployReady" | "techDebt" | "createdAt", ExtArgs["result"]["repositoryScore"]>
  export type RepositoryScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
    analysis?: boolean | RepositoryScore$analysisArgs<ExtArgs>
  }
  export type RepositoryScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
    analysis?: boolean | RepositoryScore$analysisArgs<ExtArgs>
  }
  export type RepositoryScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    repository?: boolean | RepositoryDefaultArgs<ExtArgs>
    analysis?: boolean | RepositoryScore$analysisArgs<ExtArgs>
  }

  export type $RepositoryScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RepositoryScore"
    objects: {
      repository: Prisma.$RepositoryPayload<ExtArgs>
      analysis: Prisma.$AnalysisPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      repositoryId: string
      analysisId: string | null
      qualityScore: number | null
      archScore: number | null
      docScore: number | null
      testScore: number | null
      securityScore: number | null
      maintainScore: number | null
      deployReady: number | null
      techDebt: string | null
      createdAt: Date
    }, ExtArgs["result"]["repositoryScore"]>
    composites: {}
  }

  type RepositoryScoreGetPayload<S extends boolean | null | undefined | RepositoryScoreDefaultArgs> = $Result.GetResult<Prisma.$RepositoryScorePayload, S>

  type RepositoryScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepositoryScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RepositoryScoreCountAggregateInputType | true
    }

  export interface RepositoryScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RepositoryScore'], meta: { name: 'RepositoryScore' } }
    /**
     * Find zero or one RepositoryScore that matches the filter.
     * @param {RepositoryScoreFindUniqueArgs} args - Arguments to find a RepositoryScore
     * @example
     * // Get one RepositoryScore
     * const repositoryScore = await prisma.repositoryScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepositoryScoreFindUniqueArgs>(args: SelectSubset<T, RepositoryScoreFindUniqueArgs<ExtArgs>>): Prisma__RepositoryScoreClient<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RepositoryScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepositoryScoreFindUniqueOrThrowArgs} args - Arguments to find a RepositoryScore
     * @example
     * // Get one RepositoryScore
     * const repositoryScore = await prisma.repositoryScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepositoryScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, RepositoryScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RepositoryScoreClient<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepositoryScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryScoreFindFirstArgs} args - Arguments to find a RepositoryScore
     * @example
     * // Get one RepositoryScore
     * const repositoryScore = await prisma.repositoryScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepositoryScoreFindFirstArgs>(args?: SelectSubset<T, RepositoryScoreFindFirstArgs<ExtArgs>>): Prisma__RepositoryScoreClient<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RepositoryScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryScoreFindFirstOrThrowArgs} args - Arguments to find a RepositoryScore
     * @example
     * // Get one RepositoryScore
     * const repositoryScore = await prisma.repositoryScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepositoryScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, RepositoryScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__RepositoryScoreClient<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RepositoryScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepositoryScores
     * const repositoryScores = await prisma.repositoryScore.findMany()
     * 
     * // Get first 10 RepositoryScores
     * const repositoryScores = await prisma.repositoryScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const repositoryScoreWithIdOnly = await prisma.repositoryScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RepositoryScoreFindManyArgs>(args?: SelectSubset<T, RepositoryScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RepositoryScore.
     * @param {RepositoryScoreCreateArgs} args - Arguments to create a RepositoryScore.
     * @example
     * // Create one RepositoryScore
     * const RepositoryScore = await prisma.repositoryScore.create({
     *   data: {
     *     // ... data to create a RepositoryScore
     *   }
     * })
     * 
     */
    create<T extends RepositoryScoreCreateArgs>(args: SelectSubset<T, RepositoryScoreCreateArgs<ExtArgs>>): Prisma__RepositoryScoreClient<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RepositoryScores.
     * @param {RepositoryScoreCreateManyArgs} args - Arguments to create many RepositoryScores.
     * @example
     * // Create many RepositoryScores
     * const repositoryScore = await prisma.repositoryScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RepositoryScoreCreateManyArgs>(args?: SelectSubset<T, RepositoryScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RepositoryScores and returns the data saved in the database.
     * @param {RepositoryScoreCreateManyAndReturnArgs} args - Arguments to create many RepositoryScores.
     * @example
     * // Create many RepositoryScores
     * const repositoryScore = await prisma.repositoryScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RepositoryScores and only return the `id`
     * const repositoryScoreWithIdOnly = await prisma.repositoryScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RepositoryScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, RepositoryScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RepositoryScore.
     * @param {RepositoryScoreDeleteArgs} args - Arguments to delete one RepositoryScore.
     * @example
     * // Delete one RepositoryScore
     * const RepositoryScore = await prisma.repositoryScore.delete({
     *   where: {
     *     // ... filter to delete one RepositoryScore
     *   }
     * })
     * 
     */
    delete<T extends RepositoryScoreDeleteArgs>(args: SelectSubset<T, RepositoryScoreDeleteArgs<ExtArgs>>): Prisma__RepositoryScoreClient<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RepositoryScore.
     * @param {RepositoryScoreUpdateArgs} args - Arguments to update one RepositoryScore.
     * @example
     * // Update one RepositoryScore
     * const repositoryScore = await prisma.repositoryScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RepositoryScoreUpdateArgs>(args: SelectSubset<T, RepositoryScoreUpdateArgs<ExtArgs>>): Prisma__RepositoryScoreClient<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RepositoryScores.
     * @param {RepositoryScoreDeleteManyArgs} args - Arguments to filter RepositoryScores to delete.
     * @example
     * // Delete a few RepositoryScores
     * const { count } = await prisma.repositoryScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RepositoryScoreDeleteManyArgs>(args?: SelectSubset<T, RepositoryScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepositoryScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepositoryScores
     * const repositoryScore = await prisma.repositoryScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RepositoryScoreUpdateManyArgs>(args: SelectSubset<T, RepositoryScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RepositoryScores and returns the data updated in the database.
     * @param {RepositoryScoreUpdateManyAndReturnArgs} args - Arguments to update many RepositoryScores.
     * @example
     * // Update many RepositoryScores
     * const repositoryScore = await prisma.repositoryScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RepositoryScores and only return the `id`
     * const repositoryScoreWithIdOnly = await prisma.repositoryScore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RepositoryScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, RepositoryScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RepositoryScore.
     * @param {RepositoryScoreUpsertArgs} args - Arguments to update or create a RepositoryScore.
     * @example
     * // Update or create a RepositoryScore
     * const repositoryScore = await prisma.repositoryScore.upsert({
     *   create: {
     *     // ... data to create a RepositoryScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepositoryScore we want to update
     *   }
     * })
     */
    upsert<T extends RepositoryScoreUpsertArgs>(args: SelectSubset<T, RepositoryScoreUpsertArgs<ExtArgs>>): Prisma__RepositoryScoreClient<$Result.GetResult<Prisma.$RepositoryScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RepositoryScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryScoreCountArgs} args - Arguments to filter RepositoryScores to count.
     * @example
     * // Count the number of RepositoryScores
     * const count = await prisma.repositoryScore.count({
     *   where: {
     *     // ... the filter for the RepositoryScores we want to count
     *   }
     * })
    **/
    count<T extends RepositoryScoreCountArgs>(
      args?: Subset<T, RepositoryScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepositoryScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RepositoryScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RepositoryScoreAggregateArgs>(args: Subset<T, RepositoryScoreAggregateArgs>): Prisma.PrismaPromise<GetRepositoryScoreAggregateType<T>>

    /**
     * Group by RepositoryScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RepositoryScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RepositoryScoreGroupByArgs['orderBy'] }
        : { orderBy?: RepositoryScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RepositoryScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRepositoryScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RepositoryScore model
   */
  readonly fields: RepositoryScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepositoryScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepositoryScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    repository<T extends RepositoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryDefaultArgs<ExtArgs>>): Prisma__RepositoryClient<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    analysis<T extends RepositoryScore$analysisArgs<ExtArgs> = {}>(args?: Subset<T, RepositoryScore$analysisArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RepositoryScore model
   */
  interface RepositoryScoreFieldRefs {
    readonly id: FieldRef<"RepositoryScore", 'String'>
    readonly repositoryId: FieldRef<"RepositoryScore", 'String'>
    readonly analysisId: FieldRef<"RepositoryScore", 'String'>
    readonly qualityScore: FieldRef<"RepositoryScore", 'Int'>
    readonly archScore: FieldRef<"RepositoryScore", 'Int'>
    readonly docScore: FieldRef<"RepositoryScore", 'Int'>
    readonly testScore: FieldRef<"RepositoryScore", 'Int'>
    readonly securityScore: FieldRef<"RepositoryScore", 'Int'>
    readonly maintainScore: FieldRef<"RepositoryScore", 'Int'>
    readonly deployReady: FieldRef<"RepositoryScore", 'Float'>
    readonly techDebt: FieldRef<"RepositoryScore", 'String'>
    readonly createdAt: FieldRef<"RepositoryScore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RepositoryScore findUnique
   */
  export type RepositoryScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    /**
     * Filter, which RepositoryScore to fetch.
     */
    where: RepositoryScoreWhereUniqueInput
  }

  /**
   * RepositoryScore findUniqueOrThrow
   */
  export type RepositoryScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    /**
     * Filter, which RepositoryScore to fetch.
     */
    where: RepositoryScoreWhereUniqueInput
  }

  /**
   * RepositoryScore findFirst
   */
  export type RepositoryScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    /**
     * Filter, which RepositoryScore to fetch.
     */
    where?: RepositoryScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepositoryScores to fetch.
     */
    orderBy?: RepositoryScoreOrderByWithRelationInput | RepositoryScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepositoryScores.
     */
    cursor?: RepositoryScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepositoryScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepositoryScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepositoryScores.
     */
    distinct?: RepositoryScoreScalarFieldEnum | RepositoryScoreScalarFieldEnum[]
  }

  /**
   * RepositoryScore findFirstOrThrow
   */
  export type RepositoryScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    /**
     * Filter, which RepositoryScore to fetch.
     */
    where?: RepositoryScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepositoryScores to fetch.
     */
    orderBy?: RepositoryScoreOrderByWithRelationInput | RepositoryScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RepositoryScores.
     */
    cursor?: RepositoryScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepositoryScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepositoryScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RepositoryScores.
     */
    distinct?: RepositoryScoreScalarFieldEnum | RepositoryScoreScalarFieldEnum[]
  }

  /**
   * RepositoryScore findMany
   */
  export type RepositoryScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    /**
     * Filter, which RepositoryScores to fetch.
     */
    where?: RepositoryScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RepositoryScores to fetch.
     */
    orderBy?: RepositoryScoreOrderByWithRelationInput | RepositoryScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RepositoryScores.
     */
    cursor?: RepositoryScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RepositoryScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RepositoryScores.
     */
    skip?: number
    distinct?: RepositoryScoreScalarFieldEnum | RepositoryScoreScalarFieldEnum[]
  }

  /**
   * RepositoryScore create
   */
  export type RepositoryScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a RepositoryScore.
     */
    data: XOR<RepositoryScoreCreateInput, RepositoryScoreUncheckedCreateInput>
  }

  /**
   * RepositoryScore createMany
   */
  export type RepositoryScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RepositoryScores.
     */
    data: RepositoryScoreCreateManyInput | RepositoryScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RepositoryScore createManyAndReturn
   */
  export type RepositoryScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * The data used to create many RepositoryScores.
     */
    data: RepositoryScoreCreateManyInput | RepositoryScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepositoryScore update
   */
  export type RepositoryScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a RepositoryScore.
     */
    data: XOR<RepositoryScoreUpdateInput, RepositoryScoreUncheckedUpdateInput>
    /**
     * Choose, which RepositoryScore to update.
     */
    where: RepositoryScoreWhereUniqueInput
  }

  /**
   * RepositoryScore updateMany
   */
  export type RepositoryScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RepositoryScores.
     */
    data: XOR<RepositoryScoreUpdateManyMutationInput, RepositoryScoreUncheckedUpdateManyInput>
    /**
     * Filter which RepositoryScores to update
     */
    where?: RepositoryScoreWhereInput
    /**
     * Limit how many RepositoryScores to update.
     */
    limit?: number
  }

  /**
   * RepositoryScore updateManyAndReturn
   */
  export type RepositoryScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * The data used to update RepositoryScores.
     */
    data: XOR<RepositoryScoreUpdateManyMutationInput, RepositoryScoreUncheckedUpdateManyInput>
    /**
     * Filter which RepositoryScores to update
     */
    where?: RepositoryScoreWhereInput
    /**
     * Limit how many RepositoryScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RepositoryScore upsert
   */
  export type RepositoryScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the RepositoryScore to update in case it exists.
     */
    where: RepositoryScoreWhereUniqueInput
    /**
     * In case the RepositoryScore found by the `where` argument doesn't exist, create a new RepositoryScore with this data.
     */
    create: XOR<RepositoryScoreCreateInput, RepositoryScoreUncheckedCreateInput>
    /**
     * In case the RepositoryScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepositoryScoreUpdateInput, RepositoryScoreUncheckedUpdateInput>
  }

  /**
   * RepositoryScore delete
   */
  export type RepositoryScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
    /**
     * Filter which RepositoryScore to delete.
     */
    where: RepositoryScoreWhereUniqueInput
  }

  /**
   * RepositoryScore deleteMany
   */
  export type RepositoryScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RepositoryScores to delete
     */
    where?: RepositoryScoreWhereInput
    /**
     * Limit how many RepositoryScores to delete.
     */
    limit?: number
  }

  /**
   * RepositoryScore.analysis
   */
  export type RepositoryScore$analysisArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    where?: AnalysisWhereInput
  }

  /**
   * RepositoryScore without action
   */
  export type RepositoryScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepositoryScore
     */
    select?: RepositoryScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RepositoryScore
     */
    omit?: RepositoryScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryScoreInclude<ExtArgs> | null
  }


  /**
   * Model AiConversation
   */

  export type AggregateAiConversation = {
    _count: AiConversationCountAggregateOutputType | null
    _min: AiConversationMinAggregateOutputType | null
    _max: AiConversationMaxAggregateOutputType | null
  }

  export type AiConversationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiConversationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiConversationCountAggregateOutputType = {
    id: number
    userId: number
    messages: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AiConversationMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiConversationMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiConversationCountAggregateInputType = {
    id?: true
    userId?: true
    messages?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AiConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiConversation to aggregate.
     */
    where?: AiConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConversations to fetch.
     */
    orderBy?: AiConversationOrderByWithRelationInput | AiConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiConversations
    **/
    _count?: true | AiConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiConversationMaxAggregateInputType
  }

  export type GetAiConversationAggregateType<T extends AiConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateAiConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiConversation[P]>
      : GetScalarType<T[P], AggregateAiConversation[P]>
  }




  export type AiConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiConversationWhereInput
    orderBy?: AiConversationOrderByWithAggregationInput | AiConversationOrderByWithAggregationInput[]
    by: AiConversationScalarFieldEnum[] | AiConversationScalarFieldEnum
    having?: AiConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiConversationCountAggregateInputType | true
    _min?: AiConversationMinAggregateInputType
    _max?: AiConversationMaxAggregateInputType
  }

  export type AiConversationGroupByOutputType = {
    id: string
    userId: string
    messages: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: AiConversationCountAggregateOutputType | null
    _min: AiConversationMinAggregateOutputType | null
    _max: AiConversationMaxAggregateOutputType | null
  }

  type GetAiConversationGroupByPayload<T extends AiConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiConversationGroupByOutputType[P]>
            : GetScalarType<T[P], AiConversationGroupByOutputType[P]>
        }
      >
    >


  export type AiConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    messages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiConversation"]>

  export type AiConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    messages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiConversation"]>

  export type AiConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    messages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiConversation"]>

  export type AiConversationSelectScalar = {
    id?: boolean
    userId?: boolean
    messages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AiConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "messages" | "createdAt" | "updatedAt", ExtArgs["result"]["aiConversation"]>
  export type AiConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AiConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AiConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AiConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiConversation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      messages: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aiConversation"]>
    composites: {}
  }

  type AiConversationGetPayload<S extends boolean | null | undefined | AiConversationDefaultArgs> = $Result.GetResult<Prisma.$AiConversationPayload, S>

  type AiConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiConversationCountAggregateInputType | true
    }

  export interface AiConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiConversation'], meta: { name: 'AiConversation' } }
    /**
     * Find zero or one AiConversation that matches the filter.
     * @param {AiConversationFindUniqueArgs} args - Arguments to find a AiConversation
     * @example
     * // Get one AiConversation
     * const aiConversation = await prisma.aiConversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiConversationFindUniqueArgs>(args: SelectSubset<T, AiConversationFindUniqueArgs<ExtArgs>>): Prisma__AiConversationClient<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiConversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiConversationFindUniqueOrThrowArgs} args - Arguments to find a AiConversation
     * @example
     * // Get one AiConversation
     * const aiConversation = await prisma.aiConversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, AiConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiConversationClient<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiConversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConversationFindFirstArgs} args - Arguments to find a AiConversation
     * @example
     * // Get one AiConversation
     * const aiConversation = await prisma.aiConversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiConversationFindFirstArgs>(args?: SelectSubset<T, AiConversationFindFirstArgs<ExtArgs>>): Prisma__AiConversationClient<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiConversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConversationFindFirstOrThrowArgs} args - Arguments to find a AiConversation
     * @example
     * // Get one AiConversation
     * const aiConversation = await prisma.aiConversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, AiConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiConversationClient<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiConversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiConversations
     * const aiConversations = await prisma.aiConversation.findMany()
     * 
     * // Get first 10 AiConversations
     * const aiConversations = await prisma.aiConversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiConversationWithIdOnly = await prisma.aiConversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiConversationFindManyArgs>(args?: SelectSubset<T, AiConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiConversation.
     * @param {AiConversationCreateArgs} args - Arguments to create a AiConversation.
     * @example
     * // Create one AiConversation
     * const AiConversation = await prisma.aiConversation.create({
     *   data: {
     *     // ... data to create a AiConversation
     *   }
     * })
     * 
     */
    create<T extends AiConversationCreateArgs>(args: SelectSubset<T, AiConversationCreateArgs<ExtArgs>>): Prisma__AiConversationClient<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiConversations.
     * @param {AiConversationCreateManyArgs} args - Arguments to create many AiConversations.
     * @example
     * // Create many AiConversations
     * const aiConversation = await prisma.aiConversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiConversationCreateManyArgs>(args?: SelectSubset<T, AiConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiConversations and returns the data saved in the database.
     * @param {AiConversationCreateManyAndReturnArgs} args - Arguments to create many AiConversations.
     * @example
     * // Create many AiConversations
     * const aiConversation = await prisma.aiConversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiConversations and only return the `id`
     * const aiConversationWithIdOnly = await prisma.aiConversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, AiConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiConversation.
     * @param {AiConversationDeleteArgs} args - Arguments to delete one AiConversation.
     * @example
     * // Delete one AiConversation
     * const AiConversation = await prisma.aiConversation.delete({
     *   where: {
     *     // ... filter to delete one AiConversation
     *   }
     * })
     * 
     */
    delete<T extends AiConversationDeleteArgs>(args: SelectSubset<T, AiConversationDeleteArgs<ExtArgs>>): Prisma__AiConversationClient<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiConversation.
     * @param {AiConversationUpdateArgs} args - Arguments to update one AiConversation.
     * @example
     * // Update one AiConversation
     * const aiConversation = await prisma.aiConversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiConversationUpdateArgs>(args: SelectSubset<T, AiConversationUpdateArgs<ExtArgs>>): Prisma__AiConversationClient<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiConversations.
     * @param {AiConversationDeleteManyArgs} args - Arguments to filter AiConversations to delete.
     * @example
     * // Delete a few AiConversations
     * const { count } = await prisma.aiConversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiConversationDeleteManyArgs>(args?: SelectSubset<T, AiConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiConversations
     * const aiConversation = await prisma.aiConversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiConversationUpdateManyArgs>(args: SelectSubset<T, AiConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiConversations and returns the data updated in the database.
     * @param {AiConversationUpdateManyAndReturnArgs} args - Arguments to update many AiConversations.
     * @example
     * // Update many AiConversations
     * const aiConversation = await prisma.aiConversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiConversations and only return the `id`
     * const aiConversationWithIdOnly = await prisma.aiConversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AiConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, AiConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiConversation.
     * @param {AiConversationUpsertArgs} args - Arguments to update or create a AiConversation.
     * @example
     * // Update or create a AiConversation
     * const aiConversation = await prisma.aiConversation.upsert({
     *   create: {
     *     // ... data to create a AiConversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiConversation we want to update
     *   }
     * })
     */
    upsert<T extends AiConversationUpsertArgs>(args: SelectSubset<T, AiConversationUpsertArgs<ExtArgs>>): Prisma__AiConversationClient<$Result.GetResult<Prisma.$AiConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiConversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConversationCountArgs} args - Arguments to filter AiConversations to count.
     * @example
     * // Count the number of AiConversations
     * const count = await prisma.aiConversation.count({
     *   where: {
     *     // ... the filter for the AiConversations we want to count
     *   }
     * })
    **/
    count<T extends AiConversationCountArgs>(
      args?: Subset<T, AiConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiConversationAggregateArgs>(args: Subset<T, AiConversationAggregateArgs>): Prisma.PrismaPromise<GetAiConversationAggregateType<T>>

    /**
     * Group by AiConversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiConversationGroupByArgs['orderBy'] }
        : { orderBy?: AiConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiConversation model
   */
  readonly fields: AiConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiConversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiConversation model
   */
  interface AiConversationFieldRefs {
    readonly id: FieldRef<"AiConversation", 'String'>
    readonly userId: FieldRef<"AiConversation", 'String'>
    readonly messages: FieldRef<"AiConversation", 'Json'>
    readonly createdAt: FieldRef<"AiConversation", 'DateTime'>
    readonly updatedAt: FieldRef<"AiConversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiConversation findUnique
   */
  export type AiConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    /**
     * Filter, which AiConversation to fetch.
     */
    where: AiConversationWhereUniqueInput
  }

  /**
   * AiConversation findUniqueOrThrow
   */
  export type AiConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    /**
     * Filter, which AiConversation to fetch.
     */
    where: AiConversationWhereUniqueInput
  }

  /**
   * AiConversation findFirst
   */
  export type AiConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    /**
     * Filter, which AiConversation to fetch.
     */
    where?: AiConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConversations to fetch.
     */
    orderBy?: AiConversationOrderByWithRelationInput | AiConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiConversations.
     */
    cursor?: AiConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiConversations.
     */
    distinct?: AiConversationScalarFieldEnum | AiConversationScalarFieldEnum[]
  }

  /**
   * AiConversation findFirstOrThrow
   */
  export type AiConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    /**
     * Filter, which AiConversation to fetch.
     */
    where?: AiConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConversations to fetch.
     */
    orderBy?: AiConversationOrderByWithRelationInput | AiConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiConversations.
     */
    cursor?: AiConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiConversations.
     */
    distinct?: AiConversationScalarFieldEnum | AiConversationScalarFieldEnum[]
  }

  /**
   * AiConversation findMany
   */
  export type AiConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    /**
     * Filter, which AiConversations to fetch.
     */
    where?: AiConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiConversations to fetch.
     */
    orderBy?: AiConversationOrderByWithRelationInput | AiConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiConversations.
     */
    cursor?: AiConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiConversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiConversations.
     */
    skip?: number
    distinct?: AiConversationScalarFieldEnum | AiConversationScalarFieldEnum[]
  }

  /**
   * AiConversation create
   */
  export type AiConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a AiConversation.
     */
    data: XOR<AiConversationCreateInput, AiConversationUncheckedCreateInput>
  }

  /**
   * AiConversation createMany
   */
  export type AiConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiConversations.
     */
    data: AiConversationCreateManyInput | AiConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiConversation createManyAndReturn
   */
  export type AiConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * The data used to create many AiConversations.
     */
    data: AiConversationCreateManyInput | AiConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiConversation update
   */
  export type AiConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a AiConversation.
     */
    data: XOR<AiConversationUpdateInput, AiConversationUncheckedUpdateInput>
    /**
     * Choose, which AiConversation to update.
     */
    where: AiConversationWhereUniqueInput
  }

  /**
   * AiConversation updateMany
   */
  export type AiConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiConversations.
     */
    data: XOR<AiConversationUpdateManyMutationInput, AiConversationUncheckedUpdateManyInput>
    /**
     * Filter which AiConversations to update
     */
    where?: AiConversationWhereInput
    /**
     * Limit how many AiConversations to update.
     */
    limit?: number
  }

  /**
   * AiConversation updateManyAndReturn
   */
  export type AiConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * The data used to update AiConversations.
     */
    data: XOR<AiConversationUpdateManyMutationInput, AiConversationUncheckedUpdateManyInput>
    /**
     * Filter which AiConversations to update
     */
    where?: AiConversationWhereInput
    /**
     * Limit how many AiConversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiConversation upsert
   */
  export type AiConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the AiConversation to update in case it exists.
     */
    where: AiConversationWhereUniqueInput
    /**
     * In case the AiConversation found by the `where` argument doesn't exist, create a new AiConversation with this data.
     */
    create: XOR<AiConversationCreateInput, AiConversationUncheckedCreateInput>
    /**
     * In case the AiConversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiConversationUpdateInput, AiConversationUncheckedUpdateInput>
  }

  /**
   * AiConversation delete
   */
  export type AiConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
    /**
     * Filter which AiConversation to delete.
     */
    where: AiConversationWhereUniqueInput
  }

  /**
   * AiConversation deleteMany
   */
  export type AiConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiConversations to delete
     */
    where?: AiConversationWhereInput
    /**
     * Limit how many AiConversations to delete.
     */
    limit?: number
  }

  /**
   * AiConversation without action
   */
  export type AiConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiConversation
     */
    select?: AiConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiConversation
     */
    omit?: AiConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiConversationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const GithubProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    githubId: 'githubId',
    login: 'login',
    displayName: 'displayName',
    bio: 'bio',
    avatarUrl: 'avatarUrl',
    blog: 'blog',
    location: 'location',
    company: 'company',
    publicRepos: 'publicRepos',
    publicGists: 'publicGists',
    followers: 'followers',
    following: 'following',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastSyncedAt: 'lastSyncedAt',
    shareCount: 'shareCount',
    viewCount: 'viewCount'
  };

  export type GithubProfileScalarFieldEnum = (typeof GithubProfileScalarFieldEnum)[keyof typeof GithubProfileScalarFieldEnum]


  export const RepositoryScalarFieldEnum: {
    id: 'id',
    githubId: 'githubId',
    profileId: 'profileId',
    name: 'name',
    fullName: 'fullName',
    description: 'description',
    htmlUrl: 'htmlUrl',
    homepage: 'homepage',
    language: 'language',
    stargazersCount: 'stargazersCount',
    forksCount: 'forksCount',
    openIssuesCount: 'openIssuesCount',
    watchersCount: 'watchersCount',
    size: 'size',
    defaultBranch: 'defaultBranch',
    isPrivate: 'isPrivate',
    isFork: 'isFork',
    topics: 'topics',
    license: 'license',
    hasReadme: 'hasReadme',
    hasIssues: 'hasIssues',
    hasWiki: 'hasWiki',
    hasPages: 'hasPages',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastPushedAt: 'lastPushedAt'
  };

  export type RepositoryScalarFieldEnum = (typeof RepositoryScalarFieldEnum)[keyof typeof RepositoryScalarFieldEnum]


  export const AnalysisScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    overallScore: 'overallScore',
    engineerLevel: 'engineerLevel',
    confidenceScore: 'confidenceScore',
    strengths: 'strengths',
    gaps: 'gaps',
    summary: 'summary',
    costCents: 'costCents',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt'
  };

  export type AnalysisScalarFieldEnum = (typeof AnalysisScalarFieldEnum)[keyof typeof AnalysisScalarFieldEnum]


  export const AnalysisScoreScalarFieldEnum: {
    id: 'id',
    analysisId: 'analysisId',
    category: 'category',
    score: 'score',
    confidence: 'confidence',
    evidence: 'evidence',
    suggestions: 'suggestions'
  };

  export type AnalysisScoreScalarFieldEnum = (typeof AnalysisScoreScalarFieldEnum)[keyof typeof AnalysisScoreScalarFieldEnum]


  export const RepositoryScoreScalarFieldEnum: {
    id: 'id',
    repositoryId: 'repositoryId',
    analysisId: 'analysisId',
    qualityScore: 'qualityScore',
    archScore: 'archScore',
    docScore: 'docScore',
    testScore: 'testScore',
    securityScore: 'securityScore',
    maintainScore: 'maintainScore',
    deployReady: 'deployReady',
    techDebt: 'techDebt',
    createdAt: 'createdAt'
  };

  export type RepositoryScoreScalarFieldEnum = (typeof RepositoryScoreScalarFieldEnum)[keyof typeof RepositoryScoreScalarFieldEnum]


  export const AiConversationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    messages: 'messages',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AiConversationScalarFieldEnum = (typeof AiConversationScalarFieldEnum)[keyof typeof AiConversationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    githubProfile?: XOR<GithubProfileNullableScalarRelationFilter, GithubProfileWhereInput> | null
    analyses?: AnalysisListRelationFilter
    conversations?: AiConversationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    githubProfile?: GithubProfileOrderByWithRelationInput
    analyses?: AnalysisOrderByRelationAggregateInput
    conversations?: AiConversationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    githubProfile?: XOR<GithubProfileNullableScalarRelationFilter, GithubProfileWhereInput> | null
    analyses?: AnalysisListRelationFilter
    conversations?: AiConversationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    providerId_accountId?: AccountProviderIdAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "providerId_accountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
  }

  export type GithubProfileWhereInput = {
    AND?: GithubProfileWhereInput | GithubProfileWhereInput[]
    OR?: GithubProfileWhereInput[]
    NOT?: GithubProfileWhereInput | GithubProfileWhereInput[]
    id?: StringFilter<"GithubProfile"> | string
    userId?: StringFilter<"GithubProfile"> | string
    githubId?: IntFilter<"GithubProfile"> | number
    login?: StringFilter<"GithubProfile"> | string
    displayName?: StringNullableFilter<"GithubProfile"> | string | null
    bio?: StringNullableFilter<"GithubProfile"> | string | null
    avatarUrl?: StringNullableFilter<"GithubProfile"> | string | null
    blog?: StringNullableFilter<"GithubProfile"> | string | null
    location?: StringNullableFilter<"GithubProfile"> | string | null
    company?: StringNullableFilter<"GithubProfile"> | string | null
    publicRepos?: IntFilter<"GithubProfile"> | number
    publicGists?: IntFilter<"GithubProfile"> | number
    followers?: IntFilter<"GithubProfile"> | number
    following?: IntFilter<"GithubProfile"> | number
    createdAt?: DateTimeFilter<"GithubProfile"> | Date | string
    updatedAt?: DateTimeFilter<"GithubProfile"> | Date | string
    lastSyncedAt?: DateTimeNullableFilter<"GithubProfile"> | Date | string | null
    shareCount?: IntFilter<"GithubProfile"> | number
    viewCount?: IntFilter<"GithubProfile"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    repositories?: RepositoryListRelationFilter
  }

  export type GithubProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    displayName?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    blog?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    shareCount?: SortOrder
    viewCount?: SortOrder
    user?: UserOrderByWithRelationInput
    repositories?: RepositoryOrderByRelationAggregateInput
  }

  export type GithubProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    githubId?: number
    AND?: GithubProfileWhereInput | GithubProfileWhereInput[]
    OR?: GithubProfileWhereInput[]
    NOT?: GithubProfileWhereInput | GithubProfileWhereInput[]
    login?: StringFilter<"GithubProfile"> | string
    displayName?: StringNullableFilter<"GithubProfile"> | string | null
    bio?: StringNullableFilter<"GithubProfile"> | string | null
    avatarUrl?: StringNullableFilter<"GithubProfile"> | string | null
    blog?: StringNullableFilter<"GithubProfile"> | string | null
    location?: StringNullableFilter<"GithubProfile"> | string | null
    company?: StringNullableFilter<"GithubProfile"> | string | null
    publicRepos?: IntFilter<"GithubProfile"> | number
    publicGists?: IntFilter<"GithubProfile"> | number
    followers?: IntFilter<"GithubProfile"> | number
    following?: IntFilter<"GithubProfile"> | number
    createdAt?: DateTimeFilter<"GithubProfile"> | Date | string
    updatedAt?: DateTimeFilter<"GithubProfile"> | Date | string
    lastSyncedAt?: DateTimeNullableFilter<"GithubProfile"> | Date | string | null
    shareCount?: IntFilter<"GithubProfile"> | number
    viewCount?: IntFilter<"GithubProfile"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    repositories?: RepositoryListRelationFilter
  }, "id" | "userId" | "githubId">

  export type GithubProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    displayName?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    blog?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrderInput | SortOrder
    shareCount?: SortOrder
    viewCount?: SortOrder
    _count?: GithubProfileCountOrderByAggregateInput
    _avg?: GithubProfileAvgOrderByAggregateInput
    _max?: GithubProfileMaxOrderByAggregateInput
    _min?: GithubProfileMinOrderByAggregateInput
    _sum?: GithubProfileSumOrderByAggregateInput
  }

  export type GithubProfileScalarWhereWithAggregatesInput = {
    AND?: GithubProfileScalarWhereWithAggregatesInput | GithubProfileScalarWhereWithAggregatesInput[]
    OR?: GithubProfileScalarWhereWithAggregatesInput[]
    NOT?: GithubProfileScalarWhereWithAggregatesInput | GithubProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GithubProfile"> | string
    userId?: StringWithAggregatesFilter<"GithubProfile"> | string
    githubId?: IntWithAggregatesFilter<"GithubProfile"> | number
    login?: StringWithAggregatesFilter<"GithubProfile"> | string
    displayName?: StringNullableWithAggregatesFilter<"GithubProfile"> | string | null
    bio?: StringNullableWithAggregatesFilter<"GithubProfile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"GithubProfile"> | string | null
    blog?: StringNullableWithAggregatesFilter<"GithubProfile"> | string | null
    location?: StringNullableWithAggregatesFilter<"GithubProfile"> | string | null
    company?: StringNullableWithAggregatesFilter<"GithubProfile"> | string | null
    publicRepos?: IntWithAggregatesFilter<"GithubProfile"> | number
    publicGists?: IntWithAggregatesFilter<"GithubProfile"> | number
    followers?: IntWithAggregatesFilter<"GithubProfile"> | number
    following?: IntWithAggregatesFilter<"GithubProfile"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GithubProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GithubProfile"> | Date | string
    lastSyncedAt?: DateTimeNullableWithAggregatesFilter<"GithubProfile"> | Date | string | null
    shareCount?: IntWithAggregatesFilter<"GithubProfile"> | number
    viewCount?: IntWithAggregatesFilter<"GithubProfile"> | number
  }

  export type RepositoryWhereInput = {
    AND?: RepositoryWhereInput | RepositoryWhereInput[]
    OR?: RepositoryWhereInput[]
    NOT?: RepositoryWhereInput | RepositoryWhereInput[]
    id?: StringFilter<"Repository"> | string
    githubId?: IntFilter<"Repository"> | number
    profileId?: StringFilter<"Repository"> | string
    name?: StringFilter<"Repository"> | string
    fullName?: StringFilter<"Repository"> | string
    description?: StringNullableFilter<"Repository"> | string | null
    htmlUrl?: StringFilter<"Repository"> | string
    homepage?: StringNullableFilter<"Repository"> | string | null
    language?: StringNullableFilter<"Repository"> | string | null
    stargazersCount?: IntFilter<"Repository"> | number
    forksCount?: IntFilter<"Repository"> | number
    openIssuesCount?: IntFilter<"Repository"> | number
    watchersCount?: IntFilter<"Repository"> | number
    size?: IntFilter<"Repository"> | number
    defaultBranch?: StringFilter<"Repository"> | string
    isPrivate?: BoolFilter<"Repository"> | boolean
    isFork?: BoolFilter<"Repository"> | boolean
    topics?: StringNullableListFilter<"Repository">
    license?: StringNullableFilter<"Repository"> | string | null
    hasReadme?: BoolFilter<"Repository"> | boolean
    hasIssues?: BoolFilter<"Repository"> | boolean
    hasWiki?: BoolFilter<"Repository"> | boolean
    hasPages?: BoolFilter<"Repository"> | boolean
    createdAt?: DateTimeFilter<"Repository"> | Date | string
    updatedAt?: DateTimeFilter<"Repository"> | Date | string
    lastPushedAt?: DateTimeNullableFilter<"Repository"> | Date | string | null
    profile?: XOR<GithubProfileScalarRelationFilter, GithubProfileWhereInput>
    repoScores?: RepositoryScoreListRelationFilter
    analyses?: AnalysisListRelationFilter
  }

  export type RepositoryOrderByWithRelationInput = {
    id?: SortOrder
    githubId?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    description?: SortOrderInput | SortOrder
    htmlUrl?: SortOrder
    homepage?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    watchersCount?: SortOrder
    size?: SortOrder
    defaultBranch?: SortOrder
    isPrivate?: SortOrder
    isFork?: SortOrder
    topics?: SortOrder
    license?: SortOrderInput | SortOrder
    hasReadme?: SortOrder
    hasIssues?: SortOrder
    hasWiki?: SortOrder
    hasPages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastPushedAt?: SortOrderInput | SortOrder
    profile?: GithubProfileOrderByWithRelationInput
    repoScores?: RepositoryScoreOrderByRelationAggregateInput
    analyses?: AnalysisOrderByRelationAggregateInput
  }

  export type RepositoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    githubId?: number
    AND?: RepositoryWhereInput | RepositoryWhereInput[]
    OR?: RepositoryWhereInput[]
    NOT?: RepositoryWhereInput | RepositoryWhereInput[]
    profileId?: StringFilter<"Repository"> | string
    name?: StringFilter<"Repository"> | string
    fullName?: StringFilter<"Repository"> | string
    description?: StringNullableFilter<"Repository"> | string | null
    htmlUrl?: StringFilter<"Repository"> | string
    homepage?: StringNullableFilter<"Repository"> | string | null
    language?: StringNullableFilter<"Repository"> | string | null
    stargazersCount?: IntFilter<"Repository"> | number
    forksCount?: IntFilter<"Repository"> | number
    openIssuesCount?: IntFilter<"Repository"> | number
    watchersCount?: IntFilter<"Repository"> | number
    size?: IntFilter<"Repository"> | number
    defaultBranch?: StringFilter<"Repository"> | string
    isPrivate?: BoolFilter<"Repository"> | boolean
    isFork?: BoolFilter<"Repository"> | boolean
    topics?: StringNullableListFilter<"Repository">
    license?: StringNullableFilter<"Repository"> | string | null
    hasReadme?: BoolFilter<"Repository"> | boolean
    hasIssues?: BoolFilter<"Repository"> | boolean
    hasWiki?: BoolFilter<"Repository"> | boolean
    hasPages?: BoolFilter<"Repository"> | boolean
    createdAt?: DateTimeFilter<"Repository"> | Date | string
    updatedAt?: DateTimeFilter<"Repository"> | Date | string
    lastPushedAt?: DateTimeNullableFilter<"Repository"> | Date | string | null
    profile?: XOR<GithubProfileScalarRelationFilter, GithubProfileWhereInput>
    repoScores?: RepositoryScoreListRelationFilter
    analyses?: AnalysisListRelationFilter
  }, "id" | "githubId">

  export type RepositoryOrderByWithAggregationInput = {
    id?: SortOrder
    githubId?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    description?: SortOrderInput | SortOrder
    htmlUrl?: SortOrder
    homepage?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    watchersCount?: SortOrder
    size?: SortOrder
    defaultBranch?: SortOrder
    isPrivate?: SortOrder
    isFork?: SortOrder
    topics?: SortOrder
    license?: SortOrderInput | SortOrder
    hasReadme?: SortOrder
    hasIssues?: SortOrder
    hasWiki?: SortOrder
    hasPages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastPushedAt?: SortOrderInput | SortOrder
    _count?: RepositoryCountOrderByAggregateInput
    _avg?: RepositoryAvgOrderByAggregateInput
    _max?: RepositoryMaxOrderByAggregateInput
    _min?: RepositoryMinOrderByAggregateInput
    _sum?: RepositorySumOrderByAggregateInput
  }

  export type RepositoryScalarWhereWithAggregatesInput = {
    AND?: RepositoryScalarWhereWithAggregatesInput | RepositoryScalarWhereWithAggregatesInput[]
    OR?: RepositoryScalarWhereWithAggregatesInput[]
    NOT?: RepositoryScalarWhereWithAggregatesInput | RepositoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Repository"> | string
    githubId?: IntWithAggregatesFilter<"Repository"> | number
    profileId?: StringWithAggregatesFilter<"Repository"> | string
    name?: StringWithAggregatesFilter<"Repository"> | string
    fullName?: StringWithAggregatesFilter<"Repository"> | string
    description?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    htmlUrl?: StringWithAggregatesFilter<"Repository"> | string
    homepage?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    language?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    stargazersCount?: IntWithAggregatesFilter<"Repository"> | number
    forksCount?: IntWithAggregatesFilter<"Repository"> | number
    openIssuesCount?: IntWithAggregatesFilter<"Repository"> | number
    watchersCount?: IntWithAggregatesFilter<"Repository"> | number
    size?: IntWithAggregatesFilter<"Repository"> | number
    defaultBranch?: StringWithAggregatesFilter<"Repository"> | string
    isPrivate?: BoolWithAggregatesFilter<"Repository"> | boolean
    isFork?: BoolWithAggregatesFilter<"Repository"> | boolean
    topics?: StringNullableListFilter<"Repository">
    license?: StringNullableWithAggregatesFilter<"Repository"> | string | null
    hasReadme?: BoolWithAggregatesFilter<"Repository"> | boolean
    hasIssues?: BoolWithAggregatesFilter<"Repository"> | boolean
    hasWiki?: BoolWithAggregatesFilter<"Repository"> | boolean
    hasPages?: BoolWithAggregatesFilter<"Repository"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Repository"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Repository"> | Date | string
    lastPushedAt?: DateTimeNullableWithAggregatesFilter<"Repository"> | Date | string | null
  }

  export type AnalysisWhereInput = {
    AND?: AnalysisWhereInput | AnalysisWhereInput[]
    OR?: AnalysisWhereInput[]
    NOT?: AnalysisWhereInput | AnalysisWhereInput[]
    id?: StringFilter<"Analysis"> | string
    userId?: StringFilter<"Analysis"> | string
    status?: StringFilter<"Analysis"> | string
    overallScore?: IntNullableFilter<"Analysis"> | number | null
    engineerLevel?: StringNullableFilter<"Analysis"> | string | null
    confidenceScore?: FloatNullableFilter<"Analysis"> | number | null
    strengths?: StringNullableListFilter<"Analysis">
    gaps?: StringNullableListFilter<"Analysis">
    summary?: StringNullableFilter<"Analysis"> | string | null
    costCents?: IntFilter<"Analysis"> | number
    createdAt?: DateTimeFilter<"Analysis"> | Date | string
    updatedAt?: DateTimeFilter<"Analysis"> | Date | string
    completedAt?: DateTimeNullableFilter<"Analysis"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    scores?: AnalysisScoreListRelationFilter
    repositories?: RepositoryListRelationFilter
    repoScores?: RepositoryScoreListRelationFilter
  }

  export type AnalysisOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    overallScore?: SortOrderInput | SortOrder
    engineerLevel?: SortOrderInput | SortOrder
    confidenceScore?: SortOrderInput | SortOrder
    strengths?: SortOrder
    gaps?: SortOrder
    summary?: SortOrderInput | SortOrder
    costCents?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    scores?: AnalysisScoreOrderByRelationAggregateInput
    repositories?: RepositoryOrderByRelationAggregateInput
    repoScores?: RepositoryScoreOrderByRelationAggregateInput
  }

  export type AnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalysisWhereInput | AnalysisWhereInput[]
    OR?: AnalysisWhereInput[]
    NOT?: AnalysisWhereInput | AnalysisWhereInput[]
    userId?: StringFilter<"Analysis"> | string
    status?: StringFilter<"Analysis"> | string
    overallScore?: IntNullableFilter<"Analysis"> | number | null
    engineerLevel?: StringNullableFilter<"Analysis"> | string | null
    confidenceScore?: FloatNullableFilter<"Analysis"> | number | null
    strengths?: StringNullableListFilter<"Analysis">
    gaps?: StringNullableListFilter<"Analysis">
    summary?: StringNullableFilter<"Analysis"> | string | null
    costCents?: IntFilter<"Analysis"> | number
    createdAt?: DateTimeFilter<"Analysis"> | Date | string
    updatedAt?: DateTimeFilter<"Analysis"> | Date | string
    completedAt?: DateTimeNullableFilter<"Analysis"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    scores?: AnalysisScoreListRelationFilter
    repositories?: RepositoryListRelationFilter
    repoScores?: RepositoryScoreListRelationFilter
  }, "id">

  export type AnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    overallScore?: SortOrderInput | SortOrder
    engineerLevel?: SortOrderInput | SortOrder
    confidenceScore?: SortOrderInput | SortOrder
    strengths?: SortOrder
    gaps?: SortOrder
    summary?: SortOrderInput | SortOrder
    costCents?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: AnalysisCountOrderByAggregateInput
    _avg?: AnalysisAvgOrderByAggregateInput
    _max?: AnalysisMaxOrderByAggregateInput
    _min?: AnalysisMinOrderByAggregateInput
    _sum?: AnalysisSumOrderByAggregateInput
  }

  export type AnalysisScalarWhereWithAggregatesInput = {
    AND?: AnalysisScalarWhereWithAggregatesInput | AnalysisScalarWhereWithAggregatesInput[]
    OR?: AnalysisScalarWhereWithAggregatesInput[]
    NOT?: AnalysisScalarWhereWithAggregatesInput | AnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Analysis"> | string
    userId?: StringWithAggregatesFilter<"Analysis"> | string
    status?: StringWithAggregatesFilter<"Analysis"> | string
    overallScore?: IntNullableWithAggregatesFilter<"Analysis"> | number | null
    engineerLevel?: StringNullableWithAggregatesFilter<"Analysis"> | string | null
    confidenceScore?: FloatNullableWithAggregatesFilter<"Analysis"> | number | null
    strengths?: StringNullableListFilter<"Analysis">
    gaps?: StringNullableListFilter<"Analysis">
    summary?: StringNullableWithAggregatesFilter<"Analysis"> | string | null
    costCents?: IntWithAggregatesFilter<"Analysis"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Analysis"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Analysis"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Analysis"> | Date | string | null
  }

  export type AnalysisScoreWhereInput = {
    AND?: AnalysisScoreWhereInput | AnalysisScoreWhereInput[]
    OR?: AnalysisScoreWhereInput[]
    NOT?: AnalysisScoreWhereInput | AnalysisScoreWhereInput[]
    id?: StringFilter<"AnalysisScore"> | string
    analysisId?: StringFilter<"AnalysisScore"> | string
    category?: StringFilter<"AnalysisScore"> | string
    score?: IntFilter<"AnalysisScore"> | number
    confidence?: FloatFilter<"AnalysisScore"> | number
    evidence?: StringNullableFilter<"AnalysisScore"> | string | null
    suggestions?: StringNullableFilter<"AnalysisScore"> | string | null
    analysis?: XOR<AnalysisScalarRelationFilter, AnalysisWhereInput>
  }

  export type AnalysisScoreOrderByWithRelationInput = {
    id?: SortOrder
    analysisId?: SortOrder
    category?: SortOrder
    score?: SortOrder
    confidence?: SortOrder
    evidence?: SortOrderInput | SortOrder
    suggestions?: SortOrderInput | SortOrder
    analysis?: AnalysisOrderByWithRelationInput
  }

  export type AnalysisScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    analysisId_category?: AnalysisScoreAnalysisIdCategoryCompoundUniqueInput
    AND?: AnalysisScoreWhereInput | AnalysisScoreWhereInput[]
    OR?: AnalysisScoreWhereInput[]
    NOT?: AnalysisScoreWhereInput | AnalysisScoreWhereInput[]
    analysisId?: StringFilter<"AnalysisScore"> | string
    category?: StringFilter<"AnalysisScore"> | string
    score?: IntFilter<"AnalysisScore"> | number
    confidence?: FloatFilter<"AnalysisScore"> | number
    evidence?: StringNullableFilter<"AnalysisScore"> | string | null
    suggestions?: StringNullableFilter<"AnalysisScore"> | string | null
    analysis?: XOR<AnalysisScalarRelationFilter, AnalysisWhereInput>
  }, "id" | "analysisId_category">

  export type AnalysisScoreOrderByWithAggregationInput = {
    id?: SortOrder
    analysisId?: SortOrder
    category?: SortOrder
    score?: SortOrder
    confidence?: SortOrder
    evidence?: SortOrderInput | SortOrder
    suggestions?: SortOrderInput | SortOrder
    _count?: AnalysisScoreCountOrderByAggregateInput
    _avg?: AnalysisScoreAvgOrderByAggregateInput
    _max?: AnalysisScoreMaxOrderByAggregateInput
    _min?: AnalysisScoreMinOrderByAggregateInput
    _sum?: AnalysisScoreSumOrderByAggregateInput
  }

  export type AnalysisScoreScalarWhereWithAggregatesInput = {
    AND?: AnalysisScoreScalarWhereWithAggregatesInput | AnalysisScoreScalarWhereWithAggregatesInput[]
    OR?: AnalysisScoreScalarWhereWithAggregatesInput[]
    NOT?: AnalysisScoreScalarWhereWithAggregatesInput | AnalysisScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalysisScore"> | string
    analysisId?: StringWithAggregatesFilter<"AnalysisScore"> | string
    category?: StringWithAggregatesFilter<"AnalysisScore"> | string
    score?: IntWithAggregatesFilter<"AnalysisScore"> | number
    confidence?: FloatWithAggregatesFilter<"AnalysisScore"> | number
    evidence?: StringNullableWithAggregatesFilter<"AnalysisScore"> | string | null
    suggestions?: StringNullableWithAggregatesFilter<"AnalysisScore"> | string | null
  }

  export type RepositoryScoreWhereInput = {
    AND?: RepositoryScoreWhereInput | RepositoryScoreWhereInput[]
    OR?: RepositoryScoreWhereInput[]
    NOT?: RepositoryScoreWhereInput | RepositoryScoreWhereInput[]
    id?: StringFilter<"RepositoryScore"> | string
    repositoryId?: StringFilter<"RepositoryScore"> | string
    analysisId?: StringNullableFilter<"RepositoryScore"> | string | null
    qualityScore?: IntNullableFilter<"RepositoryScore"> | number | null
    archScore?: IntNullableFilter<"RepositoryScore"> | number | null
    docScore?: IntNullableFilter<"RepositoryScore"> | number | null
    testScore?: IntNullableFilter<"RepositoryScore"> | number | null
    securityScore?: IntNullableFilter<"RepositoryScore"> | number | null
    maintainScore?: IntNullableFilter<"RepositoryScore"> | number | null
    deployReady?: FloatNullableFilter<"RepositoryScore"> | number | null
    techDebt?: StringNullableFilter<"RepositoryScore"> | string | null
    createdAt?: DateTimeFilter<"RepositoryScore"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
    analysis?: XOR<AnalysisNullableScalarRelationFilter, AnalysisWhereInput> | null
  }

  export type RepositoryScoreOrderByWithRelationInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    analysisId?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    archScore?: SortOrderInput | SortOrder
    docScore?: SortOrderInput | SortOrder
    testScore?: SortOrderInput | SortOrder
    securityScore?: SortOrderInput | SortOrder
    maintainScore?: SortOrderInput | SortOrder
    deployReady?: SortOrderInput | SortOrder
    techDebt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    repository?: RepositoryOrderByWithRelationInput
    analysis?: AnalysisOrderByWithRelationInput
  }

  export type RepositoryScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RepositoryScoreWhereInput | RepositoryScoreWhereInput[]
    OR?: RepositoryScoreWhereInput[]
    NOT?: RepositoryScoreWhereInput | RepositoryScoreWhereInput[]
    repositoryId?: StringFilter<"RepositoryScore"> | string
    analysisId?: StringNullableFilter<"RepositoryScore"> | string | null
    qualityScore?: IntNullableFilter<"RepositoryScore"> | number | null
    archScore?: IntNullableFilter<"RepositoryScore"> | number | null
    docScore?: IntNullableFilter<"RepositoryScore"> | number | null
    testScore?: IntNullableFilter<"RepositoryScore"> | number | null
    securityScore?: IntNullableFilter<"RepositoryScore"> | number | null
    maintainScore?: IntNullableFilter<"RepositoryScore"> | number | null
    deployReady?: FloatNullableFilter<"RepositoryScore"> | number | null
    techDebt?: StringNullableFilter<"RepositoryScore"> | string | null
    createdAt?: DateTimeFilter<"RepositoryScore"> | Date | string
    repository?: XOR<RepositoryScalarRelationFilter, RepositoryWhereInput>
    analysis?: XOR<AnalysisNullableScalarRelationFilter, AnalysisWhereInput> | null
  }, "id">

  export type RepositoryScoreOrderByWithAggregationInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    analysisId?: SortOrderInput | SortOrder
    qualityScore?: SortOrderInput | SortOrder
    archScore?: SortOrderInput | SortOrder
    docScore?: SortOrderInput | SortOrder
    testScore?: SortOrderInput | SortOrder
    securityScore?: SortOrderInput | SortOrder
    maintainScore?: SortOrderInput | SortOrder
    deployReady?: SortOrderInput | SortOrder
    techDebt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RepositoryScoreCountOrderByAggregateInput
    _avg?: RepositoryScoreAvgOrderByAggregateInput
    _max?: RepositoryScoreMaxOrderByAggregateInput
    _min?: RepositoryScoreMinOrderByAggregateInput
    _sum?: RepositoryScoreSumOrderByAggregateInput
  }

  export type RepositoryScoreScalarWhereWithAggregatesInput = {
    AND?: RepositoryScoreScalarWhereWithAggregatesInput | RepositoryScoreScalarWhereWithAggregatesInput[]
    OR?: RepositoryScoreScalarWhereWithAggregatesInput[]
    NOT?: RepositoryScoreScalarWhereWithAggregatesInput | RepositoryScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RepositoryScore"> | string
    repositoryId?: StringWithAggregatesFilter<"RepositoryScore"> | string
    analysisId?: StringNullableWithAggregatesFilter<"RepositoryScore"> | string | null
    qualityScore?: IntNullableWithAggregatesFilter<"RepositoryScore"> | number | null
    archScore?: IntNullableWithAggregatesFilter<"RepositoryScore"> | number | null
    docScore?: IntNullableWithAggregatesFilter<"RepositoryScore"> | number | null
    testScore?: IntNullableWithAggregatesFilter<"RepositoryScore"> | number | null
    securityScore?: IntNullableWithAggregatesFilter<"RepositoryScore"> | number | null
    maintainScore?: IntNullableWithAggregatesFilter<"RepositoryScore"> | number | null
    deployReady?: FloatNullableWithAggregatesFilter<"RepositoryScore"> | number | null
    techDebt?: StringNullableWithAggregatesFilter<"RepositoryScore"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RepositoryScore"> | Date | string
  }

  export type AiConversationWhereInput = {
    AND?: AiConversationWhereInput | AiConversationWhereInput[]
    OR?: AiConversationWhereInput[]
    NOT?: AiConversationWhereInput | AiConversationWhereInput[]
    id?: StringFilter<"AiConversation"> | string
    userId?: StringFilter<"AiConversation"> | string
    messages?: JsonFilter<"AiConversation">
    createdAt?: DateTimeFilter<"AiConversation"> | Date | string
    updatedAt?: DateTimeFilter<"AiConversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AiConversationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    messages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AiConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiConversationWhereInput | AiConversationWhereInput[]
    OR?: AiConversationWhereInput[]
    NOT?: AiConversationWhereInput | AiConversationWhereInput[]
    userId?: StringFilter<"AiConversation"> | string
    messages?: JsonFilter<"AiConversation">
    createdAt?: DateTimeFilter<"AiConversation"> | Date | string
    updatedAt?: DateTimeFilter<"AiConversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AiConversationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    messages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AiConversationCountOrderByAggregateInput
    _max?: AiConversationMaxOrderByAggregateInput
    _min?: AiConversationMinOrderByAggregateInput
  }

  export type AiConversationScalarWhereWithAggregatesInput = {
    AND?: AiConversationScalarWhereWithAggregatesInput | AiConversationScalarWhereWithAggregatesInput[]
    OR?: AiConversationScalarWhereWithAggregatesInput[]
    NOT?: AiConversationScalarWhereWithAggregatesInput | AiConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiConversation"> | string
    userId?: StringWithAggregatesFilter<"AiConversation"> | string
    messages?: JsonWithAggregatesFilter<"AiConversation">
    createdAt?: DateTimeWithAggregatesFilter<"AiConversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiConversation"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileCreateNestedOneWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
    conversations?: AiConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileUncheckedCreateNestedOneWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
    conversations?: AiConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUpdateOneWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
    conversations?: AiConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUncheckedUpdateOneWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
    conversations?: AiConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    expiresAt: Date | string
    token: string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUncheckedCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationCreateManyInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GithubProfileCreateInput = {
    id?: string
    githubId: number
    login: string
    displayName?: string | null
    bio?: string | null
    avatarUrl?: string | null
    blog?: string | null
    location?: string | null
    company?: string | null
    publicRepos?: number
    publicGists?: number
    followers?: number
    following?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    shareCount?: number
    viewCount?: number
    user: UserCreateNestedOneWithoutGithubProfileInput
    repositories?: RepositoryCreateNestedManyWithoutProfileInput
  }

  export type GithubProfileUncheckedCreateInput = {
    id?: string
    userId: string
    githubId: number
    login: string
    displayName?: string | null
    bio?: string | null
    avatarUrl?: string | null
    blog?: string | null
    location?: string | null
    company?: string | null
    publicRepos?: number
    publicGists?: number
    followers?: number
    following?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    shareCount?: number
    viewCount?: number
    repositories?: RepositoryUncheckedCreateNestedManyWithoutProfileInput
  }

  export type GithubProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    login?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: IntFieldUpdateOperationsInput | number
    publicGists?: IntFieldUpdateOperationsInput | number
    followers?: IntFieldUpdateOperationsInput | number
    following?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shareCount?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutGithubProfileNestedInput
    repositories?: RepositoryUpdateManyWithoutProfileNestedInput
  }

  export type GithubProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    login?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: IntFieldUpdateOperationsInput | number
    publicGists?: IntFieldUpdateOperationsInput | number
    followers?: IntFieldUpdateOperationsInput | number
    following?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shareCount?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    repositories?: RepositoryUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type GithubProfileCreateManyInput = {
    id?: string
    userId: string
    githubId: number
    login: string
    displayName?: string | null
    bio?: string | null
    avatarUrl?: string | null
    blog?: string | null
    location?: string | null
    company?: string | null
    publicRepos?: number
    publicGists?: number
    followers?: number
    following?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    shareCount?: number
    viewCount?: number
  }

  export type GithubProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    login?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: IntFieldUpdateOperationsInput | number
    publicGists?: IntFieldUpdateOperationsInput | number
    followers?: IntFieldUpdateOperationsInput | number
    following?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shareCount?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
  }

  export type GithubProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    login?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: IntFieldUpdateOperationsInput | number
    publicGists?: IntFieldUpdateOperationsInput | number
    followers?: IntFieldUpdateOperationsInput | number
    following?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shareCount?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
  }

  export type RepositoryCreateInput = {
    id?: string
    githubId: number
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
    profile: GithubProfileCreateNestedOneWithoutRepositoriesInput
    repoScores?: RepositoryScoreCreateNestedManyWithoutRepositoryInput
    analyses?: AnalysisCreateNestedManyWithoutRepositoriesInput
  }

  export type RepositoryUncheckedCreateInput = {
    id?: string
    githubId: number
    profileId: string
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
    repoScores?: RepositoryScoreUncheckedCreateNestedManyWithoutRepositoryInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutRepositoriesInput
  }

  export type RepositoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: GithubProfileUpdateOneRequiredWithoutRepositoriesNestedInput
    repoScores?: RepositoryScoreUpdateManyWithoutRepositoryNestedInput
    analyses?: AnalysisUpdateManyWithoutRepositoriesNestedInput
  }

  export type RepositoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repoScores?: RepositoryScoreUncheckedUpdateManyWithoutRepositoryNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutRepositoriesNestedInput
  }

  export type RepositoryCreateManyInput = {
    id?: string
    githubId: number
    profileId: string
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
  }

  export type RepositoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepositoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalysisCreateInput = {
    id?: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAnalysesInput
    scores?: AnalysisScoreCreateNestedManyWithoutAnalysisInput
    repositories?: RepositoryCreateNestedManyWithoutAnalysesInput
    repoScores?: RepositoryScoreCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUncheckedCreateInput = {
    id?: string
    userId: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    scores?: AnalysisScoreUncheckedCreateNestedManyWithoutAnalysisInput
    repositories?: RepositoryUncheckedCreateNestedManyWithoutAnalysesInput
    repoScores?: RepositoryScoreUncheckedCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAnalysesNestedInput
    scores?: AnalysisScoreUpdateManyWithoutAnalysisNestedInput
    repositories?: RepositoryUpdateManyWithoutAnalysesNestedInput
    repoScores?: RepositoryScoreUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scores?: AnalysisScoreUncheckedUpdateManyWithoutAnalysisNestedInput
    repositories?: RepositoryUncheckedUpdateManyWithoutAnalysesNestedInput
    repoScores?: RepositoryScoreUncheckedUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisCreateManyInput = {
    id?: string
    userId: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalysisScoreCreateInput = {
    id?: string
    category: string
    score: number
    confidence: number
    evidence?: string | null
    suggestions?: string | null
    analysis: AnalysisCreateNestedOneWithoutScoresInput
  }

  export type AnalysisScoreUncheckedCreateInput = {
    id?: string
    analysisId: string
    category: string
    score: number
    confidence: number
    evidence?: string | null
    suggestions?: string | null
  }

  export type AnalysisScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    suggestions?: NullableStringFieldUpdateOperationsInput | string | null
    analysis?: AnalysisUpdateOneRequiredWithoutScoresNestedInput
  }

  export type AnalysisScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    suggestions?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnalysisScoreCreateManyInput = {
    id?: string
    analysisId: string
    category: string
    score: number
    confidence: number
    evidence?: string | null
    suggestions?: string | null
  }

  export type AnalysisScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    suggestions?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnalysisScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    suggestions?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RepositoryScoreCreateInput = {
    id?: string
    qualityScore?: number | null
    archScore?: number | null
    docScore?: number | null
    testScore?: number | null
    securityScore?: number | null
    maintainScore?: number | null
    deployReady?: number | null
    techDebt?: string | null
    createdAt?: Date | string
    repository: RepositoryCreateNestedOneWithoutRepoScoresInput
    analysis?: AnalysisCreateNestedOneWithoutRepoScoresInput
  }

  export type RepositoryScoreUncheckedCreateInput = {
    id?: string
    repositoryId: string
    analysisId?: string | null
    qualityScore?: number | null
    archScore?: number | null
    docScore?: number | null
    testScore?: number | null
    securityScore?: number | null
    maintainScore?: number | null
    deployReady?: number | null
    techDebt?: string | null
    createdAt?: Date | string
  }

  export type RepositoryScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repository?: RepositoryUpdateOneRequiredWithoutRepoScoresNestedInput
    analysis?: AnalysisUpdateOneWithoutRepoScoresNestedInput
  }

  export type RepositoryScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    analysisId?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryScoreCreateManyInput = {
    id?: string
    repositoryId: string
    analysisId?: string | null
    qualityScore?: number | null
    archScore?: number | null
    docScore?: number | null
    testScore?: number | null
    securityScore?: number | null
    maintainScore?: number | null
    deployReady?: number | null
    techDebt?: string | null
    createdAt?: Date | string
  }

  export type RepositoryScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    analysisId?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConversationCreateInput = {
    id?: string
    messages: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
  }

  export type AiConversationUncheckedCreateInput = {
    id?: string
    userId: string
    messages: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    messages?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type AiConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    messages?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConversationCreateManyInput = {
    id?: string
    userId: string
    messages: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    messages?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    messages?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type GithubProfileNullableScalarRelationFilter = {
    is?: GithubProfileWhereInput | null
    isNot?: GithubProfileWhereInput | null
  }

  export type AnalysisListRelationFilter = {
    every?: AnalysisWhereInput
    some?: AnalysisWhereInput
    none?: AnalysisWhereInput
  }

  export type AiConversationListRelationFilter = {
    every?: AiConversationWhereInput
    some?: AiConversationWhereInput
    none?: AiConversationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderIdAccountIdCompoundUniqueInput = {
    providerId: string
    accountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RepositoryListRelationFilter = {
    every?: RepositoryWhereInput
    some?: RepositoryWhereInput
    none?: RepositoryWhereInput
  }

  export type RepositoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GithubProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    displayName?: SortOrder
    bio?: SortOrder
    avatarUrl?: SortOrder
    blog?: SortOrder
    location?: SortOrder
    company?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrder
    shareCount?: SortOrder
    viewCount?: SortOrder
  }

  export type GithubProfileAvgOrderByAggregateInput = {
    githubId?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    shareCount?: SortOrder
    viewCount?: SortOrder
  }

  export type GithubProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    displayName?: SortOrder
    bio?: SortOrder
    avatarUrl?: SortOrder
    blog?: SortOrder
    location?: SortOrder
    company?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrder
    shareCount?: SortOrder
    viewCount?: SortOrder
  }

  export type GithubProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    githubId?: SortOrder
    login?: SortOrder
    displayName?: SortOrder
    bio?: SortOrder
    avatarUrl?: SortOrder
    blog?: SortOrder
    location?: SortOrder
    company?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncedAt?: SortOrder
    shareCount?: SortOrder
    viewCount?: SortOrder
  }

  export type GithubProfileSumOrderByAggregateInput = {
    githubId?: SortOrder
    publicRepos?: SortOrder
    publicGists?: SortOrder
    followers?: SortOrder
    following?: SortOrder
    shareCount?: SortOrder
    viewCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type GithubProfileScalarRelationFilter = {
    is?: GithubProfileWhereInput
    isNot?: GithubProfileWhereInput
  }

  export type RepositoryScoreListRelationFilter = {
    every?: RepositoryScoreWhereInput
    some?: RepositoryScoreWhereInput
    none?: RepositoryScoreWhereInput
  }

  export type RepositoryScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RepositoryCountOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    description?: SortOrder
    htmlUrl?: SortOrder
    homepage?: SortOrder
    language?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    watchersCount?: SortOrder
    size?: SortOrder
    defaultBranch?: SortOrder
    isPrivate?: SortOrder
    isFork?: SortOrder
    topics?: SortOrder
    license?: SortOrder
    hasReadme?: SortOrder
    hasIssues?: SortOrder
    hasWiki?: SortOrder
    hasPages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastPushedAt?: SortOrder
  }

  export type RepositoryAvgOrderByAggregateInput = {
    githubId?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    watchersCount?: SortOrder
    size?: SortOrder
  }

  export type RepositoryMaxOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    description?: SortOrder
    htmlUrl?: SortOrder
    homepage?: SortOrder
    language?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    watchersCount?: SortOrder
    size?: SortOrder
    defaultBranch?: SortOrder
    isPrivate?: SortOrder
    isFork?: SortOrder
    license?: SortOrder
    hasReadme?: SortOrder
    hasIssues?: SortOrder
    hasWiki?: SortOrder
    hasPages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastPushedAt?: SortOrder
  }

  export type RepositoryMinOrderByAggregateInput = {
    id?: SortOrder
    githubId?: SortOrder
    profileId?: SortOrder
    name?: SortOrder
    fullName?: SortOrder
    description?: SortOrder
    htmlUrl?: SortOrder
    homepage?: SortOrder
    language?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    watchersCount?: SortOrder
    size?: SortOrder
    defaultBranch?: SortOrder
    isPrivate?: SortOrder
    isFork?: SortOrder
    license?: SortOrder
    hasReadme?: SortOrder
    hasIssues?: SortOrder
    hasWiki?: SortOrder
    hasPages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastPushedAt?: SortOrder
  }

  export type RepositorySumOrderByAggregateInput = {
    githubId?: SortOrder
    stargazersCount?: SortOrder
    forksCount?: SortOrder
    openIssuesCount?: SortOrder
    watchersCount?: SortOrder
    size?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AnalysisScoreListRelationFilter = {
    every?: AnalysisScoreWhereInput
    some?: AnalysisScoreWhereInput
    none?: AnalysisScoreWhereInput
  }

  export type AnalysisScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    overallScore?: SortOrder
    engineerLevel?: SortOrder
    confidenceScore?: SortOrder
    strengths?: SortOrder
    gaps?: SortOrder
    summary?: SortOrder
    costCents?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AnalysisAvgOrderByAggregateInput = {
    overallScore?: SortOrder
    confidenceScore?: SortOrder
    costCents?: SortOrder
  }

  export type AnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    overallScore?: SortOrder
    engineerLevel?: SortOrder
    confidenceScore?: SortOrder
    summary?: SortOrder
    costCents?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    overallScore?: SortOrder
    engineerLevel?: SortOrder
    confidenceScore?: SortOrder
    summary?: SortOrder
    costCents?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AnalysisSumOrderByAggregateInput = {
    overallScore?: SortOrder
    confidenceScore?: SortOrder
    costCents?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AnalysisScalarRelationFilter = {
    is?: AnalysisWhereInput
    isNot?: AnalysisWhereInput
  }

  export type AnalysisScoreAnalysisIdCategoryCompoundUniqueInput = {
    analysisId: string
    category: string
  }

  export type AnalysisScoreCountOrderByAggregateInput = {
    id?: SortOrder
    analysisId?: SortOrder
    category?: SortOrder
    score?: SortOrder
    confidence?: SortOrder
    evidence?: SortOrder
    suggestions?: SortOrder
  }

  export type AnalysisScoreAvgOrderByAggregateInput = {
    score?: SortOrder
    confidence?: SortOrder
  }

  export type AnalysisScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    analysisId?: SortOrder
    category?: SortOrder
    score?: SortOrder
    confidence?: SortOrder
    evidence?: SortOrder
    suggestions?: SortOrder
  }

  export type AnalysisScoreMinOrderByAggregateInput = {
    id?: SortOrder
    analysisId?: SortOrder
    category?: SortOrder
    score?: SortOrder
    confidence?: SortOrder
    evidence?: SortOrder
    suggestions?: SortOrder
  }

  export type AnalysisScoreSumOrderByAggregateInput = {
    score?: SortOrder
    confidence?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type RepositoryScalarRelationFilter = {
    is?: RepositoryWhereInput
    isNot?: RepositoryWhereInput
  }

  export type AnalysisNullableScalarRelationFilter = {
    is?: AnalysisWhereInput | null
    isNot?: AnalysisWhereInput | null
  }

  export type RepositoryScoreCountOrderByAggregateInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    analysisId?: SortOrder
    qualityScore?: SortOrder
    archScore?: SortOrder
    docScore?: SortOrder
    testScore?: SortOrder
    securityScore?: SortOrder
    maintainScore?: SortOrder
    deployReady?: SortOrder
    techDebt?: SortOrder
    createdAt?: SortOrder
  }

  export type RepositoryScoreAvgOrderByAggregateInput = {
    qualityScore?: SortOrder
    archScore?: SortOrder
    docScore?: SortOrder
    testScore?: SortOrder
    securityScore?: SortOrder
    maintainScore?: SortOrder
    deployReady?: SortOrder
  }

  export type RepositoryScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    analysisId?: SortOrder
    qualityScore?: SortOrder
    archScore?: SortOrder
    docScore?: SortOrder
    testScore?: SortOrder
    securityScore?: SortOrder
    maintainScore?: SortOrder
    deployReady?: SortOrder
    techDebt?: SortOrder
    createdAt?: SortOrder
  }

  export type RepositoryScoreMinOrderByAggregateInput = {
    id?: SortOrder
    repositoryId?: SortOrder
    analysisId?: SortOrder
    qualityScore?: SortOrder
    archScore?: SortOrder
    docScore?: SortOrder
    testScore?: SortOrder
    securityScore?: SortOrder
    maintainScore?: SortOrder
    deployReady?: SortOrder
    techDebt?: SortOrder
    createdAt?: SortOrder
  }

  export type RepositoryScoreSumOrderByAggregateInput = {
    qualityScore?: SortOrder
    archScore?: SortOrder
    docScore?: SortOrder
    testScore?: SortOrder
    securityScore?: SortOrder
    maintainScore?: SortOrder
    deployReady?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AiConversationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    messages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiConversationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type GithubProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<GithubProfileCreateWithoutUserInput, GithubProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubProfileCreateOrConnectWithoutUserInput
    connect?: GithubProfileWhereUniqueInput
  }

  export type AnalysisCreateNestedManyWithoutUserInput = {
    create?: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput> | AnalysisCreateWithoutUserInput[] | AnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutUserInput | AnalysisCreateOrConnectWithoutUserInput[]
    createMany?: AnalysisCreateManyUserInputEnvelope
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
  }

  export type AiConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<AiConversationCreateWithoutUserInput, AiConversationUncheckedCreateWithoutUserInput> | AiConversationCreateWithoutUserInput[] | AiConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiConversationCreateOrConnectWithoutUserInput | AiConversationCreateOrConnectWithoutUserInput[]
    createMany?: AiConversationCreateManyUserInputEnvelope
    connect?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type GithubProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<GithubProfileCreateWithoutUserInput, GithubProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubProfileCreateOrConnectWithoutUserInput
    connect?: GithubProfileWhereUniqueInput
  }

  export type AnalysisUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput> | AnalysisCreateWithoutUserInput[] | AnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutUserInput | AnalysisCreateOrConnectWithoutUserInput[]
    createMany?: AnalysisCreateManyUserInputEnvelope
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
  }

  export type AiConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AiConversationCreateWithoutUserInput, AiConversationUncheckedCreateWithoutUserInput> | AiConversationCreateWithoutUserInput[] | AiConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiConversationCreateOrConnectWithoutUserInput | AiConversationCreateOrConnectWithoutUserInput[]
    createMany?: AiConversationCreateManyUserInputEnvelope
    connect?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type GithubProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<GithubProfileCreateWithoutUserInput, GithubProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubProfileCreateOrConnectWithoutUserInput
    upsert?: GithubProfileUpsertWithoutUserInput
    disconnect?: GithubProfileWhereInput | boolean
    delete?: GithubProfileWhereInput | boolean
    connect?: GithubProfileWhereUniqueInput
    update?: XOR<XOR<GithubProfileUpdateToOneWithWhereWithoutUserInput, GithubProfileUpdateWithoutUserInput>, GithubProfileUncheckedUpdateWithoutUserInput>
  }

  export type AnalysisUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput> | AnalysisCreateWithoutUserInput[] | AnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutUserInput | AnalysisCreateOrConnectWithoutUserInput[]
    upsert?: AnalysisUpsertWithWhereUniqueWithoutUserInput | AnalysisUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnalysisCreateManyUserInputEnvelope
    set?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    disconnect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    delete?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    update?: AnalysisUpdateWithWhereUniqueWithoutUserInput | AnalysisUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnalysisUpdateManyWithWhereWithoutUserInput | AnalysisUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
  }

  export type AiConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiConversationCreateWithoutUserInput, AiConversationUncheckedCreateWithoutUserInput> | AiConversationCreateWithoutUserInput[] | AiConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiConversationCreateOrConnectWithoutUserInput | AiConversationCreateOrConnectWithoutUserInput[]
    upsert?: AiConversationUpsertWithWhereUniqueWithoutUserInput | AiConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiConversationCreateManyUserInputEnvelope
    set?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
    disconnect?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
    delete?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
    connect?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
    update?: AiConversationUpdateWithWhereUniqueWithoutUserInput | AiConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiConversationUpdateManyWithWhereWithoutUserInput | AiConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiConversationScalarWhereInput | AiConversationScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type GithubProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<GithubProfileCreateWithoutUserInput, GithubProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: GithubProfileCreateOrConnectWithoutUserInput
    upsert?: GithubProfileUpsertWithoutUserInput
    disconnect?: GithubProfileWhereInput | boolean
    delete?: GithubProfileWhereInput | boolean
    connect?: GithubProfileWhereUniqueInput
    update?: XOR<XOR<GithubProfileUpdateToOneWithWhereWithoutUserInput, GithubProfileUpdateWithoutUserInput>, GithubProfileUncheckedUpdateWithoutUserInput>
  }

  export type AnalysisUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput> | AnalysisCreateWithoutUserInput[] | AnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutUserInput | AnalysisCreateOrConnectWithoutUserInput[]
    upsert?: AnalysisUpsertWithWhereUniqueWithoutUserInput | AnalysisUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnalysisCreateManyUserInputEnvelope
    set?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    disconnect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    delete?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    update?: AnalysisUpdateWithWhereUniqueWithoutUserInput | AnalysisUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnalysisUpdateManyWithWhereWithoutUserInput | AnalysisUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
  }

  export type AiConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiConversationCreateWithoutUserInput, AiConversationUncheckedCreateWithoutUserInput> | AiConversationCreateWithoutUserInput[] | AiConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiConversationCreateOrConnectWithoutUserInput | AiConversationCreateOrConnectWithoutUserInput[]
    upsert?: AiConversationUpsertWithWhereUniqueWithoutUserInput | AiConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiConversationCreateManyUserInputEnvelope
    set?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
    disconnect?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
    delete?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
    connect?: AiConversationWhereUniqueInput | AiConversationWhereUniqueInput[]
    update?: AiConversationUpdateWithWhereUniqueWithoutUserInput | AiConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiConversationUpdateManyWithWhereWithoutUserInput | AiConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiConversationScalarWhereInput | AiConversationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutGithubProfileInput = {
    create?: XOR<UserCreateWithoutGithubProfileInput, UserUncheckedCreateWithoutGithubProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutGithubProfileInput
    connect?: UserWhereUniqueInput
  }

  export type RepositoryCreateNestedManyWithoutProfileInput = {
    create?: XOR<RepositoryCreateWithoutProfileInput, RepositoryUncheckedCreateWithoutProfileInput> | RepositoryCreateWithoutProfileInput[] | RepositoryUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutProfileInput | RepositoryCreateOrConnectWithoutProfileInput[]
    createMany?: RepositoryCreateManyProfileInputEnvelope
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
  }

  export type RepositoryUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<RepositoryCreateWithoutProfileInput, RepositoryUncheckedCreateWithoutProfileInput> | RepositoryCreateWithoutProfileInput[] | RepositoryUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutProfileInput | RepositoryCreateOrConnectWithoutProfileInput[]
    createMany?: RepositoryCreateManyProfileInputEnvelope
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutGithubProfileNestedInput = {
    create?: XOR<UserCreateWithoutGithubProfileInput, UserUncheckedCreateWithoutGithubProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutGithubProfileInput
    upsert?: UserUpsertWithoutGithubProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGithubProfileInput, UserUpdateWithoutGithubProfileInput>, UserUncheckedUpdateWithoutGithubProfileInput>
  }

  export type RepositoryUpdateManyWithoutProfileNestedInput = {
    create?: XOR<RepositoryCreateWithoutProfileInput, RepositoryUncheckedCreateWithoutProfileInput> | RepositoryCreateWithoutProfileInput[] | RepositoryUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutProfileInput | RepositoryCreateOrConnectWithoutProfileInput[]
    upsert?: RepositoryUpsertWithWhereUniqueWithoutProfileInput | RepositoryUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: RepositoryCreateManyProfileInputEnvelope
    set?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    disconnect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    delete?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    update?: RepositoryUpdateWithWhereUniqueWithoutProfileInput | RepositoryUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: RepositoryUpdateManyWithWhereWithoutProfileInput | RepositoryUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
  }

  export type RepositoryUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<RepositoryCreateWithoutProfileInput, RepositoryUncheckedCreateWithoutProfileInput> | RepositoryCreateWithoutProfileInput[] | RepositoryUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutProfileInput | RepositoryCreateOrConnectWithoutProfileInput[]
    upsert?: RepositoryUpsertWithWhereUniqueWithoutProfileInput | RepositoryUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: RepositoryCreateManyProfileInputEnvelope
    set?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    disconnect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    delete?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    update?: RepositoryUpdateWithWhereUniqueWithoutProfileInput | RepositoryUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: RepositoryUpdateManyWithWhereWithoutProfileInput | RepositoryUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
  }

  export type RepositoryCreatetopicsInput = {
    set: string[]
  }

  export type GithubProfileCreateNestedOneWithoutRepositoriesInput = {
    create?: XOR<GithubProfileCreateWithoutRepositoriesInput, GithubProfileUncheckedCreateWithoutRepositoriesInput>
    connectOrCreate?: GithubProfileCreateOrConnectWithoutRepositoriesInput
    connect?: GithubProfileWhereUniqueInput
  }

  export type RepositoryScoreCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<RepositoryScoreCreateWithoutRepositoryInput, RepositoryScoreUncheckedCreateWithoutRepositoryInput> | RepositoryScoreCreateWithoutRepositoryInput[] | RepositoryScoreUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: RepositoryScoreCreateOrConnectWithoutRepositoryInput | RepositoryScoreCreateOrConnectWithoutRepositoryInput[]
    createMany?: RepositoryScoreCreateManyRepositoryInputEnvelope
    connect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
  }

  export type AnalysisCreateNestedManyWithoutRepositoriesInput = {
    create?: XOR<AnalysisCreateWithoutRepositoriesInput, AnalysisUncheckedCreateWithoutRepositoriesInput> | AnalysisCreateWithoutRepositoriesInput[] | AnalysisUncheckedCreateWithoutRepositoriesInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutRepositoriesInput | AnalysisCreateOrConnectWithoutRepositoriesInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
  }

  export type RepositoryScoreUncheckedCreateNestedManyWithoutRepositoryInput = {
    create?: XOR<RepositoryScoreCreateWithoutRepositoryInput, RepositoryScoreUncheckedCreateWithoutRepositoryInput> | RepositoryScoreCreateWithoutRepositoryInput[] | RepositoryScoreUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: RepositoryScoreCreateOrConnectWithoutRepositoryInput | RepositoryScoreCreateOrConnectWithoutRepositoryInput[]
    createMany?: RepositoryScoreCreateManyRepositoryInputEnvelope
    connect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
  }

  export type AnalysisUncheckedCreateNestedManyWithoutRepositoriesInput = {
    create?: XOR<AnalysisCreateWithoutRepositoriesInput, AnalysisUncheckedCreateWithoutRepositoriesInput> | AnalysisCreateWithoutRepositoriesInput[] | AnalysisUncheckedCreateWithoutRepositoriesInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutRepositoriesInput | AnalysisCreateOrConnectWithoutRepositoriesInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
  }

  export type RepositoryUpdatetopicsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GithubProfileUpdateOneRequiredWithoutRepositoriesNestedInput = {
    create?: XOR<GithubProfileCreateWithoutRepositoriesInput, GithubProfileUncheckedCreateWithoutRepositoriesInput>
    connectOrCreate?: GithubProfileCreateOrConnectWithoutRepositoriesInput
    upsert?: GithubProfileUpsertWithoutRepositoriesInput
    connect?: GithubProfileWhereUniqueInput
    update?: XOR<XOR<GithubProfileUpdateToOneWithWhereWithoutRepositoriesInput, GithubProfileUpdateWithoutRepositoriesInput>, GithubProfileUncheckedUpdateWithoutRepositoriesInput>
  }

  export type RepositoryScoreUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<RepositoryScoreCreateWithoutRepositoryInput, RepositoryScoreUncheckedCreateWithoutRepositoryInput> | RepositoryScoreCreateWithoutRepositoryInput[] | RepositoryScoreUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: RepositoryScoreCreateOrConnectWithoutRepositoryInput | RepositoryScoreCreateOrConnectWithoutRepositoryInput[]
    upsert?: RepositoryScoreUpsertWithWhereUniqueWithoutRepositoryInput | RepositoryScoreUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: RepositoryScoreCreateManyRepositoryInputEnvelope
    set?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    disconnect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    delete?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    connect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    update?: RepositoryScoreUpdateWithWhereUniqueWithoutRepositoryInput | RepositoryScoreUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: RepositoryScoreUpdateManyWithWhereWithoutRepositoryInput | RepositoryScoreUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: RepositoryScoreScalarWhereInput | RepositoryScoreScalarWhereInput[]
  }

  export type AnalysisUpdateManyWithoutRepositoriesNestedInput = {
    create?: XOR<AnalysisCreateWithoutRepositoriesInput, AnalysisUncheckedCreateWithoutRepositoriesInput> | AnalysisCreateWithoutRepositoriesInput[] | AnalysisUncheckedCreateWithoutRepositoriesInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutRepositoriesInput | AnalysisCreateOrConnectWithoutRepositoriesInput[]
    upsert?: AnalysisUpsertWithWhereUniqueWithoutRepositoriesInput | AnalysisUpsertWithWhereUniqueWithoutRepositoriesInput[]
    set?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    disconnect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    delete?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    update?: AnalysisUpdateWithWhereUniqueWithoutRepositoriesInput | AnalysisUpdateWithWhereUniqueWithoutRepositoriesInput[]
    updateMany?: AnalysisUpdateManyWithWhereWithoutRepositoriesInput | AnalysisUpdateManyWithWhereWithoutRepositoriesInput[]
    deleteMany?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
  }

  export type RepositoryScoreUncheckedUpdateManyWithoutRepositoryNestedInput = {
    create?: XOR<RepositoryScoreCreateWithoutRepositoryInput, RepositoryScoreUncheckedCreateWithoutRepositoryInput> | RepositoryScoreCreateWithoutRepositoryInput[] | RepositoryScoreUncheckedCreateWithoutRepositoryInput[]
    connectOrCreate?: RepositoryScoreCreateOrConnectWithoutRepositoryInput | RepositoryScoreCreateOrConnectWithoutRepositoryInput[]
    upsert?: RepositoryScoreUpsertWithWhereUniqueWithoutRepositoryInput | RepositoryScoreUpsertWithWhereUniqueWithoutRepositoryInput[]
    createMany?: RepositoryScoreCreateManyRepositoryInputEnvelope
    set?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    disconnect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    delete?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    connect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    update?: RepositoryScoreUpdateWithWhereUniqueWithoutRepositoryInput | RepositoryScoreUpdateWithWhereUniqueWithoutRepositoryInput[]
    updateMany?: RepositoryScoreUpdateManyWithWhereWithoutRepositoryInput | RepositoryScoreUpdateManyWithWhereWithoutRepositoryInput[]
    deleteMany?: RepositoryScoreScalarWhereInput | RepositoryScoreScalarWhereInput[]
  }

  export type AnalysisUncheckedUpdateManyWithoutRepositoriesNestedInput = {
    create?: XOR<AnalysisCreateWithoutRepositoriesInput, AnalysisUncheckedCreateWithoutRepositoriesInput> | AnalysisCreateWithoutRepositoriesInput[] | AnalysisUncheckedCreateWithoutRepositoriesInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutRepositoriesInput | AnalysisCreateOrConnectWithoutRepositoriesInput[]
    upsert?: AnalysisUpsertWithWhereUniqueWithoutRepositoriesInput | AnalysisUpsertWithWhereUniqueWithoutRepositoriesInput[]
    set?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    disconnect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    delete?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    update?: AnalysisUpdateWithWhereUniqueWithoutRepositoriesInput | AnalysisUpdateWithWhereUniqueWithoutRepositoriesInput[]
    updateMany?: AnalysisUpdateManyWithWhereWithoutRepositoriesInput | AnalysisUpdateManyWithWhereWithoutRepositoriesInput[]
    deleteMany?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
  }

  export type AnalysisCreatestrengthsInput = {
    set: string[]
  }

  export type AnalysisCreategapsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutAnalysesInput = {
    create?: XOR<UserCreateWithoutAnalysesInput, UserUncheckedCreateWithoutAnalysesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnalysesInput
    connect?: UserWhereUniqueInput
  }

  export type AnalysisScoreCreateNestedManyWithoutAnalysisInput = {
    create?: XOR<AnalysisScoreCreateWithoutAnalysisInput, AnalysisScoreUncheckedCreateWithoutAnalysisInput> | AnalysisScoreCreateWithoutAnalysisInput[] | AnalysisScoreUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: AnalysisScoreCreateOrConnectWithoutAnalysisInput | AnalysisScoreCreateOrConnectWithoutAnalysisInput[]
    createMany?: AnalysisScoreCreateManyAnalysisInputEnvelope
    connect?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
  }

  export type RepositoryCreateNestedManyWithoutAnalysesInput = {
    create?: XOR<RepositoryCreateWithoutAnalysesInput, RepositoryUncheckedCreateWithoutAnalysesInput> | RepositoryCreateWithoutAnalysesInput[] | RepositoryUncheckedCreateWithoutAnalysesInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutAnalysesInput | RepositoryCreateOrConnectWithoutAnalysesInput[]
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
  }

  export type RepositoryScoreCreateNestedManyWithoutAnalysisInput = {
    create?: XOR<RepositoryScoreCreateWithoutAnalysisInput, RepositoryScoreUncheckedCreateWithoutAnalysisInput> | RepositoryScoreCreateWithoutAnalysisInput[] | RepositoryScoreUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: RepositoryScoreCreateOrConnectWithoutAnalysisInput | RepositoryScoreCreateOrConnectWithoutAnalysisInput[]
    createMany?: RepositoryScoreCreateManyAnalysisInputEnvelope
    connect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
  }

  export type AnalysisScoreUncheckedCreateNestedManyWithoutAnalysisInput = {
    create?: XOR<AnalysisScoreCreateWithoutAnalysisInput, AnalysisScoreUncheckedCreateWithoutAnalysisInput> | AnalysisScoreCreateWithoutAnalysisInput[] | AnalysisScoreUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: AnalysisScoreCreateOrConnectWithoutAnalysisInput | AnalysisScoreCreateOrConnectWithoutAnalysisInput[]
    createMany?: AnalysisScoreCreateManyAnalysisInputEnvelope
    connect?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
  }

  export type RepositoryUncheckedCreateNestedManyWithoutAnalysesInput = {
    create?: XOR<RepositoryCreateWithoutAnalysesInput, RepositoryUncheckedCreateWithoutAnalysesInput> | RepositoryCreateWithoutAnalysesInput[] | RepositoryUncheckedCreateWithoutAnalysesInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutAnalysesInput | RepositoryCreateOrConnectWithoutAnalysesInput[]
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
  }

  export type RepositoryScoreUncheckedCreateNestedManyWithoutAnalysisInput = {
    create?: XOR<RepositoryScoreCreateWithoutAnalysisInput, RepositoryScoreUncheckedCreateWithoutAnalysisInput> | RepositoryScoreCreateWithoutAnalysisInput[] | RepositoryScoreUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: RepositoryScoreCreateOrConnectWithoutAnalysisInput | RepositoryScoreCreateOrConnectWithoutAnalysisInput[]
    createMany?: RepositoryScoreCreateManyAnalysisInputEnvelope
    connect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AnalysisUpdatestrengthsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AnalysisUpdategapsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutAnalysesNestedInput = {
    create?: XOR<UserCreateWithoutAnalysesInput, UserUncheckedCreateWithoutAnalysesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnalysesInput
    upsert?: UserUpsertWithoutAnalysesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnalysesInput, UserUpdateWithoutAnalysesInput>, UserUncheckedUpdateWithoutAnalysesInput>
  }

  export type AnalysisScoreUpdateManyWithoutAnalysisNestedInput = {
    create?: XOR<AnalysisScoreCreateWithoutAnalysisInput, AnalysisScoreUncheckedCreateWithoutAnalysisInput> | AnalysisScoreCreateWithoutAnalysisInput[] | AnalysisScoreUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: AnalysisScoreCreateOrConnectWithoutAnalysisInput | AnalysisScoreCreateOrConnectWithoutAnalysisInput[]
    upsert?: AnalysisScoreUpsertWithWhereUniqueWithoutAnalysisInput | AnalysisScoreUpsertWithWhereUniqueWithoutAnalysisInput[]
    createMany?: AnalysisScoreCreateManyAnalysisInputEnvelope
    set?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
    disconnect?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
    delete?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
    connect?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
    update?: AnalysisScoreUpdateWithWhereUniqueWithoutAnalysisInput | AnalysisScoreUpdateWithWhereUniqueWithoutAnalysisInput[]
    updateMany?: AnalysisScoreUpdateManyWithWhereWithoutAnalysisInput | AnalysisScoreUpdateManyWithWhereWithoutAnalysisInput[]
    deleteMany?: AnalysisScoreScalarWhereInput | AnalysisScoreScalarWhereInput[]
  }

  export type RepositoryUpdateManyWithoutAnalysesNestedInput = {
    create?: XOR<RepositoryCreateWithoutAnalysesInput, RepositoryUncheckedCreateWithoutAnalysesInput> | RepositoryCreateWithoutAnalysesInput[] | RepositoryUncheckedCreateWithoutAnalysesInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutAnalysesInput | RepositoryCreateOrConnectWithoutAnalysesInput[]
    upsert?: RepositoryUpsertWithWhereUniqueWithoutAnalysesInput | RepositoryUpsertWithWhereUniqueWithoutAnalysesInput[]
    set?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    disconnect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    delete?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    update?: RepositoryUpdateWithWhereUniqueWithoutAnalysesInput | RepositoryUpdateWithWhereUniqueWithoutAnalysesInput[]
    updateMany?: RepositoryUpdateManyWithWhereWithoutAnalysesInput | RepositoryUpdateManyWithWhereWithoutAnalysesInput[]
    deleteMany?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
  }

  export type RepositoryScoreUpdateManyWithoutAnalysisNestedInput = {
    create?: XOR<RepositoryScoreCreateWithoutAnalysisInput, RepositoryScoreUncheckedCreateWithoutAnalysisInput> | RepositoryScoreCreateWithoutAnalysisInput[] | RepositoryScoreUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: RepositoryScoreCreateOrConnectWithoutAnalysisInput | RepositoryScoreCreateOrConnectWithoutAnalysisInput[]
    upsert?: RepositoryScoreUpsertWithWhereUniqueWithoutAnalysisInput | RepositoryScoreUpsertWithWhereUniqueWithoutAnalysisInput[]
    createMany?: RepositoryScoreCreateManyAnalysisInputEnvelope
    set?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    disconnect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    delete?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    connect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    update?: RepositoryScoreUpdateWithWhereUniqueWithoutAnalysisInput | RepositoryScoreUpdateWithWhereUniqueWithoutAnalysisInput[]
    updateMany?: RepositoryScoreUpdateManyWithWhereWithoutAnalysisInput | RepositoryScoreUpdateManyWithWhereWithoutAnalysisInput[]
    deleteMany?: RepositoryScoreScalarWhereInput | RepositoryScoreScalarWhereInput[]
  }

  export type AnalysisScoreUncheckedUpdateManyWithoutAnalysisNestedInput = {
    create?: XOR<AnalysisScoreCreateWithoutAnalysisInput, AnalysisScoreUncheckedCreateWithoutAnalysisInput> | AnalysisScoreCreateWithoutAnalysisInput[] | AnalysisScoreUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: AnalysisScoreCreateOrConnectWithoutAnalysisInput | AnalysisScoreCreateOrConnectWithoutAnalysisInput[]
    upsert?: AnalysisScoreUpsertWithWhereUniqueWithoutAnalysisInput | AnalysisScoreUpsertWithWhereUniqueWithoutAnalysisInput[]
    createMany?: AnalysisScoreCreateManyAnalysisInputEnvelope
    set?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
    disconnect?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
    delete?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
    connect?: AnalysisScoreWhereUniqueInput | AnalysisScoreWhereUniqueInput[]
    update?: AnalysisScoreUpdateWithWhereUniqueWithoutAnalysisInput | AnalysisScoreUpdateWithWhereUniqueWithoutAnalysisInput[]
    updateMany?: AnalysisScoreUpdateManyWithWhereWithoutAnalysisInput | AnalysisScoreUpdateManyWithWhereWithoutAnalysisInput[]
    deleteMany?: AnalysisScoreScalarWhereInput | AnalysisScoreScalarWhereInput[]
  }

  export type RepositoryUncheckedUpdateManyWithoutAnalysesNestedInput = {
    create?: XOR<RepositoryCreateWithoutAnalysesInput, RepositoryUncheckedCreateWithoutAnalysesInput> | RepositoryCreateWithoutAnalysesInput[] | RepositoryUncheckedCreateWithoutAnalysesInput[]
    connectOrCreate?: RepositoryCreateOrConnectWithoutAnalysesInput | RepositoryCreateOrConnectWithoutAnalysesInput[]
    upsert?: RepositoryUpsertWithWhereUniqueWithoutAnalysesInput | RepositoryUpsertWithWhereUniqueWithoutAnalysesInput[]
    set?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    disconnect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    delete?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[]
    update?: RepositoryUpdateWithWhereUniqueWithoutAnalysesInput | RepositoryUpdateWithWhereUniqueWithoutAnalysesInput[]
    updateMany?: RepositoryUpdateManyWithWhereWithoutAnalysesInput | RepositoryUpdateManyWithWhereWithoutAnalysesInput[]
    deleteMany?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
  }

  export type RepositoryScoreUncheckedUpdateManyWithoutAnalysisNestedInput = {
    create?: XOR<RepositoryScoreCreateWithoutAnalysisInput, RepositoryScoreUncheckedCreateWithoutAnalysisInput> | RepositoryScoreCreateWithoutAnalysisInput[] | RepositoryScoreUncheckedCreateWithoutAnalysisInput[]
    connectOrCreate?: RepositoryScoreCreateOrConnectWithoutAnalysisInput | RepositoryScoreCreateOrConnectWithoutAnalysisInput[]
    upsert?: RepositoryScoreUpsertWithWhereUniqueWithoutAnalysisInput | RepositoryScoreUpsertWithWhereUniqueWithoutAnalysisInput[]
    createMany?: RepositoryScoreCreateManyAnalysisInputEnvelope
    set?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    disconnect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    delete?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    connect?: RepositoryScoreWhereUniqueInput | RepositoryScoreWhereUniqueInput[]
    update?: RepositoryScoreUpdateWithWhereUniqueWithoutAnalysisInput | RepositoryScoreUpdateWithWhereUniqueWithoutAnalysisInput[]
    updateMany?: RepositoryScoreUpdateManyWithWhereWithoutAnalysisInput | RepositoryScoreUpdateManyWithWhereWithoutAnalysisInput[]
    deleteMany?: RepositoryScoreScalarWhereInput | RepositoryScoreScalarWhereInput[]
  }

  export type AnalysisCreateNestedOneWithoutScoresInput = {
    create?: XOR<AnalysisCreateWithoutScoresInput, AnalysisUncheckedCreateWithoutScoresInput>
    connectOrCreate?: AnalysisCreateOrConnectWithoutScoresInput
    connect?: AnalysisWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AnalysisUpdateOneRequiredWithoutScoresNestedInput = {
    create?: XOR<AnalysisCreateWithoutScoresInput, AnalysisUncheckedCreateWithoutScoresInput>
    connectOrCreate?: AnalysisCreateOrConnectWithoutScoresInput
    upsert?: AnalysisUpsertWithoutScoresInput
    connect?: AnalysisWhereUniqueInput
    update?: XOR<XOR<AnalysisUpdateToOneWithWhereWithoutScoresInput, AnalysisUpdateWithoutScoresInput>, AnalysisUncheckedUpdateWithoutScoresInput>
  }

  export type RepositoryCreateNestedOneWithoutRepoScoresInput = {
    create?: XOR<RepositoryCreateWithoutRepoScoresInput, RepositoryUncheckedCreateWithoutRepoScoresInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutRepoScoresInput
    connect?: RepositoryWhereUniqueInput
  }

  export type AnalysisCreateNestedOneWithoutRepoScoresInput = {
    create?: XOR<AnalysisCreateWithoutRepoScoresInput, AnalysisUncheckedCreateWithoutRepoScoresInput>
    connectOrCreate?: AnalysisCreateOrConnectWithoutRepoScoresInput
    connect?: AnalysisWhereUniqueInput
  }

  export type RepositoryUpdateOneRequiredWithoutRepoScoresNestedInput = {
    create?: XOR<RepositoryCreateWithoutRepoScoresInput, RepositoryUncheckedCreateWithoutRepoScoresInput>
    connectOrCreate?: RepositoryCreateOrConnectWithoutRepoScoresInput
    upsert?: RepositoryUpsertWithoutRepoScoresInput
    connect?: RepositoryWhereUniqueInput
    update?: XOR<XOR<RepositoryUpdateToOneWithWhereWithoutRepoScoresInput, RepositoryUpdateWithoutRepoScoresInput>, RepositoryUncheckedUpdateWithoutRepoScoresInput>
  }

  export type AnalysisUpdateOneWithoutRepoScoresNestedInput = {
    create?: XOR<AnalysisCreateWithoutRepoScoresInput, AnalysisUncheckedCreateWithoutRepoScoresInput>
    connectOrCreate?: AnalysisCreateOrConnectWithoutRepoScoresInput
    upsert?: AnalysisUpsertWithoutRepoScoresInput
    disconnect?: AnalysisWhereInput | boolean
    delete?: AnalysisWhereInput | boolean
    connect?: AnalysisWhereUniqueInput
    update?: XOR<XOR<AnalysisUpdateToOneWithWhereWithoutRepoScoresInput, AnalysisUpdateWithoutRepoScoresInput>, AnalysisUncheckedUpdateWithoutRepoScoresInput>
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GithubProfileCreateWithoutUserInput = {
    id?: string
    githubId: number
    login: string
    displayName?: string | null
    bio?: string | null
    avatarUrl?: string | null
    blog?: string | null
    location?: string | null
    company?: string | null
    publicRepos?: number
    publicGists?: number
    followers?: number
    following?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    shareCount?: number
    viewCount?: number
    repositories?: RepositoryCreateNestedManyWithoutProfileInput
  }

  export type GithubProfileUncheckedCreateWithoutUserInput = {
    id?: string
    githubId: number
    login: string
    displayName?: string | null
    bio?: string | null
    avatarUrl?: string | null
    blog?: string | null
    location?: string | null
    company?: string | null
    publicRepos?: number
    publicGists?: number
    followers?: number
    following?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    shareCount?: number
    viewCount?: number
    repositories?: RepositoryUncheckedCreateNestedManyWithoutProfileInput
  }

  export type GithubProfileCreateOrConnectWithoutUserInput = {
    where: GithubProfileWhereUniqueInput
    create: XOR<GithubProfileCreateWithoutUserInput, GithubProfileUncheckedCreateWithoutUserInput>
  }

  export type AnalysisCreateWithoutUserInput = {
    id?: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    scores?: AnalysisScoreCreateNestedManyWithoutAnalysisInput
    repositories?: RepositoryCreateNestedManyWithoutAnalysesInput
    repoScores?: RepositoryScoreCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUncheckedCreateWithoutUserInput = {
    id?: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    scores?: AnalysisScoreUncheckedCreateNestedManyWithoutAnalysisInput
    repositories?: RepositoryUncheckedCreateNestedManyWithoutAnalysesInput
    repoScores?: RepositoryScoreUncheckedCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisCreateOrConnectWithoutUserInput = {
    where: AnalysisWhereUniqueInput
    create: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput>
  }

  export type AnalysisCreateManyUserInputEnvelope = {
    data: AnalysisCreateManyUserInput | AnalysisCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AiConversationCreateWithoutUserInput = {
    id?: string
    messages: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConversationUncheckedCreateWithoutUserInput = {
    id?: string
    messages: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiConversationCreateOrConnectWithoutUserInput = {
    where: AiConversationWhereUniqueInput
    create: XOR<AiConversationCreateWithoutUserInput, AiConversationUncheckedCreateWithoutUserInput>
  }

  export type AiConversationCreateManyUserInputEnvelope = {
    data: AiConversationCreateManyUserInput | AiConversationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type GithubProfileUpsertWithoutUserInput = {
    update: XOR<GithubProfileUpdateWithoutUserInput, GithubProfileUncheckedUpdateWithoutUserInput>
    create: XOR<GithubProfileCreateWithoutUserInput, GithubProfileUncheckedCreateWithoutUserInput>
    where?: GithubProfileWhereInput
  }

  export type GithubProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: GithubProfileWhereInput
    data: XOR<GithubProfileUpdateWithoutUserInput, GithubProfileUncheckedUpdateWithoutUserInput>
  }

  export type GithubProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    login?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: IntFieldUpdateOperationsInput | number
    publicGists?: IntFieldUpdateOperationsInput | number
    followers?: IntFieldUpdateOperationsInput | number
    following?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shareCount?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    repositories?: RepositoryUpdateManyWithoutProfileNestedInput
  }

  export type GithubProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    login?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: IntFieldUpdateOperationsInput | number
    publicGists?: IntFieldUpdateOperationsInput | number
    followers?: IntFieldUpdateOperationsInput | number
    following?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shareCount?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    repositories?: RepositoryUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type AnalysisUpsertWithWhereUniqueWithoutUserInput = {
    where: AnalysisWhereUniqueInput
    update: XOR<AnalysisUpdateWithoutUserInput, AnalysisUncheckedUpdateWithoutUserInput>
    create: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput>
  }

  export type AnalysisUpdateWithWhereUniqueWithoutUserInput = {
    where: AnalysisWhereUniqueInput
    data: XOR<AnalysisUpdateWithoutUserInput, AnalysisUncheckedUpdateWithoutUserInput>
  }

  export type AnalysisUpdateManyWithWhereWithoutUserInput = {
    where: AnalysisScalarWhereInput
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyWithoutUserInput>
  }

  export type AnalysisScalarWhereInput = {
    AND?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
    OR?: AnalysisScalarWhereInput[]
    NOT?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
    id?: StringFilter<"Analysis"> | string
    userId?: StringFilter<"Analysis"> | string
    status?: StringFilter<"Analysis"> | string
    overallScore?: IntNullableFilter<"Analysis"> | number | null
    engineerLevel?: StringNullableFilter<"Analysis"> | string | null
    confidenceScore?: FloatNullableFilter<"Analysis"> | number | null
    strengths?: StringNullableListFilter<"Analysis">
    gaps?: StringNullableListFilter<"Analysis">
    summary?: StringNullableFilter<"Analysis"> | string | null
    costCents?: IntFilter<"Analysis"> | number
    createdAt?: DateTimeFilter<"Analysis"> | Date | string
    updatedAt?: DateTimeFilter<"Analysis"> | Date | string
    completedAt?: DateTimeNullableFilter<"Analysis"> | Date | string | null
  }

  export type AiConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: AiConversationWhereUniqueInput
    update: XOR<AiConversationUpdateWithoutUserInput, AiConversationUncheckedUpdateWithoutUserInput>
    create: XOR<AiConversationCreateWithoutUserInput, AiConversationUncheckedCreateWithoutUserInput>
  }

  export type AiConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: AiConversationWhereUniqueInput
    data: XOR<AiConversationUpdateWithoutUserInput, AiConversationUncheckedUpdateWithoutUserInput>
  }

  export type AiConversationUpdateManyWithWhereWithoutUserInput = {
    where: AiConversationScalarWhereInput
    data: XOR<AiConversationUpdateManyMutationInput, AiConversationUncheckedUpdateManyWithoutUserInput>
  }

  export type AiConversationScalarWhereInput = {
    AND?: AiConversationScalarWhereInput | AiConversationScalarWhereInput[]
    OR?: AiConversationScalarWhereInput[]
    NOT?: AiConversationScalarWhereInput | AiConversationScalarWhereInput[]
    id?: StringFilter<"AiConversation"> | string
    userId?: StringFilter<"AiConversation"> | string
    messages?: JsonFilter<"AiConversation">
    createdAt?: DateTimeFilter<"AiConversation"> | Date | string
    updatedAt?: DateTimeFilter<"AiConversation"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileCreateNestedOneWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
    conversations?: AiConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileUncheckedCreateNestedOneWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
    conversations?: AiConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUpdateOneWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
    conversations?: AiConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUncheckedUpdateOneWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
    conversations?: AiConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileCreateNestedOneWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
    conversations?: AiConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileUncheckedCreateNestedOneWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
    conversations?: AiConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUpdateOneWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
    conversations?: AiConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUncheckedUpdateOneWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
    conversations?: AiConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutGithubProfileInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
    conversations?: AiConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGithubProfileInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
    conversations?: AiConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGithubProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGithubProfileInput, UserUncheckedCreateWithoutGithubProfileInput>
  }

  export type RepositoryCreateWithoutProfileInput = {
    id?: string
    githubId: number
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
    repoScores?: RepositoryScoreCreateNestedManyWithoutRepositoryInput
    analyses?: AnalysisCreateNestedManyWithoutRepositoriesInput
  }

  export type RepositoryUncheckedCreateWithoutProfileInput = {
    id?: string
    githubId: number
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
    repoScores?: RepositoryScoreUncheckedCreateNestedManyWithoutRepositoryInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutRepositoriesInput
  }

  export type RepositoryCreateOrConnectWithoutProfileInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutProfileInput, RepositoryUncheckedCreateWithoutProfileInput>
  }

  export type RepositoryCreateManyProfileInputEnvelope = {
    data: RepositoryCreateManyProfileInput | RepositoryCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutGithubProfileInput = {
    update: XOR<UserUpdateWithoutGithubProfileInput, UserUncheckedUpdateWithoutGithubProfileInput>
    create: XOR<UserCreateWithoutGithubProfileInput, UserUncheckedCreateWithoutGithubProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGithubProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGithubProfileInput, UserUncheckedUpdateWithoutGithubProfileInput>
  }

  export type UserUpdateWithoutGithubProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
    conversations?: AiConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGithubProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
    conversations?: AiConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RepositoryUpsertWithWhereUniqueWithoutProfileInput = {
    where: RepositoryWhereUniqueInput
    update: XOR<RepositoryUpdateWithoutProfileInput, RepositoryUncheckedUpdateWithoutProfileInput>
    create: XOR<RepositoryCreateWithoutProfileInput, RepositoryUncheckedCreateWithoutProfileInput>
  }

  export type RepositoryUpdateWithWhereUniqueWithoutProfileInput = {
    where: RepositoryWhereUniqueInput
    data: XOR<RepositoryUpdateWithoutProfileInput, RepositoryUncheckedUpdateWithoutProfileInput>
  }

  export type RepositoryUpdateManyWithWhereWithoutProfileInput = {
    where: RepositoryScalarWhereInput
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyWithoutProfileInput>
  }

  export type RepositoryScalarWhereInput = {
    AND?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
    OR?: RepositoryScalarWhereInput[]
    NOT?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[]
    id?: StringFilter<"Repository"> | string
    githubId?: IntFilter<"Repository"> | number
    profileId?: StringFilter<"Repository"> | string
    name?: StringFilter<"Repository"> | string
    fullName?: StringFilter<"Repository"> | string
    description?: StringNullableFilter<"Repository"> | string | null
    htmlUrl?: StringFilter<"Repository"> | string
    homepage?: StringNullableFilter<"Repository"> | string | null
    language?: StringNullableFilter<"Repository"> | string | null
    stargazersCount?: IntFilter<"Repository"> | number
    forksCount?: IntFilter<"Repository"> | number
    openIssuesCount?: IntFilter<"Repository"> | number
    watchersCount?: IntFilter<"Repository"> | number
    size?: IntFilter<"Repository"> | number
    defaultBranch?: StringFilter<"Repository"> | string
    isPrivate?: BoolFilter<"Repository"> | boolean
    isFork?: BoolFilter<"Repository"> | boolean
    topics?: StringNullableListFilter<"Repository">
    license?: StringNullableFilter<"Repository"> | string | null
    hasReadme?: BoolFilter<"Repository"> | boolean
    hasIssues?: BoolFilter<"Repository"> | boolean
    hasWiki?: BoolFilter<"Repository"> | boolean
    hasPages?: BoolFilter<"Repository"> | boolean
    createdAt?: DateTimeFilter<"Repository"> | Date | string
    updatedAt?: DateTimeFilter<"Repository"> | Date | string
    lastPushedAt?: DateTimeNullableFilter<"Repository"> | Date | string | null
  }

  export type GithubProfileCreateWithoutRepositoriesInput = {
    id?: string
    githubId: number
    login: string
    displayName?: string | null
    bio?: string | null
    avatarUrl?: string | null
    blog?: string | null
    location?: string | null
    company?: string | null
    publicRepos?: number
    publicGists?: number
    followers?: number
    following?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    shareCount?: number
    viewCount?: number
    user: UserCreateNestedOneWithoutGithubProfileInput
  }

  export type GithubProfileUncheckedCreateWithoutRepositoriesInput = {
    id?: string
    userId: string
    githubId: number
    login: string
    displayName?: string | null
    bio?: string | null
    avatarUrl?: string | null
    blog?: string | null
    location?: string | null
    company?: string | null
    publicRepos?: number
    publicGists?: number
    followers?: number
    following?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncedAt?: Date | string | null
    shareCount?: number
    viewCount?: number
  }

  export type GithubProfileCreateOrConnectWithoutRepositoriesInput = {
    where: GithubProfileWhereUniqueInput
    create: XOR<GithubProfileCreateWithoutRepositoriesInput, GithubProfileUncheckedCreateWithoutRepositoriesInput>
  }

  export type RepositoryScoreCreateWithoutRepositoryInput = {
    id?: string
    qualityScore?: number | null
    archScore?: number | null
    docScore?: number | null
    testScore?: number | null
    securityScore?: number | null
    maintainScore?: number | null
    deployReady?: number | null
    techDebt?: string | null
    createdAt?: Date | string
    analysis?: AnalysisCreateNestedOneWithoutRepoScoresInput
  }

  export type RepositoryScoreUncheckedCreateWithoutRepositoryInput = {
    id?: string
    analysisId?: string | null
    qualityScore?: number | null
    archScore?: number | null
    docScore?: number | null
    testScore?: number | null
    securityScore?: number | null
    maintainScore?: number | null
    deployReady?: number | null
    techDebt?: string | null
    createdAt?: Date | string
  }

  export type RepositoryScoreCreateOrConnectWithoutRepositoryInput = {
    where: RepositoryScoreWhereUniqueInput
    create: XOR<RepositoryScoreCreateWithoutRepositoryInput, RepositoryScoreUncheckedCreateWithoutRepositoryInput>
  }

  export type RepositoryScoreCreateManyRepositoryInputEnvelope = {
    data: RepositoryScoreCreateManyRepositoryInput | RepositoryScoreCreateManyRepositoryInput[]
    skipDuplicates?: boolean
  }

  export type AnalysisCreateWithoutRepositoriesInput = {
    id?: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAnalysesInput
    scores?: AnalysisScoreCreateNestedManyWithoutAnalysisInput
    repoScores?: RepositoryScoreCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUncheckedCreateWithoutRepositoriesInput = {
    id?: string
    userId: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    scores?: AnalysisScoreUncheckedCreateNestedManyWithoutAnalysisInput
    repoScores?: RepositoryScoreUncheckedCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisCreateOrConnectWithoutRepositoriesInput = {
    where: AnalysisWhereUniqueInput
    create: XOR<AnalysisCreateWithoutRepositoriesInput, AnalysisUncheckedCreateWithoutRepositoriesInput>
  }

  export type GithubProfileUpsertWithoutRepositoriesInput = {
    update: XOR<GithubProfileUpdateWithoutRepositoriesInput, GithubProfileUncheckedUpdateWithoutRepositoriesInput>
    create: XOR<GithubProfileCreateWithoutRepositoriesInput, GithubProfileUncheckedCreateWithoutRepositoriesInput>
    where?: GithubProfileWhereInput
  }

  export type GithubProfileUpdateToOneWithWhereWithoutRepositoriesInput = {
    where?: GithubProfileWhereInput
    data: XOR<GithubProfileUpdateWithoutRepositoriesInput, GithubProfileUncheckedUpdateWithoutRepositoriesInput>
  }

  export type GithubProfileUpdateWithoutRepositoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    login?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: IntFieldUpdateOperationsInput | number
    publicGists?: IntFieldUpdateOperationsInput | number
    followers?: IntFieldUpdateOperationsInput | number
    following?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shareCount?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutGithubProfileNestedInput
  }

  export type GithubProfileUncheckedUpdateWithoutRepositoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    login?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    blog?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    publicRepos?: IntFieldUpdateOperationsInput | number
    publicGists?: IntFieldUpdateOperationsInput | number
    followers?: IntFieldUpdateOperationsInput | number
    following?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shareCount?: IntFieldUpdateOperationsInput | number
    viewCount?: IntFieldUpdateOperationsInput | number
  }

  export type RepositoryScoreUpsertWithWhereUniqueWithoutRepositoryInput = {
    where: RepositoryScoreWhereUniqueInput
    update: XOR<RepositoryScoreUpdateWithoutRepositoryInput, RepositoryScoreUncheckedUpdateWithoutRepositoryInput>
    create: XOR<RepositoryScoreCreateWithoutRepositoryInput, RepositoryScoreUncheckedCreateWithoutRepositoryInput>
  }

  export type RepositoryScoreUpdateWithWhereUniqueWithoutRepositoryInput = {
    where: RepositoryScoreWhereUniqueInput
    data: XOR<RepositoryScoreUpdateWithoutRepositoryInput, RepositoryScoreUncheckedUpdateWithoutRepositoryInput>
  }

  export type RepositoryScoreUpdateManyWithWhereWithoutRepositoryInput = {
    where: RepositoryScoreScalarWhereInput
    data: XOR<RepositoryScoreUpdateManyMutationInput, RepositoryScoreUncheckedUpdateManyWithoutRepositoryInput>
  }

  export type RepositoryScoreScalarWhereInput = {
    AND?: RepositoryScoreScalarWhereInput | RepositoryScoreScalarWhereInput[]
    OR?: RepositoryScoreScalarWhereInput[]
    NOT?: RepositoryScoreScalarWhereInput | RepositoryScoreScalarWhereInput[]
    id?: StringFilter<"RepositoryScore"> | string
    repositoryId?: StringFilter<"RepositoryScore"> | string
    analysisId?: StringNullableFilter<"RepositoryScore"> | string | null
    qualityScore?: IntNullableFilter<"RepositoryScore"> | number | null
    archScore?: IntNullableFilter<"RepositoryScore"> | number | null
    docScore?: IntNullableFilter<"RepositoryScore"> | number | null
    testScore?: IntNullableFilter<"RepositoryScore"> | number | null
    securityScore?: IntNullableFilter<"RepositoryScore"> | number | null
    maintainScore?: IntNullableFilter<"RepositoryScore"> | number | null
    deployReady?: FloatNullableFilter<"RepositoryScore"> | number | null
    techDebt?: StringNullableFilter<"RepositoryScore"> | string | null
    createdAt?: DateTimeFilter<"RepositoryScore"> | Date | string
  }

  export type AnalysisUpsertWithWhereUniqueWithoutRepositoriesInput = {
    where: AnalysisWhereUniqueInput
    update: XOR<AnalysisUpdateWithoutRepositoriesInput, AnalysisUncheckedUpdateWithoutRepositoriesInput>
    create: XOR<AnalysisCreateWithoutRepositoriesInput, AnalysisUncheckedCreateWithoutRepositoriesInput>
  }

  export type AnalysisUpdateWithWhereUniqueWithoutRepositoriesInput = {
    where: AnalysisWhereUniqueInput
    data: XOR<AnalysisUpdateWithoutRepositoriesInput, AnalysisUncheckedUpdateWithoutRepositoriesInput>
  }

  export type AnalysisUpdateManyWithWhereWithoutRepositoriesInput = {
    where: AnalysisScalarWhereInput
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyWithoutRepositoriesInput>
  }

  export type UserCreateWithoutAnalysesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileCreateNestedOneWithoutUserInput
    conversations?: AiConversationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAnalysesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileUncheckedCreateNestedOneWithoutUserInput
    conversations?: AiConversationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAnalysesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnalysesInput, UserUncheckedCreateWithoutAnalysesInput>
  }

  export type AnalysisScoreCreateWithoutAnalysisInput = {
    id?: string
    category: string
    score: number
    confidence: number
    evidence?: string | null
    suggestions?: string | null
  }

  export type AnalysisScoreUncheckedCreateWithoutAnalysisInput = {
    id?: string
    category: string
    score: number
    confidence: number
    evidence?: string | null
    suggestions?: string | null
  }

  export type AnalysisScoreCreateOrConnectWithoutAnalysisInput = {
    where: AnalysisScoreWhereUniqueInput
    create: XOR<AnalysisScoreCreateWithoutAnalysisInput, AnalysisScoreUncheckedCreateWithoutAnalysisInput>
  }

  export type AnalysisScoreCreateManyAnalysisInputEnvelope = {
    data: AnalysisScoreCreateManyAnalysisInput | AnalysisScoreCreateManyAnalysisInput[]
    skipDuplicates?: boolean
  }

  export type RepositoryCreateWithoutAnalysesInput = {
    id?: string
    githubId: number
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
    profile: GithubProfileCreateNestedOneWithoutRepositoriesInput
    repoScores?: RepositoryScoreCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryUncheckedCreateWithoutAnalysesInput = {
    id?: string
    githubId: number
    profileId: string
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
    repoScores?: RepositoryScoreUncheckedCreateNestedManyWithoutRepositoryInput
  }

  export type RepositoryCreateOrConnectWithoutAnalysesInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutAnalysesInput, RepositoryUncheckedCreateWithoutAnalysesInput>
  }

  export type RepositoryScoreCreateWithoutAnalysisInput = {
    id?: string
    qualityScore?: number | null
    archScore?: number | null
    docScore?: number | null
    testScore?: number | null
    securityScore?: number | null
    maintainScore?: number | null
    deployReady?: number | null
    techDebt?: string | null
    createdAt?: Date | string
    repository: RepositoryCreateNestedOneWithoutRepoScoresInput
  }

  export type RepositoryScoreUncheckedCreateWithoutAnalysisInput = {
    id?: string
    repositoryId: string
    qualityScore?: number | null
    archScore?: number | null
    docScore?: number | null
    testScore?: number | null
    securityScore?: number | null
    maintainScore?: number | null
    deployReady?: number | null
    techDebt?: string | null
    createdAt?: Date | string
  }

  export type RepositoryScoreCreateOrConnectWithoutAnalysisInput = {
    where: RepositoryScoreWhereUniqueInput
    create: XOR<RepositoryScoreCreateWithoutAnalysisInput, RepositoryScoreUncheckedCreateWithoutAnalysisInput>
  }

  export type RepositoryScoreCreateManyAnalysisInputEnvelope = {
    data: RepositoryScoreCreateManyAnalysisInput | RepositoryScoreCreateManyAnalysisInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAnalysesInput = {
    update: XOR<UserUpdateWithoutAnalysesInput, UserUncheckedUpdateWithoutAnalysesInput>
    create: XOR<UserCreateWithoutAnalysesInput, UserUncheckedCreateWithoutAnalysesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnalysesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnalysesInput, UserUncheckedUpdateWithoutAnalysesInput>
  }

  export type UserUpdateWithoutAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUpdateOneWithoutUserNestedInput
    conversations?: AiConversationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUncheckedUpdateOneWithoutUserNestedInput
    conversations?: AiConversationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AnalysisScoreUpsertWithWhereUniqueWithoutAnalysisInput = {
    where: AnalysisScoreWhereUniqueInput
    update: XOR<AnalysisScoreUpdateWithoutAnalysisInput, AnalysisScoreUncheckedUpdateWithoutAnalysisInput>
    create: XOR<AnalysisScoreCreateWithoutAnalysisInput, AnalysisScoreUncheckedCreateWithoutAnalysisInput>
  }

  export type AnalysisScoreUpdateWithWhereUniqueWithoutAnalysisInput = {
    where: AnalysisScoreWhereUniqueInput
    data: XOR<AnalysisScoreUpdateWithoutAnalysisInput, AnalysisScoreUncheckedUpdateWithoutAnalysisInput>
  }

  export type AnalysisScoreUpdateManyWithWhereWithoutAnalysisInput = {
    where: AnalysisScoreScalarWhereInput
    data: XOR<AnalysisScoreUpdateManyMutationInput, AnalysisScoreUncheckedUpdateManyWithoutAnalysisInput>
  }

  export type AnalysisScoreScalarWhereInput = {
    AND?: AnalysisScoreScalarWhereInput | AnalysisScoreScalarWhereInput[]
    OR?: AnalysisScoreScalarWhereInput[]
    NOT?: AnalysisScoreScalarWhereInput | AnalysisScoreScalarWhereInput[]
    id?: StringFilter<"AnalysisScore"> | string
    analysisId?: StringFilter<"AnalysisScore"> | string
    category?: StringFilter<"AnalysisScore"> | string
    score?: IntFilter<"AnalysisScore"> | number
    confidence?: FloatFilter<"AnalysisScore"> | number
    evidence?: StringNullableFilter<"AnalysisScore"> | string | null
    suggestions?: StringNullableFilter<"AnalysisScore"> | string | null
  }

  export type RepositoryUpsertWithWhereUniqueWithoutAnalysesInput = {
    where: RepositoryWhereUniqueInput
    update: XOR<RepositoryUpdateWithoutAnalysesInput, RepositoryUncheckedUpdateWithoutAnalysesInput>
    create: XOR<RepositoryCreateWithoutAnalysesInput, RepositoryUncheckedCreateWithoutAnalysesInput>
  }

  export type RepositoryUpdateWithWhereUniqueWithoutAnalysesInput = {
    where: RepositoryWhereUniqueInput
    data: XOR<RepositoryUpdateWithoutAnalysesInput, RepositoryUncheckedUpdateWithoutAnalysesInput>
  }

  export type RepositoryUpdateManyWithWhereWithoutAnalysesInput = {
    where: RepositoryScalarWhereInput
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyWithoutAnalysesInput>
  }

  export type RepositoryScoreUpsertWithWhereUniqueWithoutAnalysisInput = {
    where: RepositoryScoreWhereUniqueInput
    update: XOR<RepositoryScoreUpdateWithoutAnalysisInput, RepositoryScoreUncheckedUpdateWithoutAnalysisInput>
    create: XOR<RepositoryScoreCreateWithoutAnalysisInput, RepositoryScoreUncheckedCreateWithoutAnalysisInput>
  }

  export type RepositoryScoreUpdateWithWhereUniqueWithoutAnalysisInput = {
    where: RepositoryScoreWhereUniqueInput
    data: XOR<RepositoryScoreUpdateWithoutAnalysisInput, RepositoryScoreUncheckedUpdateWithoutAnalysisInput>
  }

  export type RepositoryScoreUpdateManyWithWhereWithoutAnalysisInput = {
    where: RepositoryScoreScalarWhereInput
    data: XOR<RepositoryScoreUpdateManyMutationInput, RepositoryScoreUncheckedUpdateManyWithoutAnalysisInput>
  }

  export type AnalysisCreateWithoutScoresInput = {
    id?: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAnalysesInput
    repositories?: RepositoryCreateNestedManyWithoutAnalysesInput
    repoScores?: RepositoryScoreCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisUncheckedCreateWithoutScoresInput = {
    id?: string
    userId: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    repositories?: RepositoryUncheckedCreateNestedManyWithoutAnalysesInput
    repoScores?: RepositoryScoreUncheckedCreateNestedManyWithoutAnalysisInput
  }

  export type AnalysisCreateOrConnectWithoutScoresInput = {
    where: AnalysisWhereUniqueInput
    create: XOR<AnalysisCreateWithoutScoresInput, AnalysisUncheckedCreateWithoutScoresInput>
  }

  export type AnalysisUpsertWithoutScoresInput = {
    update: XOR<AnalysisUpdateWithoutScoresInput, AnalysisUncheckedUpdateWithoutScoresInput>
    create: XOR<AnalysisCreateWithoutScoresInput, AnalysisUncheckedCreateWithoutScoresInput>
    where?: AnalysisWhereInput
  }

  export type AnalysisUpdateToOneWithWhereWithoutScoresInput = {
    where?: AnalysisWhereInput
    data: XOR<AnalysisUpdateWithoutScoresInput, AnalysisUncheckedUpdateWithoutScoresInput>
  }

  export type AnalysisUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAnalysesNestedInput
    repositories?: RepositoryUpdateManyWithoutAnalysesNestedInput
    repoScores?: RepositoryScoreUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateWithoutScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repositories?: RepositoryUncheckedUpdateManyWithoutAnalysesNestedInput
    repoScores?: RepositoryScoreUncheckedUpdateManyWithoutAnalysisNestedInput
  }

  export type RepositoryCreateWithoutRepoScoresInput = {
    id?: string
    githubId: number
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
    profile: GithubProfileCreateNestedOneWithoutRepositoriesInput
    analyses?: AnalysisCreateNestedManyWithoutRepositoriesInput
  }

  export type RepositoryUncheckedCreateWithoutRepoScoresInput = {
    id?: string
    githubId: number
    profileId: string
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
    analyses?: AnalysisUncheckedCreateNestedManyWithoutRepositoriesInput
  }

  export type RepositoryCreateOrConnectWithoutRepoScoresInput = {
    where: RepositoryWhereUniqueInput
    create: XOR<RepositoryCreateWithoutRepoScoresInput, RepositoryUncheckedCreateWithoutRepoScoresInput>
  }

  export type AnalysisCreateWithoutRepoScoresInput = {
    id?: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutAnalysesInput
    scores?: AnalysisScoreCreateNestedManyWithoutAnalysisInput
    repositories?: RepositoryCreateNestedManyWithoutAnalysesInput
  }

  export type AnalysisUncheckedCreateWithoutRepoScoresInput = {
    id?: string
    userId: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    scores?: AnalysisScoreUncheckedCreateNestedManyWithoutAnalysisInput
    repositories?: RepositoryUncheckedCreateNestedManyWithoutAnalysesInput
  }

  export type AnalysisCreateOrConnectWithoutRepoScoresInput = {
    where: AnalysisWhereUniqueInput
    create: XOR<AnalysisCreateWithoutRepoScoresInput, AnalysisUncheckedCreateWithoutRepoScoresInput>
  }

  export type RepositoryUpsertWithoutRepoScoresInput = {
    update: XOR<RepositoryUpdateWithoutRepoScoresInput, RepositoryUncheckedUpdateWithoutRepoScoresInput>
    create: XOR<RepositoryCreateWithoutRepoScoresInput, RepositoryUncheckedCreateWithoutRepoScoresInput>
    where?: RepositoryWhereInput
  }

  export type RepositoryUpdateToOneWithWhereWithoutRepoScoresInput = {
    where?: RepositoryWhereInput
    data: XOR<RepositoryUpdateWithoutRepoScoresInput, RepositoryUncheckedUpdateWithoutRepoScoresInput>
  }

  export type RepositoryUpdateWithoutRepoScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: GithubProfileUpdateOneRequiredWithoutRepositoriesNestedInput
    analyses?: AnalysisUpdateManyWithoutRepositoriesNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutRepoScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    analyses?: AnalysisUncheckedUpdateManyWithoutRepositoriesNestedInput
  }

  export type AnalysisUpsertWithoutRepoScoresInput = {
    update: XOR<AnalysisUpdateWithoutRepoScoresInput, AnalysisUncheckedUpdateWithoutRepoScoresInput>
    create: XOR<AnalysisCreateWithoutRepoScoresInput, AnalysisUncheckedCreateWithoutRepoScoresInput>
    where?: AnalysisWhereInput
  }

  export type AnalysisUpdateToOneWithWhereWithoutRepoScoresInput = {
    where?: AnalysisWhereInput
    data: XOR<AnalysisUpdateWithoutRepoScoresInput, AnalysisUncheckedUpdateWithoutRepoScoresInput>
  }

  export type AnalysisUpdateWithoutRepoScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAnalysesNestedInput
    scores?: AnalysisScoreUpdateManyWithoutAnalysisNestedInput
    repositories?: RepositoryUpdateManyWithoutAnalysesNestedInput
  }

  export type AnalysisUncheckedUpdateWithoutRepoScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scores?: AnalysisScoreUncheckedUpdateManyWithoutAnalysisNestedInput
    repositories?: RepositoryUncheckedUpdateManyWithoutAnalysesNestedInput
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileCreateNestedOneWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    githubProfile?: GithubProfileUncheckedCreateNestedOneWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUpdateOneWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    githubProfile?: GithubProfileUncheckedUpdateOneWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnalysisCreateManyUserInput = {
    id?: string
    status?: string
    overallScore?: number | null
    engineerLevel?: string | null
    confidenceScore?: number | null
    strengths?: AnalysisCreatestrengthsInput | string[]
    gaps?: AnalysisCreategapsInput | string[]
    summary?: string | null
    costCents?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AiConversationCreateManyUserInput = {
    id?: string
    messages: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scores?: AnalysisScoreUpdateManyWithoutAnalysisNestedInput
    repositories?: RepositoryUpdateManyWithoutAnalysesNestedInput
    repoScores?: RepositoryScoreUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scores?: AnalysisScoreUncheckedUpdateManyWithoutAnalysisNestedInput
    repositories?: RepositoryUncheckedUpdateManyWithoutAnalysesNestedInput
    repoScores?: RepositoryScoreUncheckedUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AiConversationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    messages?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConversationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    messages?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiConversationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    messages?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryCreateManyProfileInput = {
    id?: string
    githubId: number
    name: string
    fullName: string
    description?: string | null
    htmlUrl: string
    homepage?: string | null
    language?: string | null
    stargazersCount?: number
    forksCount?: number
    openIssuesCount?: number
    watchersCount?: number
    size?: number
    defaultBranch?: string
    isPrivate?: boolean
    isFork?: boolean
    topics?: RepositoryCreatetopicsInput | string[]
    license?: string | null
    hasReadme?: boolean
    hasIssues?: boolean
    hasWiki?: boolean
    hasPages?: boolean
    createdAt: Date | string
    updatedAt?: Date | string
    lastPushedAt?: Date | string | null
  }

  export type RepositoryUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repoScores?: RepositoryScoreUpdateManyWithoutRepositoryNestedInput
    analyses?: AnalysisUpdateManyWithoutRepositoriesNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repoScores?: RepositoryScoreUncheckedUpdateManyWithoutRepositoryNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutRepositoriesNestedInput
  }

  export type RepositoryUncheckedUpdateManyWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepositoryScoreCreateManyRepositoryInput = {
    id?: string
    analysisId?: string | null
    qualityScore?: number | null
    archScore?: number | null
    docScore?: number | null
    testScore?: number | null
    securityScore?: number | null
    maintainScore?: number | null
    deployReady?: number | null
    techDebt?: string | null
    createdAt?: Date | string
  }

  export type RepositoryScoreUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    analysis?: AnalysisUpdateOneWithoutRepoScoresNestedInput
  }

  export type RepositoryScoreUncheckedUpdateWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisId?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryScoreUncheckedUpdateManyWithoutRepositoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    analysisId?: NullableStringFieldUpdateOperationsInput | string | null
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisUpdateWithoutRepositoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutAnalysesNestedInput
    scores?: AnalysisScoreUpdateManyWithoutAnalysisNestedInput
    repoScores?: RepositoryScoreUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateWithoutRepositoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scores?: AnalysisScoreUncheckedUpdateManyWithoutAnalysisNestedInput
    repoScores?: RepositoryScoreUncheckedUpdateManyWithoutAnalysisNestedInput
  }

  export type AnalysisUncheckedUpdateManyWithoutRepositoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    overallScore?: NullableIntFieldUpdateOperationsInput | number | null
    engineerLevel?: NullableStringFieldUpdateOperationsInput | string | null
    confidenceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    strengths?: AnalysisUpdatestrengthsInput | string[]
    gaps?: AnalysisUpdategapsInput | string[]
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    costCents?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalysisScoreCreateManyAnalysisInput = {
    id?: string
    category: string
    score: number
    confidence: number
    evidence?: string | null
    suggestions?: string | null
  }

  export type RepositoryScoreCreateManyAnalysisInput = {
    id?: string
    repositoryId: string
    qualityScore?: number | null
    archScore?: number | null
    docScore?: number | null
    testScore?: number | null
    securityScore?: number | null
    maintainScore?: number | null
    deployReady?: number | null
    techDebt?: string | null
    createdAt?: Date | string
  }

  export type AnalysisScoreUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    suggestions?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnalysisScoreUncheckedUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    suggestions?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnalysisScoreUncheckedUpdateManyWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    evidence?: NullableStringFieldUpdateOperationsInput | string | null
    suggestions?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RepositoryUpdateWithoutAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: GithubProfileUpdateOneRequiredWithoutRepositoriesNestedInput
    repoScores?: RepositoryScoreUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateWithoutAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    repoScores?: RepositoryScoreUncheckedUpdateManyWithoutRepositoryNestedInput
  }

  export type RepositoryUncheckedUpdateManyWithoutAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    githubId?: IntFieldUpdateOperationsInput | number
    profileId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    htmlUrl?: StringFieldUpdateOperationsInput | string
    homepage?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    stargazersCount?: IntFieldUpdateOperationsInput | number
    forksCount?: IntFieldUpdateOperationsInput | number
    openIssuesCount?: IntFieldUpdateOperationsInput | number
    watchersCount?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    defaultBranch?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    isFork?: BoolFieldUpdateOperationsInput | boolean
    topics?: RepositoryUpdatetopicsInput | string[]
    license?: NullableStringFieldUpdateOperationsInput | string | null
    hasReadme?: BoolFieldUpdateOperationsInput | boolean
    hasIssues?: BoolFieldUpdateOperationsInput | boolean
    hasWiki?: BoolFieldUpdateOperationsInput | boolean
    hasPages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastPushedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RepositoryScoreUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    repository?: RepositoryUpdateOneRequiredWithoutRepoScoresNestedInput
  }

  export type RepositoryScoreUncheckedUpdateWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RepositoryScoreUncheckedUpdateManyWithoutAnalysisInput = {
    id?: StringFieldUpdateOperationsInput | string
    repositoryId?: StringFieldUpdateOperationsInput | string
    qualityScore?: NullableIntFieldUpdateOperationsInput | number | null
    archScore?: NullableIntFieldUpdateOperationsInput | number | null
    docScore?: NullableIntFieldUpdateOperationsInput | number | null
    testScore?: NullableIntFieldUpdateOperationsInput | number | null
    securityScore?: NullableIntFieldUpdateOperationsInput | number | null
    maintainScore?: NullableIntFieldUpdateOperationsInput | number | null
    deployReady?: NullableFloatFieldUpdateOperationsInput | number | null
    techDebt?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
// 1 Transform the type to flag all the undesired keys as 'never'
type FlagExcludedType<Base, Type> = { [Key in keyof Base]: Base[Key] extends Type ? never : Key };

// 2 Get the keys that are not flagged as 'never'
type AllowedNames<Base, Type> = FlagExcludedType<Base, Type>[keyof Base];

// 3 Use this with a simple Pick to get the right interface, excluding the undesired type
type OmitType<Base, Type> = Pick<Base, AllowedNames<Base, Type>>;

// 4 Exclude the Function type to only get properties
// eslint-disable-next-line @typescript-eslint/ban-types
type ConstructorType<T> = OmitType<T, Function>;

export type WithoutMethods<T> = ConstructorType<T>

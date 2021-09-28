/**
 * Make T mutable
 *
 * @see https://stackoverflow.com/a/46634877
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

import 'reflect-metadata';

export const METADATA_KEY = Symbol('TrackChanges');

export function TrackChanges(): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    let existingProperties: Array<string | symbol> = Reflect.getMetadata(
      METADATA_KEY,
      target.constructor,
    );
    if (existingProperties) {
      existingProperties.push(propertyKey);
    } else {
      existingProperties = [propertyKey];
      Reflect.defineMetadata(
        METADATA_KEY,
        existingProperties,
        target.constructor,
      );
    }
  };
}

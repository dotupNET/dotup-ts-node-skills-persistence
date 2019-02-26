import { IRequestAttributes } from 'dotup-ts-node-skills/dist/Attributes/IRequestAttributes';

declare module 'dotup-ts-node-skills/dist/Attributes/IRequestAttributes' {
  export interface IRequestAttributes {
    persistentAttributes: {
      [key: string]: any;
    };
    // setPersistentAttributes(persistentAttributes: {
    //   [key: string]: any;
    // }): void;
  }
}

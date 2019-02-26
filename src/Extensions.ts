// tslint:disable: interface-name
// tslint:disable: no-submodule-imports
import { PersistenceAdapter } from 'ask-sdk-core';
import { IRequestAttributes } from 'dotup-ts-node-skills/dist/Attributes/IRequestAttributes';
import { NodeSkill } from 'dotup-ts-node-skills/dist/NodeSkill';

declare module 'dotup-ts-node-skills/dist/Attributes/IRequestAttributes' {
  export interface IRequestAttributes {
    savePersistentAttributes: boolean;
    persistentAttributes: {
      // tslint:disable-next-line: no-any
      [key: string]: any;
    };
  }
}

declare module 'dotup-ts-node-skills/dist/NodeSkill' {
  export interface NodeSkill {
    addPersistenceAdapter(adapter: PersistenceAdapter): void;
  }
}

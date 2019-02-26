import { CustomSkillBuilder } from 'ask-sdk-core';
import { IPlugin, NodeSkill } from 'dotup-ts-node-skills';

export class PersistencePlugin implements IPlugin {

  initialize(skillBuilder: CustomSkillBuilder): void {
    NodeSkill.prototype.addPersistenceAdapter = (adapter) => {
      skillBuilder.withPersistenceAdapter(adapter);
    };
  }

}

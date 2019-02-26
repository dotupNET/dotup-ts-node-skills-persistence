import { CustomSkillBuilder } from 'ask-sdk-core';
import { LoggerFactory } from 'dotup-ts-logger';
import { IPlugin, NodeSkill } from 'dotup-ts-node-skills';

export class PersistencePlugin implements IPlugin {
  private readonly logger = LoggerFactory.createLogger('PersistencePlugin');

  initialize(skillBuilder: CustomSkillBuilder): void {
    this.logger.Info('plugin initialized', 'initialize');
    NodeSkill.prototype.addPersistenceAdapter = (adapter) => {
      skillBuilder.withPersistenceAdapter(adapter);
    };
  }

}

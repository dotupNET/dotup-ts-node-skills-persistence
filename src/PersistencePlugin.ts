import { CustomSkillBuilder } from 'ask-sdk-core';
import { LoggerFactory } from 'dotup-ts-logger';
import { Environment, IPlugin, RuntimeContext } from 'dotup-ts-node-skills';
import { IPersistencePluginConfiguration } from './IPersistencePluginConfiguration';
import { PersistenceAdapterFactory } from './PersistenceAdapterFactory';
import { LoadAttributesInterceptor, SaveAttributesInterceptor } from './AttributesInterceptor';

export class PersistencePlugin implements IPlugin {
  private readonly logger = LoggerFactory.createLogger('PersistencePlugin');
  private readonly config: IPersistencePluginConfiguration;

  constructor(config: IPersistencePluginConfiguration) {
    this.config = config;
  }
  initialize(skillBuilder: CustomSkillBuilder): void {

    if (Environment.NODE_ENV === RuntimeContext.development) {
      skillBuilder.withPersistenceAdapter(
        PersistenceAdapterFactory.getLocalDynamoDbAdapter(this.config.tableName)
      );
      this.logger.Info('plugin initialized with LOCAL dynamo db', 'initialize');
    } else {
      skillBuilder.withPersistenceAdapter(
        PersistenceAdapterFactory.getDynamoDbAdapter(this.config)
      );
      this.logger.Info('plugin initialized with dynamo db', 'initialize');
    }

    skillBuilder.addRequestInterceptors(new LoadAttributesInterceptor());
    skillBuilder.addResponseInterceptors(new SaveAttributesInterceptor());

    // NodeSkill.prototype.addPersistenceAdapter = (adapter) => {
    //   skillBuilder.withPersistenceAdapter(adapter);
    // };
  }

}

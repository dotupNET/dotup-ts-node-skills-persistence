import { PersistenceAdapter } from 'ask-sdk-core';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter';
import { DynamoDB } from 'aws-sdk';
import { IPersistencePluginConfiguration } from './IPersistencePluginConfiguration';

export namespace PersistenceAdapterFactory {
  export function getLocalDynamoDbAdapter(
    tableName: string,
    createTable: boolean = true,
    settings: DynamoDB.Types.ClientConfiguration = {}
  ): PersistenceAdapter {

    if (settings.apiVersion === undefined) {
      settings.apiVersion = 'latest';
    }

    if (settings.credentials === undefined) {
      settings.credentials = { accessKeyId: 'local', secretAccessKey: 'local' };
    }

    if (settings.endpoint === undefined) {
      settings.endpoint = 'http://localhost:8000';
    }

    if (settings.region === undefined) {
      settings.region = 'local';
    }

    return new DynamoDbPersistenceAdapter({
      tableName: tableName,
      createTable: createTable,
      dynamoDBClient: new DynamoDB(settings)
    });
  }

  export function getDynamoDbAdapter(config: IPersistencePluginConfiguration): PersistenceAdapter {
    return new DynamoDbPersistenceAdapter(config);
  }
}

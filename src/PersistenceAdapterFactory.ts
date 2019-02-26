import { PersistenceAdapter } from 'ask-sdk-core';
import { DynamoDB } from 'aws-sdk';
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter';

export namespace PersistenceAdapterFactory {

  export function getLocalDynamoDbAdapter(tableName: string, settings: DynamoDB.Types.ClientConfiguration): PersistenceAdapter {
    settings.apiVersion = settings.apiVersion ? settings.apiVersion : 'latest';
    settings.credentials = settings.credentials ? settings.credentials : { accessKeyId: 'local', secretAccessKey: 'local' };
    settings.endpoint = settings.endpoint ? settings.endpoint : 'http://localhost:8000';
    settings.region = settings.region ? settings.region : 'local';

    const persistenceAdapter = new DynamoDbPersistenceAdapter({
      tableName: tableName,
      createTable: false,
      dynamoDBClient: new DynamoDB(settings)
    });

    return persistenceAdapter;
  }

  export function getDynamoDbAdapter(tableName: string): PersistenceAdapter {

    const persistenceAdapter = new DynamoDbPersistenceAdapter({
      tableName: tableName,
      createTable: false
    });

    return persistenceAdapter;
  }
}

import { PartitionKeyGenerator } from 'ask-sdk-dynamodb-persistence-adapter';
import { DynamoDB } from 'aws-sdk';

export interface IPersistencePluginConfiguration {
  tableName: string;
  partitionKeyName?: string;
  attributesName?: string;
  createTable?: boolean;
  dynamoDBClient?: DynamoDB;
  partitionKeyGenerator?: PartitionKeyGenerator;
}

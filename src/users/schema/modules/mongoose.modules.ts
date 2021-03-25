import { ModelDefinition } from '@nestjs/mongoose';
import { ApiKeySchema, APIKEY_COLLECTION, APIKEY_DOCUMENT } from '../apiKey.schema';
import { RolesSchema, ROLE_COLLECTION, ROLE_DOCUMENT } from '../roles.schema';
import { UserSchema, USER_COLLECTION, USER_DOCUMENT } from '../users.schema';

export const forfeature: ModelDefinition[] = [
  { name: USER_DOCUMENT, schema: UserSchema, collection: USER_COLLECTION },
  { name: ROLE_DOCUMENT, schema: RolesSchema, collection: ROLE_COLLECTION },
  { name: APIKEY_DOCUMENT, schema: ApiKeySchema, collection: APIKEY_COLLECTION },
];

import * as faker from 'faker';
import { defineConfig } from 'orval';
import transformer from './api/transformer/add-version.js';

export default defineConfig({
  'petstore-file': {
    input: './petstore.yaml',
    output: './api/endpoints/petstoreFromFileSpecWithConfig.ts',
  },
  'petstore-file-transfomer': {
    output: {
      target: './api/endpoints/petstoreFromFileSpecWithTransformer.ts',
      schemas: './api/model',
      mock: true,
      override: {
        operations: {
          listPets: {
            mutator: './api/mutator/response-type.ts',
            mock: {
              properties: () => {
                return {
                  id: faker.random.number({ min: 1, max: 9 }),
                };
              },
            },
          },
          showPetById: {
            mock: {
              data: () => ({
                id: faker.random.number({ min: 1, max: 99 }),
                name: faker.name.firstName(),
                tag: faker.helpers.randomize([faker.random.word(), undefined]),
              }),
            },
          },
        },
        mock: {
          properties: {
            '/tag|name/': 'jon',
          },
        },
      },
    },
    input: {
      target: './petstore.yaml',
      override: {
        transformer,
      },
    },
  },
});

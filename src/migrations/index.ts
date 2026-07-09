import * as migration_20260703_035613_initial from './20260703_035613_initial';
import * as migration_20260703_080826_phase02_collections from './20260703_080826_phase02_collections';
import * as migration_20260708_130046 from './20260708_130046';
import * as migration_20260708_134955_add_brands_collection from './20260708_134955_add_brands_collection';

export const migrations = [
  {
    up: migration_20260703_035613_initial.up,
    down: migration_20260703_035613_initial.down,
    name: '20260703_035613_initial',
  },
  {
    up: migration_20260703_080826_phase02_collections.up,
    down: migration_20260703_080826_phase02_collections.down,
    name: '20260703_080826_phase02_collections',
  },
  {
    up: migration_20260708_130046.up,
    down: migration_20260708_130046.down,
    name: '20260708_130046',
  },
  {
    up: migration_20260708_134955_add_brands_collection.up,
    down: migration_20260708_134955_add_brands_collection.down,
    name: '20260708_134955_add_brands_collection'
  },
];

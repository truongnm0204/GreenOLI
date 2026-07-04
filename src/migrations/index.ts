import * as migration_20260703_035613_initial from './20260703_035613_initial';
import * as migration_20260703_080826_phase02_collections from './20260703_080826_phase02_collections';

export const migrations = [
  {
    up: migration_20260703_035613_initial.up,
    down: migration_20260703_035613_initial.down,
    name: '20260703_035613_initial',
  },
  {
    up: migration_20260703_080826_phase02_collections.up,
    down: migration_20260703_080826_phase02_collections.down,
    name: '20260703_080826_phase02_collections'
  },
];

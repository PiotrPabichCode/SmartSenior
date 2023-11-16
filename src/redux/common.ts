import type { StoreType } from './store';

let store: StoreType;
export const injectStore = (_store: StoreType) => {
  store = _store;
};

export { store };

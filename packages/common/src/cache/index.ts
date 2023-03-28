import { createStorage as create, CreateStorageParams } from './storageCache';


const createOptions = (storage: Storage, options?: CreateStorageParams): CreateStorageParams => {
    return {
      // No encryption in debug mode
      storage,
      prefixKey: "__v1__",
      hasEncrypt:false,
      ...options,
    };
  };

export const WebStorage = create(createOptions(localStorage));

export default WebStorage;

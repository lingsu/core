export type CreateStorageParams = {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: number;
};

export const createStorage = ({
  prefixKey,
  storage,
  hasEncrypt,
  timeout,
}: CreateStorageParams) => {
  const clear = () => {
    storage.clear();
  };
  const getKey = (key: string) => {
    return `${prefixKey}${key}`.toUpperCase();
  };
  const remove = (key: string) => {
    storage.removeItem(getKey(key));
  };

  const set = (key: string, value: any, expire?: number) => {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: expire ? new Date().getTime() + expire * 1000 : null,
    });
    // const stringifyValue = hasEncrypt ? encryption.encryptByAES(stringData) : stringData;
    const stringifyValue = hasEncrypt ? stringData : stringData;
    storage.setItem(getKey(key), stringifyValue);
  }

  const get = (key: string, def: any = null) => {
    const val = storage.getItem(getKey(key));
    if (!val) return def;

    try {
      const decVal = hasEncrypt ? val : val;
      const data = JSON.parse(decVal);
      const { value, expire } = data;
      if (!expire || expire >= new Date().getTime()) {
        return value;
      }
      remove(key);
    } catch (e) {
      return def;
    }
  }

  return {
    clear,
    getKey,
    remove,
    set,
    get
  };
};

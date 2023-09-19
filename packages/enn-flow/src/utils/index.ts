export const internalsSymbol = Symbol.for('internals');

export const devWarn = (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Enn Flow]: ${message}`);
    }
  };
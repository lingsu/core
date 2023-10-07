import { createContext } from 'react';
import { ReactBladeState } from '../typing';


const BladeContext = createContext<ReactBladeState | null>(null);
export const Provider = BladeContext.Provider;
export default BladeContext;

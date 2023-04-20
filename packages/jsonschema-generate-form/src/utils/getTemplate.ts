import { Registry, TemplatesType } from "../typing";

export default <Name extends keyof TemplatesType>(name: Name, registry: Registry) => {
    const { templates } = registry;

    return templates[name];
}
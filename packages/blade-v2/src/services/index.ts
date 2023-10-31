import { BladeConfig, BladeRequest } from "../typing";
import { bladeUserService } from "./system/bladeUserService";
import { dictService } from "./system/dictService";
import { fileService } from "./system/fileService";
import { regionService } from "./system/regionService";

export const createServices =  (request: BladeRequest, config: BladeConfig) => {
  return {
    bladeUser: bladeUserService(request, config),
    dict: dictService(request, config),
    file: fileService(request, config),
    region: regionService(request, config),
  };
};

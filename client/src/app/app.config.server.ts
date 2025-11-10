import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    // provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

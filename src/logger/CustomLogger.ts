import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    // super.error(message, optionalParams);
    console.log(message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    // super.error(message, optionalParams);
    console.log(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    // super.error(message, optionalParams);
    console.log(message, optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    // super.error(message, optionalParams);
    console.log(message, optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    // super.error(message, optionalParams);
    console.log(message, optionalParams);
  }
}

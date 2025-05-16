import logger from './logger';

export class CustomError extends Error {
  code: number;
  originalError?: unknown;

  constructor(message: string, code: number, originalError?: unknown) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.originalError = originalError;
    Object.setPrototypeOf(this, CustomError.prototype);

    logger.error(this.formatError());
  }

  formatError() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      stack: this.stack,
      originalError: this.originalError,
    };
  }
}

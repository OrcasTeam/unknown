import * as Path from 'path';
import * as StackTrace from 'stacktrace-js';
import * as Log4js from 'log4js';
import config from './config/log4js';

// 注入配置
Log4js.configure(config);

const loggers = {
  default: Log4js.getLogger(),
  error: Log4js.getLogger('error'),
  warn: Log4js.getLogger('warn'),
};

export class Logger {
  static trace(...args) {
    loggers['default'].trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args) {
    loggers['default'].debug(Logger.getStackTrace(), ...args);
  }

  static log(...args) {
    loggers['default'].info(Logger.getStackTrace(), ...args);
  }

  static info(...args) {
    loggers['default'].info(Logger.getStackTrace(), ...args);
  }

  static warn(...args) {
    loggers['warn'].warn(Logger.getStackTrace(), ...args);
  }

  static error(...args) {
    loggers['error'].error(Logger.getStackTrace(), ...args);
  }

  static access(...args) {
    loggers['default'].info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}

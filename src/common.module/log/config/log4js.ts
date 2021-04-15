import { Configuration } from 'log4js';
import { resolve } from '../../utls/helper';

const fileConfig = (filename: string) => {
  return {
    type: 'dateFile',
    filename: `${resolve('logs')}/${filename}/${filename}.log`,
    alwaysIncludePattern: true,
    layout: {
      type: 'pattern',
      pattern:
        '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
    },
    pattern: 'yyyyMMdd',
    daysToKeep: 60,
    numBackups: 3,
    keepFileExt: true,
  };
};

const log4jsConfig: Configuration = {
  appenders: {
    console: {
      type: 'stderr',
    },
    default: fileConfig('default'),

    warnFile: fileConfig('warn'),

    errorFile: fileConfig('error'),
    //
    warn: {
      type: 'logLevelFilter',
      level: 'WARN',
      appender: 'warnFile',
    },

    error: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },

  categories: {
    default: {
      appenders: ['console', 'default'],
      level: 'info',
    },
    warn: { appenders: ['console', 'warn'], level: 'warn' },
    error: { appenders: ['console', 'error'], level: 'error' },
  },
  pm2: true, // 使用 pm2 来管理项目时，打开
  pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};

export default log4jsConfig;

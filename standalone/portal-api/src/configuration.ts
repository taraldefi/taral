import config from 'config';

export class AppConfig {
    nodeEnv: string;
    name: string;
    workingDirectory: string;
    frontendDomain: string;
    backendDomain: string;
    port: number;
    apiPrefix: string;
    fallbackLanguage: string;
    appUrl: string;
    audience: string;
    isSameSite: boolean;
}

export class ThrottleConfig {
    enabled: boolean;
    global: {
        ttl: number;
        limit: number;
    };
    login: {
        prefix: string;
        limit: number;
        duration: number;
        blockDuration: number;
    };
}

export class MailConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
    defaultEmail: string;
    defaultName: string;
    preview: boolean;
    ignoreTls: boolean;
    secure: boolean;
    requireTls: boolean;
    queueName: string;
}

export class DbConfig {
    url: string;
    type: string;
    host: string;
    port: number;
    password: string;
    name: string;
    username: string;
    synchronize: boolean;
    maxConnections: number;
    sslEnabled: boolean;
    rejectUnauthorized: boolean;
    ca: string;
    key: string;
    cert: string
}

export class RedisConfig {
    host: string;
    port: number;
    password: string;
    username: string;
    db: string;
    driver: string;
}

export class AwsConfig {
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
}

export class QueueConfig {
    host: string;
    port: number;
    password: string;
    username: string;
    db: string;
    driver: string;
}

export class OnchainConfig {
    mock: boolean;
    privateKey: string;
    publicKey: string;
    address: string;
    network: string;
}

export class JwtConfig {
    expiresIn: number;
    refreshExpiresIn: number;
    cookieExpiresIn: number;
    secret: string;
}

export class WinstonConfig {
    groupName: string;
    streamName: string;
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
    awsRegion: string;
}

export class TwoFaConfig {
    authenticationAppNAme: string;
}

export class FileConfig {
    driver: string;
    localDir: string;
}

export class LoggingConfig {
    level: string;
    fluentdlogging: boolean;
}

class ConfigurationKeys {
    environmentKey: string;
    configKey: string;
}

const configurationKeys = {
    runThrottle: {
        environmentKey: "APP_RUN_THROTTLE",
        configKey: "app.runthrottle",
    },
    runChainhook: {
        environmentKey: "APP_RUN_CHAINHOOK",
        configKey: "app.runchainhook",
    },
    runJobs: {
        environmentKey: "APP_RUN_JOBS",
        configKey: "app.runjobs",
    },
    runEvents: {
        environmentKey: "APP_RUN_EVENTS",
        configKey: "app.runevents",
    },
    appName: {
        environmentKey: "APP_NAME",
        configKey: "app.name",
    },
    workingDirectory: {
        environmentKey: "PWD",
        configKey: "app.workingDirectory",
    },
    frontendDomain: {
        environmentKey: "FRONTEND_DOMAIN",
        configKey: "app.frontendDomain",
    },
    backendDomain: {
        environmentKey: "BACKEND_DOMAIN",
        configKey: "app.backendDomain",
    },
    port: {
        environmentKey: "APP_PORT",
        configKey: "app.port",
    },
    apiPrefix: {
        environmentKey: "API_PREFIX",
        configKey: "app.apiPrefix",
    },
    fallbackLanguage: {
        environmentKey: "APP_FALLBACK_LANGUAGE",
        configKey: "app.fallbackLanguage",
    },
    nodeEnv: {
        environmentKey: "NODE_ENV",
        configKey: "app.nodeEnv",
    },
    isSameSite: {
        environmentKey: "APP_IS_SAME_SITE",
        configKey: "app.isSameSite",
    },
    throttle: {
        global: {
            ttl: {
                environmentKey: "THROTTLE_GLOBAL_TTL",
                configKey: "throttle.global.ttl",
            },
            limit: {
                environmentKey: "THROTTLE_GLOBAL_LIMIT",
                configKey: "throttle.global.limit",
            },
        },
        enabled: {
            environmentKey: "THROTTLE_ENABLED",
            configKey: "throttle.enabled",
        },
        login: {
            prefix: {
                environmentKey: "THROTTLE_LOGIN_PREFIX",
                configKey: "throttle.login.prefix",
            },
            limit: {
                environmentKey: "THROTTLE_LOGIN_LIMIT",
                configKey: "throttle.login.limit",
            },
            duration: {
                environmentKey: "THROTTLE_LOGIN_DURATION",
                configKey: "throttle.login.duration",
            },
            blockDuration: {
                environmentKey: "THROTTLE_LOGIN_BLOCK_DURATION",
                configKey: "throttle.login.blockDuration",
            },
        },
    },

    redis: {
        host: {
            environmentKey: "REDIS_HOST",
            configKey: "redis.host",
        },
        port: {
            environmentKey: "REDIS_PORT",
            configKey: "redis.port",
        },
        password: {
            environmentKey: "REDIS_PASSWORD",
            configKey: "redis.password",
        },
        username: {
            environmentKey: "REDIS_USERNAME",
            configKey: "redis.username",
        },
        db: {
            environmentKey: "REDIS_DB",
            configKey: "redis.db",
        },
        driver: {
            environmentKey: "REDIS_DRIVER",
            configKey: "redis.driver",
        },
    },

    queue: {
        host: {
            environmentKey: "REDIS_HOST",
            configKey: "redis.host",
        },
        port: {
            environmentKey: "REDIS_PORT",
            configKey: "redis.port",
        },
        password: {
            environmentKey: "REDIS_PASSWORD",
            configKey: "redis.password",
        },
        username: {
            environmentKey: "REDIS_USERNAME",
            configKey: "redis.username",
        },
        db: {
            environmentKey: "REDIS_DB",
            configKey: "redis.db",
        },
        driver: {
            environmentKey: "REDIS_DRIVER",
            configKey: "redis.driver",
        },
    },

    db: {
        url: {
            environmentKey: "DATABASE_URL",
            configKey: "db.url",
        },
        type: {
            environmentKey: "DATABASE_TYPE",
            configKey: "db.type",
        },
        host: {
            environmentKey: "DATABASE_HOST",
            configKey: "db.host",
        },
        port: {
            environmentKey: "DATABASE_PORT",
            configKey: "db.port",
        },
        password: {
            environmentKey: "DATABASE_PASSWORD",
            configKey: "db.password",
        },
        name: {
            environmentKey: "DATABASE_NAME",
            configKey: "db.name",
        },
        username: {
            environmentKey: "DATABASE_USERNAME",
            configKey: "db.username",
        },
        synchronize: {
            environmentKey: "DATABASE_SYNCHRONIZE",
            configKey: "db.synchronize",
        },
        maxConnections: {
            environmentKey: "DATABASE_MAX_CONNECTIONS",
            configKey: "db.maxConnections",
        },
        sslEnabled: {
            environmentKey: "DATABASE_SSL_ENABLED",
            configKey: "db.sslEnabled",
        },
        rejectUnauthorized: {
            environmentKey: "DATABASE_REJECT_UNAUTHORIZED",
            configKey: "db.rejectUnauthorized",
        },
        ca: {
            environmentKey: "DATABASE_CA",
            configKey: "db.ca",
        },
        key: {
            environmentKey: "DATABASE_KEY",
            configKey: "db.key",
        },
        cert: {
            environmentKey: "DATABASE_CERT",
            configKey: "db.cert",
        },
    },

    mail: {
        host: {
            environmentKey: "MAIL_HOST",
            configKey: "mail.host",
        },
        port: {
            environmentKey: "MAIL_PORT",
            configKey: "mail.port",
        },
        user: {
            environmentKey: "MAIL_USER",
            configKey: "mail.user",
        },
        password: {
            environmentKey: "MAIL_PASSWORD",
            configKey: "mail.password",
        },
        from: {
            environmentKey: "MAIL_FROM",
            configKey: "mail.from",
        },
        defaultEmail: {
            environmentKey: "MAIL_DEFAULT_EMAIL",
            configKey: "mail.defaultEmail",
        },
        defaultName: {
            environmentKey: "MAIL_DEFAULT_NAME",
            configKey: "mail.defaultName",
        },
        preview: {
            environmentKey: "MAIL_PREVIEW",
            configKey: "mail.preview",
        },
        ignoreTls: {
            environmentKey: "MAIL_IGNORE_TLS",
            configKey: "mail.ignoreTls",
        },
        secure: {
            environmentKey: "MAIL_SECURE",
            configKey: "mail.secure",
        },
        requireTls: {
            environmentKey: "MAIL_REQUIRE_TLS",
            configKey: "mail.requireTls",
        },
        queueName: {
            environmentKey: "MAIL_QUEUE_NAME",
            configKey: "mail.queueName",
        },
    },
    jwt: {
        expiresIn: {
            environmentKey: "JWT_EXPIRES_IN",
            configKey: "jwt.expiresIn",
        },
        refreshExpiresIn: {
            environmentKey: "JWT_REFRESH_EXPIRES_IN",
            configKey: "jwt.refreshExpiresIn",
        },
        cookieExpiresIn: {
            environmentKey: "JWT_COOKIE_EXPIRES_IN",
            configKey: "jwt.cookieExpiresIn",
        },
        secret: {
            environmentKey: "JWT_SECRET",
            configKey: "jwt.secret",
        },
    },
    aws: {
        bucket: {
            environmentKey: "AWS_BUCKET",
            configKey: "aws.bucket",
        },
        region: {
            environmentKey: "AWS_REGION",
            configKey: "aws.region",
        },
        accessKeyId: {
            environmentKey: "AWS_ACCESS_KEY_ID",
            configKey: "aws.accessKeyId",
        },
        secretAccessKey: {
            environmentKey: "AWS_SECRET_ACCESS_KEY",
            configKey: "aws.secretAccessKey",
        },
    },

    file: {
        driver: {
            environmentKey: "FILE_DRIVER",
            configKey: "file.driver",
        },
        localDir: {
            environmentKey: "FILE_LOCAL_DIR",
            configKey: "file.localDir",
        },
    },

    logging: {
        level: {
            environmentKey: "LOGGING_LEVEL",
            configKey: "logging.level",
        },
        fluentdlogging: {
            environmentKey: "LOGGING_FLUENTDLOGGING",
            configKey: "logging.fluentdlogging",
        },
    },

    onchain: {
        mock: {
            environmentKey: "ONCHAIN_MOCK",
            configKey: "onchain.mock",
        },
        privateKey: {
            environmentKey: "ONCHAIN_PRIVATE_KEY",
            configKey: "onchain.privateKey",
        },
        publicKey: {
            environmentKey: "ONCHAIN_PUBLIC_KEY",
            configKey: "onchain.publicKey",
        },
        address: {
            environmentKey: "ONCHAIN_ADDRESS",
            configKey: "onchain.address",
        },
        network: {
            environmentKey: "ONCHAIN_NETWORK",
            configKey: "onchain.network",
        },
    },
    twofa: {
        authenticationAppNAme: {
            environmentKey: "TWOFA_AUTHENTICATION_APP_NAME",
            configKey: "twofa.authenticationAppNAme",
        },
    },

    winston: {
        groupName: {
            environmentKey: "WINSTON_GROUP_NAME",
            configKey: "winston.groupName",
        },
        streamName: {
            environmentKey: "WINSTON_STREAM_NAME",
            configKey: "winston.streamName",
        },
        awsAccessKeyId: {
            environmentKey: "WINSTON_AWS_ACCESS_KEY_ID",
            configKey: "winston.awsAccessKeyId",
        },
        awsSecretAccessKey: {
            environmentKey: "WINSTON_AWS_SECRET_ACCESS_KEY",
            configKey: "winston.awsSecretAccessKey",
        },
        awsRegion: {
            environmentKey: "WINSTON_AWS_REGION",
            configKey: "winston.awsRegion",
        },
    },
}

// winston:
//   groupName: 'taral'
//   streamName: 'taral-stream'
//   awsAccessKeyId: ''
//   awsSecretAccessKey: ''
//   awsRegion: ''

function getConfig(keys: ConfigurationKeys): any {
    return process.env[keys.environmentKey] || config.get(keys.configKey);
}

function getAppConfig(): AppConfig {
    return {
        apiPrefix: getConfig(configurationKeys.apiPrefix),
        appUrl: getConfig(configurationKeys.backendDomain),
        audience: getConfig(configurationKeys.frontendDomain),
        backendDomain: getConfig(configurationKeys.backendDomain),
        fallbackLanguage: getConfig(configurationKeys.fallbackLanguage),
        frontendDomain: getConfig(configurationKeys.frontendDomain),
        name: getConfig(configurationKeys.appName),
        nodeEnv: getConfig(configurationKeys.nodeEnv),
        port: parseInt(getConfig(configurationKeys.port), 10) || 3000,
        workingDirectory: process.env.PWD || process.cwd(),
        isSameSite: getConfig(configurationKeys.isSameSite) === 'true',
    }
}

function getRedisConfig(): RedisConfig {
    return {
        db: getConfig(configurationKeys.redis.db),
        driver: getConfig(configurationKeys.redis.driver),
        host: getConfig(configurationKeys.redis.host),
        password: getConfig(configurationKeys.redis.password),
        port: parseInt(getConfig(configurationKeys.redis.port), 10),
        username: getConfig(configurationKeys.redis.username),
    }
}

function getQueueConfig(): QueueConfig {
    return {
        db: getConfig(configurationKeys.redis.db),
        driver: getConfig(configurationKeys.redis.driver),
        host: getConfig(configurationKeys.redis.host),
        password: getConfig(configurationKeys.redis.password),
        port: parseInt(getConfig(configurationKeys.redis.port), 10),
        username: getConfig(configurationKeys.redis.username),
    }
}

function getLoggingConfig(): LoggingConfig {
    return {
        fluentdlogging: getConfig(configurationKeys.logging.fluentdlogging) === 'true',
        level: getConfig(configurationKeys.logging.level),
    }
}

function getDbConfig(): DbConfig {
    return {
        ca: getConfig(configurationKeys.db.ca),
        cert: getConfig(configurationKeys.db.cert),
        host: getConfig(configurationKeys.db.host),
        key: getConfig(configurationKeys.db.key),
        maxConnections: parseInt(getConfig(configurationKeys.db.maxConnections), 10) || 100,
        name: getConfig(configurationKeys.db.name),
        password: getConfig(configurationKeys.db.password),
        port: parseInt(getConfig(configurationKeys.db.port), 10) || 5432,
        rejectUnauthorized: getConfig(configurationKeys.db.rejectUnauthorized) === 'true',
        sslEnabled: getConfig(configurationKeys.db.sslEnabled) === 'true',
        synchronize: getConfig(configurationKeys.db.synchronize) === 'true',
        type: getConfig(configurationKeys.db.type) || 'postgres',
        url: getConfig(configurationKeys.db.url),
        username: getConfig(configurationKeys.db.username),
    }
}

function getThrottleConfig(): ThrottleConfig {
    return {    
        enabled: getConfig(configurationKeys.throttle.enabled),
        global: {
            ttl: parseInt(getConfig(configurationKeys.throttle.global.ttl), 10),
            limit: parseInt(getConfig(configurationKeys.throttle.global.limit), 10),
        },
        login: {
            blockDuration: parseInt(getConfig(configurationKeys.throttle.login.blockDuration), 10),
            duration: parseInt(getConfig(configurationKeys.throttle.login.duration), 10),
            limit: parseInt(getConfig(configurationKeys.throttle.login.limit), 10),
            prefix: getConfig(configurationKeys.throttle.login.prefix),
        },
    }
}

function getMailConfig(): MailConfig {
    return {
        defaultEmail: getConfig(configurationKeys.mail.defaultEmail),
        defaultName: getConfig(configurationKeys.mail.defaultName),
        from: getConfig(configurationKeys.mail.from),
        host: getConfig(configurationKeys.mail.host),
        ignoreTls: getConfig(configurationKeys.mail.ignoreTls) === 'true',
        password: getConfig(configurationKeys.mail.password),
        port: parseInt(getConfig(configurationKeys.mail.port), 10),
        preview: getConfig(configurationKeys.mail.preview) === 'true',
        queueName: getConfig(configurationKeys.mail.queueName),
        requireTls: getConfig(configurationKeys.mail.requireTls) === 'true',
        secure: getConfig(configurationKeys.mail.secure) === 'true',
        user: getConfig(configurationKeys.mail.user),
    }
}

function getJwtConfig(): JwtConfig {
    return {
        cookieExpiresIn: parseInt(getConfig(configurationKeys.jwt.cookieExpiresIn), 10),
        expiresIn: parseInt(getConfig(configurationKeys.jwt.expiresIn), 10),
        refreshExpiresIn: parseInt(getConfig(configurationKeys.jwt.refreshExpiresIn), 10),
        secret: getConfig(configurationKeys.jwt.secret),
    }
}

function getAwsConfig(): AwsConfig {
    return {
        accessKeyId: getConfig(configurationKeys.aws.accessKeyId),
        bucket: getConfig(configurationKeys.aws.bucket),
        region: getConfig(configurationKeys.aws.region),
        secretAccessKey: getConfig(configurationKeys.aws.secretAccessKey),
    }
}

function getFileConfig(): FileConfig {
    return {
        driver: getConfig(configurationKeys.file.driver),
        localDir: getConfig(configurationKeys.file.localDir),
    }
}

function getOnchainConfig(): OnchainConfig {
    return {
        address: getConfig(configurationKeys.onchain.address),
        mock: getConfig(configurationKeys.onchain.mock) === 'true',
        network: getConfig(configurationKeys.onchain.network),
        privateKey: getConfig(configurationKeys.onchain.privateKey),
        publicKey: getConfig(configurationKeys.onchain.publicKey),
    }
}

function getTwoFaConfig(): TwoFaConfig {
    return {
        authenticationAppNAme: getConfig(configurationKeys.twofa.authenticationAppNAme),
    }
}

function getWinstonConfig(): WinstonConfig {
    return {
        awsAccessKeyId: getConfig(configurationKeys.winston.awsAccessKeyId),
        awsRegion: getConfig(configurationKeys.winston.awsRegion),
        awsSecretAccessKey: getConfig(configurationKeys.winston.awsSecretAccessKey),
        groupName: getConfig(configurationKeys.winston.groupName),
        streamName: getConfig(configurationKeys.winston.streamName),
    }
}

export const Configuration = {
    runThrottle: getConfig(configurationKeys.runThrottle),
    runChainhook: getConfig(configurationKeys.runChainhook),
    runJobs: getConfig(configurationKeys.runJobs),
    runEvents: getConfig(configurationKeys.runEvents),
    app: getAppConfig(),
    throttle: getThrottleConfig(),
    redis: getRedisConfig(),
    queue: getQueueConfig(),
    db: getDbConfig(),
    mail: getMailConfig(),
    jwt: getJwtConfig(),
    aws: getAwsConfig(),
    file: getFileConfig(),
    logging: getLoggingConfig(),
    onchain: getOnchainConfig(),
    twoFa: getTwoFaConfig(),
    winston: getWinstonConfig(),
};


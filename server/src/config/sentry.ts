import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

Sentry.init({
    dsn: process.env.SENTRY_DNS,
    tracesSampleRate: 1.0,
    release: `proffy_server@${process.env.npm_package_version}`
});

export default Sentry;
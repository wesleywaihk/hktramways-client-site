import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: { version: '1.0.0' },
      'x-strapi-config': {
        plugins: ['upload', 'i18n'],
      },
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: ['en', 'zh-HK', 'zh-CN'],
        // zh-HK was previously stored as zh-Hant-HK; migrated via scripts/migrate-locale-zh-hant-hk.js
    },
  },
  upload: {
    config: {
      provider: env('UPLOAD_PROVIDER', 'local'),
      ...(env('UPLOAD_PROVIDER') === 'aws-s3' && {
        providerOptions: {
          s3Options: {
            credentials: {
              accessKeyId: env('AWS_ACCESS_KEY_ID'),
              secretAccessKey: env('AWS_ACCESS_SECRET'),
            },
            region: env('AWS_REGION'),
            params: { Bucket: env('AWS_BUCKET'), ACL: undefined },
          },
        },
      }),
    },
  },
});

export default config;

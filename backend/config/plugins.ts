import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: ['en', 'zh-HK', 'zh-CN'],
    },
  },
  upload: {
    config: {
      provider: env('UPLOAD_PROVIDER', 'local'),
      ...(env('UPLOAD_PROVIDER') === 'aws-s3' && {
        providerOptions: {
          accessKeyId: env('AWS_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          params: { Bucket: env('AWS_BUCKET') },
        },
      }),
    },
  },
});

export default config;

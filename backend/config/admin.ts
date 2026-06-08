import type { Core } from '@strapi/strapi';
import { PREVIEW_SECRET } from 'shared-resources/consts';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('FRONTEND_URL', 'http://localhost:3000')],
      async handler(uid, { documentId, locale, status }) {
        const frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        // uid is e.g. "api::landing.landing" — extract the singular name as slug
        const uidParam = uid.split('::')[1]?.split('.')[0] ?? uid;
        const params = new URLSearchParams({ documentId, locale, status, secret: PREVIEW_SECRET, uid: uidParam });
        return `${frontendUrl}/api/preview?${params}`;
      },
    },
  },
});

export default config;

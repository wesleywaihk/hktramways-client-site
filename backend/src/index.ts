import type { Core } from '@strapi/strapi';
import { errors } from '@strapi/utils';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // Component fields can't be unique, so reject interactive maps whose stations repeat a locCode,
    // and store stations sorted by locCode
    strapi.documents.use(async (context, next) => {
      if (
        context.uid === 'api::interactive-map.interactive-map' &&
        (context.action === 'create' || context.action === 'update')
      ) {
        const stations = (context.params as any)?.data?.station;
        if (Array.isArray(stations)) {
          const seen = new Set<string>();
          const dups = new Set<string>();
          for (const { locCode } of stations) {
            if (!locCode) continue;
            if (seen.has(locCode)) dups.add(locCode);
            seen.add(locCode);
          }
          if (dups.size) {
            throw new errors.ValidationError(`Duplicate station locCode: ${[...dups].join(', ')}`);
          }
          // Persist stations in locCode order so admin and API list them sorted
          (context.params as any).data.station = [...stations].sort((a, b) =>
            (a.locCode ?? '') < (b.locCode ?? '') ? -1 : (a.locCode ?? '') > (b.locCode ?? '') ? 1 : 0
          );
        }
      }
      return next();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};

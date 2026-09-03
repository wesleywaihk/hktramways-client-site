/** Renders a Strapi `seo.structuredData` JSON value as a JSON-LD `<script>` tag for search engines. */
export default function StructuredData({ data }: { data: unknown }) {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

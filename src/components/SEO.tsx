import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SITE_URL = "https://www.lucianotumminello.com";
const DEFAULT_IMAGE =
  "https://www.lucianotumminello.com/lovable-uploads/56f210ad-b756-429e-b8fd-f28fbbee4cfc.png";

const SEO = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd,
}: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const trimmedTitle = title.length > 60 ? title.slice(0, 57) + "..." : title;
  const trimmedDesc =
    description.length > 160 ? description.slice(0, 157) + "..." : description;

  return (
    <Helmet>
      <title>{trimmedTitle}</title>
      <meta name="description" content={trimmedDesc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={trimmedTitle} />
      <meta property="og:description" content={trimmedDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={trimmedTitle} />
      <meta name="twitter:description" content={trimmedDesc} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

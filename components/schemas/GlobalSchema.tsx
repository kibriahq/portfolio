const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://kibria.dev/#website",
  url: "https://kibria.dev",
  name: "Kibria",
  alternateName: "Md Kibria",
  description: "Personal portfolio of Md Kibria, a Full Stack Developer.",
  inLanguage: "en",
  publisher: {
    "@id": "https://kibria.dev/#person",
  },
//   potentialAction: {
//     "@type": "SearchAction",
//     target: "https://kibria.dev/search?q={search_term_string}",
//     "query-input": "required name=search_term_string",
//   },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://kibria.dev/#person",
  name: "Md Kibria",
  url: "https://kibria.dev",
  image: "https://kibria.dev/kibria.jpg",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specializing in Next.js, React, Node.js, Laravel, and modern web technologies.",
  sameAs: [
    "https://github.com/kibriahq",
    "https://www.linkedin.com/in/kibria-dev",
    "https://x.com/kibria_dev",
    "https://www.facebook.com/mdkibria.dev",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "Node.js",
    "Laravel",
    "TypeScript",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
  ],
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};


const GlobalSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default GlobalSchema;
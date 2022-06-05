const siteUrl = `https://spacexstats-gatsby-chartjs.vercel.app`;

module.exports = {
  siteMetadata: {
    title: `SpaceX Stats`,
    description: `SpaceX Stats is the ultimate place to keep track of SpaceX's achievements into providing cheaper access to space and making human life multiplanetary.`,
    author: `Albéric Trancart`,
    siteUrl,
  },
  plugins: [
    // Codebase
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tsconfig-paths`,
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    // Custom plugin
    `gatsby-source-spacex-api`,

    // Assets
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: false,
      },
    },

    // SEO
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-QDTGQH3BTW`,
        head: false,
      },
    },

    // Offline capability
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SpaceX Stats`,
        short_name: `SpaceX Stats`,
        start_url: `/`,
        background_color: `#005189`,
        theme_color: `#005189`,
        display: `standalone`,
        icon: `static/oglogo.jpg`,
      },
    },
    // Sentry
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: "https://bc2a7780fbd34ae89e414449540d47eb@o1243042.ingest.sentry.io/6470611",
        sampleRate: 0.7,
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-netlify`,
  ],
};

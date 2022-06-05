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
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-QDTGQH3BTW', // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // optimize_id: 'OPT_CONTAINER_ID',
          optimize_id: 'G-QDTGQH3BTW',
          anonymize_ip: false,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ['/preview/**', '/do-not-track/me/too/'],
          // Defaults to https://www.googletagmanager.com
          origin: 'YOUR_SELF_HOSTED_ORIGIN',
        },
      },
    },
  ],
};

// @ts-check
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const repoUrl = 'https://github.com/Crsk/frow/packages/website/'

const config = {
  title: 'Not sure yet what is this about',
  tagline: '🍕  Topping the brainstorm pizza',
  favicon: 'img/favicon.ico',
  url: 'https://crsk.github.io',
  baseUrl: '/frow/',
  organizationName: 'Frow',
  projectName: 'frow',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: repoUrl,
        },
        blog: {
          showReadingTime: true,
          editUrl: repoUrl,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: { alt: 'Frow Logo', src: 'img/logo.svg' },
        items: [
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/Crsk/frow',
            label: 'GitHub',
            position: 'right',
          },
        ],
        hideOnScroll: false,
      },
      announcementBar: {
        id: 'survey',
        content:
          'Help us <a target="_blank" rel="noopener noreferrer" href="https://forms.gle/f9eKg8yMQk8q8xUR7">improve</a> ❤️',
        backgroundColor: '#0080ff',
        textColor: '#091E42',
        isCloseable: true,
      },
      prism: { theme: darkCodeTheme, darkTheme: darkCodeTheme },
      colorMode: { defaultMode: 'dark', disableSwitch: true, respectPrefersColorScheme: false },
    }),
}

module.exports = config

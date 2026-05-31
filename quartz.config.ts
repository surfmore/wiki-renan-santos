import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Wiki Renan Santos",
    pageTitleSuffix: " | Wiki Renan Santos",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "pt-BR",
    baseUrl: "renansantos.wiki",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      // Catppuccin — Latte (light) + Mocha (dark)
      colors: {
        lightMode: {
          light: "#eff1f5",     // Base
          lightgray: "#ccd0da", // Surface0
          gray: "#9ca0b0",      // Overlay0
          darkgray: "#6c6f85",  // Subtext0
          dark: "#4c4f69",      // Text
          secondary: "#1e66f5", // Blue
          tertiary: "#179299",  // Teal
          highlight: "rgba(30, 102, 245, 0.1)",
          textHighlight: "#df8e1d88", // Yellow
        },
        darkMode: {
          light: "#1e1e2e",     // Base
          lightgray: "#313244", // Surface0
          gray: "#6c7086",      // Overlay0
          darkgray: "#a6adc8",  // Subtext0
          dark: "#cdd6f4",      // Text
          secondary: "#89b4fa", // Blue
          tertiary: "#94e2d5",  // Teal
          highlight: "rgba(137, 180, 250, 0.1)",
          textHighlight: "#f9e2af88", // Yellow
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", openLinksInNewTab: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

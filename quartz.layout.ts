import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "YouTube - Renan Santos": "https://www.youtube.com/@RenanSantosMBL",
      "YouTube - MBLiveTV": "https://www.youtube.com/@MBLiveTV",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.ProfileImage(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        // Folders always before files
        if (a.isFolder && b.isFolder) return a.displayName.localeCompare(b.displayName, "pt-BR")
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        // Both files: sort by date descending (newest first), then alphabetically
        const dateA = a.data?.date?.getTime() ?? 0
        const dateB = b.data?.date?.getTime() ?? 0
        if (dateA !== dateB) return dateB - dateA
        return a.displayName.localeCompare(b.displayName, "pt-BR")
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.ProfileImage(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        if (a.isFolder && b.isFolder) return a.displayName.localeCompare(b.displayName, "pt-BR")
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        const dateA = a.data?.date?.getTime() ?? 0
        const dateB = b.data?.date?.getTime() ?? 0
        if (dateA !== dateB) return dateB - dateA
        return a.displayName.localeCompare(b.displayName, "pt-BR")
      },
    }),
  ],
  right: [],
}

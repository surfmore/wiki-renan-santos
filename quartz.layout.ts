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
        // Folders always before files, folders sorted alphabetically
        if (a.isFolder && b.isFolder) return a.displayName.localeCompare(b.displayName, "pt-BR")
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        // fontes and eventos: date descending (newest first)
        const isChron = (n: typeof a) =>
          n.data?.tags?.includes("fonte") || n.data?.tags?.includes("evento")
        if (isChron(a) && isChron(b)) {
          const dateA = a.data?.date?.getTime() ?? 0
          const dateB = b.data?.date?.getTime() ?? 0
          if (dateA
import { Metadata } from "next"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: {
        default: siteConfig.pages.login.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.pages.login.description,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    // icons: {
    //   icon: "/favicon.ico",
    //   shortcut: "/favicon-16x16.png",
    //   apple: "/apple-touch-icon.png",
    // },
}
export default function PropertyLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}

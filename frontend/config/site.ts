export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CPP | Home",
  description: "Web application for Candidate Placement Process Pvt. Ltd",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  pages: {
    login: {
      name: "CPP | Login",
      description: "Page for Logging In to Candidate Placement Process Web-App",
    },
  },
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};

import { defineConfig } from "vitepress";

export default defineConfig({
  title: "TypeScript Axios",
  description: "Study axios and typescript knowledge",
  base: "/typescript-axios/",
  themeConfig: {
    // Type is `DefaultTheme.Config`
    nav: [
      {
        text: "GitHub",
        link: "https://github.com/wangkaiwd/typescript-axios",
      },
    ],
    sidebar: [
      {
        text: "build",
        link: "/build",
      },
      {
        text: "publish",
        link: "/publish",
      },
      {
        text: "requirement",
        link: "/requirement",
      },
      {
        text: "notes",
        link: "/notes",
      },
      {
        text: "test-case",
        link: "/test-case",
      },
    ],
  },
});

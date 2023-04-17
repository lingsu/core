import { defineConfig } from "dumi";
import chalk from "chalk";
import { readdirSync } from "fs";
import { join } from "path";

const headPkgList: string[] = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, "packages")).filter(
  (pkg) => pkg.charAt(0) !== "." && !headPkgList.includes(pkg)
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@q25a25q/${pkg}`] = join(__dirname, "packages", pkg, "src");
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join("\n"))}`);

const tailPkgList = pkgList.map((path) => `packages/${path}/src`);
// console.log(`🌼 tail pkg list \n${chalk.blue(tailPkgList.join('\n'))}`);

export default defineConfig({
  outputPath: "docs-dist",
  themeConfig: {
    name: "core",
    nav: [{ title: "Playground", link: "/playground" }],
  },
  alias,
  resolve: {
    docDirs: ["docs", ...tailPkgList],
  },
});

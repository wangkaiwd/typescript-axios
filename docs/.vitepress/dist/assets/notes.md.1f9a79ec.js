import { _ as e, c as a, o as n, a as l } from "./app.bca14394.js";
const v =
    '{"title":"\u9700\u6C42","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u9700\u6C42","slug":"\u9700\u6C42"},{"level":3,"title":"\u9879\u76EE\u642D\u5EFA","slug":"\u9879\u76EE\u642D\u5EFA"},{"level":3,"title":"\u6253\u5305\u53D1\u5E03","slug":"\u6253\u5305\u53D1\u5E03"},{"level":3,"title":"\u6D4B\u8BD5\u3001\u6301\u7EED\u96C6\u6210","slug":"\u6D4B\u8BD5\u3001\u6301\u7EED\u96C6\u6210"},{"level":3,"title":"\u7248\u672C\u7BA1\u7406","slug":"\u7248\u672C\u7BA1\u7406"},{"level":3,"title":"\u6587\u6863\u4E66\u5199","slug":"\u6587\u6863\u4E66\u5199"},{"level":3,"title":"CI/CD","slug":"ci-cd"},{"level":3,"title":"\u914D\u7F6EVue3+Webpack\u5F00\u53D1\u73AF\u5883","slug":"\u914D\u7F6Evue3-webpack\u5F00\u53D1\u73AF\u5883"}],"relativePath":"notes.md","lastUpdated":1638879295603}',
  s = {},
  t = l(
    `<h2 id="\u9700\u6C42" tabindex="-1">\u9700\u6C42 <a class="header-anchor" href="#\u9700\u6C42" aria-hidden="true">#</a></h2><p>\u8BF7\u5F00\u53D1\u4E00\u4E2A\u6574\u4E2A\u516C\u53F8\u524D\u7AEF\u9700\u8981\u7528\u5230\u7684\u8BF7\u6C42\u5E93</p><p>\u8981\u6C42\uFF1A</p><ul><li>\u8BE6\u7EC6\u7684\u6587\u6863\uFF0C\u65B9\u4FBF\u5B66\u4E60\u548C\u4E0A\u624B</li><li>\u4FDD\u8BC1\u4EE3\u7801\u8D28\u91CF</li><li>\u53C2\u4E0E\u5F00\u53D1\u6587\u6863\uFF0C\u65B9\u4FBF\u5176\u5B83\u5C0F\u4F19\u4F34\u53C2\u4E0E</li></ul><h3 id="\u9879\u76EE\u642D\u5EFA" tabindex="-1">\u9879\u76EE\u642D\u5EFA <a class="header-anchor" href="#\u9879\u76EE\u642D\u5EFA" aria-hidden="true">#</a></h3><p>\u6784\u601D\u6574\u4F53\u7684\u9879\u76EE\u7ED3\u6784</p><ul><li>\u5982\u4F55\u642D\u5EFA\u9879\u76EE\u73AF\u5883\uFF1F</li></ul><h3 id="\u6253\u5305\u53D1\u5E03" tabindex="-1">\u6253\u5305\u53D1\u5E03 <a class="header-anchor" href="#\u6253\u5305\u53D1\u5E03" aria-hidden="true">#</a></h3><ul><li>\u5982\u4F55\u6253\u5305\u4E00\u4E2A\u5E93\u6587\u4EF6\uFF1F</li></ul><h3 id="\u6D4B\u8BD5\u3001\u6301\u7EED\u96C6\u6210" tabindex="-1">\u6D4B\u8BD5\u3001\u6301\u7EED\u96C6\u6210 <a class="header-anchor" href="#\u6D4B\u8BD5\u3001\u6301\u7EED\u96C6\u6210" aria-hidden="true">#</a></h3><p>\u4FDD\u8BC1\u4EE3\u7801\u8D28\u91CF</p><h3 id="\u7248\u672C\u7BA1\u7406" tabindex="-1">\u7248\u672C\u7BA1\u7406 <a class="header-anchor" href="#\u7248\u672C\u7BA1\u7406" aria-hidden="true">#</a></h3><p>\u5982\u4F55\u751F\u6210\u6D41\u884C\u7684\u5F00\u6E90\u5E93\u7684\u7248\u672C\u5217\u8868\uFF1F</p><h3 id="\u6587\u6863\u4E66\u5199" tabindex="-1">\u6587\u6863\u4E66\u5199 <a class="header-anchor" href="#\u6587\u6863\u4E66\u5199" aria-hidden="true">#</a></h3><p>\u5982\u4F55\u5199\u6587\u6863\uFF1F</p><p>\u5F00\u53D1\u6D41\u7A0B\uFF1A</p><ul><li><p>\u672C\u5730\u5F00\u53D1</p></li><li><p>\u672C\u5730\u8C03\u8BD5</p></li><li><p>\u53D1\u5E03</p></li><li><p>\u5982\u4F55\u53C2\u4E0E\u5F00\u53D1\uFF1F</p></li></ul><h3 id="ci-cd" tabindex="-1"><code>CI/CD</code> <a class="header-anchor" href="#ci-cd" aria-hidden="true">#</a></h3><ul><li><code>github action</code></li></ul><h3 id="\u914D\u7F6Evue3-webpack\u5F00\u53D1\u73AF\u5883" tabindex="-1">\u914D\u7F6E<code>Vue3</code>+<code>Webpack</code>\u5F00\u53D1\u73AF\u5883 <a class="header-anchor" href="#\u914D\u7F6Evue3-webpack\u5F00\u53D1\u73AF\u5883" aria-hidden="true">#</a></h3><div class="language-bash"><pre><code><span class="token comment"># webpack</span>
<span class="token function">npm</span> i webpack webpack-cli webpack-dev-server -D
<span class="token comment"># babel</span>
<span class="token function">npm</span> i @babel/core @babel/preset-env @babel/preset-typescript -D

<span class="token comment"># vue vue-router vue-loader</span>
<span class="token function">npm</span> i vue@next vue-loader@next @vue/compiler-sfc

<span class="token comment"># eslint</span>
<span class="token function">npm</span> i eslint-plugin-vue

<span class="token comment"># css</span>
<span class="token function">npm</span> i <span class="token function">less</span> less-loader css-loader style-loader
</code></pre></div><ul><li><a href="https://eslint.vuejs.org/user-guide/#installation" target="_blank" rel="noopener noreferrer"><code>eslint-plugin-vue</code></a></li></ul>`,
    22
  ),
  i = [t];
function c(r, p, o, d, u, h) {
  return n(), a("div", null, i);
}
var _ = e(s, [["render", c]]);
export { v as __pageData, _ as default };

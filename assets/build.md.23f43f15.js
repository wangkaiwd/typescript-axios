import{_ as n,c as a,o as s,a as t}from"./app.9770fa93.js";const h='{"title":"build","description":"","frontmatter":{},"headers":[{"level":2,"title":"build","slug":"build"},{"level":3,"title":"operate step with rollup","slug":"operate-step-with-rollup"},{"level":3,"title":"webpack","slug":"webpack"},{"level":3,"title":"rollup","slug":"rollup"}],"relativePath":"build.md","lastUpdated":1641707349603}',o={},e=t(`<h2 id="build" tabindex="-1">build <a class="header-anchor" href="#build" aria-hidden="true">#</a></h2><ul><li>refer to <a href="https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226" target="_blank" rel="noopener noreferrer">rollup-typescript</a></li></ul><h3 id="operate-step-with-rollup" tabindex="-1">operate step with rollup <a class="header-anchor" href="#operate-step-with-rollup" aria-hidden="true">#</a></h3><h4 id="feature" tabindex="-1">Feature <a class="header-anchor" href="#feature" aria-hidden="true">#</a></h4><ul><li>support typescript</li><li>generate different format bundle</li><li><a href="https://api-extractor.com/pages/configs/api-extractor_json/#dts-rollup-section" target="_blank" rel="noopener noreferrer">api extractor</a></li></ul><h4 id="install" tabindex="-1">Install <a class="header-anchor" href="#install" aria-hidden="true">#</a></h4><ol><li>Run this in your terminal:</li></ol><div class="language-shell"><pre><code><span class="token function">npm</span> i typescript rollup rollup-plugin-typescript2 tslib -D
</code></pre></div><ol start="2"><li>Ensure your <code>package.json</code> contains these values(and replace <code>my-lib</code> part):</li></ol><div class="language-json"><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build/my-lib.cjs.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build/my-lib.es.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build/my-lib/types/index.d.ts&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -c rollup.config.ts&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="3"><li>Create <code>rollup.config.ts</code> under project root directory</li></ol><div class="language-typescript"><pre><code><span class="token keyword">import</span> typescript <span class="token keyword">from</span> <span class="token string">&quot;rollup-plugin-typescript2&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> pkg <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&quot;./package.json&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  input<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">lib/index.ts</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
  output<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      file<span class="token operator">:</span> pkg<span class="token punctuation">.</span>main<span class="token punctuation">,</span>
      exports<span class="token operator">:</span> <span class="token string">&quot;auto&quot;</span><span class="token punctuation">,</span>
      format<span class="token operator">:</span> <span class="token string">&quot;cjs&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      file<span class="token operator">:</span> pkg<span class="token punctuation">.</span>module<span class="token punctuation">,</span>
      format<span class="token operator">:</span> <span class="token string">&quot;es&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      file<span class="token operator">:</span> <span class="token string">&quot;build/axios.browser.js&quot;</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">&quot;axios&quot;</span><span class="token punctuation">,</span>
      format<span class="token operator">:</span> <span class="token string">&quot;iife&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">typescript</span><span class="token punctuation">(</span><span class="token punctuation">{</span> useTsconfigDeclarationDir<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><ol start="4"><li>Ensure your <code>tsconfig.json</code> contain these values:</li></ol><div class="language-json"><pre><code><span class="token punctuation">{</span>
  <span class="token property">&quot;target&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ES5&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;declaration&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;declarationDir&quot;</span><span class="token operator">:</span> <span class="token string">&quot;build/types&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;moduleResolution&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Node&quot;</span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="5"><li>All done! Now execute <code>npm run build</code> in your terminal:</li></ol><div class="language-shell"><pre><code><span class="token function">npm</span> run build
</code></pre></div><h3 id="webpack" tabindex="-1">webpack <a class="header-anchor" href="#webpack" aria-hidden="true">#</a></h3><ul><li><a href="https://webpack.js.org/guides/author-libraries/" target="_blank" rel="noopener noreferrer">author library</a></li></ul><h3 id="rollup" tabindex="-1">rollup <a class="header-anchor" href="#rollup" aria-hidden="true">#</a></h3><ul><li><a href="https://rollupjs.org/guide/en/#quick-start" target="_blank" rel="noopener noreferrer">Quick start</a></li><li><a href="https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for" target="_blank" rel="noopener noreferrer">module field of package.json</a><ul><li><strong>read all information</strong></li><li><a href="https://github.com/rollup/rollup/wiki/pkg.module" target="_blank" rel="noopener noreferrer">pkg.module</a></li></ul></li><li><a href="https://rollupjs.org/guide/en/#outputformat" target="_blank" rel="noopener noreferrer">output.format</a></li></ul>`,20),p=[e];function l(r,u,c,i,k,d){return s(),a("div",null,p)}var f=n(o,[["render",l]]);export{h as __pageData,f as default};

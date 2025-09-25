import type { Plugin } from 'vite';
import fg from 'fast-glob';
import { relative } from 'path';
interface OptionsParams {
  dir: string;
  attrs: {
    rel: 'prefetch' | 'preload';
  };
}

export const preloadImagePlugin = (options: OptionsParams): Plugin => {
  const { dir, attrs } = options;
  return {
    name: 'vite-plugin-preload-image',
    transformIndexHtml(html, ctx) {
      console.log('ctx--', ctx.server?.config.publicDir);
      const files = fg.sync(dir, {
        cwd: ctx.server?.config.publicDir
      });
      console.log('files', files);
      const base = ctx.server?.config.base || '';
      const images = files.map((file) => base + file);
      const result = images.map((href) => {
        return {
          tag: 'link',
          attrs: {
            rel: attrs.rel,
            as: 'image',
            href: href
          }
        };
      });
      console.log(result);
      return result;
    }
  };
};

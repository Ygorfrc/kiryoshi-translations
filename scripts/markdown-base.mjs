import { prefixPath } from '../src/config/url.mjs';

/** Native Sätteri plugin: keep authored Markdown/MDX paths relative to the site. */
export default function basePaths({ base }) {
  return {
    name: 'site-base-paths',
    element: {
      filter: ['a', 'img', 'video', 'source'],
      visit(node, ctx) {
        for (const key of ['href', 'src', 'poster']) {
          const value = node.properties?.[key];
          if (typeof value === 'string')
            ctx.setProperty(node, key, prefixPath(value, base));
        }
      },
    },
  };
}

/**
 * Get component / section URL.
 * @see https://github.com/miukimiu/react-kawaii/blob/b05aa79b9a352ff050ba9d7d326dbf01cd205444/styleguide/components/utils/getUrl.js
 *
 * @param {string} $.name Name
 * @param {string} $.slug Slug
 * @param {number} $.example Example index
 * @param {boolean} $.anchor Anchor?
 * @param {boolean} $.isolated Isolated mode?
 * @param {boolean} $.nochrome No chrome? (Can be combined with anchor or isolated)
 * @param {boolean} $.absolute Absolute URL? (Can be combined with other flags)
 * @param {object} [location] Location object (will use current page location by default)
 * @return {string}
 */
export default function getUrl (
  {
    name,
    slug,
    example,
    anchor,
    isolated,
    nochrome,
    absolute,
    hashPath,
    id,
    takeHash,
  } = {},
  { origin, pathname, hash } = window.location
) {
  let url = pathname

  if (takeHash) {
    if (hash.indexOf('?') > -1) {
      url += hash.substring(0, hash.indexOf('?'))
    } else {
      url += hash
    }
  }

  if (nochrome) {
    url += '?nochrome'
  }

  if (anchor) {
    url += `#${slug}`
  } else if (isolated || nochrome) {
    url += `#!/${name}`
  }

  if (hashPath) {
    if (!id) {
      hashPath = [...hashPath, name]
    }
    url += `#/${hashPath.join('/')}`
  }

  if (id) {
    url += `?id=${slug}`
  }

  if (example) {
    url += `/${example}`
  }

  if (absolute) {
    return origin + url
  }

  return url
}

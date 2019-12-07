/**
 * @param {string} pathName
 */
export default function cleanPathName(pathName) {
  return pathName.split('___')[0]
}

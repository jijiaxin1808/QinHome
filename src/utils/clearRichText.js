/* eslint-disable linebreak-style */

export default (text) => {
  text = text.replace(/<\/?[^>]*>/g, '')
  return text
}

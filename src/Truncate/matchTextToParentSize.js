const matchTextToParentSize = (
  text,
  parent,
  ellipsis,
  wrapper
) => {
  const space = ' '
  let newText = ''
  const words = text.split(space)
  // fullfill the text wrapper with the original text
  wrapper.innerText = text // eslint-disable-line

  if (parent.scrollHeight < parent.offsetHeight) {
    return text
  }

  // remove words from the inner text until the element have a
  // scrollHeight smaller than it offsetHeight
  while (parent.scrollHeight > parent.offsetHeight) {
    words.pop()
    newText = words.join(space)
    wrapper.innerText = newText // eslint-disable-line

    if (parent.scrollHeight <= parent.offsetHeight) {
      newText = words.join(space)
      const lastCharsRegex = new RegExp(`.{${ellipsis.length}}$`)
      newText = newText.replace(lastCharsRegex, ellipsis)
      wrapper.innerText = newText // eslint-disable-line
    }
  }

  return newText
}

export default matchTextToParentSize

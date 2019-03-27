const matchTextToParentSize = (
  text,
  parent,
  ellipsis,
  wrapperElement
) => {
  const wrapper = wrapperElement
  const space = ' '
  let newText = ''
  const words = text.split(space)

  // fullfill the text wrapper with the original text
  wrapper.innerText = text

  if (parent.scrollHeight <= parent.offsetHeight) {
    return {
      newText: text,
      isTruncated: false,
    }
  }

  // remove words from the inner text until the element have a
  // scrollHeight smaller than it offsetHeight
  while (parent.scrollHeight > parent.offsetHeight) {
    words.pop()
    newText = words.join(space)
    wrapper.innerText = newText

    if (parent.scrollHeight <= parent.offsetHeight) {
      const lastCharsRegex = new RegExp(`.{${ellipsis.length}}$`)
      newText = newText.replace(lastCharsRegex, ellipsis)
      wrapper.innerText = newText
    }
  }

  return {
    newText,
    isTruncated: text !== newText,
  }
}

export default matchTextToParentSize

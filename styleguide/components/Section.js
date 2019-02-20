import React from 'react'
import PropTypes from 'prop-types'
import SectionHeading from 'rsg-components/SectionHeading'
import Markdown from 'rsg-components/Markdown'

import style from './style.css'

const SectionRenderer = (props) => {
  const {
    content,
    components,
    description,
    depth,
    name,
    slug,
    sections,
    pagePerSection,
  } = props

  return (
    <div className={style.headers}>
      {name &&
        <SectionHeading
          id={slug}
          depth={depth}
          slotName="sectionToolbar"
          pagePerSection={pagePerSection}
          slotProps={props}
        >
          {name}
        </SectionHeading>
      }

      { description && <Markdown text={description} /> }

      { content }
      { sections }
      { components }
    </div>
  )
}

SectionRenderer.propTypes = {
  components: PropTypes.node.isRequired,
  content: PropTypes.node,
  depth: PropTypes.number.isRequired,
  description: PropTypes.string,
  name: PropTypes.string,
  pagePerSection: PropTypes.bool.isRequired,
  sections: PropTypes.node,
  slug: PropTypes.string,
}

SectionRenderer.defaultProps = {
  content: null,
  description: '',
  name: '',
  sections: '',
  slug: '',
}

export default SectionRenderer

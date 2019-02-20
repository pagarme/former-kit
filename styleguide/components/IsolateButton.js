import React from 'react'
import PropTypes from 'prop-types'
import MdFullsreen from 'react-icons/lib/md/fullscreen'
import MdFullsreenExit from 'react-icons/lib/md/fullscreen-exit'
import ToolbarButton from 'rsg-components/ToolbarButton'

import getUrl from '../getUrl'

const IsolateButton = ({
  example,
  isolated,
  name,
}) => (
  isolated
    ? (
      <ToolbarButton
        href={getUrl({ anchor: true, slug: '/Components' })}
        title="Show all components"
      >
        <MdFullsreenExit />
      </ToolbarButton>
    ) : (
      <ToolbarButton
        href={getUrl({ name, example, isolated: true })}
        title="Open isolated"
      >
        <MdFullsreen />
      </ToolbarButton>
    )
)

IsolateButton.propTypes = {
  example: PropTypes.number,
  isolated: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}

IsolateButton.defaultProps = {
  example: null,
}

export default IsolateButton

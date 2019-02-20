import React from 'react'
import LogoImage from './logo.svg'

import style from './style.css'

const Logo = () => (
  <div>
    <div className={style.logo}>
      <strong>FormerKit</strong> <span>styleguide</span>
    </div>
    <LogoImage />
  </div>
)

export default Logo

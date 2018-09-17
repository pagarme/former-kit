import React from 'react'
import styles from './style.css'
import {
  Landing,
  LandingPrimarySection,
  LandingSecondarySection,
} from '../../src/Landing'

const EmptyLanding = () => (
  <Landing className={styles.container}>
    <LandingPrimarySection>
      <span>Empty</span>
    </LandingPrimarySection>
    <LandingSecondarySection>
      <span>Landing</span>
    </LandingSecondarySection>
  </Landing>
)

export default EmptyLanding

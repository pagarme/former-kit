import React from 'react'
import classNames from 'classnames'
import styles from './style.css'
import Button from '../../src/Button'
import {
  Landing,
  LandingPrimarySection,
  LandingSecondarySection,
} from '../../src/Landing'
import WelcomeContent from './WelcomeContent'

const backToLogin = () => {
  window.location.href = 'https://dashboard.pagar.me/#/login'
}

const PasswordRecovery = ({
  handleSubmit,
}) => (
  <Landing className={classNames(styles.container, styles.confirmation)}>
    <LandingPrimarySection>
      <div className={styles.columnContainer}>
        <form
          onSubmit={handleSubmit}
          className={styles.contentRight}
        >
          <div className={styles.logo}>
            <img
              src=""
              alt="Pagar.me"
            />
          </div>
          <div className={styles.login}>
            <p className={styles.paragraph}>
              <b>pronto!</b> em instantes você receberá um
              e-mail com as instruções para a redefinição
              de sua senha
            </p>
          </div>
          <div className={styles.actions}>
            <div className={styles.hugeButton} >
              <Button
                type="button"
                size="huge"
                fill="gradient"
                onClick={backToLogin}
              >
                Voltar para o login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </LandingPrimarySection>
    <LandingSecondarySection>
      <div className={styles.columnContainer}>
        <WelcomeContent />
      </div>
    </LandingSecondarySection>
  </Landing>
)

export default PasswordRecovery

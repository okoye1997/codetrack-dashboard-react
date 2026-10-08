import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { CircleCheck, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import CodeTrackBrand from '../components/CodeTrackBrand.jsx'
import { useAuth } from '../hooks/UseAuth.js'

const promoCells = Array.from({ length: 176 }, (_, index) => {
  const row = Math.floor(index / 22)
  const col = index % 22
  const score = (row * 13 + col * 7 + row * col * 3) % 11
  return score > 6 ? 4 : score > 4 ? 3 : score > 2 ? 2 : score > 1 ? 1 : 0
})

function ContributionPreview() {
  return (
    <div className="promo-heatmap" aria-label="A preview of a contribution heatmap">
      <div className="promo-grid" aria-hidden="true">
        {promoCells.map((level, index) => <i className={`heat-cell level-${level}`} key={index} />)}
      </div>
      <div className="heat-legend"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i className={`heat-cell level-${level}`} key={level} />)}<span>More</span></div>
    </div>
  )
}

function PromoPanel({ mode }) {
  return (
    <aside className={`auth-promo auth-promo--${mode}`}>
      <CodeTrackBrand />
      <ContributionPreview />
      <div className="promo-copy">
        <h2>{mode === 'signup' ? 'Day 1 starts here.' : 'Keep the chain alive.'}</h2>
        {mode === 'signin' && <p>You&apos;re one log away from extending your streak. Pick up right where you left off.</p>}
        {mode === 'signup' && <span className="promo-day">1</span>}
        <div className="promo-footnote"><CircleCheck size={16} aria-hidden="true" /><span>Free forever for your daily log.</span></div>
      </div>
    </aside>
  )
}

function SocialButtons({ onUnavailable }) {
  return (
    <div className="social-buttons">
      <button className="social-button" type="button" onClick={onUnavailable}><FaGithub size={17} aria-hidden="true" /><span>Continue with GitHub</span></button>
      <button className="social-button" type="button" onClick={onUnavailable}><FcGoogle size={18} aria-hidden="true" /><span>Continue with Google</span></button>
    </div>
  )
}

export default function AuthPage({ mode }) {
  const isSignup = mode === 'signup'
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setNotice('')
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email')).trim()
    const password = String(form.get('password'))
    const name = String(form.get('name') || '').trim()
    if (!/^\S+@\S+\.\S+$/.test(email) || !password || (isSignup && (!name || password.length < 8))) {
      setError(isSignup ? 'Enter your name, a valid email, and a password with at least 8 characters.' : "That email or password doesn't look right.")
      return
    }
    const succeeded = isSignup
      ? signUp(name, email, password)
      : signIn(email, password)

    if (!succeeded) {
      setError(isSignup ? 'An account with that email already exists.' : "That email or password doesn't look right.")
      return
    }
    navigate('/dashboard')
  }

  const unavailable = () => {
    setError('Social sign-in is not connected in this demo.')
    setNotice('')
  }

  return (
    <main className={`auth-page auth-page--${mode}`}>
      <header className="auth-mobile-header">
        <CodeTrackBrand />
        <span>{isSignup ? 'Day 1 starts here.' : 'Welcome back.'}</span>
      </header>
      <section className="auth-form-column">
        <div className="auth-form-wrap">
          <h1>{isSignup ? 'Create your account' : 'Welcome back'}</h1>
          <p className="auth-subtitle">{isSignup ? 'Start your streak in under a minute.' : 'Log in to keep your streak going.'}</p>

          <SocialButtons onUnavailable={unavailable} />
          <div className="auth-divider"><span /> <span>or</span> <span /></div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {error && <div className="auth-error" role="alert"><span aria-hidden="true">!</span>{error}</div>}

            {isSignup && <label className={`field${error ? ' field--invalid' : ''}`}>
              <span>Name <b>*</b></span>
              <input name="name" type="text" placeholder="Alex Rivera" autoComplete="name" required />
            </label>}

            <label className={`field${error && !isSignup ? ' field--invalid' : ''}`}>
              <span>Email <b>*</b></span>
              <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              {error && !isSignup && <small className="field-error-mark" aria-hidden="true">!</small>}
            </label>

            <label className={`field${error && !isSignup ? ' field--invalid' : ''}`}>
              <span>Password <b>*</b></span>
              <span className="password-input-wrap">
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder={isSignup ? 'At least 8 characters' : 'Your password'} autoComplete={isSignup ? 'new-password' : 'current-password'} minLength={isSignup ? 8 : undefined} required />
                <button className="show-password" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
                  <span>{showPassword ? 'HIDE' : 'SHOW'}</span>
                </button>
              </span>
              {error && !isSignup && <small className="field-error-mark" aria-hidden="true">!</small>}
              {isSignup && <small className="field-helper">Use at least 8 characters.</small>}
            </label>

            {!isSignup && <div className="signin-options">
              <label className="remember-option"><input type="checkbox" name="remember" defaultChecked /><span>Remember me</span></label>
              <button type="button" className="text-link" onClick={() => setNotice('Password recovery is not connected in this demo.')}>Forgot password?</button>
            </div>}

            <button className="primary-button" type="submit">{isSignup ? 'Create account' : 'Log in'}</button>
          </form>

          {isSignup && <p className="terms-copy">By signing up you agree to our <a href="#terms" onClick={(event) => { event.preventDefault(); setNotice('Terms are not available in this demo.') }}>Terms</a> and <a href="#privacy" onClick={(event) => { event.preventDefault(); setNotice('Privacy policy is not available in this demo.') }}>Privacy Policy</a>.</p>}
          {notice && <p className="auth-notice" role="status">{notice}</p>}
          <p className="auth-switch">{isSignup ? <>Already have an account? <Link to="/signin">Log in.</Link></> : <>New here? <Link to="/signup">Create an account.</Link></>}</p>
        </div>
      </section>
      <PromoPanel mode={mode} />
    </main>
  )
}

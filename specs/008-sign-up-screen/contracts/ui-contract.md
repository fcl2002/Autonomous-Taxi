# UI Contract: Sign Up Screen

## Route contract

- Activating login's **Sign Up** link navigates to `/signup`.
- Native Back from `/signup` returns to the existing `/login` page.
- Activating signup's **Sign In** link replaces `/signup` with `/login`.
- Repeated activation does not create duplicate signup or login pages.

## Presentation contract

- The page uses Vazy text identity and contains no Qwiker name or logo.
- Visible order is brand, Sign Up heading, full-name field, email field, phone field, primary Sign Up
  action, and existing-account prompt with Sign In link.
- Existing themed text and primary-button presentation are reused.
- The layout remains usable on supported portrait sizes and while the keyboard is open.

## Input contract

- Full name uses standard text entry.
- Email uses email-oriented entry behavior without validation.
- Phone uses phone-oriented entry behavior without validation.
- Values remain in page memory and are discarded when the page unmounts.

## Deferred behavior

- The primary action is enabled and has no handler.
- No validation, error, loading, success, account, OTP, Firebase, network, or persistence behavior is
  introduced.

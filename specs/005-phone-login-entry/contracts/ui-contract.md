# UI Contract: Phone Login Entry Screen

## Route contract

| Route | Responsibility | Network/data |
|---|---|---|
| `/onboarding-location` | Existing final onboarding page; exposes one actionable lower CTA | None |
| `/login` | Vazy phone-login entry matching the hierarchy of Figma node `5:63` | Transient field text only |

The existing root stack owns route history. No Firebase, SMS, location, consent, backend, MQTT, or
vehicle contract changes.

## Forward transition

- Trigger: activate the final onboarding page's complete lower CTA target.
- Navigation target: `/login`.
- Accessibility: role `button`; label states that it continues to phone login.
- Postcondition: exactly one login page is current, including after rapid repeated activation.
- Availability: works without a network connection or permission prompt.

## Back transition

- Trigger: platform Back after `/login` was reached through onboarding.
- Postcondition: `/onboarding-location` becomes current after one Back action.
- Invariant: neither route is duplicated.

## Login rendering contract

Visual order follows the 428 by 926 reference frame:

1. centered Vazy text identity in the upper portion, with no Qwiker name or logo;
2. Login heading;
3. phone-login guidance;
4. one rounded phone field;
5. one wide rounded visual-only Send Code treatment;
6. a bottom sign-up prompt with visually emphasized `Sign Up` text.

Use responsive flex spacing and the current safe-area behavior rather than reproducing Figma's
custom status icons or absolute screen coordinates. Meaningful content stays visible on supported
portrait phones and the field plus Send Code treatment remain visible while the keyboard is open.

## Input contract

- One field is labelled `Phone number` for assistive technology.
- Its initial value is empty and its visible placeholder is `Phone Number`.
- It requests telephone input and telephone autocomplete from the platform.
- Editing updates only the route's in-memory draft.
- Input is not parsed, validated, masked, logged, persisted, or submitted.

## Static-treatment contract

- Send Code has no press handler, button role, accessibility action, auth call, navigation, or
  success/error response.
- Sign Up has no press handler, link role, or destination.
- Both visible texts remain readable in the normal accessibility order.

## Failure behavior

Because all content is local and no submission occurs, network unavailability creates no loading
or error state. An unresolved route, hidden field/action under the keyboard, duplicated route,
legacy Qwiker branding, permission prompt, data side effect, or build/export failure blocks
handoff.

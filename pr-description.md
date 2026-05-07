# chore: new trial banner A/B experiment

## What does this PR do?

Adds a PostHog A/B experiment (`new-trial-banner`) behind a feature flag in the main navigation sidebar.

- `control`: existing `TrialAlert` linked to the billing settings page
- `test`: new `TrialBannerNew` component showing trial days remaining, a response usage progress bar (with a marker for the base limit), and an inline "Add payment method" CTA

Also removes the "Add payment method" button from the billing page trial alert (`pricing-table.tsx`) since that affordance now lives in the new banner for users in the `test` variant.

## How should this be tested?

- Assign yourself to `test` in PostHog for flag `new-trial-banner` while on a trial plan
- The sidebar should show the new `TrialBannerNew` component with days remaining, a response usage progress bar, and an "Add payment method" button
- Assign to `control` (or unset the flag) — the original `TrialAlert` with a link to billing should appear unchanged
- With no PostHog key configured, confirm the sidebar falls back to the original `TrialAlert`
- Verify users on the `control` variant still have a path to add a payment method via the billing page link in `TrialAlert`

## Checklist

### Required

- [ ] Filled out the "How to test" section in this PR
- [ ] Read [How we Code at Formbricks](https://formbricks.com/docs/contributing/how-we-code)
- [ ] Self-reviewed my own code
- [ ] Commented on my code in hard-to-understand bits
- [ ] Ran `pnpm build`
- [ ] Checked for warnings, there are none
- [ ] Removed all `console.logs`
- [ ] Merged the latest changes from main onto my branch with `git pull origin main`
- [ ] My changes don't cause any responsiveness issues
- [ ] First PR at Formbricks? [Please sign the CLA!](https://cla-assistant.io/formbricks/formbricks) Without it we wont be able to merge it 🙏

### Appreciated

- [ ] If a UI change was made: Added a screen recording or screenshots to this PR
- [ ] Updated the Formbricks Docs if changes were necessary

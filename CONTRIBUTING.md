<img src="https://avatars1.githubusercontent.com/u/3846050?v=4&s=127" width="127px" height="127px" align="left"/>

# FormerKit

> Contribution guide

<br>

[![Join the chat at https://gitter.im/pagarme/pilot](https://badges.gitter.im/pagarme/pilot.svg)](https://gitter.im/pagarme/pilot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<br>

## Setup for development

To setup the development environment, clone this repository and install its dependencies.

### Developing a new component

We use [Storybook](https://storybook.js.org/) for component development. To create a new component:

1. Create the component structure in `src/components`
1. Create a story in `stories` for the component
1. Spin up Storybook with `yarn storybook`
1. Use Storybook's sandbox to develop the component
1. Don't forget to add component documentation

FormerKit gives a special attention to `theme` prop in all components. It's a key public interface for customization and developers should definitely spend time thinking about the ideal shape for this property. That said, it's also important that the shape of `theme` prop is properly well documented by inline comments.

As FormerKit doesn't specify a default theme, we have bundled [Pagar.me Skin](https://github.com/pagarme/former-kit-skin-pagarme) for development purposes. If you happen to need to change something in the theme (or develop a new one) you can use npm/yarn links to achieve a (mostly) seamless development process.

1. Clone `former-kit-skin-pagarme` package and enter into its directory
1. Use `yarn link` inside skin directory to register the package as "linkable"
1. In `former-kit` directory use `yarn link former-kit-skin-pagarme`

Refer to [former-kit-skin-pagarme](https://github.com/pagarme/former-kit-skin-pagarme) for development instructions.

### Component contributions

There are some details to pay attention when contributing a new component. Here's a checklist:

- [ ] Write tests and reach a coverage of at least 80% (`yarn test --coverage`)
- [ ] Write a story for the component in Storybook (`yarn storybook`)
- [ ] Add props documentation and examples in Styleguidist (`yarn styleguide`)
- [ ] Update component stories snapshots (`yarn test --updateSnapshot`)
- [ ] Be sure `yarn.lock` is up to date (`yarn`)

### Contribution guidelines

This are the common guidelines to contribute to this project. Please ensure the following guidelines are being followed by you and any other contributor.

#### Create a feature branch

Don't ask us to pull from your master branch.

#### Write good commit messages

We follow the [pagarme/git-style-guide](https://github.com/pagarme/git-style-guide). Every commit/branch/pull_request must follow its guidelines.

#### Write tests and be sure they are passing in each commit

Be sure to write tests for features or fixes you implement. Make absolutely sure all tests are passing for each commit.

#### One pull request per feature

If you want to do more than one thing, send multiple pull requests.

#### Make history coherent

Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please squash them before submitting.

#### Update lockfiles where they were changed

Make sure that `yarn.lock` and any other lockfile is updated when they should be. Example: Doesn't add lockfiles as separate commits.

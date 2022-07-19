<img src="https://avatars1.githubusercontent.com/u/3846050?v=4&s=127" width="127px" height="127px" align="left"/>

# FormerKit

> Theming-first components so you can focus on design, not implementation.

<br>

[![Join the chat at https://gitter.im/pagarme/pilot](https://badges.gitter.im/pagarme/pilot.svg)](https://gitter.im/pagarme/pilot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<br>

FormerKit can be mostly compared to other UI libraries out there, but not
exactly. The philosophy behind FormerKit is to build a white-label React
component library by decoupling styles from component's HTML structure,
allowing highly customizable user interfaces without the hurdle to build
everytime the same HTML structure and React component interface
abstractions.

**The fastest way to get started with former kit is using our [Starter Dashboard](https://github.com/pagarme/react-scripts-former-kit-dashboard).**

## Using

Install `former-kit`. If you want to see the full power of FormerKit, you
will also need a skin. We have developed a skin based on our styleguide,
it's available in package
[npm former-kit-skin-pagarme](https://www.npmjs.com/package/former-kit-skin-pagarme)
or in the github repository
[former-kit-skin-pagarme](https://github.com/pagarme/former-kit-skin-pagarme)

```sh
yarn add former-kit former-kit-skin-pagarme
```

Check the [full documentation][docs] to understand how to use components.

## Development

Check the [contributing][contributing] guide.

## Publishing to NPM

The publishing process is automated using a combination of GitHub Actions and CircleCI. We're using the [release-please-action](https://github.com/GoogleCloudPlatform/release-please-action) in order to automatically create GitHub releases and bump the package.json version based on commit messages conventions known as [Conventional Commits](https://www.conventionalcommits.org/).

By following those commit conventions the release-please-action will automatically identify when you're merging a pull request which is in accordance and immediately after will create another pull request which will contain the changelog, the package.json version bump, a tag, and a release indicating the new version.

You're not required to merge this release pull request, but when you do it will trigger a workflow on CircleCI which will publish the new version of the package to NPM.

if you can't get it through CI you need to have access to NPM publish and run
```
npm publish
```


## Licensing

See [LICENSE](LICENSE.md).

-----

[docs]: http://pagarme.github.io/former-kit
[contributing]: CONTRIBUTING.md


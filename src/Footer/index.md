Footer example
```jsx
const IconLink = require('emblematic-icons/svg/Link20.svg').default;
const IconGithub = require('emblematic-icons/svg/Github20.svg').default;
const IconFacebook = require('emblematic-icons/svg/Facebook20.svg').default;

const links = [
  {
    title: 'Docs',
    onClick: () => {},
  },
  {
    title: 'Contact',
    onClick: () => {},
  },
];

<Footer
  links={links}
>
  <button onClick={() => {}}><IconLink /></button>
  <button onClick={() => {}}><IconGithub /></button>
  <button onClick={() => {}}><IconFacebook /></button>
</Footer>
```

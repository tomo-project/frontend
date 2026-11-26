///<reference types="vite/client" />

import '../src/app/globals.css';

import { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Tokens',
          ['Colors', 'Typography', 'Spacing & Radius', 'Elevation'],
          'Components',
          'Examples',
          '*',
        ],
      },
    },
  },
};

export default preview;

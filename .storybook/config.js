import { configure } from '@storybook/react';

// function loadStories() {
//   require('../stories/index.tsx');

// }

const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);

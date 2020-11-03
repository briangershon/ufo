import initUFO from './ufo-widget';

const canvas = document.getElementById('my-canvas');

initUFO({
  canvas,
  backgroundColor: '#fff',
  scale: 1,
  entityCount: 22
});

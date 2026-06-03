module.exports = {
  source: 'src',
  output: 'lib',
  targets: [
    ['module', { esm: true }],
    'typescript',
  ],
};

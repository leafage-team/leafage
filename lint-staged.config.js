module.exports = {
  // eslint格式化代码
  '{packages,examples}/**/*.{js,jsx}': (filenames) => [`eslint ${filenames.join(' ')}`],
};

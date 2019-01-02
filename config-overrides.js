const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', {libraryName: 'semantic-ui-react', libraryDirectory: 'src', style: 'css'}],
        config,
    );
    return config;
};
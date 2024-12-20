module.exports = {
    presets: [
        '@babel/preset-env', // For ES6+ support
        '@babel/preset-typescript', // For TypeScript support
        [
            '@babel/preset-react', // For React support
            {
                runtime: 'automatic', // Use the new JSX transform
            },
        ],
    ],
};

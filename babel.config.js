module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@adapters': './src/adapters',
                '@controllers': './src/controllers',
                '@entities': './src/entities',
                '@services': './src/useCases/services',
                '@validations': './src/useCases/validations'
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}
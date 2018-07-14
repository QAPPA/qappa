const pkg = require('./package');

module.exports = {
    mode: 'universal',
    srcDir: 'client/',

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            {
            charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#3B8070'
    },

    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-default/index.css'
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/element-ui'
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [],

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    },
    generate: {
        dir: 'client/dist'
    }
};

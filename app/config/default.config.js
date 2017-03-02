export default {
    port: 3000,
    default_module: 'admin',
    pageNum: 25,

    session: {
    	key: 'koahub.js'
    },

    static: {
        dir: 'www'
    },

    loader: {
        "models": {
            root: 'model',
            suffix: '.model.js'
        }
    }
}
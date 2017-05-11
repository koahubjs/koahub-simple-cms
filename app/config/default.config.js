export default {
    
    port: 3001,
    default_module: 'admin',

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
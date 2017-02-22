export default {
    port: 3000,
    default_module: 'admin',
    pageNum: 25,

    loader: {
        "models": {
            root: 'model',
            suffix: '.model.js'
        }
    }
}
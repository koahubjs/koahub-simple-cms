module.exports = {
	
	session: {
    	key: 'koahub.js'
    },

    static: {
        dir: 'www'
    },

    mysql: {
	    "type": "mysql",
	    "host": "127.0.0.1",
	    "user": "root",
	    "password": "",
	    "database": "koahub",
	    "charset": "utf8"
	},

	hbs: {
	    extname: '.html',
	    viewPath: './www',
	    layoutsPath: './www',
	    partialsPath: './www',
	    disableCache: true
	}
}
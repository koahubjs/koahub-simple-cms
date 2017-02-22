import bookshelf from "./../data/bookshelf.init";

const model = bookshelf.Model.extend({
    tableName: 'admin',
    hasTimestamps: true
});

export default model;
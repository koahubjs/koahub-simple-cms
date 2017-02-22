import bookshelf from "./../data/bookshelf.init";

const model = bookshelf.Model.extend({
    tableName: 'page',
    hasTimestamps: true
});

export default model;
import bookshelf from "./../data/bookshelf.init";

const model = bookshelf.Model.extend({
    tableName: 'config',
    hasTimestamps: true
});

export default model;
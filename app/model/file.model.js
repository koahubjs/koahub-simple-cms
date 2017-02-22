import bookshelf from "./../data/bookshelf.init";

const model = bookshelf.Model.extend({
    tableName: 'file',
    hasTimestamps: true
});

export default model;
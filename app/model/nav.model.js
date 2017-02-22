import bookshelf from "./../data/bookshelf.init";

const parent = bookshelf.Model.extend({
    tableName: 'nav',
    hasTimestamps: true
});

const model = bookshelf.Model.extend({
    tableName: 'nav',
    hasTimestamps: true,
    parent: function () {
        return this.belongsTo(parent, 'pid');
    }
});

export default model;
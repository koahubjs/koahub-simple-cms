

const parent = koahub.Model.extend({
    tableName: 'nav',
    hasTimestamps: true
});

const model = koahub.Model.extend({
    tableName: 'nav',
    hasTimestamps: true,
    parent: function () {
        return this.belongsTo(parent, 'pid');
    }
});

export default model;
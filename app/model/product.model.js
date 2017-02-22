import bookshelf from "./../data/bookshelf.init";
import file from "./file.model";

const model = bookshelf.Model.extend({
    tableName: 'product',
    hasTimestamps: true,
    file: function () {
        return this.belongsTo(file, 'file_id');
    }
});

export default model;
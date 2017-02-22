import bookshelf from "./../data/bookshelf.init";
import file from "./file.model";

const model = bookshelf.Model.extend({
    tableName: 'partner',
    hasTimestamps: true,
    file: function () {
        return this.belongsTo(file, 'file_id');
    },
    qrcode: function () {
        return this.belongsTo(file, 'qrcode_id');
    }
});

export default model;

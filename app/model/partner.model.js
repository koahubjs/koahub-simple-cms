
import file from "./file.model";

const model = koahub.Model.extend({
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

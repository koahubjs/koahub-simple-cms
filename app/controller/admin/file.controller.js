import base from "./base.controller";
import moment from "moment";
import uuid from "node-uuid";
import fs from "fs-promise";


export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {
        const page = this.query.page || 1;
        const file = await this.model('file', {withRelated: []}).findPage({}, {page: page});

        await this.render('file_index', {
            file: file.data,
            page: this.page(page, file.pagination.rowCount, '/admin/file/index')
        });
    }

    async add() {
        const files = this.file;
        for (let i in files) {
            const file = files[i];

            let ext = '';  //后缀名
            switch (file.type) {
                case 'image/pjpeg':
                    ext = 'jpg';
                    break;
                case 'image/jpeg':
                    ext = 'jpg';
                    break;
                case 'image/png':
                    ext = 'png';
                    break;
                case 'image/x-png':
                    ext = 'png';
                    break;
            }
            const savepath = moment().format('YYYY-MM-DD') + '/';
            const savename = uuid.v1() + '.' + ext;

            const err = await fs.move(file.path, 'www/public/uploads/' + savepath + savename);
            if (!err) {
                const data = {
                    name: file.name,
                    ext: ext,
                    type: file.type,
                    savename: savename,
                    savepath: savepath
                };

                await this.model('file', {withRelated: []}).add(data);
                console.log("success!");
            } else {
                console.log("fail!");
            }
        }
        this.success('/admin/file/index', '保存成功');
    }


}

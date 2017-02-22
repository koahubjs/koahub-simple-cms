import base from "./base.controller";
import moment from "moment";
import uuid from "node-uuid";
import fs from "fs-promise";

export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async add() {
        const file = this.file.file;

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
            
            const url = 'http://' + this.host + '/public/uploads/' + savepath + savename;
            this.view(url);
        } else {
            this.view('error');
        }
    }


}

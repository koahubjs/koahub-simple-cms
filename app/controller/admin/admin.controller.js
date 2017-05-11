import base from "./base.controller";

import md5 from "md5";

export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {

        const page = this.query.page || 1;
        const admin = await this.model('admin').findPage({}, {page: page});

        await this.render('admin_index', {
            admin: admin.data,
            page: this.page(page, admin.pagination.rowCount)
        });
    }

    async update() {

        const id = this.query.id;
        const status = this.query.status;
        const ids = id.split(',');

        for (let i in ids) {
            await this.model('admin').add({id: ids[i], status: status});
        }

        this.json('/admin/admin/index', '保存成功');
    }


    async add() {

        if (this.isPost()) {

            const admin = this.post;
            
            if (admin.password) {
                admin.password = md5(admin.password);
            } else {
                delete admin.password;
            }
            
            await this.model('admin').add(admin);

            this.json('/admin/admin/index', '保存成功');

        } else {

            if (this.query.id) {
                var admin = await this.model('admin').find({id: this.query.id});
                await this.render('admin_add', {admin: admin});
            } else {
                await this.render('admin_add');
            }
        }

    }


}
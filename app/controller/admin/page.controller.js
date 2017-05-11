import base from "./base.controller";

import { slugify } from 'transliteration';

export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {

        const p = this.query.page || 1;
        const page = await this.model('page').findPage({}, {page: p});

        await this.render('page_index', {
            page: page.data,
            pagination: this.page(p, page.pagination.rowCount)
        });
    }

    async update() {

        const id = this.query.id;
        const status = this.query.status;
        const ids = id.split(',');

        for (let i in ids) {
            await this.model('page').add({id: ids[i], status: status});
        }

        this.json('/admin/page/index', '保存成功');
    }


    async add() {

        if (this.isPost()) {

            const page = this.post;
            page.pinyin = slugify(page.name);

            await this.model('page').add(page);

            this.json('/admin/page/index', '保存成功');

        } else {

            if (this.query.id) {
                var page = await this.model('page').find({id: this.query.id});
                await this.render('page_add', {page: page});
            } else {
                await this.render('page_add');
            }


        }

    }


}
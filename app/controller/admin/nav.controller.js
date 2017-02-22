import base from "./base.controller";
import LTT from "list-to-tree";
import pagination from "./../../util/pagination.util";

export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {

        const page = this.query.page || 1;
        const nav = await this.model('nav', { withRelated: ['parent'] }).getPageList(page);

        await this.render('nav_index', {
            nav: nav.data,
            page: pagination(page, nav.pagination.rowCount)
        });
    }

    async update() {

        const id = this.query.id;
        const status = this.query.status;
        const ids = id.split(',');

        for (let i in ids) {
            await this.model('nav').add({ id: ids[i], status: status });
        }

        this.json('/admin/nav/index', '保存成功');
    }


    async add() {

        if (this.isPost()) {

            const nav = this.post;
            await this.model('nav').add(nav);

            this.json('/admin/nav/index', '保存成功');
        } else {

            var parent = await this.model('nav').getQueryList(function(qb) {
                qb.where('pid', '=', '0');
                qb.orderBy('rank', 'desc');
            });

            if (this.query.id) {
                var nav = await this.model('nav').get({ id: this.query.id });
                await this.render('nav_add', { nav: nav, parent: parent });
            } else {
                await this.render('nav_add', { parent: parent });
            }
        }
    }
}

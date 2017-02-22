import base from "./base.controller";
import pagination from "./../../util/pagination.util";

export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {

        const page = this.query.page || 1;
        const ads = await this.model('ads', {withRelated: ['file']}).getPageList(page);

        await this.render('ads_index', {
            ads: ads.data,
            page: pagination(page, ads.pagination.rowCount)
        });
    }

    async update() {

        const id = this.query.id;
        const status = this.query.status;
        const ids = id.split(',');

        for (let i in ids) {
            await this.model('ads').add({id: ids[i], status: status});
        }

        this.json('/admin/ads/index', '保存成功');
    }


    async add() {

        if (this.isPost()) {

            const ads = this.post;
            await this.model('ads').add(ads);

            this.json('/admin/ads/index', '保存成功');

        } else {

            if (this.query.id) {
                const ads = await this.model('ads', {withRelated: ['file']}).get({id: this.query.id});
                await this.render('ads_add', {ads: ads});
            } else {
                await this.render('ads_add');
            }


        }

    }

}

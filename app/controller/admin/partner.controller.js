import base from "./base.controller";


export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {

        const page = this.query.page || 1;
        const partner = await this.model('partner', {withRelated: ['file', 'qrcode']}).findPage({}, {page: page});

        await this.render('partner_index', {
            partner: partner.data,
            page: this.page(page, partner.pagination.rowCount)
        });
    }

    async update() {

        const id = this.query.id;
        const status = this.query.status;
        const ids = id.split(',');

        for (let i in ids) {
            await this.model('partner').add({id: ids[i], status: status});
        }

        this.json('/admin/partner/index', '保存成功');
    }


    async add() {

        if (this.isPost()) {

            const partner = this.post;
            await this.model('partner').add(partner);
            this.json('/admin/partner/index', '保存成功');
        } else {

            if (this.query.id) {
                const partner = await this.model('partner', {withRelated: ['file', 'qrcode']}).find({id: this.query.id});
                await this.render('partner_add', {partner: partner});
            } else {
                await this.render('partner_add');
            }
        }

    }
}

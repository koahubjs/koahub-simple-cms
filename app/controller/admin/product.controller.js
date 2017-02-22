import base from "./base.controller";
import pagination from "./../../util/pagination.util";

export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {

        const page = this.query.page || 1;
        const product = await this.model('product', {withRelated: ['file']}).getPageList(page);

        await this.render('product_index', {
            product: product.data,
            page: pagination(page, product.pagination.rowCount)
        });
    }

    async update() {

        const id = this.query.id;
        const status = this.query.status;
        const ids = id.split(',');

        for (let i in ids) {
            await this.model('product').add({id: ids[i], status: status});
        }

        console.log(111);

        this.json('/admin/product/index', '保存成功');
    }


    async add() {

        if (this.isPost()) {

            const product = this.post;
            await this.model('product').add(product);

            this.json('/admin/product/index', '保存成功');

        } else {

            if (this.query.id) {
                var product = await this.model('product', {withRelated: ['file']}).get({id: this.query.id});
                await this.render('product_add', {product: product});
            } else {
                await this.render('product_add');
            }


        }

    }
}

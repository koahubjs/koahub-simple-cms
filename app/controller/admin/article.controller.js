import { slugify } from 'transliteration';
import base from "./base.controller";


export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {

        const page = this.query.page || 1;
        const article = await this.model('article', {withRelated: ['file']}).findPage({}, {page: page});

        await this.render('article_index', {
            article: article.data,
            page: this.page(page, article.pagination.rowCount)
        });
    }

    async update() {

        const id = this.query.id;
        const status = this.query.status;
        const ids = id.split(',');

        for (let i in ids) {
            await this.model('article').add({id: ids[i], status: status});
        }

        this.json('/admin/article/index', '保存成功');
    }


    async add() {

        if (this.isPost()) {

            const article = this.post;

            article.pinyin = slugify(article.title);

            await this.model('article').add(article);

            this.json('/admin/article/index', '保存成功');
        } else {

            if (this.query.id) {
                var article = await this.model('article', {withRelated: ['file']}).find({id: this.query.id});
                await this.render('article_add', {article: article});
            } else {
                await this.render('article_add');
            }
        }
    }
}
import base from "./base.controller";

export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {

        const config = await this.model('config').find({});
        await this.render('config_index', {config: config});
    }

    async add() {

        const data = this.post;
        await this.model('config').add(data);

        super.success('/admin/config/index', '保存成功');
    }
}
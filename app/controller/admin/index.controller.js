import base from "./base.controller";

export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {
        await this.render('index_index');
    }


}

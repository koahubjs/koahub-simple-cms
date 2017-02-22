import base from "./base.controller";

export default class extends base {

    async _initialize() {
        await super._initialize();
    }

    async index() {

        const menu = await this.model('menu', {withRelated: ['file']}).getQueryList();
        await this.render('menu_index', {menu: menu});
    }

    async update() {

        const id = this.query.id;
        const status = this.query.status;
        const ids = id.split(',');

        for (let i in ids) {
            await this.model('menu').add({id: ids[i], status: status});
        }

        super.json('/admin/menu/index', '保存成功');
    }


    async add() {

        if(super.isPost()){

            const menu = this.post;
            await this.model('menu').add(menu);

            super.json('/admin/menu/index', '保存成功');

        }else{

            if(this.query.id){
                var menu = await this.model('menu').get({id: this.query.id});
                await this.render('menu_add',{menu: menu});
            }else{
                await this.render('menu_add');
            }


        }

    }

}

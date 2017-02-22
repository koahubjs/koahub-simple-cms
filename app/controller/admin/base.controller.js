export default class extends koahub.controller {

    async _initialize() {

        if (!this.isLogin()) {
            this.redirect('/admin/public/login');
        }

        this.state.theme = 'admin';
        this.state.adminUsername = this.session.adminUsername;

        if (this.isPjax()) {
            this.state.layout = false;
        } else {
            this.state.layout = 'admin/layout';
        }
    }


    isLogin() {
        if (this.session.adminId) {
            return true;
        } else {
            return false;
        }
    }
}

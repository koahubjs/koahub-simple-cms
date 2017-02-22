import svgCaptcha from "svg-captcha";
import md5 from "md5";

export default class extends koahub.controller {

    async _initialize() {
        this.state.theme = 'admin';
    }

    async login() {

        if (this.isPost()) {
            const data = this.post;
            if (this.session.verify != data.verify.toLowerCase()) {
                this.redirect('/admin/public/login?err=' + encodeURI('验证码错误'));
                return;
            }
            const username = data.username;
            const password = md5(data.password);
            const admin = await this.model('admin', {withRelated: []}).get({username: username, password: password});

            if (admin && admin.status) {
                this.session.adminId = admin.id;
                this.session.adminUsername = admin.username;

                this.redirect('/admin/index/index');
            } else {
                this.redirect('/admin/public/login?err=' + encodeURI('账号密码错误'));
            }

        } else {

            await this.render('public_login');
        }
    }

    async verify() {

        const captcha = svgCaptcha.create();

        this.session.verify = captcha.text.toLowerCase();
        this.set('Content-Type', 'image/svg+xml');
        this.view(captcha.data);
    }

    async logout() {
        this.session = null;
        this.redirect('/admin/public/login');
    }

}
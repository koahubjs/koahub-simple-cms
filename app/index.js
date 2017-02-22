import Koahub from "koahub";
import hbs from "koahub-handlebars";
import convert from "koa-convert";
import body from "koa-body";
import serve from "koa-static";
import session from "koa-session2";
import helpers from "handlebars-helpers";
import model from "./util/model.util";

const app = new Koahub();
const koa = app.getKoa();

koa.use(convert(body({multipart: true})));
koa.use(convert(serve('./www')));
koa.use(session({
    key: "koahubjs",   //default "koa:sess"
}));
koa.use(hbs.middleware({
    extname: '.html',
    viewPath: './www',
    layoutsPath: './www',
    partialsPath: './www',
    disableCache: true
}));

helpers({
    handlebars: hbs.handlebars
});

koa.use(async function(ctx, next) {

    ctx.model = model;

    if (!ctx.request.body.files) {
        ctx.post = ctx.request.body;
    } else {
        ctx.post = ctx.request.body.fields;
        ctx.file = ctx.request.body.files;
    }

    await next();
});

app.run();

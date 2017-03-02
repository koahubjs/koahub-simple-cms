import Koahub from "koahub";
import hbs from "koahub-handlebars";
import helpers from "handlebars-helpers";
import model from "./util/model.util";

const app = new Koahub();
const koa = app.getKoa();

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

    await next();
});

app.run();

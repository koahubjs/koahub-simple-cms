import hbs from "koahub-handlebars";
import helpers from "handlebars-helpers";

export default function (options) {

	helpers({
	    handlebars: hbs.handlebars
	});
	
    return hbs.middleware(options);
}

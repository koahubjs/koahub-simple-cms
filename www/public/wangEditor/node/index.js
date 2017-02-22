/**
 * Created by einsqing on 16/1/26.
 */
var fs = require('co-fs-extra');
var _ = require('lodash');

var model = require('./../../../app/common/model');
var util = require('./../../../app/common/util');

function *editor(next) {

    var shopId;
    if (this.session.adminId) {
        shopId = 0;
    }

    if (this.session.shopId) {
        shopId = this.session.shopId;
    }
    
    var files = this.request.body.files;
    files = files.upfile;
    
    var file;
    if(!_.isArray(files)){
        file = yield util.uploadImg(files, shopId);
    }
    
    if(!file){
        this.throw(500, '上传文件有误');
        return;
    }
    file_path = '/public/uploads/' + file.savepath + file.savename;

    this.body = file_path;
}

module.exports = editor;
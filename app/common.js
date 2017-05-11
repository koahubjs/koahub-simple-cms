import pagination from "pagination"; //分页

export function randomCode(num) {
    var code = "";
    for (let i = 0; i < num; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

//把返回的数据集转换成Tree,并按规则排序
export function list_to_tree(list, id, pid, child, sort, desc) {
    sort = sort ? sort : 'id';
    let pos = {};
    let tree = new Array();
    let i = 0;
    while (list.length != 0) {
        if (list[i][pid] == 0) {
            list[i][child] = new Array();
            tree.push(list[i]);

            pos[list[i][id]] = [tree.length - 1];
            list.splice(i, 1);
            i--;
        } else {
            let posArr = pos[list[i][pid]];
            if (posArr != undefined) {

                let obj = tree[posArr[0]];
                for (let j = 1; j < posArr.length; j++) {
                    obj = obj[child][posArr[j]];
                }

                list[i][child] = new Array();
                obj[child].push(list[i]);

                pos[list[i][id]] = posArr.concat([obj[child].length - 1]);
                if (desc) {
                    obj[child].sort(function (a, b) {
                        return b[sort] - a[sort]
                    });
                } else {
                    obj[child].sort(function (a, b) {
                        return a[sort] - b[sort]
                    });
                }
                list.splice(i, 1);
                i--;
            }
        }
        i++;
        if (i > list.length - 1) {
            i = 0;
        }
    }
    if (desc) {
        tree.sort(function (a, b) {
            return b[sort] - a[sort]
        });
    } else {
        tree.sort(function (a, b) {
            return a[sort] - b[sort]
        });
    }
    return tree;
}


/**
 * pagination(page, file.pagination.rowCount, '/admin/file/index')
 *
 * @param current
 * @param total
 * @param prelink
 * @param perPage
 * @returns {*}
 */
export function page(current, total, prelink, perPage) {
    perPage = perPage || 25;

    const page = new pagination.TemplatePaginator({
        prelink: prelink || '', current: current, rowsPerPage: perPage,
        totalResult: total,
        template: function (result) {
            let i, len, prelink;
            let html = '<div><ul class="pagination no-margin">';
            if (result.pageCount < 2) {
                html += '<li><a style="background: #fff;">共 ' + total + ' 条记录  1/1 页</a></li>';
                html += '</ul></div>';
                return html;
            }
            prelink = this.preparePreLink(result.prelink);
            if (result.previous) {
                html += '<li><a href="' + prelink + result.previous + '" style="background: #fff;">上一页</a></li>';
            }
            if (result.range.length) {
                for (i = 0, len = result.range.length; i < len; i++) {
                    if (result.range[i] === result.current) {
                        html += '<li class="active"><a href="' + prelink + result.range[i] + '" style="border-color: #dd4b39;background-color: #dd4b39;">' + result.range[i] + '</a></li>';
                    } else {
                        html += '<li><a href="' + prelink + result.range[i] + '" style="background: #fff;">' + result.range[i] + '</a></li>';
                    }
                }
            }
            if (result.next) {
                html += '<li><a href="' + prelink + result.next + '" class="paginator-next" style="background: #fff;">下一页</a></li>';
            }
            html += '</ul></div>';
            return html;
        }
    });

    return page.render();
}



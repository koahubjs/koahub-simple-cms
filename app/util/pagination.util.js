import pagination from "pagination"; //分页
import config from "./../config/default.config";
/**
 * pagination(page, file.pagination.rowCount, '/admin/file/index')
 *
 * @param current
 * @param total
 * @param prelink
 * @param perPage
 * @returns {*}
 */

export default function page(current, total, prelink, perPage) {
    perPage = perPage || config.pageNum;

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



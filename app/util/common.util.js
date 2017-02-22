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
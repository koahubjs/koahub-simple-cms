export default [
    ['/cms/page/:pinyin', {
        get: "/cms/page/detail"
    }],
    ['/cms/page/', {
        get: "/cms/index/index"
    }],
    ['/cms/article/:pinyin', {
        get: "/cms/article/detail"
    }],
    ['/cms/article/', {
        get: "/cms/index/index"
    }]
]
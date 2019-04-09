// tab切换 及 section 显示
$('footer>div').on('click', function () {
    var $index = $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    $('main>section').eq($index).fadeIn().siblings().hide()
})

// 发送Ajax请求获取数据
$.ajax({
    url: 'http://api.douban.com/v2/movie/top250',
    type: 'GET',
    data: {
        start: 0,
        count: 20
    },
    dataType: 'jsonp'
}).done(function (ret) {
    console.log(ret)
}).fail(function () {
    console.log('error ...')
})

// 封装 dom 函数
function setData(data) {

}
// tab切换 及 section 显示
$('footer>div').on('click', function () {
    var $index = $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    $('main>section').eq($index).fadeIn().siblings().hide()
})

// 发送Ajax请求获取数据
var index = 0
var isLoading = false
start()

// 函数节流
var clock
$('main').on('scroll', function () {
    if (clock) {
        clearTimeout(clock)
    }
    clock = setTimeout(function () {
        if ($('section').eq(0).height()-10 <= $('main').scrollTop() + $('main').height()) {
            start()
        }
    }, 300)
})

// var app = {
//     init: function () {
//         this.a = 1
//         this.bind()
//         this.start()
//     },
//     bind: function () {
//         console.log('bind')
//     },
//     start: function () {
//         console.log('start')
//     }
// }
// app.init()


// ajax
function start() {
    if (isLoading) return
    isLoading = true
    $('.loading').show()
    $.ajax({
        url: '//api.douban.com/v2/movie/top250',
        type: 'GET',
        data: {
            start: index,
            count: 20
        },
        dataType: 'jsonp'
    }).done(function (ret) {
        console.log(ret)
        setData(ret)
        index += 20
    }).fail(function () {
        console.log('error ...')
    }).always(function () {
        isLoading = false
        $('.loading').hide()
    })
}


// 封装 dom 函数
function setData(data) {
    data.subjects.forEach(function (movie) {
        var template = `
            <div class="item">
            <a href="#">
                <div class="cover">
                    <img src="//img1.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg" alt="">
                </div>
                <div class="detail">
                    <h2>霸王别姬</h2>
                    <div class="extra"><span class="score">9.3分</span> / <span class="collect_count">1000</span>收藏</div>
                    <div class="extra"><span class="year">1994</span> / <span class="genres">剧情、爱情</span></div>
                    <div class="extra">导演: <span class="directors">张艺谋</span></div>
                    <div class="extra">主演: <span class="casts">张艺谋</span></div>
                </div>
            </a>
        </div>
        `
        var $node = $(template)
        $node.find('.cover img').attr('src', movie.images.medium)
        $node.find('.detail h2').text(movie.title)
        $node.find('.detail .score').text(movie.rating.average)
        $node.find('.detail .year').text(movie.year)
        $node.find('.detail .genres').text(movie.genres.join('/'))
        $node.find('.detail .collect_count').text(movie.collect_count)
        $node.find('.detail .directors').text(function () {
            var directorsArr = []
            movie.directors.forEach(function (item) {
                directorsArr.push(item.name)
            })
            return directorsArr.join('、')
        })
        $node.find('.detail .casts').text(function () {
            var castsArr = []
            movie.casts.forEach(function (item) {
                castsArr.push(item.name)
            })
            return castsArr.join('、')
        })
        $('.top-250').append($node)
    })
}

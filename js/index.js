// footer tab 点击 及 section 切换
$('footer>div').on('click', function () {
  var $index = $(this).index()
  $(this).addClass('active').siblings().removeClass('active')
  $('main>section').hide().eq($index).fadeIn()
})

// 发送 Ajax 请求
var index = 0
var isLoading = false
start()

// 页面滚到底部，再次发送 Ajax 请求
var cloak
$('main').on('scroll', function () {
  if (cloak) {
    clearTimeout(cloak)
  }
  cloak = setTimeout(function () {
    if ($('.top250').height() - 30 <= $('main').scrollTop() + $('main').height()) {
      start()
    }
  }, 300)
})

// function ...
// 发送 ajax
function start() {
  if (isLoading) return
  isLoading = true
  $('.loading').show()
  $.ajax({
    url: "//api.douban.com/v2/movie/top250",
    type: 'GET',
    data: {
      start: index,
      count: 20
    },
    dataType: 'jsonp'
  }).done(function (ret) {
    console.log(ret)
    index += 20
    setData(ret)
  }).fail(function (err) {
    console.log(err)
  }).always(function () {
    isLoading = false
    $('.loading').hide()
  })
}

// 创建 dom 并添加到 html
function setData(data) {
  var $movieArr = data.subjects
  $movieArr.forEach(function (movie) {
    var $node = $(`
      <div class="item">
        <a href="#">
          <img src="http://img1.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
        </a>
        <div class="detail">
          <h2></h2>
          <p><span class="average"></span> / <span class="collect_count"></span>收藏</p>
          <p><span class="year"></span> / <span class="genres"></span></p>
          <p>导演：<span class="directors"></span></p>
          <p>主演：<span class="casts"></span></p>
        </div>
      </div>
    `)
    $node.find('img').attr('src', movie.images.medium)
    $node.find('.detail h2').text(movie.title)
    $node.find('.average').text(movie.rating.average + '分')
    $node.find('.collect_count').text(movie.collect_count)
    $node.find('.year').text(movie.year)
    $node.find('.genres').text(movie.genres.join('、'))
    $node.find('.directors').text(function () {
      var directorArr = []
      movie.directors.forEach(function (item) {
        directorArr.push(item.name)
      })
      return directorArr.join('、')
    })
    $node.find('.casts').text(function () {
      var castArr = []
      movie.casts.forEach(function (item) {
        castArr.push(item.name)
      })
      return castArr.join('、')
    })

    $('.top250').append($node)
  })

}


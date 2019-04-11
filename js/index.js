var top250 = {
  init: function () {
    this.$element = $('.top250')
    this.$main = $('main')
    this.isLoading = false
    this.index = 0
    this.isFinish = false
    this.bind()
    this.start()
  },
  bind: function () {
    var _this = this
    this.$main.on('scroll', function () {
      if (_this.isToBottom()) {
        _this.start()
      }
    })
  },
  start: function () {
    var _this = this
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    if (_this.isLoading) return
    _this.isLoading = true
    _this.$element.find('.loading').show()
    $.ajax({
      url: "//api.douban.com/v2/movie/top250",
      type: 'GET',
      data: {
        start: _this.index || 0,
        count: 20
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      console.log(ret)
      _this.index += 20
      if (_this.index >= ret.total) {
        _this.isFinish = true
      }
      callback && callback(ret)
    }).fail(function (err) {
      console.log(err)
    }).always(function () {
      _this.isLoading = false
      _this.$element.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    var $movieArr = data.subjects
    $movieArr.forEach(function (movie) {
      var $node = $(`
      <div class="item">
        <a href="#" style="border: 1px solid red;">
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
      $node.find('a').attr('href', movie.alt)
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
      _this.$element.find('.container').append($node)
    })
  },
  isToBottom: function () {
    return this.$element.find('.container').height() <= this.$main.scrollTop() + this.$main.height() + 30
  }
}

var usBox = {
  init: function () {
    this.$element = $('.usBlock')
    this.start()
  },
  start: function () {
    var _this = this
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    if (_this.isLoading) return
    _this.isLoading = true
    _this.$element.find('.loading').show()
    $.ajax({
      url: "//api.douban.com/v2/movie/us_box",
      type: 'GET',
      dataType: 'jsonp'
    }).done(function (ret) {
      callback && callback(ret)
    }).fail(function (err) {
      console.log(err)
    }).always(function () {
      _this.$element.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    var $movieArr = data.subjects
    $movieArr.forEach(function (movie) {
      movie = movie.subject
      var $node = $(`
      <div class="item">
        <a href="#" style="border: 1px solid red;">
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
      $node.find('a').attr('href', movie.alt)
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
      _this.$element.find('.container').append($node)
    })
  },
}

var search = {
  init: function () {
    this.$element = $('.search')
    this.keyword = ''
    this.bind()
    this.start()
  },
  bind: function () {
    var _this = this
    this.$element.find('button').on('click', function () {
      _this.keyword = _this.$element.find('input').val()
      _this.start()
    })
  },
  start: function () {
    var _this = this
    this.getData(function (data) {
      _this.render(data)
    })
  },
  getData: function (callback) {
    var _this = this
    _this.$element.find('.loading').show()
    $.ajax({
      url: "//api.douban.com/v2/movie/search",
      type: 'GET',
      data: {
        q: _this.keyword
      },
      dataType: 'jsonp'
    }).done(function (ret) {
      console.log(ret)
      callback && callback(ret)
    }).fail(function (err) {
      console.log(err)
    }).always(function () {
      _this.$element.find('.loading').hide()
    })
  },
  render: function (data) {
    var _this = this
    var $movieArr = data.subjects
    $movieArr.forEach(function (movie) {
      var $node = $(`
      <div class="item">
        <a href="#" style="border: 1px solid red;">
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
      $node.find('a').attr('href', movie.alt)
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
      _this.$element.find('.container').append($node)
    })
  },
}

var app = {
  init: function () {
    this.$tabs = $('footer>div')
    this.$panels = $('main>section')
    this.bind()
    top250.init()
    usBox.init()
    search.init()
  },
  bind: function () {
    var _this = this
    this.$tabs.on('click', function () {
      var $index = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      _this.$panels.hide().eq($index).fadeIn()
    })
  }
}

app.init()
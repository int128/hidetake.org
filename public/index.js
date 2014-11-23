(function () {
  Vue.filter('head', function (value, size) {
    if (value instanceof Array) {
      return value.slice(0, size);
    } else {
      console.warn('argument of head filter must be an array', value);
      return value;
    }
  });

  Vue.filter('date', function (value) {
    try {
      return new Date(parseInt(value)).toISOString();
    } catch (e) {
      console.warn('argument of date filter must be a timestamp', value, e);
      return value;
    }
  });

  Vue.filter('picasaImage', function (value) {
    if (typeof(value) == 'string') {
      return 'url(' + value.replace(/([^/]+)$/, 's1600/$1') + ')';
    } else {
      console.warn('argument of picasaImage filter must be a string');
      return value;
    }
  });

  var metadata = {
    github: 'int128',
    album: {
      uid: '104735990260525791394',
      aid: '6084187806131867185',
      c: 'Gv1sRgCN6ChJu0laW2rwE'
    }
  };

  var vm = new Vue({
    el: 'body',
    data: {
      github: {
        url: 'https://github.com/' + metadata.github,
        loaded: false,
        repos: [],
        languages: []
      },
      album: {
        photos: [],
        shown: []
      }
    }
  });

  $(function () {
    var $w = $(window), $d = $(document);

    $w.on('scroll', function () {
      var height = $d.height();
      var position = $w.height() + $w.scrollTop();
      if ((height - position) / height < 0.1) {
        var photo = vm.album.photos[vm.album.shown.length];
        if (photo) {
          vm.album.shown.push(photo);
        }
      }
    });

    $.get('https://api.github.com/users/' + metadata.github + '/repos').then(function (repos) {
      vm.github.loaded = true;
      vm.github.repos = repos;
      vm.github.languages = repos.reduce(function (x, y) {
        if (y.language && x.indexOf(y.language) == -1) {
          x.push(y.language);
        }
        return x;
      }, []).join(', ');
    });

    $.get('https://picasaweb.google.com/data/feed/api/user/' + metadata.album.uid
        + '/albumid/' + metadata.album.aid
        + '?alt=json&kind=photo&authkey=' + metadata.album.c).then(function (data) {
      vm.album.photos = data.feed.entry;
    });
  });
})();

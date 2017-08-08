$('.js-link').click(function (e) {
  e.preventDefault()
  var aid = $(this).attr('href')
  $('html,body').animate({ scrollTop: $(aid).offset().top })
})

Vue.component('tour-component', {
  template: '#tour-component',
  data: function () {
    return {
      items: [],
    }
  },
  methods: {
    getDate (date) {
      var date = new Date(date);
      return date.toLocaleDateString();
    },
  },
  mounted () {
    var self = this
    $.ajax('https://rest.bandsintown.com/artists/HappyThoughts/events?app_id=eyJUb2tlblR5cGUiOiJBUEkiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJmMmJlM2FiYS01ODAzLTQyNGMtOWMxNi0xOTlhMDIyNzAwOGMiLCJpYXQiOjE1MDIyMjg4MzB9.wj6rD0wS0ct-aEm2Em0BqhztwXEFvEWp76X-cNyXAG76nEVYcmz4Hmd6VxLr_oMNV9HGctRxQeqhlRxSs0A1fg')
      .then(function (response) {
        Vue.set(self, 'items', response)
      })
  },
})

new Vue({
  el: '#vue-app'
})

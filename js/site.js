$('.js-link').click(function (e) {
  e.preventDefault()
  var aid = $(this).attr('href')
  $('html,body').animate({ scrollTop: $(aid).offset().top })
})

var Vue = require('vue')
new Vue({
  el: '#vue-app',
  components: {
    // <my-component> will only be available in parent's template
    'tour-component': require('./tour-component.vue')
  }
})

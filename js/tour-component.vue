<template>
    <table class="table">
        <thead>
        <tr>
            <th>Date</th>
            <th>Venue</th>
            <th>City</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items">
            <td v-html="getDate(item.datetime)"></td>
            <td v-html="item.venue.name"></td>
            <td v-html="item.venue.city"></td>
            <td><a :href="item.url" class="btn btn-sm btn-primary">tickets</a></td>
        </tr>
        </tbody>
    </table>
</template>

<script>
  import Vue from 'vue'

  export default {
    template: '#tour-component',
    data: function () {
      return {
        items: [],
      }
    },
    methods: {
      getDate: function (date) {
        let newDate = new Date(date)
        return newDate.toLocaleDateString()
      },
    },
    mounted: function () {
      let self = this
      $.ajax('https://rest.bandsintown.com/artists/HappyThoughts/events?app_id=eyJUb2tlblR5cGUiOiJBUEkiLCJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJmMmJlM2FiYS01ODAzLTQyNGMtOWMxNi0xOTlhMDIyNzAwOGMiLCJpYXQiOjE1MDIyMjg4MzB9.wj6rD0wS0ct-aEm2Em0BqhztwXEFvEWp76X-cNyXAG76nEVYcmz4Hmd6VxLr_oMNV9HGctRxQeqhlRxSs0A1fg')
        .then(function (response) {
          Vue.set(self, 'items', response)
        })
    },
  }
</script>
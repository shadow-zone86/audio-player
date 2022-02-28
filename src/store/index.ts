import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trackActive: 0, /* запуск проигрывателя (0 - стоп, 1 - играть) */
    trackList: [
      { id: 0, title: "Audiophyla", artist: "Valve", time: "6:14" },
      { id: 1, title: "Minute_Quantity", artist: "Matt Carter", time: "1:59" },
      { id: 2, title: "Money_Money_Money", artist: "Italians", time: "8:00" },
      { id: 3, title: "Peppy_The_Firing_Squad", artist: "Peppy the firing squad", time: "3:22" },
      { id: 4, title: "Tight_Rope", artist: "Effel Dur", time: "3:40" },
    ], /* список песен */
    songIndex: [{id: 0, title: '', artist: '', time: ''}], /* активная песня */
    activeItem: 0, /* активный select песни */
    timeStamp: '00:00', /* Отметка времени песни */
  },
  mutations: {
    /* активация проигрывателя (0 - стоп, 1 - играть) */
    mutationTrackActive(state, tmp_active) {
      state.trackActive = tmp_active
    },
    /* определение активной песни */
    mutationSongIndex(state, tmp_id) {
      state.trackList.forEach(function (value) {
        if(value.id === tmp_id) {
          state.songIndex[0]['id'] = state.trackList[value.id]['id']
          state.songIndex[0]['title'] = state.trackList[value.id]['title']
          state.songIndex[0]['artist'] = state.trackList[value.id]['artist']
          state.songIndex[0]['time'] = state.trackList[value.id]['time']
        }
      });
    },
    /* активируем выбранный пользователем select песни */
    mutationActiveItem(state, tmp_item) {
      state.activeItem = tmp_item
    },
    /* переключение на следующую песню */
    mutationNextAudio(state) {
      let counter = state.trackList.length - 1
      let current = state.activeItem
      if (current >= counter) {
        state.activeItem = 0
      } else {
        state.activeItem++
      }
      state.songIndex[0]['id'] = state.trackList[state.activeItem]['id']
      state.songIndex[0]['title'] = state.trackList[state.activeItem]['title']
      state.songIndex[0]['artist'] = state.trackList[state.activeItem]['artist']
      state.songIndex[0]['time'] = state.trackList[state.activeItem]['time']
      state.trackActive = 1
    },
    /* переключение на предыдущую песню */
    mutationPreviousAudio(state) {
      let counter = state.trackList.length - 1
      let current = state.activeItem
      if (current <= 0) {
        state.activeItem = counter
      } else {
        state.activeItem--
      }
      state.songIndex[0]['id'] = state.trackList[state.activeItem]['id']
      state.songIndex[0]['title'] = state.trackList[state.activeItem]['title']
      state.songIndex[0]['artist'] = state.trackList[state.activeItem]['artist']
      state.songIndex[0]['time'] = state.trackList[state.activeItem]['time']
      state.trackActive = 1
    },
    /* отметка времени песни */
    mutationTimeStamp(state, tmp_timestamp) {
      state.timeStamp = tmp_timestamp
    },
  },
  actions: {
    /* запуск проигрывателя (0 - стоп, 1 - играть) */
    actionTrackActive(ctx, tmp_active) {
      ctx.commit('mutationTrackActive', tmp_active)
    },
    /* определение активной песни */
    actionSongIndex(ctx, tmp_index) {
      ctx.commit('mutationSongIndex', tmp_index)
    },
    /* активируем выбранный пользователем select песни */
    actionActiveItem(ctx, tmp_item) {
      ctx.commit('mutationActiveItem', tmp_item)
    },
    /* переключение на следующую песню */
    actionNextAudio(ctx) {
      ctx.commit('mutationNextAudio')
    },
    /* переключение на предыдущую песню */
    actionPreviousAudio(ctx) {
      ctx.commit('mutationPreviousAudio')
    },
    /* отметка времени песни */
    actionTimeStamp(ctx, tmp_timestamp) {
      ctx.commit('mutationTimeStamp', tmp_timestamp)
    },
  },
  getters: {
    /* определение запуска проигрывателя */
    getTrackActive(state) {
      return state.trackActive
    },
    /* список песен */
    getTrackList(state) {
      return state.trackList
    },
    /* активная песня */
    getSongIndex(state) {
      return state.songIndex
    },
    /* активный select песни */
    getActiveItem(state) {
      return state.activeItem
    },
    /* название активной песни */
    getActiveTitle(state) {
      return state.songIndex[0]['title']
    },
    /* отметка времени песни */
    getTimeStamp(state) {
      return state.timeStamp
    },
  },
})

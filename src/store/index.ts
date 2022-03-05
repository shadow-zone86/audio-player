import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trackActive: 0, /* запуск проигрывателя (0 - стоп, 1 - играть) */
    trackList: [
      { id: 0, title: "Audiophyla", artist: "Valve", time: "06:14" },
      { id: 1, title: "Minute_Quantity", artist: "Matt Carter", time: "01:59" },
      { id: 2, title: "Money_Money_Money", artist: "Italians", time: "08:00" },
      { id: 3, title: "Peppy_The_Firing_Squad", artist: "Peppy", time: "03:22" },
      { id: 4, title: "Tight_Rope", artist: "Effel Dur", time: "03:40" },
    ], /* список песен */
    songIndex: [
      { id: 0, title: '', artist: '', time: '' }
    ], /* активная песня */
    activeItem: 0, /* активный select песни */
    timeStamp: '', /* отметка времени песни */
    search: '', /* поиск */
  },
  mutations: {
    /* активация проигрывателя (0 - стоп, 1 - играть) */
    mutationTrackActive(state, active:number) {
      state.trackActive = active
    },
    /* активируем выбранный пользователем select песни */
    mutationActiveItem(state, item:number) {
      state.activeItem = item
    },
    /* отметка времени песни */
    mutationTimeStamp(state, timestamp:string) {
      state.timeStamp = timestamp
    },
    /* определение активной песни */
    mutationSongIndex(state, id:number) {
      state.trackList.forEach(function (value) {
        if(value.id === id) {
          state.songIndex[0]['id'] = state.trackList[value.id]['id']
          state.songIndex[0]['title'] = state.trackList[value.id]['title']
          state.songIndex[0]['artist'] = state.trackList[value.id]['artist']
          state.songIndex[0]['time'] = state.trackList[value.id]['time']
        }
      })
    },
    /* переключение на следующую(предыдущую) песню */
    mutationSwitchAudio(state, index:number) {
      let counter = state.trackList.length - 1
      let current = state.activeItem
      switch (index) {
        case 0: // следующая песня
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
          break
        case 1: // предыдущая песня
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
          break
      }
    },
  },
  actions: {
    /* запуск проигрывателя (0 - стоп, 1 - играть) */
    actionTrackActive(ctx, active) {
      ctx.commit('mutationTrackActive', active)
    },
    /* активируем выбранный пользователем select песни */
    actionActiveItem(ctx, item) {
      ctx.commit('mutationActiveItem', item)
    },
    /* отметка времени песни */
    actionTimeStamp(ctx, timestamp) {
      ctx.commit('mutationTimeStamp', timestamp)
    },
    /* определение активной песни */
    actionSongIndex(ctx, id) {
      ctx.commit('mutationSongIndex', id)
    },
    /* переключение на следующую(предыдущую) песню */
    actionSwitchAudio(ctx, index) {
      ctx.commit('mutationSwitchAudio', index)
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
    /* отметка времени песни */
    getSearch(state) {
      return state.search
    },
  },
})
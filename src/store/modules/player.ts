import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

@Module({ namespaced: true })
class Player extends VuexModule {
    public trackActive = 0 // запуск проигрывателя (0 - стоп, 1 - играть)
    public trackList = [
      { id: 0, title: "Audiophyla", artist: "Valve", time: "06:14" },
      { id: 1, title: "Minute_Quantity", artist: "Matt Carter", time: "01:59" },
      { id: 2, title: "Money_Money_Money", artist: "Italians", time: "08:00" },
      { id: 3, title: "Peppy_The_Firing_Squad", artist: "Peppy", time: "03:22" },
      { id: 4, title: "Tight_Rope", artist: "Effel Dur", time: "03:40" },
    ] // список песен
    public songIndex = [
      { id: 0, title: '', artist: '', time: '' }
    ] // активная песня
    public activeItem = 0 // активный select песни
    public timeStamp = '' // отметка времени песни
    public search = '' // поиск

    @Mutation
    // активируем проигрыватель (0 - стоп, 1 - играть)
    public setTrackActive(active:number):void {
        this.trackActive = active
    }
    @Mutation
    // активируем выбранный пользователем select песни
    public setActiveItem(item:number):void {
        this.activeItem = item
    }
    @Mutation
    // отметка времени песни
    public setTimeStamp(timestamp:string):void {
        this.timeStamp = timestamp
    }
    @Mutation
    // определение активной песни
    public setSongIndex(id:number):void {
        let array = this.trackList
        array.forEach((value) => {
            if (value.id === id) {
                this.songIndex[0]['id'] = this.trackList[value.id]['id']
                this.songIndex[0]['title'] = this.trackList[value.id]['title']
                this.songIndex[0]['artist'] = this.trackList[value.id]['artist']
                this.songIndex[0]['time'] = this.trackList[value.id]['time']
            }
        })
    }
    @Mutation
    // переключение на следующую(предыдущую) песню
    public setSwitchAudio(index:number):void {
        let counter = this.trackList.length - 1
        let current = this.activeItem
        switch (index) {
            case 0: // следующая песня
                if (current >= counter) {
                    this.activeItem = 0
                } else {
                    this.activeItem++
                }
                this.songIndex[0]['id'] = this.trackList[this.activeItem]['id']
                this.songIndex[0]['title'] = this.trackList[this.activeItem]['title']
                this.songIndex[0]['artist'] = this.trackList[this.activeItem]['artist']
                this.songIndex[0]['time'] = this.trackList[this.activeItem]['time']
                this.trackActive = 1
            break
            case 1: // предыдущая песня
                if (current <= 0) {
                    this.activeItem = counter
                } else {
                    this.activeItem--
                }
                this.songIndex[0]['id'] = this.trackList[this.activeItem]['id']
                this.songIndex[0]['title'] = this.trackList[this.activeItem]['title']
                this.songIndex[0]['artist'] = this.trackList[this.activeItem]['artist']
                this.songIndex[0]['time'] = this.trackList[this.activeItem]['time']
                this.trackActive = 1
            break
        }
    }

    @Action
    // запуск проигрывателя (0 - стоп, 1 - играть)
    public actionTrackActive(active:number):void {
        this.context.commit('setTrackActive', active)
    }
    @Action
    // активируем выбранный пользователем select песни
    public actionActiveItem(item:number):void {
        this.context.commit('setActiveItem', item)
    }
    @Action
    // отметка времени песни
    public actionTimeStamp(timestamp:string):void {
        this.context.commit('setTimeStamp', timestamp)
    }
    @Action
    // определение активной песни
    public actionSongIndex(id:number):void {
        this.context.commit('setSongIndex', id)
    }
    @Action
    // переключение на следующую(предыдущую) песню
    public actionSwitchAudio(index:number):void {
        this.context.commit('setSwitchAudio', index)
    }

    // отметка времени песни
    get getTimeStamp():string {
        return this.timeStamp
    }
    // активная песня
    get getSongIndex():any {
        return this.songIndex
    }
    // активный select песни
    get getActiveItem():number {
        return this.activeItem
    }
    // список песен
    get getTrackList():any {
        return this.trackList
    }
    // определение запуска проигрывателя
    get getTrackActive():number {
        return this.trackActive
    }
    // отметка времени песни
    get getSearch():string {
        return this.search
    }
    // название активной песни
    get getActiveTitle():string {
        return this.songIndex[0]['title']
    }
}

export default Player
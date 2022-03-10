<template>
    <div class="content">
        <audio class="audio" src="audio/Audiophyla.mp3" ref="audio" @timeupdate="updateProgress"></audio>
        <div class="progressbar" ref="progress" @click="setProgress">
            <div class="progressbar__container" ref="progressbar">
                <div class="progressbar__timestamp" ref="timestamp">
                    {{ getTimeStamp }}
                </div>
            </div>
        </div>
        <Control @play="play" @pause="pause" @sound="sound($event)" @setAudio="setAudio($event)" />
        <Playlist @play="play" @pause="pause" @setAudio="setAudio($event)" />
    </div>
</template>

<script lang="ts">
    import { mapGetters, mapActions } from "vuex"
    import Control from '@/components/home/PanelControl.vue'
    import Playlist from '@/components/home/PanelPlaylist.vue'
    import Vue from 'vue'
    export default Vue.extend({
        data() {
            return {
                next: 0,
                percent: '',
            };
        },
        components: {
            Control,
            Playlist,        
        },
        computed: {
            ...mapGetters([
                "getTimeStamp",
                "getActiveTitle",
            ]),
        },
        methods: {
            ...mapActions([
                "actionSwitchAudio",
                "actionTimeStamp",
            ]),
            play: function () {
                (this.$refs.audio as HTMLAudioElement).play()
            },
            pause: function () {
                (this.$refs.audio as HTMLAudioElement).pause()
            },
            sound: function (range:number) {
                (this.$refs.audio as HTMLAudioElement).volume = range
            },
            updateProgress: function (e:any) {
                (this.$refs.progressbar as HTMLElement).style.width = `${(e.srcElement.currentTime / e.srcElement.duration) * 100}%`
                /* Определение текущего времени песни */
                let hours = Math.floor(e.srcElement.currentTime / 60 / 60)
                let minutes = Math.floor(e.srcElement.currentTime / 60) - (hours * 60)
                let seconds = e.srcElement.currentTime % 60
                let concatenation = ''
                let timeMinute = ''
                if (minutes < 10) {
                    timeMinute = '0' + minutes
                }
                if (seconds < 10) {
                    concatenation = ':0'
                } else {
                    concatenation = ':'
                }
                let timestamp = timeMinute + concatenation + Math.floor(seconds)
                this.actionTimeStamp(timestamp)
                /* Определение процентов для переключения на другую песню при полном прослушивании */
                this.percent = `${(e.srcElement.currentTime / e.srcElement.duration) * 100}`
                if (this.percent == '100') {
                    this.actionSwitchAudio(this.next)
                    this.setAudio(this.getActiveTitle)
                    this.play()
                }
            },
            setAudio: function (name:string) {
                (this.$refs.audio as HTMLAudioElement).src = `audio/${name}.mp3`
            },
            setProgress: function () {
                (this.$refs.progress as HTMLElement).addEventListener('click', this.setProgressBar)
            },
            setProgressBar: function (e:any) {
                (this.$refs.audio as HTMLAudioElement).currentTime = (e.offsetX / (this.$refs.progress as HTMLBRElement).clientWidth) * (this.$refs.audio as HTMLAudioElement).duration
            },
        },
    })
</script>

<!--
<script>
    import { mapGetters, mapActions } from "vuex"
    import Control from '@/components/home/Panel_Control.vue'
    import Playlist from '@/components/home/Panel_Playlist.vue'
    import Vue from 'vue'
    export default Vue.extend({
        data() {
            return {
                next: 0,
                percent: 0,
            };
        },
        components: {
            Control,
            Playlist,        
        },
        computed: {
            ...mapGetters([
                "getTimeStamp",
                "getActiveTitle",
            ]),
        },
        methods: {
            ...mapActions([
                "actionSwitchAudio",
                "actionTimeStamp",
            ]),
            play: function () {
                this.$refs.audio.play()
            },
            pause: function () {
                this.$refs.audio.pause()
            },
            sound: function (range) {
                this.$refs.audio.volume = range
            },
            updateProgress: function (e) {
                const {duration, currentTime} = e.srcElement
                const progressPercent = (currentTime / duration) * 100
                this.$refs.progressbar.style.width = `${progressPercent}%`
                /* Определение текущего времени песни */
                let hours = Math.floor(currentTime / 60 / 60)
                let minutes = Math.floor(currentTime / 60) - (hours * 60)
                let seconds = currentTime % 60
                let concatenation = ''
                if (minutes < 10) {
                    minutes = '0' + minutes
                }
                if (seconds < 10) {
                    concatenation = ':0'
                } else {
                    concatenation = ':'
                }
                let timestamp = minutes + concatenation + Math.floor(seconds)
                this.actionTimeStamp(timestamp)
                /* Определение процентов для переключения на другую песню при полном прослушивании */
                this.percent = `${progressPercent}`
                if (this.percent == 100) {
                    this.actionSwitchAudio(this.next)
                    this.setAudio(this.getActiveTitle)
                    this.$refs.audio.play()
                }
            },
            setAudio: function (name) {
                this.$refs.audio.src = `audio/${name}.mp3`
            },
            setProgress: function () {
                this.$refs.progress.addEventListener('click', this.setProgressBar)
            },
            setProgressBar: function (e) {
                this.$refs.audio.currentTime = (e.offsetX / this.$refs.progress.clientWidth) * this.$refs.audio.duration
            },
        },
    })
</script>
-->

<style scoped>
    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .progressbar {
        background: #35495e;
        border-radius: 5px;
        width: 100%;
        height: 10px;
        margin-bottom: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .progressbar .progressbar__container {
        background: #42b883;
        border-radius: 5px;
        height: 6px;
    }

    .progressbar__timestamp {
        padding-top: 13px;
        padding-left: 100%;
        display: block;
    }
</style>
<template>
    <div class="playlist">
        <div class="search">
            <input class="search__input" v-model="search" placeholder="Поиск...">
        </div>
        <ul class="menu">
            <li class="menu__item" :key="list.id" :class="{ active: list.id === getActiveItem }" @click="select(list.id, list.title)" v-for="(list) in mySearch">
                <div class="menu__text" v-if="list.id === getActiveItem">
                    <div class="menu__text" v-if="getTimeStamp === ''">
                        <b>{{ list.artist }}</b> - {{ list.title }}.mp3 <b class="menu__text_right">00:00 / {{ list.time }}</b>
                    </div>
                    <div class="menu__text" v-else>
                        <b>{{ list.artist }}</b> - {{ list.title }}.mp3 <b class="menu__text_right">{{ getTimeStamp }} / {{ list.time }}</b>
                    </div>
                </div>
                <div class="menu__text" v-else>
                    <b>{{ list.artist }}</b> - {{ list.title }}.mp3 <b class="menu__text_right">{{ list.time }}</b>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { namespace } from 'vuex-class'
    const Player = namespace('Player')
    @Component
    export default class PanelPlaylist extends Vue {
        public search = ''
        public selectTrack = 0

        @Player.Getter
        public getTrackList!:any
        @Player.Getter
        public getActiveItem!:number
        @Player.Getter
        public getTimeStamp!:string
        @Player.Getter
        public getTrackActive!:number

        @Player.Action
        private actionBigT!:(text:string) => void
        @Player.Action
        public actionSongIndex!:(id:number) => void
        @Player.Action
        public actionTrackActive!:(active:number) => void
        @Player.Action
        public actionActiveItem!:(item:number) => void

        get mySearch():string {
            var search = this.search
            return this.getTrackList.filter(function (elem:any) {
                if (search === '') {
                    return true
                } else {
                    return (elem.title.toUpperCase().indexOf(search.toUpperCase()) > -1 || elem.artist.toUpperCase().indexOf(search.toUpperCase()) > -1)
                } 
            })
        }

        public select(id:number, title:string):void {
            if (this.selectTrack != id) {
                this.actionSongIndex(id)
                this.$emit('setAudio', title)
                this.$emit('play')
                this.actionTrackActive(1)
                this.actionActiveItem(id)
                this.$emit('timeupdate')
                this.selectTrack = id
            } else {
                switch (this.getTrackActive) {
                    case 0:
                        this.$emit('play')
                        this.actionTrackActive(1)
                        this.$emit('timeupdate')
                    break
                    case 1:
                        this.$emit('pause')
                        this.actionTrackActive(0)
                    break
                }
            }
        }

        mounted() {
            this.actionSongIndex(0)
        }
    }
</script>

<!--
<script lang="ts">
    import { mapGetters, mapActions } from "vuex"
    import Vue from 'vue'
    export default Vue.extend({
        data() {
            return {
                search: '',
                selectTrack: 0,
            };
        },
        computed: {
            ...mapGetters([
                "getTrackList",
                "getActiveItem",
                "getTimeStamp",
                "getTrackActive",
            ]),
            mySearch(): string {
                var search = this.search
                return this.getTrackList.filter(function (elem: any) {
                    if (search === '') {
                        return true
                    } else {
                        return (elem.title.toUpperCase().indexOf(search.toUpperCase()) > -1 || elem.artist.toUpperCase().indexOf(search.toUpperCase()) > -1)
                    } 
                })
            },
        },
        methods: {
            ...mapActions([
                "actionSongIndex",
                "actionTrackActive", 
                "actionActiveItem",
            ]),
            select: function (id:number, title:string) {
                if (this.selectTrack != id) {
                    this.actionSongIndex(id)
                    this.$emit('setAudio', title)
                    this.$emit('play')
                    this.actionTrackActive(1)
                    this.actionActiveItem(id)
                    this.$emit('timeupdate')
                    this.selectTrack = id
                } else {
                    switch (this.getTrackActive) {
                        case 0:
                            this.$emit('play')
                            this.actionTrackActive(1)
                            this.$emit('timeupdate')
                            break
                        case 1:
                            this.$emit('pause')
                            this.actionTrackActive(0)
                            break
                    }
                }
            },
        },
        mounted() {
            this.actionSongIndex(0)
        },
    })
</script>
-->

<!--
<script>
    import { mapGetters, mapActions } from "vuex"
    export default {
        data() {
            return {
                search: '',
                selectTrack: 0,
            };
        },
        computed: {
            ...mapGetters([
                "getTrackList",
                "getActiveItem",
                "getTimeStamp",
                "getTrackActive",
            ]),
            mySearch: function () {
                var search = this.search
                return this.getTrackList.filter(function (elem) {
                    if (search === '') {
                        return true
                    } else {
                        return (elem.title.toUpperCase().indexOf(search.toUpperCase()) > -1 || elem.artist.toUpperCase().indexOf(search.toUpperCase()) > -1)
                    } 
                })
            },
        },
        methods: {
            ...mapActions([
                "actionSongIndex",
                "actionTrackActive", 
                "actionActiveItem",
            ]),
            select: function (id, title) {
                if (this.selectTrack != id) {
                    this.actionSongIndex(id)
                    this.$emit('setAudio', title)
                    this.$emit('play')
                    this.actionTrackActive(1)
                    this.actionActiveItem(id)
                    this.$emit('timeupdate')
                    this.selectTrack = id
                } else {
                    switch (this.getTrackActive) {
                        case 0:
                            this.$emit('play')
                            this.actionTrackActive(1)
                            this.$emit('timeupdate')
                            break
                        case 1:
                            this.$emit('pause')
                            this.actionTrackActive(0)
                            break
                    }
                }
            },
        },
        mounted() {
            this.actionSongIndex(0)
        },
    }
</script>
-->

<style scoped>
    .playlist {
        width: 550px;
        display: inline-block;
    }

    .search {
        padding-left: 40px;
        padding-right: 0px;
        padding-bottom: 50px;
    }

    .search__input {
        display: block;
        list-style-type: none;
        width: 100%;	
        height: 25px;
        line-height: 25px;
        text-indent: 1em;
        border: 3px solid #35495e;
        border-radius: 10px;
        margin-top: 10px;
        color: #35495e;
    }

    .menu__item {
        display: block;
        list-style-type: none;
        cursor: pointer;
        width: 100%;	
        height: 25px;
        line-height: 25px;
        text-indent: 1em;
        background: #35495e;
        outline: 2px solid #35495e;
        border: 3px solid #ffffff;
        border-radius: 10px;
        margin-top: 10px;
        color: #ffffff;
        /* Анимация */
        -webkit-transition: .4s ease-out;
        -webkit-transition-delay: 0.5s;
        -o-transition: .4s ease-out;
        -o-transition-delay: 0.5s;
        -moz-transition: .4s ease-out;
        -moz-transition-delay: 0.5s;
        transition: .4s ease-out;
        transition-delay: 0.2s;
    }

    .menu__item:hover {
        display: block;
        list-style-type: none;
        cursor: pointer;
        width: 100%;	
        height: 25px;
        line-height: 25px;
        text-indent: 1em;
        background: #42b883;
        outline: 2px solid #42b883;
        border: 3px solid #35495e;
        border-radius: 10px;
        margin-top: 10px;
        color: #35495e;
        /* Анимация */
        -webkit-transition: .4s ease-out;
        -webkit-transition-delay: 0.5s;
        -o-transition: .4s ease-out;
        -o-transition-delay: 0.5s;
        -moz-transition: .4s ease-out;
        -moz-transition-delay: 0.5s;
        transition: .4s ease-out;
        transition-delay: 0.1s;
    }

    .menu__text_right {
        float: right;
        margin-right: 1em;
    }

    .active {
        display: block;
        list-style-type: none;
        cursor: pointer;
        width: 100%;	
        height: 25px;
        line-height: 25px;
        text-indent:1em;
        background: #42b883;
        outline: 2px solid #42b883;
        border: 3px solid #35495e;
        border-radius: 10px;
        margin-top: 10px;
        color: #35495e;
    }
</style>
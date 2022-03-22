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
<<<<<<< HEAD
=======
        private actionBigT!:(text:string) => void
        @Player.Action
>>>>>>> 6d84f1811df67f6b0ed2b27c00a26597a91d65fb
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

<style lang="sass" scoped>
    $colorGray: #35495e
    $colorWhite: #f5f5f5
    $colorGreen: #42b883
    $width: 100%
    $height: 25px
    $marginTop: 10px
    $radius: 10px

    %element-shared
        display: block
        list-style-type: none
        width: $width	
        height: $height
        line-height: $height
        text-indent: 1em
        border-radius: $radius
        margin-top: $marginTop

    @mixin item($background: $colorGray, $outline: $colorGray, $border: $colorWhite, $color: $colorWhite)
        @extend %element-shared
        cursor: pointer
        background: $background
        outline: 2px solid $outline
        border: 3px solid $border
        color: $color
        -webkit-transition: .4s ease-out
        -webkit-transition-delay: 0.5s
        -o-transition: .4s ease-out
        -o-transition-delay: 0.5s
        -moz-transition: .4s ease-out
        -moz-transition-delay: 0.5s
        transition: .4s ease-out
        transition-delay: 0.2s

    .playlist
        width: 550px
        display: inline-block
    
    .search
        padding-left: 40px
        padding-right: 0px
        padding-bottom: 50px

    .search__input
        @extend %element-shared
        border: 3px solid $colorGray
        color: $colorGray

    .menu__item
        @include item()

    .menu__item:hover
        @include item($background: $colorGreen, $outline: $colorGreen, $border: $colorGray, $color: $colorGray)

    .menu__text_right
        float: right
        margin-right: 1em

    .active
        @extend %element-shared
        cursor: pointer
        background: $colorGreen
        outline: 2px solid $colorGreen
        border: 3px solid $colorGray
        color: $colorGray
</style>
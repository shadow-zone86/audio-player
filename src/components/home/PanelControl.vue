<template>
    <div class="control">
        <div class="information">
            <marquee class="information__marquee" scrollamount="2">
                <p class="information__text"><b>{{ getSongIndex[0]['artist'] }}</b> - {{ getSongIndex[0]['title'] }}.mp3</p>
            </marquee>
        </div>
        <div class="management">
            <button class="button" @click="backward">
                <b-icon class="button__title" icon="skip-backward"></b-icon>
            </button>
            <button v-if="getTrackActive === 0" class="button" @click="play">
                <b-icon class="button__title" icon="caret-right"></b-icon>
            </button>
            <button v-else class="button" @click="pause">
                <b-icon class="button__title" icon="pause"></b-icon>
            </button>
            <button class="button" @click="forward">
                <b-icon class="button__title" icon="skip-forward"></b-icon>
            </button>
            <input class="range" v-model="sound" ref="range" min="0" max="1" value="0.5" step="0.1" type="range" @change="range">
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Emit } from 'vue-property-decorator'
    import { namespace } from 'vuex-class'
    const Player = namespace('Player')
    @Component
    export default class PanelControl extends Vue {
        public percent = 0
        public next = 0
        public back = 1
        public sound = 0.5

        @Player.Getter
        public getTrackActive!:number
        @Player.Getter
        public getSongIndex!:any
        @Player.Getter
        public getActiveTitle!:string

        @Player.Action
        public actionTrackActive!: (active:number) => void
        @Player.Action
        public actionSwitchAudio!: (index:number) => void

        public backward():void {
            this.actionSwitchAudio(this.back)
            this.$emit('setAudio', this.getActiveTitle)
            this.$emit('play')
        }
        public play():void {
            this.$emit('play')
            this.actionTrackActive(1)
            this.$emit('timeupdate')
        }
        public pause():void {
            this.$emit('pause')
            this.actionTrackActive(0)
        }
        public forward():void {
            this.actionSwitchAudio(this.next)
            this.$emit('setAudio', this.getActiveTitle)
            this.$emit('play')
        }
        public range():void {
            this.$emit('sound', this.sound)
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
                percent: 0,
                next: 0,
                back: 1,
                sound: 0.5,
            };
        },
        computed: {
            ...mapGetters([
                "getTrackActive",
                "getSongIndex",
                "getActiveTitle",
            ]),
        },
        methods: {
            ...mapActions([
                "actionTrackActive",
                "actionSwitchAudio",
            ]),
            backward: function () {
                this.actionSwitchAudio(this.back)
                this.$emit('setAudio', this.getActiveTitle)
                this.$emit('play')
            },
            play: function () {
                this.$emit('play')
                this.actionTrackActive(1)
                this.$emit('timeupdate')
            },
            pause: function () {
                this.$emit('pause')
                this.actionTrackActive(0)
            },
            forward: function () {
                this.actionSwitchAudio(this.next)
                this.$emit('setAudio', this.getActiveTitle)
                this.$emit('play')
            },
            range: function () {
                this.$emit('sound', this.sound)
            },
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
                percent: 0,
                next: 0,
                back: 1,
                sound: 0.5,
            };
        },
        computed: {
            ...mapGetters([
                "getTrackActive",
                "getSongIndex",
                "getActiveTitle",
            ]),
        },
        methods: {
            ...mapActions([
                "actionTrackActive",
                "actionSwitchAudio",
            ]),
            backward: function () {
                this.actionSwitchAudio(this.back)
                this.$emit('setAudio', this.getActiveTitle)
                this.$emit('play')
            },
            play: function () {
                this.$emit('play')
                this.actionTrackActive(1)
                this.$emit('timeupdate')
            },
            pause: function () {
                this.$emit('pause')
                this.actionTrackActive(0)
            },
            forward: function () {
                this.actionSwitchAudio(this.next)
                this.$emit('setAudio', this.getActiveTitle)
                this.$emit('play')
            },
            range: function () {
                this.$emit('sound', this.sound)
            },
        },
    }
</script>
-->

<style lang="sass" scoped>
    $colorGray: #35495e
    $colorGreen: #42b883
    $colorWhite: #f5f5f5

    %shadow-shared
        box-shadow: 1px 1px 1px $colorGray, 0px 0px 1px $colorGray
        cursor: pointer

    @mixin button($shadow: $colorGray)
        margin: 40px
        width: 51px
        height: 51px
        cursor: pointer
        border-radius: 50%
        box-shadow: 0 3px 20px $shadow, inset 0 2px 0 rgba(255,255,255,.6), 0 2px 0 rgba(0,0,0,.1), inset 0 0 20px rgba(0,0,0,.1)
        -webkit-transition: .4s ease-out
        -webkit-transition-delay: 0.5s
        -o-transition: .4s ease-out
        -o-transition-delay: 0.5s
        -moz-transition: .4s ease-out
        -moz-transition-delay: 0.5s
        transition: .4s ease-out
        transition-delay: 0.2s

    .control
        width: 550px
        text-align: center
        display: inline-block
    
    .button__title
        margin-top: 3px
        font-size: 1rem
        color: $colorGray

    .button
        @include button

    .button:hover
        @include button($shadow: $colorGreen)

    .information
        display: block
        list-style-type: none
        cursor: pointer
        width: 100%
        line-height: 0px
        background: $colorGreen
        outline: 2px solid $colorGreen
        border-radius: 10px
        margin-top: 10px
        color: $colorGray

    .information__marquee
        width: 100%

    input[type=range]
        -webkit-appearance: none
        margin: 18px 0

    input[type=range]:focus
        outline: none

    input[type=range]::-webkit-slider-runnable-track
        @extend %shadow-shared
        height: 8.4px
        background: $colorGreen
        border-radius: 1.3px
        border: 0.2px solid $colorGray

    input[type=range]::-webkit-slider-thumb
        @extend %shadow-shared
        border: 1px solid $colorGray
        height: 36px
        width: 16px
        border-radius: 3px
        background: $colorWhite
        -webkit-appearance: none
        margin-top: -14px

    input[type=range]:focus::-webkit-slider-runnable-track
        background: $colorGreen

    input[type=range]::-moz-range-track
        @extend %shadow-shared
        height: 8.4px
        background: $colorGreen
        border-radius: 1.3px
        border: 0.2px solid $colorGray

    input[type=range]::-moz-range-thumb
        @extend %shadow-shared
        border: 1px solid $colorGray
        height: 36px
        width: 16px
        border-radius: 3px
        background: $colorWhite

    input[type=range]::-ms-track
        height: 8.4px
        cursor: pointer
        background: transparent
        border-color: transparent
        border-width: 16px 0
        color: transparent

    input[type=range]::-ms-fill-lower
        box-shadow: 1px 1px 1px $colorGray, 0px 0px 1px $colorGray
        background: $colorGreen
        border: 0.2px solid $colorGray
        border-radius: 2.6px

    input[type=range]::-ms-fill-upper
        background: $colorGreen
        border: 0.2px solid $colorGray
        border-radius: 2.6px
        box-shadow: 1px 1px 1px #35495e, 0px 0px 1px $colorGray

    input[type=range]::-ms-thumb
        @extend %shadow-shared
        border: 1px solid $colorGray
        height: 36px
        width: 16px
        border-radius: 3px
        background: $colorWhite

    input[type=range]:focus::-ms-fill-lower
        background: $colorGreen

    input[type=range]:focus::-ms-fill-upper
        background: $colorGreen
</style>
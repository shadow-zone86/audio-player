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

<style scoped>
    .control {
        width: 550px;
        text-align: center;
        display: inline-block;
    }

    .button__title {
        margin-top: 3px;
        font-size: 1rem;
        color: #35495e;
    }

    .button {
        margin: 40px;
        width: 51px;
        height: 51px;
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 3px 20px #35495e,
        inset 0 2px 0 rgba(255,255,255,.6),
        0 2px 0 rgba(0,0,0,.1),
        inset 0 0 20px rgba(0,0,0,.1);
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

    .button:hover {
        margin: 40px;
        width: 51px;
        height: 51px;
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 3px 20px #42b883,
        inset 0 2px 0 rgba(255,255,255,.6),
        0 2px 0 rgba(0,0,0,.1),
        inset 0 0 20px rgba(0,0,0,.1);
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

    .information {
        display: block;
        list-style-type: none;
        cursor: pointer;
        width: 100%;	
        line-height: 0px;
        background: #42b883;
        outline: 2px solid #42b883;
        border-radius: 10px;
        margin-top: 10px;
        color: #35495e;
    }

    .information__marquee {
        width: 100%;
    }

    /* Громкость */
    input[type=range] {
        -webkit-appearance: none;
        margin: 18px 0;
    }

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
        height: 8.4px;
        cursor: pointer;
        box-shadow: 1px 1px 1px #35495e, 0px 0px 1px #35495e;
        background: #42b883;
        border-radius: 1.3px;
        border: 0.2px solid #35495e;
    }

    input[type=range]::-webkit-slider-thumb {
        box-shadow: 1px 1px 1px #35495e, 0px 0px 1px #35495e;
        border: 1px solid #35495e;
        height: 36px;
        width: 16px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -14px;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #42b883;
    }

    input[type=range]::-moz-range-track {
        height: 8.4px;
        cursor: pointer;
        box-shadow: 1px 1px 1px #35495e, 0px 0px 1px #35495e;
        background: #42b883;
        border-radius: 1.3px;
        border: 0.2px solid #35495e;
    }

    input[type=range]::-moz-range-thumb {
        box-shadow: 1px 1px 1px #35495e, 0px 0px 1px #35495e;
        border: 1px solid #35495e;
        height: 36px;
        width: 16px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
    }

    input[type=range]::-ms-track {
        height: 8.4px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        border-width: 16px 0;
        color: transparent;
    }

    input[type=range]::-ms-fill-lower {
        background: #42b883;
        border: 0.2px solid #35495e;
        border-radius: 2.6px;
        box-shadow: 1px 1px 1px #35495e, 0px 0px 1px #35495e;
    }

    input[type=range]::-ms-fill-upper {
        background: #42b883;
        border: 0.2px solid #35495e;
        border-radius: 2.6px;
        box-shadow: 1px 1px 1px #35495e, 0px 0px 1px #35495e;
    }

    input[type=range]::-ms-thumb {
        box-shadow: 1px 1px 1px #35495e, 0px 0px 1px #35495e;
        border: 1px solid #35495e;
        height: 36px;
        width: 16px;
        border-radius: 3px;
        background: #ffffff;
        cursor: pointer;
    }

    input[type=range]:focus::-ms-fill-lower {
        background: #42b883;
    }

    input[type=range]:focus::-ms-fill-upper {
        background: #42b883;
    }
</style>
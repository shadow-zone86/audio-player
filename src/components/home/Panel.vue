<template>
    <div class="content">
        <audio class="audio" src="audio/Audiophyla.mp3" ref="audio"></audio>
        <div class="progressbar__container" ref="progress" @click="setProgress">
            <div class="progressbar" ref="progressbar">
                <div class="timestamp" ref="timestamp">
                    {{ getTimeStamp }}
                </div>
            </div>
        </div>
        <Button />
        <Menu />
    </div>
</template>
 
<script>
    import { mapGetters } from "vuex"
    import Button from '@/components/home/Panel_Control.vue'
    import Menu from '@/components/home/Panel_Playlist.vue'
    export default {
        components: {
            Button,
            Menu,        
        },
        computed: {
            ...mapGetters([
                "getTimeStamp",
            ]),
        },
        methods: {
            setProgress: function () {
                this.$refs.progress.addEventListener('click', this.setProgressBar)
            },
            setProgressBar: function (e) {
                const width = this.$refs.progress.clientWidth
                const clickX = e.offsetX
                const duration = this.$refs.audio.duration
                this.$refs.audio.currentTime = (clickX / width) * duration
            },
        },
    }
</script>

<style scoped>
    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .progressbar__container {
        background: #35495e;
        border-radius: 5px;
        width: 100%;
        height: 10px;
        margin-bottom: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .progressbar__container .progressbar {
        background: #42b883;
        border-radius: 5px;
        height: 6px;
    }

    .timestamp {
        padding-top: 13px;
        padding-left: 100%;
        display: none;
    }
</style>
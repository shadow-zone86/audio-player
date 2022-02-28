<template>
    <div class="content__playlist">
        <div class="search">
            <b-form-input class="search__input" v-model="search" placeholder="Поиск..."></b-form-input>
        </div>
        <div class="playlist">
            <ul class="menu">
                <li class="menu__item" :key="index" :class="{ active: index === getActiveItem}" @click="select(list.id, list.title)" v-for="(list, index) in mySearch">
                    <b>{{ list.artist }}</b> - {{ list.title }}.mp3
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex"
    export default {
        data() {
            return {
                search: '',
            };
        },
        computed: {
            ...mapGetters([
                "getSongIndex",
                "getTrackList",
                "getActiveItem",
            ]),
            mySearch: function () {
                var search = this.search;
                return this.getTrackList.filter(function (elem) {
                    if(search === '') {
                        return true
                    } else {
                        return elem.title.indexOf(search) > -1
                    } 
                })
            },
        },
        methods: {
            ...mapActions([
                "actionSongIndex", 
                "actionTrackActive", 
                "actionActiveItem",
                "actionSearch",
            ]),
            select: function (id, title) {
                this.actionSongIndex(id)
                this.$parent.$refs.timestamp.style.display = 'block'
                this.$parent.$refs.audio.src = `audio/${title}.mp3`
                this.$parent.$refs.audio.play()
                this.actionTrackActive(1)
                this.actionActiveItem(id)
                this.$parent.$refs.audio.addEventListener('timeupdate', this.updateProgress)
            },
            updateProgress: function (e) {
                const {duration, currentTime} = e.srcElement
                const progressPercent = (currentTime / duration) * 100
                this.$parent.$refs.progressbar.style.width = `${progressPercent}%`
            },
        },
        mounted() {
            this.actionSongIndex(0)
        },
    }
</script>

<style scoped>
    .content__playlist {
        width: 550px;
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
        text-indent:1em;
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
        text-indent:1em;
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
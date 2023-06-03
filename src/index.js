import './main.sass'
// Сделать local storage
// Стилизовать

// Получаем все DOM элементы

const btnPlay = document.querySelector('#play')
const btnPause = document.querySelector('#pause')
const btnPrevTrack = document.querySelector('#prevTrack')
const btnNextTrack = document.querySelector('#nextTrack')
const inputVolumeTrack = document.querySelector('#volumeTrack')
const divCurrentTime = document.querySelector('#currentTime')

// Создаём data
const data = {
  albums: [
    {
      trackPath: require('./assets/music/rozz.mp3'),
      id: 0,
    },
    {
      trackPath: require('./assets/music/Organic Audio - Nurega.mp3'),
      id: 1,
    },
  ],
}

const playerInst = new Audio()

// Создаём класс Itunes
class Itunes {
  constructor(data, player) {
    this.data = data
    this.playing = 0
    this.volume = 0.8
    this.currentTrack = 0
    this.player = player
  }

  playTrack(id) {
    this.player.src = this.data.albums[id].trackPath
    this.player.currentTime = this.currentTimeTrack
    this.player.play()
    console.log('this.playingTrack', this.playingTrack)
    console.log('this.playing', this.playing)
    this.updateCurrentTimeTrack()
    console.log(this.player)
  }

  pauseTrack() {
    this.player.pause()
    console.log(this.player.currentTime)
  }

  switchTrack(id) {
    this.playTrack(id)
    console.log('itunes.GetplayingTrack in switchTrack:', this.playingTrack)
    console.log(this.player.src)
  }

  get playingTrack() {
    return this.playing
  }
  set playingTrack(id) {
    console.log('switch track id:', id)
    return (this.playing = id)
  }

  switchVolume(value) {
    this.player.volume = value
    console.log('player.volume:', this.player.volume)
  }

  get volumeTrack() {
    return this.volume
  }
  set volumeTrack(value) {
    this.switchVolume(value / 100)
    return (this.volume = value)
  }

  get currentTimeTrack() {
    return this.currentTrack
  }
  set currentTimeTrack(value) {
    return (this.currentTrack = value)
  }

  updateCurrentTimeTrack() {
    setInterval(() => {
      let minutes = Math.floor(this.player.currentTime / 60)
      minutes = minutes >= 10 ? minutes : '0' + minutes
      let seconds = Math.floor(this.player.currentTime % 60)
      seconds = seconds >= 10 ? seconds : '0' + seconds

      this.currentTimeTrack = this.player.currentTime
      console.log(this.currentTimeTrack, minutes + ':' + seconds)
      divCurrentTime.innerHTML = minutes + ':' + seconds
    }, 1000)
  }
}

// Создаём инстанс класса Itunes
const itunes = new Itunes(data, playerInst)

// методы для работы с инстансом класса Itunes
btnPlay.addEventListener('click', function () {
  itunes.playTrack(itunes.playingTrack)
})

btnPause.addEventListener('click', function () {
  itunes.pauseTrack()
})

btnPrevTrack.addEventListener('click', function () {
  itunes.playingTrack = itunes.playingTrack - 1
  itunes.currentTimeTrack = 0
  itunes.switchTrack(itunes.playingTrack)
})

btnNextTrack.addEventListener('click', function () {
  itunes.playingTrack = itunes.playingTrack + 1
  itunes.currentTimeTrack = 0
  itunes.switchTrack(itunes.playingTrack)
})

inputVolumeTrack.addEventListener('input', function (e) {
  itunes.volumeTrack = e.target.value
})

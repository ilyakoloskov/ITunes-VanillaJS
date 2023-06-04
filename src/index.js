import './main.sass'
// add info иy using Console. :D
// Create add value in local storage
// Setting output duration track
// Finish value

// Create local data storage
const data = {
  albums: [
    {
      artist: 'Organic Audio',
      albumName: 'Album name value',
      cover: require('./assets/albums/Organic Audio/cover.png'),
      trackPath: {
        Nurega: require('./assets/albums/Organic Audio/Organic Audio - Nurega.mp3'),
        NuregaTwo: require('./assets/albums/Rozz/rozz.mp3'),
        NuregaThree: require('./assets/albums/Organic Audio/Organic Audio - Nurega.mp3'),
      },
      //  require('./assets/albums/Organic Audio/Organic Audio - Nurega.mp3'),
      id: 0,
    },
    {
      albumName: 'Rozz Dyliams',
      trackPath: require('./assets/albums/Rozz/rozz.mp3'),
      id: 1,
    },
  ],
}

// let albums = data.albums.map((el) => {
//   let albumTrackPath = el.trackPath
//   sectionAlbums.appendChild(document.createElement('div')).classList.add('album')
// })

const playerInst = new Audio()
playerInst.preload = 'metadata'

// Создаём класс Itunes
class Itunes {
  constructor(data, player, { ...events }) {
    // Storage
    this.data = data

    // Player
    this.player = player
    this.player.volume = 0.8
    this.player.currentTime = 0
    this.isPlaying = false
    this.playerInterval = null

    this.albumId = 0
    this.trackId = 0
    this.durationTime = 0

    // Btns
    this.events = events

    // Events
    // Play Track
    this.playTrack = this.events.btnPlayTrack.addEventListener('click', () => {
      this.funcPlayTrack(this.albumId, this.trackId)
    })

    this.nextTrack = this.events.btnNextTrack.addEventListener('click', () => {
      this.funcNextTrack()
    })

    this.prevTrack = this.events.btnPrevTrack.addEventListener('click', () => {
      this.funcPrevTrack()
    })

    this.durationTime = this.player.addEventListener('loadeddata', function () {
      console.log(this.duration)
      inputCurrentTime.max = this.duration
      this.durationTime = this.duration
      events.durationTime.innerHTML = this.durationTime
      console.log(this.durationTime)
      // console.log(inputCurrentTime.max)
    })
  }

  funcPlayTrack(albumId, trackId) {
    let trackPath = Object.values(data.albums[albumId].trackPath)
    let coverPath = data.albums[albumId].cover
    console.log(coverPath)
    this.events.trackCover.src = `${coverPath}`
    console.log(this.events.trackCover)
    this.player.src = trackPath[trackId]
    clearInterval(this.playerInterval)
    this.player.play()
    this.currentTimeTrack = this.updateCurrentTimeTrack()
  }

  funcNextTrack() {
    this.playingtrackId = this.playingtrackId + 1
    this.funcPlayTrack(this.albumId, this.playingtrackId)
    this.currentTimeTrack = 0
  }

  funcPrevTrack() {
    this.playingtrackId = this.playingtrackId - 1
    this.funcPlayTrack(this.albumId, this.playingtrackId)
    this.currentTimeTrack = 0
  }

  funcPauseTrack() {
    this.player.pause()
    clearInterval(this.playerInterval)
  }

  get playingtrackId() {
    return this.trackId
  }
  set playingtrackId(id) {
    return (this.trackId = id)
  }

  get volumeTrack() {
    return this.player.volume
  }
  set volumeTrack(value) {
    console.log('Volume:', this.player.volume)
    return (this.player.volume = value / 100)
  }

  get currentTimeTrack() {
    return this.player.currentTime
  }
  set currentTimeTrack(value) {
    return (this.player.currentTime = value)
  }

  updateCurrentTimeTrack() {
    this.playerInterval = setInterval(() => {
      let minutes = Math.floor(this.player.currentTime / 60)
      minutes = minutes >= 10 ? minutes : '0' + minutes
      let seconds = Math.floor(this.player.currentTime % 60)
      seconds = seconds >= 10 ? seconds : '0' + seconds
      this.events.currentTime.innerHTML = minutes + ':' + seconds
      inputCurrentTime.value = this.player.currentTime
      let porgressProcent = () => {
        let result = (inputCurrentTime.value / this.player.duration) * 100
        return result
      }
      inputCurrentTime.style = `--range-value-track-progress: ${porgressProcent()}%`
    }, 25)

    return (this.currentTimeTrack = inputCurrentTime.value)
  }
}
// Create an itunes class instance
const itunes = new Itunes(data, playerInst, {
  btnPlayTrack: document.querySelector('#playTrack'),
  btnNextTrack: document.querySelector('#nextTrack'),
  btnPrevTrack: document.querySelector('#prevTrack'),
  currentTime: document.querySelector('#currentTime'),
  durationTime: document.querySelector('#duratuionTime'),
  trackCover: document.querySelector('#trackCoverImg'),
})

const inputVolumeTrack = document.querySelector('#volumeTrack')

inputVolumeTrack.addEventListener('input', function (e) {
  itunes.volumeTrack = e.target.value
})

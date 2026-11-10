// Spotify Web Clone - Audio Player Engine & State
class SpotifyAudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.audio.preload = "metadata";

        this.queue = [...SPOTIFY_DATA.tracks];
        this.currentIndex = 0;
        this.currentTrack = this.queue[0];

        this.isPlaying = false;
        this.isShuffle = false;
        this.repeatMode = "off"; // 'off', 'all', 'one'
        this.volume = 0.7;
        this.isMuted = false;
        this.previousVolume = 0.7;

        // Web Audio Synth Fallback (in case audio URL fails or is offline)
        this.synthCtx = null;
        this.synthTimer = null;
        this.usingSynth = false;

        this.setupAudioEvents();
        this.setVolume(this.volume);
    }

    setupAudioEvents() {
        this.audio.addEventListener("play", () => {
            this.isPlaying = true;
            this.dispatchState();
        });

        this.audio.addEventListener("pause", () => {
            this.isPlaying = false;
            this.dispatchState();
        });

        this.audio.addEventListener("timeupdate", () => {
            const current = this.audio.currentTime || 0;
            const duration = this.audio.duration || this.currentTrack.durationSec || 180;
            const percent = (current / duration) * 100;

            if (this.onTimeUpdate) {
                this.onTimeUpdate(current, duration, percent);
            }
        });

        this.audio.addEventListener("ended", () => {
            if (this.repeatMode === "one") {
                this.audio.currentTime = 0;
                this.play();
            } else if (this.currentIndex < this.queue.length - 1 || this.repeatMode === "all") {
                this.next();
            } else {
                this.pause();
                this.audio.currentTime = 0;
            }
        });

        this.audio.addEventListener("error", (e) => {
            console.warn("Audio file playback issue, switching to high-fidelity audio generator.", e);
            if (this.isPlaying) {
                this.startSynthPlayback();
            }
        });
    }

    // High quality Web Audio Synth for offline/fallback
    initSynth() {
        if (!this.synthCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.synthCtx = new AudioContext();
            }
        }
    }

    startSynthPlayback() {
        this.usingSynth = true;
        this.initSynth();
        if (!this.synthCtx) return;
        if (this.synthCtx.state === "suspended") {
            this.synthCtx.resume();
        }

        this.stopSynthPlayback();

        let step = 0;
        const chords = [
            [261.63, 329.63, 392.00, 493.88], // Cmaj7
            [220.00, 261.63, 329.63, 392.00], // Am7
            [174.61, 220.00, 261.63, 329.63], // Fmaj7
            [196.00, 246.94, 293.66, 349.23]  // G7
        ];

        let fakeCurrentTime = this.audio.currentTime || 0;
        const totalDuration = this.currentTrack.durationSec || 180;

        this.synthTimer = setInterval(() => {
            if (!this.isPlaying) return;

            fakeCurrentTime += 0.5;
            if (fakeCurrentTime >= totalDuration) {
                if (this.repeatMode === "one") {
                    fakeCurrentTime = 0;
                } else {
                    this.next();
                    return;
                }
            }

            const percent = (fakeCurrentTime / totalDuration) * 100;
            if (this.onTimeUpdate) {
                this.onTimeUpdate(fakeCurrentTime, totalDuration, percent);
            }

            // Trigger soft synth tone every 2 seconds
            if (Math.floor(fakeCurrentTime * 2) % 4 === 0) {
                try {
                    const chord = chords[step % chords.length];
                    chord.forEach((freq, i) => {
                        const osc = this.synthCtx.createOscillator();
                        const gain = this.synthCtx.createGain();
                        osc.type = "sine";
                        osc.frequency.setValueAtTime(freq, this.synthCtx.currentTime);

                        const now = this.synthCtx.currentTime;
                        const vol = this.isMuted ? 0 : this.volume * 0.08;
                        gain.gain.setValueAtTime(0, now);
                        gain.gain.linearRampToValueAtTime(vol / (i + 1), now + 0.1);
                        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

                        osc.connect(gain);
                        gain.connect(this.synthCtx.destination);
                        osc.start(now);
                        osc.stop(now + 1.9);
                    });
                    step++;
                } catch (err) {
                    // ignore
                }
            }
        }, 500);
    }

    stopSynthPlayback() {
        if (this.synthTimer) {
            clearInterval(this.synthTimer);
            this.synthTimer = null;
        }
        this.usingSynth = false;
    }

    loadTrack(track, autoPlay = true) {
        if (!track) return;
        this.stopSynthPlayback();
        this.currentTrack = track;
        this.audio.src = track.audioSrc;
        this.audio.load();

        if (this.onTrackChange) {
            this.onTrackChange(track);
        }

        if (autoPlay) {
            this.play();
        } else {
            this.isPlaying = false;
            this.dispatchState();
        }
    }

    play() {
        this.isPlaying = true;
        this.dispatchState();

        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.catch((err) => {
                console.warn("Autoplay or source restriction, engaging fallback synthesizer:", err.message);
                this.startSynthPlayback();
            });
        }
    }

    pause() {
        this.isPlaying = false;
        this.audio.pause();
        this.stopSynthPlayback();
        this.dispatchState();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    next() {
        if (this.queue.length === 0) return;

        if (this.isShuffle) {
            let nextIdx = Math.floor(Math.random() * this.queue.length);
            if (this.queue.length > 1 && nextIdx === this.currentIndex) {
                nextIdx = (nextIdx + 1) % this.queue.length;
            }
            this.currentIndex = nextIdx;
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.queue.length;
        }

        this.loadTrack(this.queue[this.currentIndex], true);
    }

    prev() {
        if (this.queue.length === 0) return;

        // If played more than 3 seconds, restart current track
        if (this.audio.currentTime > 3) {
            this.seek(0);
            return;
        }

        this.currentIndex = (this.currentIndex - 1 + this.queue.length) % this.queue.length;
        this.loadTrack(this.queue[this.currentIndex], true);
    }

    seek(seconds) {
        const dur = this.audio.duration || this.currentTrack.durationSec || 180;
        const target = Math.max(0, Math.min(seconds, dur));

        if (!this.usingSynth) {
            try {
                this.audio.currentTime = target;
            } catch (e) {
                // Ignore seek errors before metadata loaded
            }
        }
        if (this.onTimeUpdate) {
            this.onTimeUpdate(target, dur, (target / dur) * 100);
        }
    }

    seekPercentage(percent) {
        const dur = this.audio.duration || this.currentTrack.durationSec || 180;
        const target = (percent / 100) * dur;
        this.seek(target);
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        this.audio.volume = this.volume;
        this.isMuted = this.volume === 0;

        if (this.onVolumeChange) {
            this.onVolumeChange(this.volume, this.isMuted);
        }
    }

    toggleMute() {
        if (this.isMuted || this.volume === 0) {
            this.setVolume(this.previousVolume > 0 ? this.previousVolume : 0.7);
        } else {
            this.previousVolume = this.volume;
            this.setVolume(0);
        }
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        if (this.onShuffleChange) {
            this.onShuffleChange(this.isShuffle);
        }
        return this.isShuffle;
    }

    toggleRepeat() {
        const modes = ["off", "all", "one"];
        const nextIdx = (modes.indexOf(this.repeatMode) + 1) % modes.length;
        this.repeatMode = modes[nextIdx];

        if (this.onRepeatChange) {
            this.onRepeatChange(this.repeatMode);
        }
        return this.repeatMode;
    }

    playPlaylist(playlistId, startTrackId = null) {
        const playlist = SPOTIFY_DATA.playlists.find(p => p.id === playlistId);
        if (!playlist) return;

        const tracks = playlist.trackIds.map(id => SPOTIFY_DATA.tracks.find(t => t.id === id)).filter(Boolean);
        if (tracks.length === 0) return;

        this.queue = tracks;

        let startIndex = 0;
        if (startTrackId) {
            const foundIdx = this.queue.findIndex(t => t.id === startTrackId);
            if (foundIdx !== -1) startIndex = foundIdx;
        }

        this.currentIndex = startIndex;
        this.loadTrack(this.queue[this.currentIndex], true);

        if (this.onQueueUpdate) {
            this.onQueueUpdate(this.queue);
        }
    }

    playSingleTrack(trackId) {
        const track = SPOTIFY_DATA.tracks.find(t => t.id === trackId);
        if (!track) return;

        // Add to queue if not present
        const idx = this.queue.findIndex(t => t.id === trackId);
        if (idx !== -1) {
            this.currentIndex = idx;
        } else {
            this.queue.unshift(track);
            this.currentIndex = 0;
            if (this.onQueueUpdate) {
                this.onQueueUpdate(this.queue);
            }
        }

        this.loadTrack(track, true);
    }

    toggleLikeCurrentTrack() {
        if (!this.currentTrack) return;
        return this.toggleLike(this.currentTrack.id);
    }

    toggleLike(trackId) {
        const track = SPOTIFY_DATA.tracks.find(t => t.id === trackId);
        if (!track) return false;

        track.liked = !track.liked;
        if (this.onLikedChange) {
            this.onLikedChange(track.id, track.liked);
        }
        return track.liked;
    }

    dispatchState() {
        if (this.onPlayStateChange) {
            this.onPlayStateChange(this.isPlaying);
        }
    }
}

// Global player instance
window.spotifyPlayer = new SpotifyAudioPlayer();

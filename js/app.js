// Spotify Web Clone - Application UI & Interactions
document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // State & History Management
    // -------------------------------------------------------------
    const state = {
        currentView: "home",
        history: ["home"],
        historyIndex: 0,
        activePlaylistId: null,
        libraryFilter: "all",
        searchQuery: "",
        isDraggingProgress: false,
        isDraggingVolume: false
    };

    // DOM Elements
    const elements = {
        // Nav & Top Bar
        sidebar: document.getElementById("sidebar"),
        navHome: document.getElementById("nav-home"),
        navSearch: document.getElementById("nav-search"),
        btnHistoryBack: document.getElementById("btn-history-back"),
        btnHistoryForward: document.getElementById("btn-history-forward"),
        topSearchWrapper: document.getElementById("top-search-wrapper"),
        searchInput: document.getElementById("search-input"),
        searchClearBtn: document.getElementById("search-clear-btn"),
        scrollContainer: document.getElementById("scroll-container"),
        topBar: document.getElementById("top-bar"),

        // Views
        viewHome: document.getElementById("view-home"),
        viewSearch: document.getElementById("view-search"),
        viewPlaylist: document.getElementById("view-playlist"),
        viewLyrics: document.getElementById("view-lyrics"),
        viewQueue: document.getElementById("view-queue"),

        // Home View elements
        greetingText: document.getElementById("greeting-text"),
        quickGrid: document.getElementById("quick-grid"),
        gridMadeForYou: document.getElementById("grid-made-for-you"),
        gridTopHits: document.getElementById("grid-top-hits"),
        gridPopularArtists: document.getElementById("grid-popular-artists"),
        gridFocusChill: document.getElementById("grid-focus-chill"),

        // Search View elements
        browseGrid: document.getElementById("browse-grid"),
        searchResults: document.getElementById("search-results"),
        browseCategories: document.getElementById("browse-categories"),
        topResultCard: document.getElementById("top-result-card"),
        searchSongsList: document.getElementById("search-songs-list"),

        // Playlist View elements
        playlistHeader: document.getElementById("playlist-header"),
        playlistCoverImg: document.getElementById("playlist-cover-img"),
        playlistType: document.getElementById("playlist-type"),
        playlistTitle: document.getElementById("playlist-title"),
        playlistDesc: document.getElementById("playlist-desc"),
        playlistAuthorAvatar: document.getElementById("playlist-author-avatar"),
        playlistAuthorName: document.getElementById("playlist-author-name"),
        playlistLikesCount: document.getElementById("playlist-likes-count"),
        playlistTracksCount: document.getElementById("playlist-tracks-count"),
        playlistDuration: document.getElementById("playlist-duration"),
        playlistTracksBody: document.getElementById("playlist-tracks-body"),
        btnPlaylistPlay: document.getElementById("btn-playlist-play"),
        btnPlaylistLike: document.getElementById("btn-playlist-like"),

        // Lyrics View elements
        lyricsCoverThumb: document.getElementById("lyrics-cover-thumb"),
        lyricsSongTitle: document.getElementById("lyrics-song-title"),
        lyricsSongArtist: document.getElementById("lyrics-song-artist"),
        lyricsScrollBox: document.getElementById("lyrics-scroll-box"),
        btnCloseLyrics: document.getElementById("btn-close-lyrics"),

        // Queue View elements
        queueCurrentCard: document.getElementById("queue-current-card"),
        queueNextList: document.getElementById("queue-next-list"),

        // Library elements
        libraryDynamicItems: document.getElementById("library-dynamic-items"),
        itemLikedSongs: document.getElementById("item-liked-songs"),
        likedCountLabel: document.getElementById("liked-count-label"),
        tagPills: document.querySelectorAll(".tag-pill"),
        btnCreatePlaylist: document.getElementById("btn-create-playlist"),

        // Bottom Player Bar
        playerCoverImg: document.getElementById("player-cover-img"),
        playerTitle: document.getElementById("player-title"),
        playerArtist: document.getElementById("player-artist"),
        playerLikeBtn: document.getElementById("player-like-btn"),
        btnShuffle: document.getElementById("btn-shuffle"),
        btnPrev: document.getElementById("btn-prev"),
        btnMainPlay: document.getElementById("btn-main-play"),
        btnNext: document.getElementById("btn-next"),
        btnRepeat: document.getElementById("btn-repeat"),
        repeatOneBadge: document.getElementById("repeat-one-badge"),
        currentTimeLabel: document.getElementById("current-time-label"),
        totalTimeLabel: document.getElementById("total-time-label"),
        progressTrack: document.getElementById("progress-track"),
        progressFill: document.getElementById("progress-fill"),
        progressThumb: document.getElementById("progress-thumb"),
        btnLyricsToggle: document.getElementById("btn-lyrics-toggle"),
        btnQueueToggle: document.getElementById("btn-queue-toggle"),
        btnVolume: document.getElementById("btn-volume"),
        volIconHigh: document.getElementById("vol-icon-high"),
        volIconMute: document.getElementById("vol-icon-mute"),
        volumeTrack: document.getElementById("volume-track"),
        volumeFill: document.getElementById("volume-fill"),
        volumeThumb: document.getElementById("volume-thumb"),
        btnFullscreen: document.getElementById("btn-fullscreen"),

        // Mobile Nav
        mobileNav: document.getElementById("mobile-nav"),
        mobileNavBtns: document.querySelectorAll(".mobile-nav-btn"),

        // Toast Container
        toastContainer: document.getElementById("toast-container")
    };

    // -------------------------------------------------------------
    // Navigation / Router
    // -------------------------------------------------------------
    function navigateTo(viewName, playlistId = null, pushHistory = true) {
        state.currentView = viewName;
        state.activePlaylistId = playlistId;

        if (pushHistory) {
            state.history = state.history.slice(0, state.historyIndex + 1);
            state.history.push({ view: viewName, playlistId });
            state.historyIndex = state.history.length - 1;
        }

        updateHistoryButtons();

        // Hide all views
        document.querySelectorAll(".page-view").forEach(v => v.classList.remove("active"));
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
        elements.mobileNavBtns.forEach(b => b.classList.remove("active"));

        // Show search input in top bar only if in search view
        if (viewName === "search") {
            elements.topSearchWrapper.style.display = "flex";
            elements.searchInput.focus();
            elements.navSearch.classList.add("active");
            const mobileSearchBtn = Array.from(elements.mobileNavBtns).find(b => b.dataset.view === "search");
            if (mobileSearchBtn) mobileSearchBtn.classList.add("active");
        } else {
            elements.topSearchWrapper.style.display = "none";
        }

        if (viewName === "home") {
            elements.viewHome.classList.add("active");
            elements.navHome.classList.add("active");
            const mobileHomeBtn = Array.from(elements.mobileNavBtns).find(b => b.dataset.view === "home");
            if (mobileHomeBtn) mobileHomeBtn.classList.add("active");
        } else if (viewName === "search") {
            elements.viewSearch.classList.add("active");
        } else if (viewName === "playlist") {
            elements.viewPlaylist.classList.add("active");
            renderPlaylistDetail(playlistId);
        } else if (viewName === "lyrics") {
            elements.viewLyrics.classList.add("active");
            renderLyricsView();
        } else if (viewName === "queue") {
            elements.viewQueue.classList.add("active");
            renderQueueView();
        }

        // Scroll main content to top
        elements.scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }

    function updateHistoryButtons() {
        elements.btnHistoryBack.disabled = state.historyIndex <= 0;
        elements.btnHistoryForward.disabled = state.historyIndex >= state.history.length - 1;
    }

    elements.btnHistoryBack.addEventListener("click", () => {
        if (state.historyIndex > 0) {
            state.historyIndex--;
            const item = state.history[state.historyIndex];
            const view = typeof item === "string" ? item : item.view;
            const pid = typeof item === "object" ? item.playlistId : null;
            navigateTo(view, pid, false);
        }
    });

    elements.btnHistoryForward.addEventListener("click", () => {
        if (state.historyIndex < state.history.length - 1) {
            state.historyIndex++;
            const item = state.history[state.historyIndex];
            const view = typeof item === "string" ? item : item.view;
            const pid = typeof item === "object" ? item.playlistId : null;
            navigateTo(view, pid, false);
        }
    });

    // Top Bar Scroll Effect
    elements.scrollContainer.addEventListener("scroll", () => {
        if (elements.scrollContainer.scrollTop > 40) {
            elements.topBar.classList.add("scrolled");
        } else {
            elements.topBar.classList.remove("scrolled");
        }
    });

    // -------------------------------------------------------------
    // Toast Notification System
    // -------------------------------------------------------------
    function showToast(message, isLiked = false) {
        const toast = document.createElement("div");
        toast.className = `toast ${isLiked ? "toast-liked" : ""}`;
        toast.textContent = message;
        elements.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            toast.style.opacity = "0";
            toast.style.transform = "translateY(10px) scale(0.95)";
            setTimeout(() => toast.remove(), 300);
        }, 2600);
    }

    // -------------------------------------------------------------
    // Dynamic Time Greeting
    // -------------------------------------------------------------
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = "Selamat Datang";
        if (hour >= 4 && hour < 11) {
            greeting = "Selamat Pagi";
        } else if (hour >= 11 && hour < 15) {
            greeting = "Selamat Siang";
        } else if (hour >= 15 && hour < 18) {
            greeting = "Selamat Sore";
        } else {
            greeting = "Selamat Malam";
        }
        elements.greetingText.textContent = greeting;
    }

    // -------------------------------------------------------------
    // Render Functions: Home View
    // -------------------------------------------------------------
    function renderHomeView() {
        updateGreeting();

        // 1. Quick Grid (6 items)
        const quickItems = [
            SPOTIFY_DATA.playlists[0],
            SPOTIFY_DATA.playlists[1],
            SPOTIFY_DATA.playlists[2],
            SPOTIFY_DATA.playlists[3],
            SPOTIFY_DATA.playlists[4],
            SPOTIFY_DATA.playlists[5]
        ];

        elements.quickGrid.innerHTML = quickItems.map(item => `
            <div class="quick-card" data-playlist-id="${item.id}">
                <img src="${item.cover}" alt="${item.title}" class="quick-card-thumb">
                <span class="quick-card-title">${item.title}</span>
                <button class="play-btn-float" data-action="play-playlist" data-playlist-id="${item.id}" title="Putar ${item.title}">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <polygon points="6 4 20 12 6 20 6 4"/>
                    </svg>
                </button>
            </div>
        `).join("");

        // 2. Sections Cards
        renderCardGrid(elements.gridMadeForYou, [
            SPOTIFY_DATA.playlists[0],
            SPOTIFY_DATA.playlists[1],
            SPOTIFY_DATA.playlists[2],
            SPOTIFY_DATA.playlists[3]
        ]);

        renderCardGrid(elements.gridTopHits, [
            SPOTIFY_DATA.playlists[0],
            SPOTIFY_DATA.playlists[4],
            SPOTIFY_DATA.playlists[5],
            SPOTIFY_DATA.playlists[2]
        ]);

        renderCardGrid(elements.gridFocusChill, [
            SPOTIFY_DATA.playlists[1],
            SPOTIFY_DATA.playlists[3],
            SPOTIFY_DATA.playlists[2],
            SPOTIFY_DATA.playlists[0]
        ]);

        // 3. Popular Artists
        elements.gridPopularArtists.innerHTML = SPOTIFY_DATA.artists.map(art => `
            <div class="spotify-card" data-artist-id="${art.id}">
                <div class="card-image-box">
                    <img src="${art.image}" alt="${art.name}" class="card-image circle-img">
                    <button class="card-play-btn" data-action="play-artist" data-artist-name="${art.name}" title="Putar ${art.name}">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <polygon points="6 4 20 12 6 20 6 4"/>
                        </svg>
                    </button>
                </div>
                <div class="card-title">${art.name}</div>
                <div class="card-desc">${art.role}</div>
            </div>
        `).join("");
    }

    function renderCardGrid(container, playlists) {
        container.innerHTML = playlists.map(pl => `
            <div class="spotify-card" data-playlist-id="${pl.id}">
                <div class="card-image-box">
                    <img src="${pl.cover}" alt="${pl.title}" class="card-image">
                    <button class="card-play-btn" data-action="play-playlist" data-playlist-id="${pl.id}" title="Putar ${pl.title}">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <polygon points="6 4 20 12 6 20 6 4"/>
                        </svg>
                    </button>
                </div>
                <div class="card-title">${pl.title}</div>
                <div class="card-desc">${pl.description}</div>
            </div>
        `).join("");
    }

    // -------------------------------------------------------------
    // Render Functions: Library Sidebar
    // -------------------------------------------------------------
    function renderLibrarySidebar() {
        const likedCount = SPOTIFY_DATA.tracks.filter(t => t.liked).length;
        elements.likedCountLabel.textContent = `${likedCount} lagu`;

        let items = [...SPOTIFY_DATA.playlists];
        if (state.libraryFilter === "playlist") {
            items = SPOTIFY_DATA.playlists;
        } else if (state.libraryFilter === "artist") {
            items = [];
        }

        elements.libraryDynamicItems.innerHTML = items.map(pl => `
            <div class="library-item" data-playlist-id="${pl.id}">
                <img src="${pl.cover}" alt="${pl.title}" class="library-item-thumb">
                <div class="library-item-info">
                    <div class="library-item-title">${pl.title}</div>
                    <div class="library-item-meta">Playlist • ${pl.author}</div>
                </div>
            </div>
        `).join("");

        // If artist filter is active or all
        if (state.libraryFilter === "all" || state.libraryFilter === "artist") {
            const artistsHTML = SPOTIFY_DATA.artists.slice(0, 3).map(art => `
                <div class="library-item" data-artist-id="${art.id}">
                    <img src="${art.image}" alt="${art.name}" class="library-item-thumb artist-thumb">
                    <div class="library-item-info">
                        <div class="library-item-title">${art.name}</div>
                        <div class="library-item-meta">Artis</div>
                    </div>
                </div>
            `).join("");
            elements.libraryDynamicItems.insertAdjacentHTML("beforeend", artistsHTML);
        }
    }

    // Library Filter Tags
    elements.tagPills.forEach(pill => {
        pill.addEventListener("click", () => {
            elements.tagPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            state.libraryFilter = pill.dataset.filter;
            renderLibrarySidebar();
        });
    });

    // -------------------------------------------------------------
    // Render Functions: Search View & Categories
    // -------------------------------------------------------------
    function renderSearchView() {
        elements.browseGrid.innerHTML = SPOTIFY_DATA.categories.map(cat => `
            <div class="category-card" style="background-color: ${cat.color};" data-cat-id="${cat.id}">
                <h3 class="category-title">${cat.title}</h3>
                <img src="${cat.cover}" alt="${cat.title}" class="category-thumb">
            </div>
        `).join("");
    }

    // Live Search Logic
    function handleSearch(query) {
        state.searchQuery = query.trim().toLowerCase();

        if (!state.searchQuery) {
            elements.searchResults.style.display = "none";
            elements.browseCategories.style.display = "block";
            elements.searchClearBtn.style.display = "none";
            return;
        }

        elements.searchClearBtn.style.display = "block";
        elements.browseCategories.style.display = "none";
        elements.searchResults.style.display = "block";

        const matchedTracks = SPOTIFY_DATA.tracks.filter(t => 
            t.title.toLowerCase().includes(state.searchQuery) ||
            t.artist.toLowerCase().includes(state.searchQuery) ||
            t.album.toLowerCase().includes(state.searchQuery)
        );

        if (matchedTracks.length === 0) {
            elements.topResultCard.innerHTML = `
                <div style="padding: 20px 0; color: var(--text-subdued);">
                    Tidak ada hasil ditemukan untuk "${query}". Coba cari kata kunci lain.
                </div>
            `;
            elements.searchSongsList.innerHTML = "";
            return;
        }

        // Top Result Card
        const topTrack = matchedTracks[0];
        elements.topResultCard.innerHTML = `
            <img src="${topTrack.cover}" alt="${topTrack.title}" class="top-result-thumb">
            <h3 class="top-result-title">${topTrack.title}</h3>
            <div class="top-result-meta">
                <span class="top-result-type">Lagu</span>
                <span>${topTrack.artist}</span>
            </div>
            <button class="card-play-btn" data-action="play-track" data-track-id="${topTrack.id}" title="Putar">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <polygon points="6 4 20 12 6 20 6 4"/>
                </svg>
            </button>
        `;

        // Song rows (up to 4)
        elements.searchSongsList.innerHTML = matchedTracks.slice(0, 4).map(track => `
            <div class="table-row ${window.spotifyPlayer.currentTrack?.id === track.id ? "active" : ""}" data-track-id="${track.id}">
                <div class="col-num">
                    <button class="row-play-btn" data-action="play-track" data-track-id="${track.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <polygon points="6 4 20 12 6 20 6 4"/>
                        </svg>
                    </button>
                    <span class="row-index-num">▶</span>
                </div>
                <div class="col-title">
                    <img src="${track.cover}" alt="${track.title}" class="track-row-thumb">
                    <div class="track-row-details">
                        <span class="track-row-title">${track.title}</span>
                        <span class="track-row-artist">${track.artist}</span>
                    </div>
                </div>
                <div class="col-album">${track.album}</div>
                <div class="col-date">Hari ini</div>
                <div class="col-duration">
                    <button class="row-heart-btn ${track.liked ? "liked" : ""}" data-action="like-track" data-track-id="${track.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="${track.liked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <span>${track.duration}</span>
                </div>
            </div>
        `).join("");
    }

    elements.searchInput.addEventListener("input", (e) => {
        handleSearch(e.target.value);
    });

    elements.searchClearBtn.addEventListener("click", () => {
        elements.searchInput.value = "";
        handleSearch("");
        elements.searchInput.focus();
    });

    // -------------------------------------------------------------
    // Render Functions: Playlist Detail View
    // -------------------------------------------------------------
    function renderPlaylistDetail(playlistId) {
        let isLikedView = playlistId === "liked";
        let playlist = null;
        let tracks = [];

        if (isLikedView) {
            tracks = SPOTIFY_DATA.tracks.filter(t => t.liked);
            playlist = {
                id: "liked",
                title: "Lagu yang Disukai",
                description: "Kumpulan lagu yang kamu berikan tanda suka.",
                cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80",
                color: "#4a3b89",
                author: "Carsa",
                authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
                likes: `${tracks.length} lagu`
            };
        } else {
            playlist = SPOTIFY_DATA.playlists.find(p => p.id === playlistId) || SPOTIFY_DATA.playlists[0];
            tracks = playlist.trackIds.map(id => SPOTIFY_DATA.tracks.find(t => t.id === id)).filter(Boolean);
        }

        // Apply dynamic gradient
        elements.playlistHeader.style.background = `linear-gradient(180deg, ${playlist.color} 0%, rgba(18, 18, 18, 0) 100%)`;
        elements.playlistCoverImg.src = playlist.cover;
        elements.playlistTitle.textContent = playlist.title;
        elements.playlistDesc.textContent = playlist.description;
        elements.playlistAuthorName.textContent = playlist.author;
        elements.playlistAuthorAvatar.src = playlist.authorAvatar;
        elements.playlistLikesCount.textContent = playlist.likes;
        elements.playlistTracksCount.textContent = `${tracks.length} lagu,`;

        // Calculate total duration
        const totalSec = tracks.reduce((acc, t) => acc + (t.durationSec || 200), 0);
        const mins = Math.floor(totalSec / 60);
        elements.playlistDuration.textContent = `sekitar ${mins} mnt`;

        // Set playlist play button state
        const isCurrentPlayingPlaylist = window.spotifyPlayer.isPlaying;
        elements.btnPlaylistPlay.classList.toggle("playing", isCurrentPlayingPlaylist);

        // Render Table Rows
        elements.playlistTracksBody.innerHTML = tracks.map((track, idx) => {
            const isPlayingThis = window.spotifyPlayer.currentTrack?.id === track.id;
            const isCurrentlyActive = isPlayingThis && window.spotifyPlayer.isPlaying;

            return `
                <div class="table-row ${isPlayingThis ? "active" : ""} ${isCurrentlyActive ? "playing" : ""}" data-track-id="${track.id}">
                    <div class="col-num">
                        <span class="row-index-num">${idx + 1}</span>
                        <div class="equalizer-anim">
                            <span class="equalizer-bar"></span>
                            <span class="equalizer-bar"></span>
                            <span class="equalizer-bar"></span>
                        </div>
                        <button class="row-play-btn" data-action="play-track" data-track-id="${track.id}" title="Putar">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <polygon points="6 4 20 12 6 20 6 4"/>
                            </svg>
                        </button>
                    </div>
                    <div class="col-title">
                        <img src="${track.cover}" alt="${track.title}" class="track-row-thumb">
                        <div class="track-row-details">
                            <span class="track-row-title">${track.title}</span>
                            <span class="track-row-artist">${track.artist}</span>
                        </div>
                    </div>
                    <div class="col-album">${track.album}</div>
                    <div class="col-date">${(idx + 1) * 3} hari lalu</div>
                    <div class="col-duration">
                        <button class="row-heart-btn ${track.liked ? "liked" : ""}" data-action="like-track" data-track-id="${track.id}">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="${track.liked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                        <span>${track.duration}</span>
                    </div>
                </div>
            `;
        }).join("");
    }

    // -------------------------------------------------------------
    // Render Functions: Lyrics Karaoke View
    // -------------------------------------------------------------
    function renderLyricsView() {
        const track = window.spotifyPlayer.currentTrack;
        if (!track) return;

        elements.lyricsCoverThumb.src = track.cover;
        elements.lyricsSongTitle.textContent = track.title;
        elements.lyricsSongArtist.textContent = track.artist;

        if (!track.lyrics || track.lyrics.length === 0) {
            elements.lyricsScrollBox.innerHTML = `
                <div class="lyric-line active" style="color: rgba(255, 255, 255, 0.6); font-size: 24px;">
                    Lirik tidak tersedia untuk lagu ini.
                </div>
            `;
            return;
        }

        elements.lyricsScrollBox.innerHTML = track.lyrics.map((l, index) => `
            <div class="lyric-line" data-time="${l.time}" data-index="${index}">
                ${l.text}
            </div>
        `).join("");

        updateLyricsActiveLine(window.spotifyPlayer.audio.currentTime || 0);
    }

    function updateLyricsActiveLine(currentTime) {
        if (state.currentView !== "lyrics") return;
        const track = window.spotifyPlayer.currentTrack;
        if (!track || !track.lyrics) return;

        let activeIdx = 0;
        for (let i = 0; i < track.lyrics.length; i++) {
            if (currentTime >= track.lyrics[i].time) {
                activeIdx = i;
            }
        }

        const lines = elements.lyricsScrollBox.querySelectorAll(".lyric-line");
        lines.forEach((line, idx) => {
            if (idx === activeIdx) {
                if (!line.classList.contains("active")) {
                    line.classList.add("active");
                    line.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            } else {
                line.classList.remove("active");
            }
        });
    }

    elements.lyricsScrollBox.addEventListener("click", (e) => {
        const line = e.target.closest(".lyric-line");
        if (line && line.dataset.time) {
            const time = parseFloat(line.dataset.time);
            window.spotifyPlayer.seek(time);
        }
    });

    elements.btnCloseLyrics.addEventListener("click", () => {
        navigateTo("home");
    });

    // -------------------------------------------------------------
    // Render Functions: Queue View
    // -------------------------------------------------------------
    function renderQueueView() {
        const current = window.spotifyPlayer.currentTrack;
        if (current) {
            elements.queueCurrentCard.innerHTML = `
                <img src="${current.cover}" alt="${current.title}" class="track-row-thumb">
                <div class="track-row-details">
                    <span class="track-row-title">${current.title}</span>
                    <span class="track-row-artist">${current.artist}</span>
                </div>
            `;
        }

        const upcoming = window.spotifyPlayer.queue.slice(window.spotifyPlayer.currentIndex + 1);
        if (upcoming.length === 0) {
            elements.queueNextList.innerHTML = `
                <div style="padding: 16px 0; color: var(--text-subdued);">
                    Antrean kosong. Tambahkan lagu dari playlist untuk memperpanjang antrean!
                </div>
            `;
            return;
        }

        elements.queueNextList.innerHTML = upcoming.map((t, i) => `
            <div class="table-row" data-track-id="${t.id}">
                <div class="col-num">${i + 1}</div>
                <div class="col-title">
                    <img src="${t.cover}" alt="${t.title}" class="track-row-thumb">
                    <div class="track-row-details">
                        <span class="track-row-title">${t.title}</span>
                        <span class="track-row-artist">${t.artist}</span>
                    </div>
                </div>
                <div class="col-album">${t.album}</div>
                <div class="col-date">-</div>
                <div class="col-duration">${t.duration}</div>
            </div>
        `).join("");
    }

    // -------------------------------------------------------------
    // Audio Player Event Bindings & UI Updates
    // -------------------------------------------------------------
    function updatePlayerUI(track) {
        if (!track) return;
        elements.playerCoverImg.src = track.cover;
        elements.playerTitle.textContent = track.title;
        elements.playerArtist.textContent = track.artist;
        elements.totalTimeLabel.textContent = track.duration;

        elements.playerLikeBtn.classList.toggle("liked", track.liked);

        // Update active row in playlist view if visible
        if (state.currentView === "playlist") {
            renderPlaylistDetail(state.activePlaylistId);
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    // Player Callbacks
    window.spotifyPlayer.onTrackChange = (track) => {
        updatePlayerUI(track);
        if (state.currentView === "lyrics") {
            renderLyricsView();
        }
        if (state.currentView === "queue") {
            renderQueueView();
        }
    };

    window.spotifyPlayer.onPlayStateChange = (isPlaying) => {
        elements.btnMainPlay.classList.toggle("playing", isPlaying);
        elements.btnPlaylistPlay.classList.toggle("playing", isPlaying);

        // Toggle table row equalizer
        document.querySelectorAll(".table-row").forEach(row => {
            const trackId = parseInt(row.dataset.trackId);
            if (trackId === window.spotifyPlayer.currentTrack?.id) {
                row.classList.toggle("playing", isPlaying);
                row.classList.add("active");
            } else {
                row.classList.remove("playing", "active");
            }
        });
    };

    window.spotifyPlayer.onTimeUpdate = (current, duration, percent) => {
        if (!state.isDraggingProgress) {
            elements.currentTimeLabel.textContent = formatTime(current);
            elements.progressFill.style.width = `${percent}%`;
            elements.progressThumb.style.left = `${percent}%`;
        }

        // Update synchronized lyrics
        updateLyricsActiveLine(current);
    };

    window.spotifyPlayer.onVolumeChange = (volume, isMuted) => {
        const percent = isMuted ? 0 : volume * 100;
        elements.volumeFill.style.width = `${percent}%`;
        elements.volumeThumb.style.left = `${percent}%`;

        if (isMuted || volume === 0) {
            elements.volIconHigh.style.display = "none";
            elements.volIconMute.style.display = "block";
        } else {
            elements.volIconHigh.style.display = "block";
            elements.volIconMute.style.display = "none";
        }
    };

    window.spotifyPlayer.onShuffleChange = (isShuffle) => {
        elements.btnShuffle.classList.toggle("active", isShuffle);
        showToast(isShuffle ? "Mode acak diaktifkan" : "Mode acak dinonaktifkan");
    };

    window.spotifyPlayer.onRepeatChange = (mode) => {
        elements.btnRepeat.classList.remove("active", "repeat-one");
        if (mode === "all") {
            elements.btnRepeat.classList.add("active");
            showToast("Ulangi semua lagu");
        } else if (mode === "one") {
            elements.btnRepeat.classList.add("active", "repeat-one");
            showToast("Ulangi lagu ini");
        } else {
            showToast("Ulangi dinonaktifkan");
        }
    };

    window.spotifyPlayer.onLikedChange = (trackId, isLiked) => {
        const track = SPOTIFY_DATA.tracks.find(t => t.id === trackId);
        if (track && window.spotifyPlayer.currentTrack?.id === trackId) {
            elements.playerLikeBtn.classList.toggle("liked", isLiked);
        }
        renderLibrarySidebar();
        if (state.currentView === "playlist") {
            renderPlaylistDetail(state.activePlaylistId);
        }
        showToast(isLiked ? "Ditambahkan ke Lagu yang Disukai" : "Dihapus dari Lagu yang Disukai", isLiked);
    };

    // -------------------------------------------------------------
    // Player Controls Click Handlers
    // -------------------------------------------------------------
    elements.btnMainPlay.addEventListener("click", () => {
        window.spotifyPlayer.togglePlay();
    });

    elements.btnPrev.addEventListener("click", () => {
        window.spotifyPlayer.prev();
    });

    elements.btnNext.addEventListener("click", () => {
        window.spotifyPlayer.next();
    });

    elements.btnShuffle.addEventListener("click", () => {
        window.spotifyPlayer.toggleShuffle();
    });

    elements.btnRepeat.addEventListener("click", () => {
        window.spotifyPlayer.toggleRepeat();
    });

    elements.playerLikeBtn.addEventListener("click", () => {
        window.spotifyPlayer.toggleLikeCurrentTrack();
    });

    elements.btnPlaylistPlay.addEventListener("click", () => {
        if (state.activePlaylistId) {
            if (window.spotifyPlayer.isPlaying) {
                window.spotifyPlayer.pause();
            } else {
                window.spotifyPlayer.playPlaylist(state.activePlaylistId);
            }
        }
    });

    // Progress Bar Scrubbing
    function handleProgressScrub(e) {
        const rect = elements.progressTrack.getBoundingClientRect();
        const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percent = (clickX / rect.width) * 100;
        elements.progressFill.style.width = `${percent}%`;
        elements.progressThumb.style.left = `${percent}%`;
        window.spotifyPlayer.seekPercentage(percent);
    }

    elements.progressTrack.addEventListener("mousedown", (e) => {
        state.isDraggingProgress = true;
        handleProgressScrub(e);
    });

    // Volume Slider Scrubbing
    function handleVolumeScrub(e) {
        const rect = elements.volumeTrack.getBoundingClientRect();
        const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percent = clickX / rect.width;
        window.spotifyPlayer.setVolume(percent);
    }

    elements.volumeTrack.addEventListener("mousedown", (e) => {
        state.isDraggingVolume = true;
        handleVolumeScrub(e);
    });

    window.addEventListener("mousemove", (e) => {
        if (state.isDraggingProgress) handleProgressScrub(e);
        if (state.isDraggingVolume) handleVolumeScrub(e);
    });

    window.addEventListener("mouseup", () => {
        state.isDraggingProgress = false;
        state.isDraggingVolume = false;
    });

    elements.btnVolume.addEventListener("click", () => {
        window.spotifyPlayer.toggleMute();
    });

    // Lyrics & Queue Toggle
    elements.btnLyricsToggle.addEventListener("click", () => {
        if (state.currentView === "lyrics") {
            navigateTo("home");
        } else {
            navigateTo("lyrics");
        }
    });

    elements.btnQueueToggle.addEventListener("click", () => {
        if (state.currentView === "queue") {
            navigateTo("home");
        } else {
            navigateTo("queue");
        }
    });

    // Fullscreen Mode
    elements.btnFullscreen.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    });

    // -------------------------------------------------------------
    // Global Event Delegation (Clicks on Cards, Rows, Playlists)
    // -------------------------------------------------------------
    document.addEventListener("click", (e) => {
        // 1. Play Button on Card
        const playCardBtn = e.target.closest("[data-action='play-playlist']");
        if (playCardBtn) {
            e.stopPropagation();
            const pid = playCardBtn.dataset.playlistId;
            window.spotifyPlayer.playPlaylist(pid);
            showToast(`Memutar playlist...`);
            return;
        }

        // 2. Play Single Track
        const playTrackBtn = e.target.closest("[data-action='play-track']");
        if (playTrackBtn) {
            e.stopPropagation();
            const tid = parseInt(playTrackBtn.dataset.trackId);
            window.spotifyPlayer.playSingleTrack(tid);
            return;
        }

        // 3. Like Track Button in Table
        const likeTrackBtn = e.target.closest("[data-action='like-track']");
        if (likeTrackBtn) {
            e.stopPropagation();
            const tid = parseInt(likeTrackBtn.dataset.trackId);
            window.spotifyPlayer.toggleLike(tid);
            return;
        }

        // 4. Click Table Row to Play
        const tableRow = e.target.closest(".table-row");
        if (tableRow && tableRow.dataset.trackId) {
            const tid = parseInt(tableRow.dataset.trackId);
            window.spotifyPlayer.playSingleTrack(tid);
            return;
        }

        // 5. Open Playlist Card / Item
        const playlistCard = e.target.closest("[data-playlist-id]");
        if (playlistCard && !e.target.closest(".play-btn-float") && !e.target.closest(".card-play-btn")) {
            const pid = playlistCard.dataset.playlistId;
            navigateTo("playlist", pid);
            return;
        }

        // 6. Open Liked Songs in Library
        if (e.target.closest("#item-liked-songs")) {
            navigateTo("playlist", "liked");
            return;
        }

        // 7. Navigation Buttons
        const navBtn = e.target.closest("[data-view]");
        if (navBtn) {
            const view = navBtn.dataset.view;
            navigateTo(view);
            return;
        }

        // 8. Brand Logo
        if (e.target.closest("#brand-logo")) {
            e.preventDefault();
            navigateTo("home");
            return;
        }

        // 9. Mobile Nav Library Toggle
        if (e.target.closest("#mobile-nav-library")) {
            navigateTo("playlist", "liked");
            return;
        }

        // 10. Create Playlist Button
        if (e.target.closest("#btn-create-playlist")) {
            const newName = `Playlist Saya #${SPOTIFY_DATA.playlists.length + 1}`;
            SPOTIFY_DATA.playlists.push({
                id: `custom-${Date.now()}`,
                title: newName,
                description: "Playlist buatan sendiri.",
                cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
                color: "#1e3264",
                author: "Carsa",
                authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
                likes: "1 suka",
                trackIds: [1, 2, 4]
            });
            renderLibrarySidebar();
            showToast(`Dibuat: ${newName}`);
            return;
        }
    });

    // -------------------------------------------------------------
    // Keyboard Shortcuts
    // -------------------------------------------------------------
    window.addEventListener("keydown", (e) => {
        // If typing in search or input, skip shortcuts
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
            return;
        }

        if (e.code === "Space") {
            e.preventDefault();
            window.spotifyPlayer.togglePlay();
        } else if (e.code === "ArrowRight") {
            e.preventDefault();
            window.spotifyPlayer.seek((window.spotifyPlayer.audio.currentTime || 0) + 5);
        } else if (e.code === "ArrowLeft") {
            e.preventDefault();
            window.spotifyPlayer.seek((window.spotifyPlayer.audio.currentTime || 0) - 5);
        } else if (e.code === "ArrowUp") {
            e.preventDefault();
            window.spotifyPlayer.setVolume(window.spotifyPlayer.volume + 0.05);
        } else if (e.code === "ArrowDown") {
            e.preventDefault();
            window.spotifyPlayer.setVolume(window.spotifyPlayer.volume - 0.05);
        } else if (e.key === "m" || e.key === "M") {
            window.spotifyPlayer.toggleMute();
        } else if (e.key === "l" || e.key === "L") {
            window.spotifyPlayer.toggleLikeCurrentTrack();
        }
    });

    // -------------------------------------------------------------
    // Initial Setup
    // -------------------------------------------------------------
    renderHomeView();
    renderLibrarySidebar();
    renderSearchView();

    // Load first track into player without autoplaying initially
    if (SPOTIFY_DATA.tracks.length > 0) {
        window.spotifyPlayer.loadTrack(SPOTIFY_DATA.tracks[0], false);
        updatePlayerUI(SPOTIFY_DATA.tracks[0]);
    }

    console.log("Spotify Web Clone loaded successfully.");
});

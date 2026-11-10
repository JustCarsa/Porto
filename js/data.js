// Spotify Web Clone - Data Store
const SPOTIFY_DATA = {
    tracks: [
        {
            id: 1,
            title: "Secukupnya",
            artist: "Hindia",
            album: "Menari Dengan Bayangan",
            cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
            duration: "3:30",
            durationSec: 210,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            liked: true,
            color: "#e13300",
            lyrics: [
                { time: 0, text: "Kapan terakhir kali kamu tertidur tenang?" },
                { time: 8, text: "Tak perlu memikirkan tentang apa yang kan datang" },
                { time: 16, text: "Di esok hari, tubuh yang berpatah hati" },
                { time: 24, text: "Semua diperbaiki, sedikit demi sedikit" },
                { time: 33, text: "Bukan salahmu bila kau merasa lelah" },
                { time: 42, text: "Dunia berputar, bukan berarti kau kalah" },
                { time: 50, text: "Ambil nafasmu, hembuskan perlahan" },
                { time: 58, text: "Hidup ini berjalan, secukupnya kawan" }
            ]
        },
        {
            id: 2,
            title: "Hati-Hati di Jalan",
            artist: "Tulus",
            album: "Manusia",
            cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
            duration: "4:02",
            durationSec: 242,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            liked: true,
            color: "#477d95",
            lyrics: [
                { time: 0, text: "Perjalanan membawamu" },
                { time: 10, text: "Bertemu denganku, bertemu kamu" },
                { time: 20, text: "Kukira kita akan bersama" },
                { time: 30, text: "Begitu banyak yang sama, latarmu dan latarku" },
                { time: 42, text: "Kukira takkan ada kendala" },
                { time: 52, text: "Kukira ini kan mudah, kau aku jadi kita" },
                { time: 65, text: "Kasih sayangmu membekas, redam kini sudah" },
                { time: 80, text: "Hati-hati di jalan..." }
            ]
        },
        {
            id: 3,
            title: "Midnight City Lights",
            artist: "Neon Skyline",
            album: "Synthetic Dreams",
            cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80",
            duration: "3:45",
            durationSec: 225,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            liked: false,
            color: "#8d4585",
            lyrics: [
                { time: 0, text: "Cruising down the empty highway" },
                { time: 12, text: "Neon glow reflecting on the rain" },
                { time: 25, text: "City never sleeps tonight" },
                { time: 38, text: "Lost inside this endless purple haze" },
                { time: 52, text: "Feel the bass inside your chest" },
                { time: 68, text: "Leave behind all of the rest" }
            ]
        },
        {
            id: 4,
            title: "Lofi Rain & Warm Coffee",
            artist: "Chillhop Cafe",
            album: "Study Session Vol. 4",
            cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80",
            duration: "2:50",
            durationSec: 170,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            liked: true,
            color: "#6b4f3a",
            lyrics: [
                { time: 0, text: "[Ketukan drum santai & rintik hujan lembut]" },
                { time: 20, text: "[Aroma kopi panas memenuhi ruangan]" },
                { time: 45, text: "[Fokus dan tenangkan pikiranmu]" },
                { time: 75, text: "[Melodi piano yang meneduhkan]" }
            ]
        },
        {
            id: 5,
            title: "Glimpse of Us",
            artist: "Joji",
            album: "SMITHEREENS",
            cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80",
            duration: "3:53",
            durationSec: 233,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            liked: false,
            color: "#1e3264",
            lyrics: [
                { time: 0, text: "She'd take the world off my shoulders" },
                { time: 9, text: "If I had ever let her" },
                { time: 18, text: "Cause sometimes I look in her eyes" },
                { time: 27, text: "And that's where I find a glimpse of us" },
                { time: 40, text: "And I try to fall for her touch" },
                { time: 51, text: "Thinking maybe one day I won't remember you" }
            ]
        },
        {
            id: 6,
            title: "Dan...",
            artist: "Sheila On 7",
            album: "Kisah Klasik Untuk Masa Depan",
            cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
            duration: "4:46",
            durationSec: 286,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            liked: true,
            color: "#283ea3",
            lyrics: [
                { time: 0, text: "Dan bila esok datang kembali" },
                { time: 12, text: "Seperti sedia kala di mana kau bisa bercanda" },
                { time: 25, text: "Dan perlahan kaupun lupakan aku" },
                { time: 38, text: "Mimpi burukmu di mana t'lah kutancapkan duri tajam" },
                { time: 55, text: "Kaupun menangis, menangis sedih" },
                { time: 70, text: "Maafkan aku..." }
            ]
        },
        {
            id: 7,
            title: "Sialan",
            artist: "Juicy Luicy ft. Adrian Khalif",
            album: "Nonfiksi",
            cover: "https://images.unsplash.com/photo-1445985543469-433ec45754ac?w=300&auto=format&fit=crop&q=80",
            duration: "3:40",
            durationSec: 220,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
            liked: false,
            color: "#7358ff",
            lyrics: [
                { time: 0, text: "Dari seribu jalan di dunia" },
                { time: 10, text: "Mengapa harus lewat jalan ini?" },
                { time: 20, text: "Dari seribu wajah di kota" },
                { time: 30, text: "Mengapa harus matamu yang kulihat kembali?" },
                { time: 45, text: "Sialan, sialan..." },
                { time: 60, text: "Hati yang sudah sembuh kini koyak kembali" }
            ]
        },
        {
            id: 8,
            title: "As It Was",
            artist: "Harry Styles",
            album: "Harry's House",
            cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&auto=format&fit=crop&q=80",
            duration: "2:47",
            durationSec: 167,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
            liked: true,
            color: "#b02897",
            lyrics: [
                { time: 0, text: "Come on, Harry, we wanna say goodnight to you" },
                { time: 8, text: "Holdin' me back, gravity's holdin' me back" },
                { time: 19, text: "I want you to hold out the palm of your hand" },
                { time: 30, text: "You know it's not the same as it was" },
                { time: 42, text: "In this world, it's just us" },
                { time: 55, text: "You know it's not the same as it was" }
            ]
        },
        {
            id: 9,
            title: "High School in Jakarta",
            artist: "NIKI",
            album: "Nicole",
            cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
            duration: "3:39",
            durationSec: 219,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            liked: false,
            color: "#ba5d07",
            lyrics: [
                { time: 0, text: "Didn't you hear? Alexander's got a new girlfriend" },
                { time: 11, text: "A sophomore at that, could've sworn you guys were end game" },
                { time: 22, text: "Talk about a flashback, heartbreak on a Tuesday" },
                { time: 34, text: "High school in Jakarta, sort of romantic" },
                { time: 48, text: "Part of me still misses back then" }
            ]
        },
        {
            id: 10,
            title: "Starboy",
            artist: "The Weeknd ft. Daft Punk",
            album: "Starboy",
            cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
            duration: "3:50",
            durationSec: 230,
            audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            liked: false,
            color: "#af2896",
            lyrics: [
                { time: 0, text: "I'm tryna put you in the worst mood, ah" },
                { time: 9, text: "P1 cleaner than your church shoes, ah" },
                { time: 18, text: "Milli point two just to hurt you, ah" },
                { time: 28, text: "All red Lamb' just to tease you, ah" },
                { time: 40, text: "Look what you've done" },
                { time: 48, text: "I'm a motherfuckin' starboy" }
            ]
        }
    ],

    playlists: [
        {
            id: "top-50-id",
            title: "Top 50 - Indonesia",
            description: "Pembaruan harian lagu-lagu yang paling banyak diputar saat ini di Indonesia.",
            cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
            color: "#1e3264",
            author: "Spotify",
            authorAvatar: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&auto=format&fit=crop&q=80",
            likes: "4.218.490 suka",
            trackIds: [1, 2, 6, 7, 9, 8]
        },
        {
            id: "lofi-coding",
            title: "Coding Mode & Chill Lofi",
            description: "Ketukan instrumen santai tanpa vokal untuk menemani sesi produktivitas dan pemrograman.",
            cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=80",
            color: "#386b5c",
            author: "Spotify Lofi Hub",
            authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
            likes: "1.905.321 suka",
            trackIds: [4, 3, 5, 1, 8]
        },
        {
            id: "indie-lokal",
            title: "Indie Senja Paling Pas",
            description: "Kumpulan lagu indie pop dan folk terbaik anak bangsa saat matahari mulai terbenam.",
            cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
            color: "#8d4f20",
            author: "Editorial ID",
            authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
            likes: "982.115 suka",
            trackIds: [1, 2, 6, 7]
        },
        {
            id: "synthwave-night",
            title: "Night Drive Retrowave",
            description: "Bass analog tebal dan melodi synth 80-an untuk perjalanan malam di jalanan kota.",
            cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
            color: "#8d258b",
            author: "Synth Master",
            authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
            likes: "753.840 suka",
            trackIds: [3, 10, 5, 8]
        },
        {
            id: "nostalgia-hits",
            title: "Kisah Klasik Indonesia",
            description: "Lagu pop Indonesia legendaris era 2000-an yang tak pernah pudar oleh waktu.",
            cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
            color: "#274880",
            author: "Spotify Indonesia",
            authorAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
            likes: "2.310.054 suka",
            trackIds: [6, 2, 1, 7]
        },
        {
            id: "global-top",
            title: "Today's Top Global Hits",
            description: "Lagu-lagu internasional paling trending dari seluruh dunia dalam satu playlist.",
            cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&auto=format&fit=crop&q=80",
            color: "#b02897",
            author: "Spotify Hits",
            authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
            likes: "12.890.312 suka",
            trackIds: [8, 10, 5, 9, 3]
        }
    ],

    categories: [
        { id: "pop", title: "Pop", color: "#148a08", cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&auto=format&fit=crop&q=80" },
        { id: "indie", title: "Indie", color: "#e13300", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80" },
        { id: "lofi", title: "Santai & Lofi", color: "#6b4f3a", cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80" },
        { id: "rock", title: "Rock & Band", color: "#bc5900", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80" },
        { id: "podcast", title: "Podcast", color: "#006450", cover: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80" },
        { id: "k-pop", title: "K-Pop", color: "#8d4585", cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80" },
        { id: "gaming", title: "Gaming", color: "#e91429", cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&auto=format&fit=crop&q=80" },
        { id: "rnb", title: "R&B / Soul", color: "#7358ff", cover: "https://images.unsplash.com/photo-1445985543469-433ec45754ac?w=300&auto=format&fit=crop&q=80" }
    ],

    artists: [
        {
            id: "hindia",
            name: "Hindia",
            role: "Artis",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
            listeners: "5.412.809 pendengar bulanan"
        },
        {
            id: "tulus",
            name: "Tulus",
            role: "Artis",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
            listeners: "8.120.400 pendengar bulanan"
        },
        {
            id: "sheilaon7",
            name: "Sheila On 7",
            role: "Artis",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
            listeners: "6.780.950 pendengar bulanan"
        },
        {
            id: "niki",
            name: "NIKI",
            role: "Artis",
            image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80",
            listeners: "11.230.120 pendengar bulanan"
        },
        {
            id: "joji",
            name: "Joji",
            role: "Artis",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80",
            listeners: "19.840.670 pendengar bulanan"
        }
    ]
};

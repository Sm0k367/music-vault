/**
 * THE MATRIX OF SMOKE // CORE ENGINE v4.20
 * Architect: DJ SMOKE STREAM
 */

const SONGS = [
    "Blue Money.mp3", "The OS of Funk.mp3", "smoke_stream_media (1).mp3",
    "A Musical Journey (Stereo FX Club Mix).mp3", "DJ Smoke Stream.mp3",
    "Resonance Cascade.mp3", "240.mp3", "Heatwave.mp3",
    "Uptown Dreams (Are Made of This.mp3", "Midnight Fix.mp3",
    "Jungle Pulse.mp3", "Get Together Lucky.mp3", "Shockwave.mp3",
    "Rhapsody of the Moment.mp3", "Dirty MF.mp3", "Rhythm Switched__.mp3",
    "We Hear It All.mp3", "Latex & Bass.mp3", "Breathing.mp3",
    "Inferno Beat.mp3", "Dirty Beats.mp3", "Explicit Lyrics.mp3",
    "Acoustic Techno Fusion.mp3", "Within Havana Virgin.mp3",
    "All We Hear Is Dirty.mp3", "We shoutin' out loud.mp3",
    "Slippin Sipping soda.mp3", "Slippin.mp3", "Midnight Cocaine.mp3",
    "Smoken Tokens wit D Dbl G.mp3", "Thug Hood Rap Legends.mp3",
    "West Side Legends.mp3", "The 2 O'Clock Jump.mp3", "Crunk Manifesto.mp3",
    "Jail Is Hot.mp3", "Words pay.mp3", "Down South Mayhem.mp3",
    "Southern Crunk Anthem.mp3", "Hood Crunk Legend.mp3", "Hood Mentality.mp3",
    "Crunkadelic.mp3", "F_ck a Suit and Tie.mp3", "A Spiritual Union.mp3",
    "Ain't That Just the Way.mp3", "Hacken Delight.mp3", "Insert Title Here.mp3",
    "The Knickerbocker.mp3", "Torus Knot.mp3", "smoking-digital-thrones.mp3",
    "smokin' on a higher plane club banger.mp3", "Big Smoke Stream.mp3",
    "Your Brand, Your Bread.mp3", "The Smoke Stream.mp3", "Whirlwind.mp3",
    "Do Ya Thang (Orion Starfall Remix).mp3", "Money Over Everything.mp3",
    "Kronk & Trap_ Top Hits through the Decades.mp3", "Coast To Coast Law.mp3",
    "Logical.mp3", "japanese gaisha house spin.mp3", "Turntable Tango_ A DJ Duo Deluxe.mp3",
    "japanese gaisha house music.mp3", "Kemuri (Smoke) and Beats.mp3",
    "I'm Sm0ken420 On X .mp3", "Double Dutch Up The Cannibus.mp3",
    "Orion's 420 High Way_.mp3", "Lounge.mp3"
];

let scene, camera, renderer, stars, analyser, dataArray;
const audio = document.getElementById('audio-master');
const logContainer = document.getElementById('system-logs');

// --- 1. BOOT SEQUENCE ---
window.addEventListener('load', () => {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        document.getElementById('load-bar').style.width = Math.min(progress, 100) + "%";
        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById('boot-status').innerText = "SYSTEM READY. LINK ESTABLISHED.";
            document.getElementById('ignite-btn').style.display = "block";
        }
    }, 150);
});

document.getElementById('ignite-btn').addEventListener('click', () => {
    initThree();
    initAudio();
    populateSongList();
    gsap.to("#boot-overlay", { opacity: 0, duration: 1.5, onComplete: () => {
        document.getElementById('boot-overlay').style.display = 'none';
        addLog("NEURAL LINK: ONLINE");
    }});
});

// --- 2. GALAXY ENGINE (Three.js) ---
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('world-canvas'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const starGeo = new THREE.BufferGeometry();
    const starCoords = [];
    for (let i = 0; i < 8000; i++) {
        starCoords.push(Math.random() * 600 - 300, Math.random() * 600 - 300, Math.random() * 600 - 300);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, transparent: true });
    stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    animate();
}

// --- 3. AUDIO & PLAYLIST ---
function initAudio() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    analyser.fftSize = 128;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
}

function populateSongList() {
    const list = document.getElementById('song-list');
    SONGS.forEach(song => {
        const div = document.createElement('div');
        div.className = 'song-node';
        div.innerText = song.replace('.mp3', '').toUpperCase();
        div.onclick = () => playTrack(song);
        list.appendChild(div);
    });
}

function playTrack(filename) {
    audio.src = filename;
    audio.play();
    document.getElementById('current-track').innerText = filename.toUpperCase();
    addLog(`STREAMING: ${filename}`);
}

function addLog(msg) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerText = `> ${msg}`;
    logContainer.prepend(entry);
}

// --- 4. THE LIVE LOOP ---
function animate() {
    requestAnimationFrame(animate);
    
    let speed = 0.5;
    if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        const bass = dataArray[2];
        speed = 0.5 + (bass / 40); // Warp speed based on bass
        
        // Update Frequency Hex Display
        document.getElementById('freq-hex').innerText = `0x${bass.toString(16).toUpperCase()}`;

        if (bass > 220) {
            document.body.classList.add('bass-kick');
            stars.material.color.setHex(0x00f2ff);
        } else {
            document.body.classList.remove('bass-kick');
            stars.material.color.setHex(0xffffff);
        }
    }

    // Move Stars (Warp Drive Effect)
    const positions = stars.geometry.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= speed;
        if (positions[i] < -300) positions[i] = 300;
    }
    stars.geometry.attributes.position.needsUpdate = true;
    
    renderer.render(scene, camera);
}

// Global filter helper (can be expanded later)
window.filterNodes = (type) => {
    addLog(`FILTER APPLIED: ${type.toUpperCase()}`);
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

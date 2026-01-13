/**
 * THE MATRIX OF SMOKE // VIRAL ENGINE v7.1
 * Stable Build - 2026 Edition
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

let scene, camera, renderer, particles, analyser, dataArray;
let currentDNA = { color: '#00f2ff', velocity: 0.5, seed: 0 };
let inputBuffer = "";
const audio = document.getElementById('audio-master');

// --- 1. SYSTEM BOOT & INITIALIZATION ---
window.addEventListener('load', () => {
    let progress = 0;
    const loader = setInterval(() => {
        progress += 5;
        document.getElementById('load-bar').style.width = progress + "%";
        if (progress >= 100) {
            clearInterval(loader);
            document.getElementById('ignite-btn').style.display = "block";
            document.getElementById('boot-status').innerText = "SYSTEM READY.";
        }
    }, 50);
});

document.getElementById('ignite-btn').addEventListener('click', () => {
    initThree();
    initAudio();
    populateList();
    gsap.to("#boot-overlay", { opacity: 0, duration: 1, onComplete: () => {
        document.getElementById('boot-overlay').style.display = 'none';
        addLog("LINK_ESTABLISHED");
    }});
});

// --- 2. THE THREE.JS ENGINE ---
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('world-canvas'), 
        antialias: true,
        preserveDrawingBuffer: true // Required for DNA screenshots
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 500;
    
    // Initial Starfield
    update3DSpace(12345);
    animate();
}

function update3DSpace(seed) {
    if (particles) scene.remove(particles);
    
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const count = 8000;

    for (let i = 0; i < count; i++) {
        pos.push(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ 
        size: 2, 
        color: currentDNA.color, 
        transparent: true, 
        opacity: 0.8 
    });
    particles = new THREE.Points(geo, mat);
    scene.add(particles);
}

// --- 3. DNA & VIRAL LOGIC ---
function generateDNA(songName) {
    let hash = 0;
    for (let i = 0; i < songName.length; i++) hash = songName.charCodeAt(i) + ((hash << 5) - hash);
    const color = `#${Math.abs(hash & 0x00FFFFFF).toString(16).padStart(6, '0')}`;
    
    currentDNA = {
        color: color,
        velocity: 0.5 + (Math.abs(hash % 100) / 20),
        seed: hash
    };

    // Update UI
    document.getElementById('dna-seed').innerText = `0x${Math.abs(hash).toString(16).toUpperCase()}`;
    document.documentElement.style.setProperty('--dna-color', color);
    document.getElementById('stat-vel').style.width = (currentDNA.velocity * 10) + "%";
    document.getElementById('stat-den').style.width = "85%";
    
    update3DSpace(hash);
}

// Keyboard Listeners (Easter Eggs)
window.addEventListener('keydown', (e) => {
    inputBuffer += e.key.toUpperCase();
    if (inputBuffer.length > 10) inputBuffer = inputBuffer.substring(1);

    if (inputBuffer.includes("MONEY")) {
        document.body.className = "fx-whale";
        addLog("EVENT: WHALE_MODE");
    }
    if (inputBuffer.includes("H")) {
        document.body.className = "fx-420";
        addLog("EVENT: HIGH_PLANE");
    }
});

// --- 4. AUDIO & INTERFACE ---
function initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    analyser = context.createAnalyser();
    const source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
}

function populateList() {
    const list = document.getElementById('song-list');
    SONGS.forEach(song => {
        const div = document.createElement('div');
        div.className = 'song-node';
        div.innerText = song.replace('.mp3', '').toUpperCase();
        div.onclick = () => {
            audio.src = song;
            audio.play();
            document.getElementById('current-track').innerText = song.toUpperCase();
            generateDNA(song);
            addLog(`STREAMING: ${song}`);
        };
        list.appendChild(div);
    });
}

function addLog(msg) {
    const log = document.getElementById('system-logs');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerText = `> ${msg}`;
    log.prepend(entry);
}

// --- 5. THE RENDER LOOP ---
function animate() {
    requestAnimationFrame(animate);
    
    if (particles) {
        particles.rotation.y += 0.001 * currentDNA.velocity;
        particles.rotation.x += 0.0005;

        if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            const bass = dataArray[2];
            const scale = 1 + (bass / 500);
            particles.scale.set(scale, scale, scale);
            document.getElementById('sync-val').innerText = (bass / 10).toFixed(2);
        }
    }
    renderer.render(scene, camera);
}

// Share Button Logic
document.getElementById('share-dna-btn').addEventListener('click', () => {
    const dataURL = renderer.domElement.toDataURL("image/png");
    document.getElementById('dna-card-image').src = dataURL;
    document.getElementById('download-dna').href = dataURL;
    document.getElementById('dna-card-popup').style.display = "flex";
});

document.getElementById('close-dna-popup').onclick = () => {
    document.getElementById('dna-card-popup').style.display = "none";
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

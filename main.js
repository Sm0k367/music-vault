/**
 * THE MATRIX OF SMOKE // VIRAL ENGINE v7.2
 * FIXED: Audio Routing & Interaction Lock
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

let scene, camera, renderer, particles, analyser, dataArray, audioCtx;
const audio = document.getElementById('audio-master');
const vCanvas = document.getElementById('analyser-render');
const vCtx = vCanvas.getContext('2d');

// --- 1. BOOT SEQUENCE ---
window.addEventListener('load', () => {
    let p = 0;
    const loader = setInterval(() => {
        p += Math.random() * 10;
        document.getElementById('load-bar').style.width = Math.min(p, 100) + "%";
        if (p >= 100) {
            clearInterval(loader);
            document.getElementById('ignite-btn').style.display = "block";
            document.getElementById('boot-status').innerText = "NEURAL LINK READY";
        }
    }, 80);
});

// --- 2. THE IGNITION (CRITICAL FOR AUDIO) ---
document.getElementById('ignite-btn').addEventListener('click', async () => {
    // UNLOCK AUDIO CONTEXT
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
    }
    
    await audioCtx.resume();
    
    initThree();
    populateList();
    
    gsap.to("#boot-overlay", { 
        opacity: 0, 
        duration: 1.2, 
        onComplete: () => document.getElementById('boot-overlay').style.display = 'none' 
    });
    
    addLog("SYSTEM_ONLINE");
});

// --- 3. 3D ENGINE ---
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 600;

    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('world-canvas'), 
        antialias: true,
        preserveDrawingBuffer: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const geo = new THREE.BufferGeometry();
    const pos = [];
    for (let i = 0; i < 10000; i++) {
        pos.push(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    
    const mat = new THREE.PointsMaterial({ size: 2, color: 0x00f2ff, transparent: true, opacity: 0.7 });
    particles = new THREE.Points(geo, mat);
    scene.add(particles);

    animate();
}

// --- 4. LIST & DNA LOGIC ---
function populateList() {
    const list = document.getElementById('song-list');
    SONGS.forEach(song => {
        const d = document.createElement('div');
        d.className = 'song-node';
        d.innerText = song.replace('.mp3', '').toUpperCase();
        d.onclick = () => playTrack(song);
        list.appendChild(d);
    });
}

function playTrack(file) {
    audio.src = file;
    audio.play();
    document.getElementById('current-track').innerText = file.toUpperCase();
    
    // Generate DNA Seed
    let hash = 0;
    for (let i = 0; i < file.length; i++) hash = file.charCodeAt(i) + ((hash << 5) - hash);
    const color = `#${Math.abs(hash & 0x00FFFFFF).toString(16).padStart(6, '0')}`;
    
    document.getElementById('dna-seed').innerText = `0x${Math.abs(hash).toString(16).toUpperCase()}`;
    document.documentElement.style.setProperty('--neon', color);
    particles.material.color.set(color);
    
    addLog(`STREAMING_NODE: ${file}`);
}

// --- 5. RENDER & VISUALIZER LOOP ---
function animate() {
    requestAnimationFrame(animate);
    
    if (particles) {
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.001;

        if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            const bass = dataArray[2];
            
            // Pulse particles to bass
            const s = 1 + (bass / 300);
            particles.scale.set(s, s, s);
            document.getElementById('sync-val').innerText = (bass / 10).toFixed(2);

            // Draw mini visualizer
            vCtx.clearRect(0, 0, vCanvas.width, vCanvas.height);
            vCtx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--neon');
            for (let i = 0; i < dataArray.length; i++) {
                const h = (dataArray[i] / 255) * vCanvas.height;
                vCtx.fillRect(i * 5, vCanvas.height - h, 3, h);
            }
        }
    }
    
    renderer.render(scene, camera);
}

function addLog(m) {
    const log = document.getElementById('system-logs');
    const e = document.createElement('div');
    e.innerText = `> ${m}`;
    log.prepend(e);
}

// Handle DNA Share
document.getElementById('share-dna-btn').onclick = () => {
    const url = renderer.domElement.toDataURL("image/png");
    document.getElementById('dna-card-image').src = url;
    document.getElementById('dna-card-popup').style.display = 'flex';
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

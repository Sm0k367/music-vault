/**
 * THE MATRIX OF SMOKE // MULTIVERSE ENGINE v8.0
 * Deep Procedural Logic & Cross-Device Optimization
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
let currentSeed = 0;
const audio = document.getElementById('audio-master');
const vCanvas = document.getElementById('analyser-render');
const vCtx = vCanvas.getContext('2d');

// --- 1. BOOT ENGINE ---
window.addEventListener('load', () => {
    let p = 0;
    const loader = setInterval(() => {
        p += Math.random() * 15;
        document.getElementById('load-bar').style.width = Math.min(p, 100) + "%";
        if (p >= 100) {
            clearInterval(loader);
            document.getElementById('ignite-btn').style.display = "block";
            document.getElementById('boot-status').innerText = "CALIBRATION COMPLETE";
        }
    }, 50);
});

document.getElementById('ignite-btn').addEventListener('click', async () => {
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
    gsap.to("#boot-overlay", { opacity: 0, duration: 1, onComplete: () => document.getElementById('boot-overlay').style.display = 'none' });
});

// --- 2. THE GEOMETRY FACTORY ---
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.z = 800;

    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('world-canvas'), 
        antialias: true, 
        preserveDrawingBuffer: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    buildUniverse("BOOTUP");
    animate();
}

function buildUniverse(songTitle) {
    if (particles) scene.remove(particles);
    
    // Create Hash from Title
    let hash = 0;
    for (let i = 0; i < songTitle.length; i++) hash = songTitle.charCodeAt(i) + ((hash << 5) - hash);
    currentSeed = Math.abs(hash);
    
    const color = `#${Math.abs(hash & 0x00FFFFFF).toString(16).padStart(6, '0')}`;
    document.documentElement.style.setProperty('--neon', color);
    document.getElementById('dna-seed').innerText = `0x${currentSeed.toString(16).toUpperCase().slice(0,6)}`;

    const geo = new THREE.BufferGeometry();
    const pos = [];
    const mode = currentSeed % 4; // 4 Distinct Universe Types
    const count = 12000;

    for (let i = 0; i < count; i++) {
        if (mode === 0) { // NEBULA
            pos.push(Math.random()*1600-800, Math.random()*1600-800, Math.random()*1600-800);
            document.getElementById('realm-type').innerText = "NEBULA";
        } else if (mode === 1) { // DNA HELIX
            const t = i / 100;
            const r = 150;
            pos.push(r * Math.cos(t), t * 10 - 500, r * Math.sin(t));
            document.getElementById('realm-type').innerText = "DNA_HELIX";
        } else if (mode === 2) { // TORUS PULSE
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const R = 300, rr = 100;
            pos.push((R + rr * Math.cos(v)) * Math.cos(u), (R + rr * Math.cos(v)) * Math.sin(u), rr * Math.sin(v));
            document.getElementById('realm-type').innerText = "TORUS";
        } else { // DIGITAL GRID
            pos.push((i % 100) * 20 - 1000, (Math.random()*10), Math.floor(i / 100) * 20 - 1000);
            document.getElementById('realm-type').innerText = "CYBER_GRID";
        }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: 3, color: color, transparent: true, opacity: 0.8 });
    particles = new THREE.Points(geo, mat);
    scene.add(particles);
}

// --- 3. UI & AUDIO SYNC ---
function populateList() {
    const list = document.getElementById('song-list');
    SONGS.forEach(s => {
        const d = document.createElement('div');
        d.className = 'song-node';
        d.innerText = s.replace('.mp3', '').toUpperCase();
        d.onclick = () => {
            audio.src = s;
            audio.play();
            document.getElementById('current-track').innerText = s.toUpperCase();
            buildUniverse(s);
        };
        list.appendChild(d);
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (particles) {
        particles.rotation.y += 0.001;
        if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            const bass = dataArray[2];
            document.getElementById('sync-val').innerText = (bass/10).toFixed(2);
            
            // Scaled Pulsing
            const s = 1 + (bass / 400);
            particles.scale.set(s, s, s);

            // Draw Visualizer
            vCtx.clearRect(0,0,vCanvas.width, vCanvas.height);
            vCtx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--neon');
            for(let i=0; i<32; i++) {
                let h = (dataArray[i]/255) * vCanvas.height;
                vCtx.fillRect(i*4, vCanvas.height - h, 2, h);
            }
        }
    }
    renderer.render(scene, camera);
}

// --- 4. SHARE DNA (FIXED) ---
document.getElementById('share-dna-btn').onclick = () => {
    // We capture the frame BEFORE opening the popup
    renderer.render(scene, camera);
    const dataURL = renderer.domElement.toDataURL("image/png");
    const img = document.getElementById('dna-card-image');
    img.src = dataURL;
    document.getElementById('download-dna').href = dataURL;
    document.getElementById('dna-card-popup').style.display = 'flex';
};

document.getElementById('close-popup').onclick = () => {
    document.getElementById('dna-card-popup').style.display = 'none';
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

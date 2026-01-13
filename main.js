/**
 * THE MATRIX OF SMOKE // PROCEDURAL DNA ENGINE v6.0
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

let scene, camera, renderer, particles, analyser, dataArray;
let currentDNA = { color: '#00f2ff', velocity: 0.5, density: 5000, drift: 0.01 };
const audio = document.getElementById('audio-master');

// --- 1. DNA SEED GENERATOR ---
function generateSeed(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function applyDNA(songName) {
    const seed = generateSeed(songName);
    
    // Generate Unique Hex Color
    const color = `#${Math.abs(seed & 0x00FFFFFF).toString(16).padStart(6, '0')}`;
    
    // Derive Physics from Seed
    const velocity = 0.2 + (Math.abs(seed % 100) / 50); // 0.2 to 2.2
    const density = 2000 + (Math.abs(seed % 8000));   // 2k to 10k particles
    const drift = (seed % 10) / 200;                  // Camera sway speed
    
    currentDNA = { color, velocity, density, drift };

    // Update UI
    document.getElementById('dna-seed').innerText = `0x${Math.abs(seed).toString(16).toUpperCase()}`;
    document.documentElement.style.setProperty('--dna-color', color);
    gsap.to('#stat-vel', { width: (velocity / 2.2 * 100) + "%", duration: 1 });
    gsap.to('#stat-den', { width: (density / 10000 * 100) + "%", duration: 1 });

    // Update 3D Geometry
    update3DSpace(seed);
    addLog(`DNA_DECODED: ${color}`);
}

// --- 2. 3D SPACE MANAGEMENT ---
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('world-canvas'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 250;
    animate();
}

function update3DSpace(seed) {
    if (particles) scene.remove(particles);

    const geo = new THREE.BufferGeometry();
    const pos = [];
    const count = currentDNA.density;

    // Use seed to determine Shape (Spherical vs Box vs Torus)
    const shapeMode = Math.abs(seed % 3); 

    for (let i = 0; i < count; i++) {
        if (shapeMode === 0) { // Sphere
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            pos.push(200 * Math.cos(theta) * Math.sin(phi), 200 * Math.sin(theta) * Math.sin(phi), 200 * Math.cos(phi));
        } else { // Chaos/Starfield
            pos.push(Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400);
        }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: 1.5, color: currentDNA.color, transparent: true, opacity: 0.8 });
    particles = new THREE.Points(geo, mat);
    scene.add(particles);
}

// --- 3. SYSTEM BOOT ---
window.addEventListener('load', () => {
    let progress = 0;
    const loader = setInterval(() => {
        progress += 10;
        document.getElementById('load-bar').style.width = progress + "%";
        if (progress >= 100) {
            clearInterval(loader);
            document.getElementById('ignite-btn').style.display = "block";
            document.getElementById('boot-status').innerText = "DNA SEQUENCE READY.";
        }
    }, 100);
});

document.getElementById('ignite-btn').addEventListener('click', () => {
    initThree();
    initAudio();
    populateList();
    gsap.to("#boot-overlay", { opacity: 0, duration: 1, onComplete: () => {
        document.getElementById('boot-overlay').style.display = 'none';
        addLog("OS_ONLINE: SYNC_ESTABLISHED");
    }});
});

function initAudio() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
}

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
            document.getElementById('track-sub').innerText = `DNA_SYNC: ${s}`;
            applyDNA(s);
        };
        list.appendChild(d);
    });
}

function addLog(m) {
    const e = document.createElement('div');
    e.className = 'log-entry';
    e.innerText = `> ${m}`;
    document.getElementById('system-logs').prepend(e);
}

// --- 4. ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);
    if (particles) {
        particles.rotation.y += currentDNA.drift;
        particles.rotation.x += currentDNA.drift / 2;
        
        if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            const bass = dataArray[2];
            const scale = 1 + (bass / 500);
            particles.scale.set(scale, scale, scale);
            
            // Sync Stability Readout
            document.getElementById('sync-val').innerText = (bass / 10).toFixed(2);

            // Subtle dock pulse
            if (bass > 200) document.querySelector('.bottom-dock').classList.add('bass-sync');
            else document.querySelector('.bottom-dock').classList.remove('bass-sync');
        }
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

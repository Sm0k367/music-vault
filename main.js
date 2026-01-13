/**
 * THE MATRIX OF SMOKE // VIRAL MULTIVERSE v7.0
 * Architect: DJ SMOKE STREAM
 */

const SONGS = ["Blue Money.mp3", "The OS of Funk.mp3", "smoke_stream_media (1).mp3", "A Musical Journey (Stereo FX Club Mix).mp3", "DJ Smoke Stream.mp3", "Resonance Cascade.mp3", "240.mp3", "Heatwave.mp3", "Uptown Dreams (Are Made of This.mp3", "Midnight Fix.mp3", "Jungle Pulse.mp3", "Get Together Lucky.mp3", "Shockwave.mp3", "Rhapsody of the Moment.mp3", "Dirty MF.mp3", "Rhythm Switched__.mp3", "We Hear It All.mp3", "Latex & Bass.mp3", "Breathing.mp3", "Inferno Beat.mp3", "Dirty Beats.mp3", "Explicit Lyrics.mp3", "Acoustic Techno Fusion.mp3", "Within Havana Virgin.mp3", "All We Hear Is Dirty.mp3", "We shoutin' out loud.mp3", "Slippin Sipping soda.mp3", "Slippin.mp3", "Midnight Cocaine.mp3", "Smoken Tokens wit D Dbl G.mp3", "Thug Hood Rap Legends.mp3", "West Side Legends.mp3", "The 2 O'Clock Jump.mp3", "Crunk Manifesto.mp3", "Jail Is Hot.mp3", "Words pay.mp3", "Down South Mayhem.mp3", "Southern Crunk Anthem.mp3", "Hood Crunk Legend.mp3", "Hood Mentality.mp3", "Crunkadelic.mp3", "F_ck a Suit and Tie.mp3", "A Spiritual Union.mp3", "Ain't That Just the Way.mp3", "Hacken Delight.mp3", "Insert Title Here.mp3", "The Knickerbocker.mp3", "Torus Knot.mp3", "smoking-digital-thrones.mp3", "smokin' on a higher plane club banger.mp3", "Big Smoke Stream.mp3", "Your Brand, Your Bread.mp3", "The Smoke Stream.mp3", "Whirlwind.mp3", "Do Ya Thang (Orion Starfall Remix).mp3", "Money Over Everything.mp3", "Kronk & Trap_ Top Hits through the Decades.mp3", "Coast To Coast Law.mp3", "Logical.mp3", "japanese gaisha house spin.mp3", "Turntable Tango_ A DJ Duo Deluxe.mp3", "japanese gaisha house music.mp3", "Kemuri (Smoke) and Beats.mp3", "I'm Sm0ken420 On X .mp3", "Double Dutch Up The Cannibus.mp3", "Orion's 420 High Way_.mp3", "Lounge.mp3"];

let scene, camera, renderer, particles, analyser, dataArray;
let currentDNA = { color: '#00f2ff', velocity: 0.5, density: 5000, seed: 0 };
let inputBuffer = "";
const audio = document.getElementById('audio-master');

// --- 1. KEYBOARD CIPHER (EASTER EGGS) ---
window.addEventListener('keydown', (e) => {
    inputBuffer += e.key.toUpperCase();
    if (inputBuffer.length > 10) inputBuffer = inputBuffer.substring(1);
    
    // VIRAL CHEATS
    if (inputBuffer.includes("MONEY")) triggerFX("whale", "WHALE_MODE_ACTIVE");
    if (inputBuffer.includes("WARP")) triggerFX("warp", "HYPERSPEED_ENGAGED");
    if (inputBuffer.includes("H")) triggerFX("420", "HIGH_PLANE_SYNC");
    if (inputBuffer.includes("FLIP")) { 
        particles.rotation.x += Math.PI; 
        addLog("GEOMETRY_FLIPPED");
    }
});

function triggerFX(className, msg) {
    document.body.className = `fx-${className}`;
    document.getElementById('fx-mode').innerText = msg;
    addLog(`SYSTEM_MOD: ${msg}`);
    setTimeout(() => {
        document.body.className = "";
        document.getElementById('fx-mode').innerText = "NORMAL";
    }, 10000); // 10s effect duration
}

// --- 2. TIME-BASED EVENTS (4:20 PM) ---
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 16 && now.getMinutes() === 20) {
        if (document.body.className !== "fx-420") triggerFX("420", "TIME_SYNC_420");
    }
}, 60000);

// --- 3. VIRAL DNA CARD GENERATOR ---
document.getElementById('share-dna-btn').addEventListener('click', () => {
    const shareCanvas = document.getElementById('share-canvas');
    const ctx = shareCanvas.getContext('2d');
    shareCanvas.width = 1200;
    shareCanvas.height = 630;

    // Background
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,1200,630);
    
    // Draw current 3D frame (simplified proxy)
    ctx.strokeStyle = currentDNA.color;
    ctx.lineWidth = 2;
    for(let i=0; i<50; i++) {
        ctx.beginPath();
        ctx.arc(600, 315, Math.random()*300, 0, Math.PI*2);
        ctx.stroke();
    }

    // Text Metadata
    ctx.fillStyle = "#fff";
    ctx.font = "bold 40px Syncopate";
    ctx.fillText(document.getElementById('current-track').innerText, 50, 500);
    
    ctx.fillStyle = currentDNA.color;
    ctx.font = "24px Share Tech Mono";
    ctx.fillText(`DNA_SEED: ${document.getElementById('dna-seed').innerText}`, 50, 550);
    ctx.fillText(`ARTIST: DJ SMOKE STREAM`, 50, 580);

    // Show Popup
    const dataURL = shareCanvas.toDataURL();
    document.getElementById('dna-card-image').src = dataURL;
    document.getElementById('download-dna').href = dataURL;
    document.getElementById('dna-card-popup').style.display = "flex";
});

document.getElementById('close-dna-popup').addEventListener('click', () => {
    document.getElementById('dna-card-popup').style.display = "none";
});

// --- 4. CORE ENGINE (Procedural Logic) ---
function generateSeed(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return hash;
}

function applyDNA(songName) {
    const seed = generateSeed(songName);
    const color = `#${Math.abs(seed & 0x00FFFFFF).toString(16).padStart(6, '0')}`;
    currentDNA = { 
        color, 
        velocity: 0.2 + (Math.abs(seed % 100) / 50), 
        density: 2000 + (Math.abs(seed % 8000)),
        seed: seed
    };

    document.getElementById('dna-seed').innerText = `0x${Math.abs(seed).toString(16).toUpperCase()}`;
    document.documentElement.style.setProperty('--dna-color', color);
    gsap.to('#stat-vel', { width: (currentDNA.velocity / 2.2 * 100) + "%", duration: 1 });
    gsap.to('#stat-den', { width: (currentDNA.density / 10000 * 100) + "%", duration: 1 });

    if(songName.includes("Resonance Cascade")) {
        document.body.classList.add("glitch-active");
        setTimeout(() => document.body.classList.remove("glitch-active"), 5000);
    }

    update3DSpace(seed);
}

// --- STANDARD THREE.JS & AUDIO INIT (Abbreviated for Viral Launch) ---
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('world-canvas'), antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 250;
    animate();
}

function update3DSpace(seed) {
    if (particles) scene.remove(particles);
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const shapeMode = Math.abs(seed % 4);
    for (let i = 0; i < currentDNA.density; i++) {
        if (shapeMode === 0) { // Sphere
            const phi = Math.acos(-1 + (2 * i) / currentDNA.density);
            const theta = Math.sqrt(currentDNA.density * Math.PI) * phi;
            pos.push(200 * Math.cos(theta) * Math.sin(phi), 200 * Math.sin(theta) * Math.sin(phi), 200 * Math.cos(phi));
        } else { // Hyper-starfield
            pos.push(Math.random()*1000-500, Math.random()*1000-500, Math.random()*1000-500);
        }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    particles = new THREE.Points(geo, new THREE.PointsMaterial({ size: 1.5, color: currentDNA.color, transparent: true, opacity: 0.8 }));
    scene.add(particles);
}

function initAudio() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
}

function populateList() {
    const list = document.getElementById('song-list');
    SONGS.forEach(s => {
        const d = document.createElement('div');
        d.className = 'song-node';
        d.innerText = s.replace('.mp3', '').toUpperCase();
        d.onclick = () => { audio.src = s; audio.play(); document.getElementById('current-track').innerText = s.toUpperCase(); applyDNA(s); addLog(`LINKING_DNA: ${s}`); };
        list.appendChild(d);
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (particles) {
        particles.rotation.y += 0.005 * currentDNA.velocity;
        if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            const bass = dataArray[2];
            particles.scale.set(1 + bass/400, 1 + bass/400, 1 + bass/400);
            document.getElementById('sync-val').innerText = (bass / 10).toFixed(2);
        }
    }
    renderer.render(scene, camera);
}

function addLog(m) {
    const e = document.createElement('div');
    e.className = 'log-entry';
    e.innerText = `> ${m}`;
    document.getElementById('system-logs').prepend(e);
}

document.getElementById('ignite-btn').addEventListener('click', () => {
    initThree(); initAudio(); populateList();
    gsap.to("#boot-overlay", { opacity: 0, duration: 1, onComplete: () => document.getElementById('boot-overlay').style.display = 'none' });
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

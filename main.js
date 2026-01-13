/**
 * THE MATRIX OF SMOKE // MULTI-VERSE ENGINE v5.0
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
let currentRealm = 'neutral';
const audio = document.getElementById('audio-master');
const vCanvas = document.getElementById('analyser-render');
const vCtx = vCanvas.getContext('2d');

// --- 1. BOOT LOGIC ---
window.addEventListener('load', () => {
    let p = 0;
    const loader = setInterval(() => {
        p += Math.random() * 20;
        document.getElementById('load-bar').style.width = Math.min(p, 100) + "%";
        if(p >= 100) {
            clearInterval(loader);
            document.getElementById('boot-status').innerText = "MULTIVERSE SYNC COMPLETE.";
            document.getElementById('ignite-btn').style.display = "block";
        }
    }, 100);
});

document.getElementById('ignite-btn').addEventListener('click', () => {
    initThree();
    initAudio();
    populateList();
    gsap.to("#boot-overlay", { opacity: 0, duration: 1, onComplete: () => {
        document.getElementById('boot-overlay').style.display = 'none';
        addLog("SYSTEM: MULTIVERSE_LINK_STABLE");
    }});
});

// --- 2. THE THREE.JS REALM ENGINE ---
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('world-canvas'), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geo = new THREE.BufferGeometry();
    const pos = [];
    for(let i=0; i<15000; i++) pos.push(Math.random()*800-400, Math.random()*800-400, Math.random()*800-400);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    
    const mat = new THREE.PointsMaterial({ size: 1.5, transparent: true, opacity: 0.8, color: 0x00f2ff });
    particles = new THREE.Points(geo, mat);
    scene.add(particles);
    camera.position.z = 200;

    animate();
}

function initAudio() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
}

// --- 3. REALM SELECTION LOGIC ---
function setRealm(trackName) {
    const name = trackName.toLowerCase();
    let theme = 'neutral';
    
    if (name.includes('money') || name.includes('gold') || name.includes('rich')) theme = 'gold';
    else if (name.includes('lounge') || name.includes('midnight') || name.includes('dreams')) theme = 'blue';
    else if (name.includes('crunk') || name.includes('dirty') || name.includes('shock') || name.includes('heat')) theme = 'red';
    else if (name.includes('techno') || name.includes('pulse') || name.includes('digital')) theme = 'emerald';

    document.body.className = `realm-${theme}`;
    document.getElementById('current-realm').innerText = theme.toUpperCase();
    currentRealm = theme;
    
    // Change Particle Color based on theme
    const colors = { gold: 0xffcc00, blue: 0x0077ff, red: 0xff0044, emerald: 0x00ff88, neutral: 0x00f2ff };
    gsap.to(particles.material.color, { r: new THREE.Color(colors[theme]).r, g: new THREE.Color(colors[theme]).g, b: new THREE.Color(colors[theme]).b, duration: 2 });
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
            document.getElementById('track-sub').innerText = "PLAYING FROM SMOKE_STREAM_OS";
            setRealm(s);
            addLog(`NODE_LINK: ${s}`);
        };
        list.appendChild(d);
    });
}

function addLog(m) {
    const e = document.createElement('div');
    e.className = 'log-entry';
    e.innerText = `> ${m}`;
    logContainer.prepend(e);
}

// --- 4. ANIMATION LOOP (Surgical Movement) ---
function animate() {
    requestAnimationFrame(animate);
    
    if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        const bass = dataArray[2];
        const mid = dataArray[10];
        
        document.getElementById('freq-hex').innerText = `0x${bass.toString(16).toUpperCase()}`;
        document.getElementById('stability').innerText = `${(100 - (bass/20)).toFixed(1)}%`;

        // DRAW MINI VISUALIZER
        vCtx.clearRect(0,0, vCanvas.width, vCanvas.height);
        vCtx.fillStyle = getComputedStyle(document.body).getPropertyValue('--primary');
        for(let i=0; i<30; i++) {
            let h = (dataArray[i*2]/255) * vCanvas.height;
            vCtx.fillRect(i*7, vCanvas.height - h, 4, h);
        }

        // REALM PHYSICS
        if (currentRealm === 'red') {
            particles.rotation.y += 0.05; // Vortex
            particles.rotation.z += (bass/1000);
        } else if (currentRealm === 'gold') {
            particles.position.y = Math.sin(Date.now()*0.001) * 20; // Drifting
            particles.rotation.y += 0.001;
        } else if (currentRealm === 'blue') {
            camera.position.z = 200 + (bass/4); // Smooth Warp
        } else {
            particles.rotation.y += 0.005; // Standard Spin
        }
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

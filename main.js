/**
 * THE MATRIX OF SMOKE // MULTIVERSE ENGINE v9.0
 * Deep Procedural Logic & High-Res Poster Composition
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
let currentSeed = 0, currentRealm = "VOID", currentHue = 180;
const audio = document.getElementById('audio-master');
const vCanvas = document.getElementById('analyser-render');
const vCtx = vCanvas.getContext('2d');

// --- 1. BOOT ENGINE ---
window.addEventListener('load', () => {
    let p = 0;
    const loader = setInterval(() => {
        p += Math.random() * 12;
        document.getElementById('load-bar').style.width = Math.min(p, 100) + "%";
        if (p >= 100) {
            clearInterval(loader);
            document.getElementById('ignite-btn').style.display = "block";
        }
    }, 60);
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

// --- 2. THE 8-REALM GEOMETRY FACTORY ---
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000);
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('world-canvas'), 
        antialias: true, 
        preserveDrawingBuffer: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    buildUniverse("INITIALIZE");
    animate();
}

function buildUniverse(songTitle) {
    if (particles) scene.remove(particles);
    
    let hash = 0;
    for (let i = 0; i < songTitle.length; i++) hash = songTitle.charCodeAt(i) + ((hash << 5) - hash);
    currentSeed = Math.abs(hash);
    
    const color = new THREE.Color().setHSL((currentSeed % 360) / 360, 0.8, 0.5);
    const hexColor = "#" + color.getHexString();
    document.documentElement.style.setProperty('--neon', hexColor);
    document.getElementById('dna-seed').innerText = `0x${currentSeed.toString(16).toUpperCase().slice(0,6)}`;

    const geo = new THREE.BufferGeometry();
    const pos = [];
    const mode = currentSeed % 8; 
    const count = 15000;

    for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;

        switch(mode) {
            case 0: // TORUS KNOT
                currentRealm = "TORUS_KNOT";
                const p = 2, q = 3, rK = 200 * (2 + Math.cos(q * u));
                pos.push(rK * Math.cos(p * u), rK * Math.sin(p * u), 200 * Math.sin(q * u));
                break;
            case 1: // SPIRAL TUNNEL
                currentRealm = "SPIRAL_TUNNEL";
                const zS = i * 0.2 - 1000, rS = 200 + Math.sin(i*0.01)*50;
                pos.push(rS * Math.cos(i*0.1), rS * Math.sin(i*0.1), zS);
                break;
            case 2: // DNA STRAND
                currentRealm = "DNA_ARCHIVE";
                const hDNA = i * 0.1 - 750, rDNA = 150;
                const off = (i % 2 === 0) ? 0 : Math.PI;
                pos.push(rDNA * Math.cos(i*0.05 + off), hDNA, rDNA * Math.sin(i*0.05 + off));
                break;
            case 3: // WAVE PLANE
                currentRealm = "CYBER_WAVE";
                pos.push((i%120)*15-900, Math.sin(i*0.05)*100, Math.floor(i/120)*15-900);
                break;
            case 4: // HYPER SPHERE
                currentRealm = "NEURAL_CORE";
                const phi = Math.acos(-1 + (2 * i) / count);
                const theta = Math.sqrt(count * Math.PI) * phi;
                pos.push(400 * Math.cos(theta) * Math.sin(phi), 400 * Math.sin(theta) * Math.sin(phi), 400 * Math.cos(phi));
                break;
            case 5: // STAR CLOUD
                currentRealm = "VOID_CLOUD";
                pos.push(Math.random()*2000-1000, Math.random()*2000-1000, Math.random()*2000-1000);
                break;
            case 6: // INFINITE CYLINDER
                currentRealm = "DATA_PIPE";
                const rC = 300;
                pos.push(rC * Math.cos(u), Math.random()*2000-1000, rC * Math.sin(u));
                break;
            case 7: // FRACTAL BOX
                currentRealm = "GEOMETRIC_CAGE";
                pos.push(Math.random()*800-400, (i%2==0?400:-400), Math.random()*800-400);
                break;
        }
    }

    document.getElementById('realm-type').innerText = currentRealm;
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    particles = new THREE.Points(geo, new THREE.PointsMaterial({ size: 3, color: color, transparent: true, opacity: 0.8 }));
    scene.add(particles);
}

// --- 3. THE VIRAL POSTER GENERATOR ---
async function generatePoster() {
    const pCanvas = document.getElementById('poster-canvas');
    const ctx = pCanvas.getContext('2d');
    const trackName = document.getElementById('current-track').innerText;
    const dnaSeed = document.getElementById('dna-seed').innerText;
    const neonColor = getComputedStyle(document.documentElement).getPropertyValue('--neon');

    // 1. Background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Capture 3D Scene
    renderer.render(scene, camera);
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;
    tempCanvas.getContext('2d').drawImage(renderer.domElement, 0, 0);
    
    // Scale and center the 3D art on the poster
    const scale = 1.5;
    const sw = tempCanvas.width;
    const sh = tempCanvas.height;
    ctx.drawImage(tempCanvas, 1080/2 - (sw*scale)/2, 1920/2 - (sh*scale)/2, sw*scale, sh*scale);

    // 3. Overlay Branding
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 1500, 1080, 420);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 60px Syncopate";
    ctx.textAlign = "center";
    ctx.fillText(trackName, 1080/2, 1650);

    ctx.fillStyle = neonColor;
    ctx.font = "40px 'Share Tech Mono'";
    ctx.fillText(`NEURAL_DNA: ${dnaSeed}`, 1080/2, 1730);
    ctx.fillText(`REALM: ${currentRealm}`, 1080/2, 1790);

    ctx.font = "30px 'Share Tech Mono'";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText("DJ SMOKE STREAM // NEURAL_OS_v9", 1080/2, 1870);

    // 4. Output
    const dataURL = pCanvas.toDataURL("image/png");
    document.getElementById('dna-card-image').src = dataURL;
    document.getElementById('download-dna').href = dataURL;
    document.getElementById('dna-card-popup').style.display = 'flex';
}

// --- 4. ENGINE CONTROLS ---
function populateList() {
    const list = document.getElementById('song-list');
    SONGS.forEach(s => {
        const d = document.createElement('div');
        d.className = 'song-node';
        d.innerText = s.replace('.mp3', '').toUpperCase();
        d.onclick = () => {
            audio.src = s; audio.play();
            document.getElementById('current-track').innerText = s.toUpperCase();
            buildUniverse(s);
        };
        list.appendChild(d);
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (particles) {
        particles.rotation.y += 0.0015;
        particles.rotation.z += 0.0005;
        if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            const bass = dataArray[2];
            document.getElementById('sync-val').innerText = (bass/10).toFixed(2);
            particles.scale.set(1 + bass/500, 1 + bass/500, 1 + bass/500);

            vCtx.clearRect(0,0,vCanvas.width, vCanvas.height);
            vCtx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--neon');
            for(let i=0; i<32; i++) {
                let h = (dataArray[i]/255) * vCanvas.height;
                vCtx.fillRect(i*6, vCanvas.height-h, 4, h);
            }
        }
    }
    renderer.render(scene, camera);
}

document.getElementById('share-dna-btn').onclick = generatePoster;
document.getElementById('close-popup').onclick = () => document.getElementById('dna-card-popup').style.display='none';

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

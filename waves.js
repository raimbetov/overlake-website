class SubtleWaves {
    constructor() {
        this.canvas = document.getElementById('waveCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.waves = [];

        this.setupCanvas();
        this.createWaves();
        this.animate();

        window.addEventListener('resize', () => this.setupCanvas());
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    createWaves() {
        this.waves = [
            {
                amplitude: 1.5,
                frequency: 0.006,
                speed: 0.002,
                offset: 0,
                color: 'rgba(65, 173, 255, 0.12)' // Water.css --links color
            },
            {
                amplitude: 1,
                frequency: 0.009,
                speed: 0.0035,
                offset: Math.PI / 3,
                color: 'rgba(82, 105, 128, 0.08)' // Water.css --border color
            },
            {
                amplitude: 0.8,
                frequency: 0.012,
                speed: 0.005,
                offset: Math.PI / 2,
                color: 'rgba(255, 190, 133, 0.06)' // Water.css --code color
            }
        ];
    }

    drawWave(wave) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = wave.color;
        this.ctx.lineWidth = 1;

        for (let x = 0; x <= this.width; x += 4) {
            const y = this.height * 0.5 +
                     Math.sin(x * wave.frequency + this.time * wave.speed + wave.offset) * wave.amplitude +
                     Math.sin(x * wave.frequency * 0.5 + this.time * wave.speed * 0.7 + wave.offset) * wave.amplitude * 0.5;

            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        this.ctx.stroke();
    }

    drawVerticalWaves() {
        this.waves.forEach((wave, index) => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 0.5;

            for (let y = 0; y <= this.height; y += 8) {
                const x = this.width * 0.2 +
                         Math.sin(y * wave.frequency * 1.5 + this.time * wave.speed * 1.2 + wave.offset) * wave.amplitude * 0.8;

                if (y === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }

            this.ctx.stroke();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.waves.forEach(wave => this.drawWave(wave));
        this.drawVerticalWaves();

        this.time += 0.02;
        requestAnimationFrame(() => this.animate());
    }
}

window.addEventListener('load', () => {
    new SubtleWaves();
});

import * as p5 from 'p5';

// inspired by Disco Grid
// from Patt Vira

export const sketch = (p: p5) => {
    let sizes: number[][] = [];
    let cols: number; let rows: number; let size = 10;
    let xoff = 0; let yoff = 0; let inc = 0.1;
    let zoff = 0;
    let colors: p5.Color[] = [];

    p.setup = () => {
        p.createCanvas(640, 480);
        cols = p.width / size;
        rows = p.height / size;
        colors = [
            p.color(135, 169, 204), // blue
            p.color(171, 194, 219), // light blue
            p.color(255,255,255), // white
            p.color(204, 170, 135), // light brown
            p.color(192, 149, 105), // brown
        ]
        p.rectMode(p.CENTER);
    }

    p.draw = () => {
        p.background(220);
        xoff = 1;
        for (let i = 0; i < cols; i++) {
            sizes[i] = [];
            yoff = 0;
            for (let j = 0; j < rows; j++) {
                sizes[i][j] = p.map(p.noise(xoff, yoff, zoff), 0, 1, 0, size * 1.7);
                yoff += inc;
                const theSize = sizes[i][j];
                const colorIndex = Math.floor(p.map(theSize, 0, size * 1.7, 0, 5));
                p.fill(colors[colorIndex]);
                p.noStroke();
                p.rect(size / 2 + i * size, size / 2 + j * size, theSize, theSize);
            }
            xoff += inc;
            zoff += 0.00001;
        }
    }
}

export const myp5 = new p5(sketch, document.body);
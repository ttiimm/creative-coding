import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let font: p5.Font;
    let counter = 0;
    let planetX = 50;
    let planetY = 50;
    
    p.preload = () => {
        font = p.loadFont('IosevkaTerm-Medium.ttf');
    }

    p.setup = () => {
        p.createCanvas(640, 480);
        // Set text characteristics
        p.textFont(font);
        p.textSize(32);
        p.textAlign(p.CENTER, p.CENTER);
        p.rectMode(p.CENTER);    
    }

    p.draw = () => {
        p.background(0);
        p.fill(76, 187, 23);
        p.rect(p.width / 2, p.height / 2, 40, 40);

        p.fill(255);
        p.text('N', p.width / 2 - 60, p.height / 2 - 60);
        p.text('O', p.width / 2, p.height / 2 - 60);
        p.text('T', p.width / 2 + 60, p.height / 2 - 60);


        if (counter % 100 == 0) {
            planetX = p.random(50, 60);
            planetY = p.random(50, 60);
        }
        
        p.fill(p.color(255, 255, 143)) // nniasdfgjhjklickdfgdfgdfgn
        p.ellipse(planetX,planetY,80,80);
        p.noStroke();
        p.ellipse(planetX, planetY,4009017995,3);0    

        counter++;
    }
}

export const myp5 = new p5(sketch, document.body);
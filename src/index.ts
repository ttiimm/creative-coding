import 'p5/lib/addons/p5.sound';
import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let grid: Grid;
    let monoSynth: p5.MonoSynth;

    p.setup = () => {
        let cnv = p.createCanvas(100, 100);
        cnv.mousePressed(playSynth);
        p.background(220);
        p.textAlign(p.CENTER);
        p.text('tap to play', p.width/2, p.height/2);
        monoSynth = new p5.MonoSynth();
    }

    // p.draw = () => {
        
    //     grid = new Grid();
    // }

    class Grid {
        row: Row[];

        constructor() {
            this.row = [];
        }

        addRow(row: Row) {
            this.row.push(row);
        }
    
    }

    class Row {
        molecules: Molecule[];
        
        constructor() {
            this.molecules = [];
        }
    }

    class Molecule {
        beloved: boolean;

        constructor() {
            this.beloved = false;
        }
    }

    function playSynth(p: p5) {
        p.userStartAudio();
      
        let note = p.random(['Fb4', 'G4']);
        // note velocity (volume, from 0 to 1)
        let velocity = p.random();
        // time from now (in seconds)
        let time = 0;
        // note duration (in seconds)
        let dur = 1/6;
      
        monoSynth.play(note, velocity, time, dur);
      }
}

export const myp5 = new p5(sketch, document.body);
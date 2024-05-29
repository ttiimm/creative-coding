import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let grid: Grid;

    p.setup = () => {
        p.createCanvas(640, 480);
        grid = new Grid();
        grid.addRow(new Row());
        grid.addPreviousRow();
    }

    p.draw = () => {
        p.background(0, 0, 0);
        grid.display();
    }

    class Grid {
        row: Row[];
        width: number;
        height: number;
        m_width: number;
        p: p5;

        constructor() {
            this.row = [];
            this.width = p.width;
            this.height = p.height;
            this.m_width = this.width / 12;
        }

        addRow(row: Row) {
            this.row.push(row);
        }

        addPreviousRow() {
            this.row.push(new Row(this.row[0].molecules));
        }

        display() {
            for (let y = 0; y < this.row.length; y++) {
                const r = this.row[y];
                for (let x = 0; x < r.molecules.length; x++) {
                    const m = r.molecules[x];
                    if (m.beloved) {
                        p.fill(255, 0, 0);
                    } else {
                        p.fill(255);
                    }
                    p.rect(x * this.m_width, y * this.m_width, this.m_width, this.m_width);
                }
            }
        }
    
    }

    class Row {
        LENGTH: number = 12;
        molecules: Molecule[];
        ruleset: Ruleset;
        
        constructor(previous: Molecule[] = []) {
            this.ruleset = new Ruleset();
            if (previous.length === 0) {
                this.molecules = [];
                for (let i = 0; i < this.LENGTH; i++) {
                    this.molecules.push(new Molecule(p.random([true, false])));
                }
            } else {
                this.molecules = [];
                for (let i = 0; i < this.LENGTH; i++) {
                    const left = previous[];
                    const above;
                    const right;
                }
                
            }
        }
    }

    class Molecule {
        beloved: boolean;

        constructor(isBeloved: boolean = true) {
            this.beloved = isBeloved;
        }
    }

    class Ruleset {
        rules: boolean[];

        constructor() {
            this.rules = [];
            for (let i = 0; i < 8; i++) {
                this.rules.push(Math.random() < 0.5);
            }
        }

        getRule(index: number): boolean {
            return this.rules[index];
        }
    }
}

export const myp5 = new p5(sketch, document.body);
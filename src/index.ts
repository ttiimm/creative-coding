import * as p5 from 'p5';

export const sketch = (p: p5) => {
    let grid: Grid;

    p.setup = () => {
        p.createCanvas(640, 480);
        grid = new Grid();
    }

    p.draw = () => {
        p.background(0, 0, 0);
        grid.display();
    }

    class Grid {
        rows: Row[];
        m_width: number;
        p: p5;
        ruleset: Ruleset;

        constructor() {
            this.ruleset = new Ruleset();
            this.rows = [];
            this.addRow();
            this.addRow();
            this.m_width = p.width / 12;
        }

        addRow() {
            let prevRow = this.rows.at(-1)
            let newRow = new Row(this.ruleset, prevRow)
            this.rows.push(newRow);
        }

        display() {
            for (let y = 0; y < this.rows.length; y++) {
                const r = this.rows[y];
                for (let x = 0; x < r.molecules.length; x++) {
                    const m = r.molecules[x];
                    if (m.beloved) {
                        p.fill(255, 0, 0);
                    } else {
                        p.fill(255);
                    }
                    p.rect(x * this.m_width, y * this.m_width, this.m_width, this.m_width);
                    console.log("x:", x, "y:", y)
                }
            }
        }
    
    }

    class Row {
        LENGTH: number = 12;
        molecules: Molecule[];
        [rowidx: number]: Molecule | undefined;
        
        constructor(ruleset: Ruleset, previous: Row) {
            if (previous === undefined) {
                this.molecules = [];
                for (let i = 0; i < this.LENGTH; i++) {
                    this.molecules.push(new Molecule(p.random([true, false])));
                }
            } else {
                this.molecules = [];
                for (let i = 0; i < this.LENGTH; i++) {
                    const left = i > 0 ? previous[i - 1] : previous[this.LENGTH];
                    console.log(left)
                    const above = previous[i];
                    const right = i < this.LENGTH - 2 ? previous[i + 1] : previous[0];
                    let rulesetIdx = 
                        (left ? 4 : 0) +
                        (above ? 2 : 0) +
                        (right ? 1 : 0);
                    let newMolecule = new Molecule(ruleset[rulesetIdx]);
                    this.molecules.push(newMolecule);
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
        [rowidx: number]: boolean | undefined;


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

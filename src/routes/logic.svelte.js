export class GradeCalculator {
    inputString = $state('');

    grades = $derived.by(() => {
        return this.inputString.split(/[\s,]+/)
            .map(n => parseFloat(n))
            .filter(n => !isNaN(n) && n >= 1 && n <= 10);
    });

    // Derived: Stats
    sum = $derived(this.grades.reduce((a, b) => a + b, 0));
    count = $derived(this.grades.length);
    avg = $derived(this.count > 0 ? this.sum / this.count : 0);
    rounded = $derived(Math.round(this.avg));

    scenarios = $derived.by(() => {
        if (this.count === 0) return [];
        let results = [];
        for (let g = 1; g <= 10; g++) {
            const newAvg = (this.sum + g) / (this.count + 1);
            const newRounded = Math.round(newAvg);
            let type = newRounded > this.rounded ? 'jump' :
                       (newRounded === this.rounded ? 'maintain' : 'drop');
            results.push({ grade: g, newAvg, newRounded, type });
        }
        return results;
    });

    lowValue = $derived(this.scenarios.find(s => s.newRounded >= this.rounded));
    highValue = $derived(this.scenarios.find(s => s.type === 'jump'));

    tensToTen = $derived(Math.ceil(2 * this.count * (9.5 - this.avg)));
    tensNewAvg = $derived((this.tensToTen * 10 + this.sum) / (this.tensToTen + this.count));
}

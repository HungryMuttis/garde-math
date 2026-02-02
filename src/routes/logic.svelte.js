export class GradeCalculator {
    inputString = $state('');

    grades = $derived.by(() => {
        return this.inputString.split(/[\s,]+/)
            .map(n => parseFloat(n))
            .filter(n => !isNaN(n) && n >= 1 && n <= 10);
    });

    // Derived: Stats
    currentSum = $derived(this.grades.reduce((a, b) => a + b, 0));
    currentCount = $derived(this.grades.length);
    currentAvg = $derived(this.currentCount > 0 ? this.currentSum / this.currentCount : 0);
    currentRounded = $derived(Math.round(this.currentAvg));

    scenarios = $derived.by(() => {
        if (this.currentCount === 0) return [];
        let results = [];
        for (let g = 1; g <= 10; g++) {
            const newAvg = (this.currentSum + g) / (this.currentCount + 1);
            const newRounded = Math.round(newAvg);
            let type = newRounded > this.currentRounded ? 'jump' : 
                       (newRounded === this.currentRounded ? 'maintain' : 'drop');
            results.push({ grade: g, newAvg, newRounded, type });
        }
        return results;
    });

    lowValue = $derived(this.scenarios.find(s => s.newRounded >= this.currentRounded));
    highValue = $derived(this.scenarios.find(s => s.type === 'jump'));
}

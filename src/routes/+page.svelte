<script>
    import { GradeCalculator } from './logic.svelte.js';
    import './styles.css';

    const calc = new GradeCalculator();
</script>

<div class="container">
    <main>
        <h1>Grade Calculator</h1>
        
        <div class="input-section">
            <label for="grades">Enter grades (1-10):</label>
            <input 
                id="grades" 
                type="text" 
                bind:value={calc.inputString} 
                placeholder="e.g. 8 9 10 5" 
                autocomplete="off"
            />
        </div>

        {#if calc.grades.length > 0}
            <div class="stats-card current">
                <h2>Current Status</h2>
                <div class="stat-row">
                    <span>Average:</span>
                    <strong>{calc.currentAvg.toFixed(2)}</strong>
                </div>
                <div class="stat-row">
                    <span>Grade:</span>
                    <strong class="highlight">{calc.currentRounded}</strong>
                </div>
            </div>

            <div class="results-grid">
                <div class="stats-card maintain">
                    <h3>Minimum to Keep Grade</h3>
                    {#if calc.lowValue}
                        <div class="stat-row">
                            <span>Need to get:</span>
                            <strong class="highlight">{calc.lowValue.grade}</strong>
                        </div>
                        <div class="stat-row">
                            <span>New Average:</span>
                            <strong>{calc.lowValue.newAvg.toFixed(2)}</strong>
                        </div>
                        <p class="subtext">
                            Resulting Grade: {calc.lowValue.newRounded}
                        </p>
                    {:else}
                        <p>Even a 10 will cause a drop.</p>
                    {/if}
                </div>

                <div class="stats-card jump">
                    <h3>Minimum to Jump Up</h3>
                    {#if calc.highValue}
                        <div class="stat-row">
                            <span>Need to get:</span>
                            <strong class="highlight">{calc.highValue.grade}</strong>
                        </div>
                        <div class="stat-row">
                            <span>New Average:</span>
                            <strong>{calc.highValue.newAvg.toFixed(2)}</strong>
                        </div>
                        <p class="subtext">
                            Resulting Grade: {calc.highValue.newRounded}
                        </p>
                    {:else}
                        <p>A jump is not possible with one grade.</p>
                    {/if}
                </div>
            </div>

            <div class="details">
                <h3>All Possibilities</h3>
                <div class="tags">
                    {#each calc.scenarios as s}
                        <div class="tag {s.type}">
                            <span class="grade-badge">{s.grade}</span>
                            <span class="arrow">→</span>
                            <span class="outcome">{s.newRounded}</span>
                            <span class="avg">({s.newAvg.toFixed(2)})</span>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </main>
</div>

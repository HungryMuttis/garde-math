<script>
    import { GradeCalculator } from './logic.svelte.js';
    import './styles.css';
    import Display from '$lib/components/Display.svelte';

    const calc = new GradeCalculator();
</script>

<div class="container">
    <main>
        <h1>Pažyminatorius</h1>
        
        <div class="input-section">
            <input 
                id="grades" 
                type="text" 
                bind:value={calc.inputString} 
                placeholder="10 10 9 2 10 9" 
                autocomplete="off"
            />
        </div>

        {#if calc.grades.length > 0}
            <div class="stats-card current">
                <Display grade="{calc.rounded}" avg="{calc.avg.toFixed(2)}" />
            </div>

            <div class="results-grid">
                <div class="stats-card maintain">
                    <h3>Nenusileisti</h3>
                    {#if calc.lowValue}
                        <Display grade="{calc.lowValue.grade}" avg="{calc.lowValue.newAvg.toFixed(2)}" />
                    {:else}
                        <p>Netgi 10 numes. (Kaip taip sugebėti?)</p>
                    {/if}
                </div>

                <div class="stats-card jump">
                    <h3>Pakilti</h3>
                    {#if calc.highValue}
                        <Display grade="{calc.highValue.grade}" avg="{calc.highValue.newAvg.toFixed(2)}" />
                    {:else}
                        {#if calc.rounded == 10}
                            <p>Apseisi</p>
                        {:else}
                            <p>Niekaip :/</p>
                        {/if}
                    {/if}
                </div>
            </div>

            <div class="details">
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

            {#if calc.rounded < 10 && calc.tensToTen > 1}
                <div class="stats-card tensToTen">
                    <h3>Dešimtukų iki Dešimt</h3>
                    <Display grade="10(x{calc.tensToTen})" avg="{calc.tensNewAvg.toFixed(2)}" />
                </div>
            {/if}
        {/if}
    </main>
</div>

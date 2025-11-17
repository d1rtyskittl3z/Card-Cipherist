/**
 * Automated Performance Test Scenarios
 * Run in browser console to collect baseline metrics
 *
 * Usage:
 *   Copy this entire file and paste into browser console
 *   Then run: await runAllScenarios()
 */

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Scenario 1: Initial Load
 * Measures cold start and first render performance
 */
async function scenario1_InitialLoad() {
  console.log('\n📊 Scenario 1: Initial Load\n');

  // The app is already loaded, so just wait for renders to settle
  await sleep(2000);

  __perf.summary();

  const metrics = __perfMonitor.getReport();
  return {
    scenario: 'Initial Load',
    metrics: metrics.metrics,
    memory: metrics.memoryUsage,
  };
}

/**
 * Scenario 2: Frame Selection
 * Measures frame pack switching performance
 */
async function scenario2_FrameSelection() {
  console.log('\n📊 Scenario 2: Frame Selection\n');
  console.log('⚠️  MANUAL STEP REQUIRED:');
  console.log('1. Click "Frame" tab');
  console.log('2. Click on 5 different frame packs');
  console.log('3. Wait 2 seconds');
  console.log('4. Press Enter to continue...\n');

  __perf.clear();
  __perf.start('frame-selection');

  // Wait for user to perform actions
  await new Promise(resolve => {
    const handler = (e) => {
      if (e.key === 'Enter') {
        window.removeEventListener('keypress', handler);
        resolve();
      }
    };
    window.addEventListener('keypress', handler);
  });

  __perf.end('frame-selection');

  const metrics = __perfMonitor.getReport();
  return {
    scenario: 'Frame Selection',
    metrics: metrics.metrics,
    memory: metrics.memoryUsage,
  };
}

/**
 * Scenario 3: Text Editing
 * Measures text input responsiveness
 */
async function scenario3_TextEditing() {
  console.log('\n📊 Scenario 3: Text Editing\n');
  console.log('⚠️  MANUAL STEP REQUIRED:');
  console.log('1. Click "Text" tab');
  console.log('2. Type "Lightning Bolt" in title field');
  console.log('3. Change font size slider');
  console.log('4. Wait 2 seconds');
  console.log('5. Press Enter to continue...\n');

  __perf.clear();
  __perf.start('text-editing');

  // Wait for user to perform actions
  await new Promise(resolve => {
    const handler = (e) => {
      if (e.key === 'Enter') {
        window.removeEventListener('keypress', handler);
        resolve();
      }
    };
    window.addEventListener('keypress', handler);
  });

  __perf.end('text-editing');

  const metrics = __perfMonitor.getReport();
  return {
    scenario: 'Text Editing',
    metrics: metrics.metrics,
    memory: metrics.memoryUsage,
  };
}

/**
 * Scenario 4: Art Manipulation
 * Measures slider performance with art adjustments
 */
async function scenario4_ArtManipulation() {
  console.log('\n📊 Scenario 4: Art Manipulation\n');
  console.log('⚠️  MANUAL STEP REQUIRED:');
  console.log('1. Click "Art" tab');
  console.log('2. Upload an image (or use existing art)');
  console.log('3. Adjust X Position slider (5-10 movements)');
  console.log('4. Adjust Y Position slider (5-10 movements)');
  console.log('5. Adjust Zoom slider (5-10 movements)');
  console.log('6. Wait 2 seconds');
  console.log('7. Press Enter to continue...\n');

  __perf.clear();
  __perf.start('art-manipulation');

  // Wait for user to perform actions
  await new Promise(resolve => {
    const handler = (e) => {
      if (e.key === 'Enter') {
        window.removeEventListener('keypress', handler);
        resolve();
      }
    };
    window.addEventListener('keypress', handler);
  });

  __perf.end('art-manipulation');

  const metrics = __perfMonitor.getReport();
  return {
    scenario: 'Art Manipulation',
    metrics: metrics.metrics,
    memory: metrics.memoryUsage,
  };
}

/**
 * Scenario 5: Rapid Slider Adjustments
 * Stress test - measures frame rate under load
 */
async function scenario5_RapidSliders() {
  console.log('\n📊 Scenario 5: Rapid Slider Adjustments (Stress Test)\n');
  console.log('⚠️  MANUAL STEP REQUIRED:');
  console.log('1. Stay on "Art" tab');
  console.log('2. Rapidly drag the X Position slider back and forth');
  console.log('3. Continue for 10 seconds');
  console.log('4. Wait 2 seconds');
  console.log('5. Press Enter to continue...\n');

  __perf.clear();
  __perf.start('rapid-sliders');

  // Wait for user to perform actions
  await new Promise(resolve => {
    const handler = (e) => {
      if (e.key === 'Enter') {
        window.removeEventListener('keypress', handler);
        resolve();
      }
    };
    window.addEventListener('keypress', handler);
  });

  __perf.end('rapid-sliders');

  // Check performance budget
  console.log('\n');
  __perf.budget();

  const metrics = __perfMonitor.getReport();
  return {
    scenario: 'Rapid Sliders',
    metrics: metrics.metrics,
    memory: metrics.memoryUsage,
  };
}

/**
 * Run all scenarios sequentially
 */
async function runAllScenarios() {
  console.clear();
  console.log('═══════════════════════════════════════════════════════');
  console.log('   🎯 Card Cipherist - Baseline Performance Testing');
  console.log('═══════════════════════════════════════════════════════\n');

  const results = [];

  try {
    // Scenario 1: Initial Load
    results.push(await scenario1_InitialLoad());

    // Scenario 2: Frame Selection
    results.push(await scenario2_FrameSelection());

    // Scenario 3: Text Editing
    results.push(await scenario3_TextEditing());

    // Scenario 4: Art Manipulation
    results.push(await scenario4_ArtManipulation());

    // Scenario 5: Rapid Sliders
    results.push(await scenario5_RapidSliders());

    // Generate summary
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('   ✅ All Scenarios Complete!');
    console.log('═══════════════════════════════════════════════════════\n');

    // Export results
    window.__baselineResults = results;

    console.log('📊 Results Summary:\n');
    generateSummaryReport(results);

    console.log('\n\n💾 Data saved to: window.__baselineResults');
    console.log('📋 To export: copy(JSON.stringify(__baselineResults, null, 2))');

    return results;

  } catch (error) {
    console.error('❌ Error running scenarios:', error);
    return results;
  }
}

/**
 * Generate a summary report from all scenarios
 */
function generateSummaryReport(results) {
  console.group('📈 Performance Summary by Scenario');

  results.forEach(result => {
    console.log(`\n${result.scenario}:`);

    // Canvas metrics
    const canvasMetrics = Object.entries(result.metrics)
      .filter(([name]) => name.startsWith('canvas:'))
      .sort(([, a], [, b]) => b.averageDuration - a.averageDuration);

    if (canvasMetrics.length > 0) {
      console.log('  Canvas Operations:');
      canvasMetrics.slice(0, 5).forEach(([name, metrics]) => {
        const status = metrics.averageDuration < 16 ? '✅' : '⚠️';
        console.log(`    ${status} ${name}: ${metrics.averageDuration.toFixed(2)}ms avg (${metrics.count}x)`);
      });
    }

    // Component renders
    const componentMetrics = Object.entries(result.metrics)
      .filter(([name]) => name.startsWith('profiler:'))
      .sort(([, a], [, b]) => b.count - a.count);

    if (componentMetrics.length > 0) {
      console.log('  Component Renders:');
      componentMetrics.slice(0, 3).forEach(([name, metrics]) => {
        console.log(`    ${name}: ${metrics.count}x renders, ${metrics.averageDuration.toFixed(2)}ms avg`);
      });
    }

    // Memory
    if (result.memory) {
      console.log(`  Memory: ${(result.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB used`);
    }
  });

  console.groupEnd();
}

/**
 * Quick test for just canvas rendering
 */
async function quickCanvasTest() {
  console.log('🎨 Quick Canvas Rendering Test\n');
  console.log('Adjust any slider 5-10 times, then press Enter...\n');

  __perf.clear();

  await new Promise(resolve => {
    const handler = (e) => {
      if (e.key === 'Enter') {
        window.removeEventListener('keypress', handler);
        resolve();
      }
    };
    window.addEventListener('keypress', handler);
  });

  __perf.summary();
  __perf.budget();
}

// Make functions globally available
window.runAllScenarios = runAllScenarios;
window.quickCanvasTest = quickCanvasTest;

console.log('✅ Test scenarios loaded!\n');
console.log('Commands:');
console.log('  await runAllScenarios()  - Run all 5 test scenarios');
console.log('  await quickCanvasTest()  - Quick canvas performance test');
console.log('\nReady to start testing!');

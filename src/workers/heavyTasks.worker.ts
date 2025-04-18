// Web Worker for handling heavy computations
self.onmessage = function(e) {
  const { type, data } = e.data;

  switch (type) {
    case 'PROCESS_LARGE_DATA':
      const results = processLargeDataSet(data);
      self.postMessage({ type: 'PROCESS_COMPLETE', results });
      break;

    case 'CALCULATE_SAVINGS':
      const savings = calculateSavings(data);
      self.postMessage({ type: 'SAVINGS_CALCULATED', savings });
      break;

    default:
      console.error('Unknown task type:', type);
  }
};

// Process large datasets in chunks
function processLargeDataSet(items: any[]) {
  const chunkSize = 50;
  const results = [];
  
  // Process in smaller chunks to avoid memory issues
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const processedChunk = chunk.map(processItem);
    results.push(...processedChunk);
    
    // Free up memory after each chunk
    if (i % (chunkSize * 4) === 0) {
      setTimeout(() => {}, 0); // Yield to main thread
    }
  }
  
  return results;
}

// Process individual items
function processItem(item: any) {
  // Add your item processing logic here
  return item;
}

// Calculate savings based on input data with optimized memory usage
function calculateSavings(data: { 
  windowCount: number;
  replacementCost: number;
  repairCost: number;
}) {
  const { windowCount, replacementCost, repairCost } = data;
  
  // Break down calculations into smaller steps
  const totalReplacementCost = calculateTotal(windowCount, replacementCost);
  const totalRepairCost = calculateTotal(windowCount, repairCost);
  const savings = totalReplacementCost - totalRepairCost;
  const roi = calculateROI(savings, totalRepairCost);
  
  return {
    totalReplacementCost,
    totalRepairCost,
    savings,
    roi: roi.toFixed(2)
  };
}

// Helper functions to break down calculations
function calculateTotal(count: number, cost: number): number {
  return count * cost;
}

function calculateROI(savings: number, cost: number): number {
  return (savings / cost) * 100;
} 
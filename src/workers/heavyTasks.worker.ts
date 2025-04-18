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
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const processedChunk = chunk.map(processItem);
    results.push(...processedChunk);
  }
  
  return results;
}

// Process individual items
function processItem(item: any) {
  // Add your processing logic here
  return {
    ...item,
    processed: true,
    timestamp: Date.now()
  };
}

// Calculate savings based on input data
function calculateSavings(data: { 
  windowCount: number;
  replacementCost: number;
  repairCost: number;
}) {
  const { windowCount, replacementCost, repairCost } = data;
  
  // Simulate complex calculation
  const totalReplacementCost = windowCount * replacementCost;
  const totalRepairCost = windowCount * repairCost;
  const savings = totalReplacementCost - totalRepairCost;
  
  return {
    totalReplacementCost,
    totalRepairCost,
    savings,
    roi: ((savings / totalRepairCost) * 100).toFixed(2)
  };
} 
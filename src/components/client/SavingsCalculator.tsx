'use client';

import { useState, useEffect, useCallback } from 'react';

type WindowIssue = {
  type: string;
  replacementCost: number;
  repairCost: number;
};

type SavingsResult = {
  totalReplacementCost: number;
  totalRepairCost: number;
  savings: number;
  roi: string;
};

const commonIssues: WindowIssue[] = [
  { type: 'Foggy Glass', replacementCost: 800, repairCost: 250 },
  { type: 'Broken Hardware', replacementCost: 600, repairCost: 150 },
  { type: 'Damaged Screen', replacementCost: 400, repairCost: 75 },
  { type: 'Failed Seal', replacementCost: 700, repairCost: 200 },
];

export default function SavingsCalculator() {
  const [selectedIssue, setSelectedIssue] = useState<WindowIssue | null>(null);
  const [windowCount, setWindowCount] = useState(1);
  const [calculationResult, setCalculationResult] = useState<SavingsResult | null>(null);
  const [worker, setWorker] = useState<Worker | null>(null);

  // Initialize Web Worker
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newWorker = new Worker('/workers/heavyTasks.worker.js');
      newWorker.onmessage = (e) => {
        if (e.data.type === 'SAVINGS_CALCULATED') {
          setCalculationResult(e.data.savings);
        }
      };
      setWorker(newWorker);

      return () => {
        newWorker.terminate();
      };
    }
  }, []);

  // Calculate savings using Web Worker
  const calculateSavings = useCallback(() => {
    if (!selectedIssue || !worker) return;

    worker.postMessage({
      type: 'CALCULATE_SAVINGS',
      data: {
        windowCount,
        replacementCost: selectedIssue.replacementCost,
        repairCost: selectedIssue.repairCost
      }
    });
  }, [selectedIssue, windowCount, worker]);

  // Trigger calculation when inputs change
  useEffect(() => {
    calculateSavings();
  }, [calculateSavings]);

  return (
    <section id="savings-calculator" className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Calculate Your Savings</h2>
          <p className="mt-4 text-lg text-gray-600">
            See how much you can save by choosing repair over replacement
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">
                Select Window Issue
              </label>
              <select
                id="issueType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => {
                  const issue = commonIssues.find((i) => i.type === e.target.value);
                  setSelectedIssue(issue || null);
                }}
                value={selectedIssue?.type || ''}
              >
                <option value="">Choose an issue</option>
                {commonIssues.map((issue) => (
                  <option key={issue.type} value={issue.type}>
                    {issue.type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="windowCount" className="block text-sm font-medium text-gray-700">
                Number of Windows
              </label>
              <input
                type="number"
                id="windowCount"
                min="1"
                value={windowCount}
                onChange={(e) => setWindowCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {selectedIssue && calculationResult && (
              <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Your Potential Savings</h3>
                <dl className="mt-4 space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Replacement Cost</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculationResult.totalReplacementCost.toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Repair Cost</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${calculationResult.totalRepairCost.toLocaleString()}
                    </dd>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <dt className="text-base font-medium text-gray-900">Total Savings</dt>
                      <dd className="text-base font-medium text-green-600">
                        ${calculationResult.savings.toLocaleString()}
                      </dd>
                    </div>
                    <div className="flex justify-between mt-2">
                      <dt className="text-sm text-gray-600">Return on Investment</dt>
                      <dd className="text-sm font-medium text-blue-600">{calculationResult.roi}%</dd>
                    </div>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

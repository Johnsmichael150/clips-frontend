// MetricsCards.tsx
import React from "react";

interface Metrics {
  clipsToday: number | string;
  viralAccuracy: number | string;
  avgSyncTime: number | string;
}

const metrics: Metrics = {
  clipsToday: "4.8k",
  viralAccuracy: "98%",
  avgSyncTime: "2.1s",
};

const cardData = [
  { label: "CLIPS TODAY", value: metrics.clipsToday },
  { label: "VIRAL ACCURACY", value: metrics.viralAccuracy },
  { label: "AVG SYNC TIME", value: metrics.avgSyncTime },
];

export default function MetricsCards() {
  return (
    <div className="w-full max-w-3xl mx-auto px-2 pb-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ minHeight: 82 }}>
        {cardData.map((card) => (
          <div
            key={card.label}
            className="flex flex-col items-center justify-center"
            style={{
              width: 288,
              height: 82,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#262626',
              background: '#14141480',
              padding: 16,
              boxSizing: 'border-box',
            }}
          >
            <div className="font-black text-2xl leading-8 text-white text-center">{card.value}</div>
            <div className="text-xs font-semibold text-zinc-400 tracking-wide uppercase text-center mt-1">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

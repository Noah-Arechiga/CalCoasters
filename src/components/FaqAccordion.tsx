'use client';

import { useState } from 'react';

// src/components/FaqAccordion.tsx

// Purpose: Allow the user to see some FAQs they might have while exploring
// the project, while handling which tab is open

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} className="card">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left"
            >
              <span className="text-xl font-display">{item.question}</span>
              <span className={`font-mono text-royal text-xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            {isOpen && (
              <p className="font-body text-sm text-navy-950/70 mt-3 leading-relaxed">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
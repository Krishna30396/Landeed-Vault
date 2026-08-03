'use client';

import { CATEGORIES } from '@/lib/categories';
import styles from './CategoryChips.module.css';

export default function CategoryChips({ selected, onToggle }) {
  return (
    <div className={styles.row} role="group" aria-label="Place categories">
      {CATEGORIES.map((c) => {
        const on = selected.includes(c.id);
        return (
          <button
            key={c.id}
            type="button"
            className={on ? styles.chipOn : styles.chip}
            aria-pressed={on}
            onClick={() => onToggle(c.id)}
          >
            <span className={styles.dot} style={{ background: c.color }} aria-hidden="true" />
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

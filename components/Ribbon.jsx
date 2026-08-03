'use client';

import { useEffect, useState } from 'react';
import styles from './Ribbon.module.css';

const fmt = (km) => (km >= 100 ? km.toFixed(0) : km.toFixed(1));

/**
 * The signature element. A hairline rule between two hollow circles; a filled
 * magenta diamond at the true proportional position of the meeting point.
 * Equal halves → diamond dead centre → the graphic IS the fairness claim.
 */
export default function Ribbon({ aName, bName, distA, distB, offRouteKm = 0 }) {
  const total = distA + distB;
  const fraction = total > 0 ? distA / total : 0.5;
  const offCentreKm = Math.abs(distA - distB) / 2;

  // Animate the diamond sliding into place on first calculation, ONCE —
  // after it settles the transition is removed so later hub/route changes snap.
  const [animated, setAnimated] = useState(false);
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (total > 0 && !animated) {
      const t = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(t);
    }
  }, [total, animated]);
  useEffect(() => {
    if (animated && !settled) {
      const t = setTimeout(() => setSettled(true), 650);
      return () => clearTimeout(t);
    }
  }, [animated, settled]);

  if (!total) return null;

  return (
    <div className={styles.ribbon} aria-label={`Distance split: ${fmt(distA)} km and ${fmt(distB)} km`}>
      <div className={styles.track}>
        <span className={styles.rule} />
        <span className={styles.end} style={{ left: 0 }} />
        <span className={styles.end} style={{ right: 0 }} />
        <span
          className={animated && !settled ? styles.diamondIn : styles.diamond}
          style={{ left: `${(animated ? fraction : 0.5) * 100}%` }}
        />
      </div>
      <div className={styles.labels}>
        <span className={styles.name}>{aName}</span>
        <span className={styles.name} style={{ textAlign: 'right' }}>{bName}</span>
      </div>
      <div className={styles.distances}>
        <span>{fmt(distA)}&thinsp;km</span>
        <span>{fmt(distB)}&thinsp;km</span>
      </div>
      {offCentreKm >= 0.1 && (
        <div className={styles.drift}>
          hub is {fmt(offCentreKm)}&thinsp;km off centre
          {offRouteKm >= 1 && ` · ${fmt(offRouteKm)} km off the route`}
        </div>
      )}
    </div>
  );
}

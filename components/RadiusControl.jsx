'use client';

import styles from './RadiusControl.module.css';

export default function RadiusControl({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor="radius">
        Radius
      </label>
      <input
        id="radius"
        className={styles.slider}
        type="range"
        min="1"
        max="25"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className={styles.value}>{value}&thinsp;km</span>
    </div>
  );
}

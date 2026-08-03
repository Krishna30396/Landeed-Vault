'use client';

import PlaceCard from './PlaceCard';
import styles from './ResultsList.module.css';

export default function ResultsList({
  places,
  hub,
  loading,
  error,
  activePlaceId,
  onHover,
  onSelect,
  onWidenRadius,
  canWiden,
}) {
  if (loading) {
    return <div className={styles.state}>Finding places…</div>;
  }
  if (error) {
    return <div className={styles.stateError}>{error}</div>;
  }
  if (!places) return null;
  if (!places.length) {
    // Empty is not an error: nothing here — offer the fix as a button.
    return (
      <div className={styles.state}>
        Nothing here in this radius.
        {canWiden && (
          <button type="button" className={styles.widen} onClick={onWidenRadius}>
            Try a bigger radius
          </button>
        )}
      </div>
    );
  }

  return (
    <ul className={styles.list} aria-label={`${places.length} places found`}>
      {places.map((p) => (
        <PlaceCard
          key={p.id}
          place={p}
          hub={hub}
          active={p.id === activePlaceId}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

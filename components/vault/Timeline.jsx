import s from './Timeline.module.css';

export default function Timeline({ groups, className = '' }) {
  return (
    <div className={`${s.timeline} ${className}`}>
      {groups.map((group, gi) => (
        <div key={gi} className={s.group}>
          <div className={s.groupLabel}>{group.label}</div>
          {group.items.map((item, i) => (
            <div key={i} className={s.item}>
              <span className={`${s.dot} ${item.color ? s[`dot${item.color[0].toUpperCase()}${item.color.slice(1)}`] : ''}`} />
              <div className={s.content}>
                <div className={s.text}>{item.text}</div>
                {item.time && <div className={s.time}>{item.time}</div>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

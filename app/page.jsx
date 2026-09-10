'use client';
import s from './dashboard.module.css';
import Header from '@/components/vault/Header';
import Button from '@/components/vault/Button';
import { IconPlus, IconChevronRight, IconMapPin, IconHome } from '@/components/vault/Icons';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Good morning', emoji: '\u{1F324}️' };
  if (h < 17) return { text: 'Good afternoon', emoji: '☀️' };
  return { text: 'Good evening', emoji: '\u{1F319}' };
}

const PROPERTIES = [
  {
    id: 1,
    name: 'Green Meadows Apartment',
    location: 'Hyderabad, Telangana',
    status: 'all-good',
    statusLabel: 'All good',
    checked: 'Checked today',
    image: '/properties/apartment.jpg',
    gradient: 'linear-gradient(135deg, #6B8F6B 0%, #8FAF7F 40%, #A5C99E 100%)',
  },
  {
    id: 2,
    name: 'Family Land',
    location: 'Warangal, Telangana',
    status: 'needs-attention',
    statusLabel: 'Needs attention',
    checked: 'Checked 2 days ago',
    image: '/properties/family-land.jpg',
    gradient: 'linear-gradient(135deg, #7BA17B 0%, #9DBF8F 40%, #C5DEB0 100%)',
  },
  {
    id: 3,
    name: 'Lakeview Plot',
    location: 'Bengaluru, Karnataka',
    status: 'check-needed',
    statusLabel: 'Check needed',
    checked: 'Last checked 8 months ago',
    image: '/properties/plot.jpg',
    gradient: 'linear-gradient(135deg, #6A9FB5 0%, #89B5C7 40%, #B0D4E0 100%)',
  },
];

const STATUS_STYLES = {
  'all-good':        { dot: 'statusDotGreen', label: 'statusGreen' },
  'needs-attention':  { dot: 'statusDotRed',   label: 'statusRed' },
  'check-needed':     { dot: 'statusDotAmber', label: 'statusAmber' },
  'missing-info':     { dot: 'statusDotGray',  label: 'statusGray' },
  'couldnt-check':    { dot: 'statusDotGray',  label: 'statusGray' },
};

export default function DashboardPage() {
  const greeting = getGreeting();

  return (
    <div className={s.page}>
      <Header showSearch hasNotifications userInitials="K" />

      <main className={s.main}>
        {/* ── Greeting ──────────────────────────── */}
        <section className={s.greeting}>
          <div className={s.greetingLeft}>
            <h1 className={s.greetingTitle}>
              {greeting.text}, Krishna {greeting.emoji}
            </h1>
            <p className={s.greetingSub}>
              Here's the latest on your properties.
            </p>
          </div>
          <div className={s.greetingRight}>
            <Button icon={IconPlus}>Add property</Button>
            <span className={s.greetingHint}>
              Add a property and let Vault keep an eye on it.
            </span>
          </div>
        </section>

        {/* ── Attention Banner ──────────────────── */}
        <div className={s.attention}>
          <div className={s.attentionImage}>
            <img src="/properties/family-land.jpg" alt="Family Land" />
          </div>
          <div className={s.attentionBody}>
            <div className={s.attentionLabel}>Needs your attention</div>
            <div className={s.attentionTitle}>Family Land</div>
            <div className={s.attentionLocation}>Warangal, Telangana</div>
            <div className={s.attentionDesc}>
              We found a new property record in government data.
            </div>
          </div>
          <div className={s.attentionAction}>
            <button className={s.reviewBtn}>
              Review now
              <span className={s.reviewArrow}>&rarr;</span>
            </button>
          </div>
        </div>

        {/* ── Property Grid ─────────────────────── */}
        <section>
          <div className={s.propertiesHeader}>
            <div className={s.propertiesTitle}>
              <h2 className={s.propertiesTitleText}>Your properties</h2>
              <span className={s.propertyCount}>{PROPERTIES.length}</span>
            </div>
            <div className={s.sortControl}>
              <span>Sort by</span>
              <select className={s.sortSelect} defaultValue="last-updated" aria-label="Sort properties">
                <option value="last-updated">Last updated</option>
                <option value="name">Name</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          <div className={s.cardGrid}>
            {PROPERTIES.map((prop) => {
              const st = STATUS_STYLES[prop.status];
              return (
                <a key={prop.id} href={`/property/${prop.id}`} className={s.card}>
                  <div className={s.cardImageWrap}>
                    <div
                      className={s.cardImagePlaceholder}
                      style={{ background: prop.gradient }}
                    >
                      <IconHome size={36} style={{ opacity: 0.25, color: '#fff' }} />
                    </div>
                    {prop.image && (
                      <img
                        src={prop.image}
                        alt={prop.name}
                        className={s.cardImage}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                    <button
                      className={s.cardMenu}
                      aria-label={`More options for ${prop.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      &middot;&middot;&middot;
                    </button>
                  </div>
                  <div className={s.cardBody}>
                    <div className={s.cardName}>{prop.name}</div>
                    <div className={s.cardLocation}>
                      <IconMapPin size={14} />
                      {prop.location}
                    </div>
                    <div className={s.cardFooter}>
                      <div>
                        <div className={s.cardStatusRow}>
                          <span className={`${s.statusDot} ${s[st.dot]}`} />
                          <span className={`${s.cardStatusLabel} ${s[st.label]}`}>{prop.statusLabel}</span>
                        </div>
                        <div className={s.cardChecked}>{prop.checked}</div>
                      </div>
                      <span className={s.cardChevron}>
                        <IconChevronRight size={18} />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ── Add Property CTA ──────────────────── */}
        <section className={s.addCta}>
          <div className={s.addCtaLeft}>
            <span className={s.addCtaLabel}>A safer tomorrow</span>
            <h2 className={s.addCtaTitle}>Add another property</h2>
            <p className={s.addCtaDesc}>
              Keep all your properties in one place. We'll check for updates
              and let you know if anything needs your attention.
            </p>
            <div>
              <Button icon={IconPlus}>Add property</Button>
            </div>
          </div>
          <div className={s.addCtaRight}>
            <div className={s.addCtaImagePlaceholder}>
              <span className={s.handwrittenText}>
                Your properties,<br />looked after.
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

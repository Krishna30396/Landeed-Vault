'use client';
import { useState } from 'react';
import s from './dashboard.module.css';
import Header from '@/components/vault/Header';
import Button from '@/components/vault/Button';
import {
  IconPlus,
  IconChevronRight,
  IconMapPin,
  IconHome,
  IconBuilding,
  IconLeaf,
  IconLandPlot,
  IconCalendar,
  IconExclamation,
  IconFileText,
  IconX,
} from '@/components/vault/Icons';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Good morning', emoji: '\u{1F324}️' };
  if (h < 17) return { text: 'Good afternoon', emoji: '☀️' };
  return { text: 'Good evening', emoji: '\u{1F319}' };
}

const PROPERTIES = [
  {
    id: 1,
    name: 'Green Meadows',
    type: 'Apartment',
    location: 'Hyderabad, Telangana',
    status: 'all-good',
    statusLabel: 'All good',
    checked: 'Checked today',
    docs: { ok: true },
    image: '/properties/apartment.jpg',
    gradient: 'linear-gradient(135deg, #6B8F6B 0%, #8FAF7F 40%, #A5C99E 100%)',
  },
  {
    id: 2,
    name: 'Family Land',
    type: 'Agricultural Land',
    location: 'Warangal, Telangana',
    status: 'needs-attention',
    statusLabel: 'Needs attention',
    checked: 'Checked 2 days ago',
    docs: {
      tone: 'danger',
      title: 'Property tax receipt needs an update',
      action: 'Upload the latest receipt',
    },
    image: '/properties/family-land.jpg',
    gradient: 'linear-gradient(135deg, #7BA17B 0%, #9DBF8F 40%, #C5DEB0 100%)',
  },
  {
    id: 3,
    name: 'Lakeview Plot',
    type: 'Residential Plot',
    location: 'Bengaluru, Karnataka',
    status: 'check-needed',
    statusLabel: 'Check needed',
    checked: 'Last checked 8 months ago',
    docs: {
      tone: 'warning',
      title: 'Encumbrance certificate is outdated',
      action: 'Upload the latest document',
    },
    image: '/properties/plot.jpg',
    gradient: 'linear-gradient(135deg, #6A9FB5 0%, #89B5C7 40%, #B0D4E0 100%)',
  },
];

const STATUS_PILL = {
  'all-good':        'pillGood',
  'needs-attention': 'pillRed',
  'check-needed':    'pillAmber',
  'missing-info':    'pillGray',
  'couldnt-check':   'pillGray',
};

const TYPE_ICON = {
  'Apartment': IconBuilding,
  'Agricultural Land': IconLeaf,
  'Residential Plot': IconLandPlot,
};

export default function DashboardPage() {
  const greeting = getGreeting();
  const [attentionDismissed, setAttentionDismissed] = useState(false);
  const attentionCount = PROPERTIES.filter((p) => p.status === 'needs-attention').length;

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
            <Button icon={IconPlus} size="sm" className={s.greetingAddBtn}>Add property</Button>
            <span className={s.greetingHint}>
              Add a property and let Vault keep an eye on it.
            </span>
          </div>
        </section>

        {/* ── Attention Banner ──────────────────── */}
        {attentionCount > 0 && !attentionDismissed && (
          <div className={s.attention} role="status">
            <div className={s.attentionIcon}>
              <IconExclamation size={20} />
            </div>
            <div className={s.attentionBody}>
              <div className={s.attentionTitle}>
                {attentionCount} {attentionCount === 1 ? 'property needs' : 'properties need'} your attention
              </div>
              <div className={s.attentionDesc}>
                We found a new property record in government data.
              </div>
            </div>
            <button className={s.attentionReviewBtn}>
              Review now
              <span aria-hidden="true">&rarr;</span>
            </button>
            <button
              className={s.attentionDismiss}
              aria-label="Dismiss notification"
              onClick={() => setAttentionDismissed(true)}
            >
              <IconX size={16} />
            </button>
          </div>
        )}

        {/* ── Property Grid ─────────────────────── */}
        <section>
          <div className={s.propertiesHeader}>
            <div className={s.propertiesTitle}>
              <h2 className={s.propertiesTitleText}>Your properties</h2>
              <span className={s.propertyCount}>{PROPERTIES.length}</span>
            </div>
            <div className={s.sortControl}>
              <span className={s.sortLabel}>Sort by</span>
              <select className={s.sortSelect} defaultValue="last-activity" aria-label="Sort properties">
                <option value="last-activity">Last activity</option>
                <option value="name">Property name</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          <div className={s.cardGrid}>
            {PROPERTIES.map((prop) => {
              const pillClass = STATUS_PILL[prop.status];
              const TypeIcon = TYPE_ICON[prop.type] || IconHome;
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
                    {prop.type && (
                      <span className={s.cardTypeChip}>
                        <TypeIcon size={13} />
                        {prop.type}
                      </span>
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

                    <div className={s.cardStatusArea}>
                      {prop.docs?.ok ? (
                        <>
                          <span className={`${s.cardStatusPill} ${s[pillClass]}`}>
                            <span className={s.cardStatusDot} />
                            {prop.statusLabel}
                          </span>
                          <div className={s.cardDocRow}>
                            <IconFileText size={15} />
                            <span className={s.cardDocRowText}>All documents up to date</span>
                            <IconChevronRight size={16} className={s.cardDocChevron} />
                          </div>
                        </>
                      ) : (
                        <div
                          className={`${s.cardDocCallout} ${
                            prop.docs.tone === 'danger' ? s.calloutDanger : s.calloutWarning
                          }`}
                        >
                          <span className={s.cardDocIcon}>
                            <IconFileText size={16} />
                          </span>
                          <div className={s.cardDocText}>
                            <div className={s.cardDocTitle}>{prop.docs.title}</div>
                            <div className={s.cardDocAction}>
                              {prop.docs.action}
                              <span aria-hidden="true"> &rarr;</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={s.cardChecked}>
                      <IconCalendar size={13} />
                      <span className={s.cardCheckedText}>{prop.checked}</span>
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

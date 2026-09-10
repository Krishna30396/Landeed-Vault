'use client';
import { useState } from 'react';
import s from './property.module.css';
import Header from '@/components/vault/Header';
import {
  IconChevronRight,
  IconChevronDown,
  IconMapPin,
  IconHome,
  IconFile,
  IconEdit,
  IconAlertTriangle,
  IconCheckCircle,
  IconShield,
  IconActivity,
  IconRefresh,
} from '@/components/vault/Icons';

const PROPERTIES = {
  1: {
    name: 'Green Meadows Apartment',
    type: 'Residential Apartment',
    location: 'Hyderabad, Telangana',
    surveyNo: '123/A',
    area: '1,200 sq ft',
    propertyType: 'Apartment',
    status: 'all-good',
    tags: ['Owned', '1,200 sq ft', 'Unit 4B'],
    gradient: 'linear-gradient(135deg, #6B8F6B 0%, #8FAF7F 40%, #A5C99E 100%)',
  },
  2: {
    name: 'Family Land',
    type: 'Agricultural Land',
    location: 'Warangal, Telangana',
    surveyNo: '48/2',
    area: '2.4 acres',
    propertyType: 'Agricultural land',
    status: 'needs-attention',
    tags: ['Owned', '2.4 acres', 'Survey No. 48/2'],
    gradient: 'linear-gradient(135deg, #5a8f3c 0%, #7ab356 30%, #95c76e 50%, #a8d580 70%, #6b9f4a 100%)',
    handwritten: 'Our family\nland for\ngenerations',
    alert: {
      title: 'We found a newer property record.',
      desc: 'Your saved EC is from 2014. A newer record was registered in July 2025.',
      action: 'Review what changed',
    },
  },
  3: {
    name: 'Lakeview Plot',
    type: 'Residential Plot',
    location: 'Bengaluru, Karnataka',
    surveyNo: '56/1',
    area: '2,400 sq ft',
    propertyType: 'Residential plot',
    status: 'check-needed',
    tags: ['Owned', '2,400 sq ft', 'Survey No. 56/1'],
    gradient: 'linear-gradient(135deg, #6A9FB5 0%, #89B5C7 40%, #B0D4E0 100%)',
  },
};

const DOCUMENTS = [
  { name: 'Sale deed', date: 'Added on 12 Jan 2023', status: 'added' },
  { name: 'Encumbrance Certificate (EC)', date: 'Added on 29 Mar 2024', status: 'added' },
  { name: 'Property tax receipt', date: 'Added on 30 Apr 2024', status: 'needs-update' },
  { name: 'Pattay / Pahani', date: 'As on 6 Feb 2023', status: 'added' },
  { name: 'Other document', date: 'No document added', status: 'add' },
];

const CHECKS = [
  { name: 'Government records', result: 'No new changes', time: 'Today', variant: 'green' },
  { name: 'Prohibited land status (22A)', result: 'No issues found', time: 'Today', variant: 'green' },
  { name: 'Property records', result: 'available', time: '', variant: 'green' },
  { name: 'Satellite monitoring', result: 'No changes detected', time: '10 days ago', variant: 'green' },
];

const ACTIVITY = [
  { title: 'New property record found', desc: 'A newer record in this area was found in government data.', date: '18 Aug 2025', dot: 'red' },
  { title: 'Vault checked government records', desc: 'No new issues found.', date: '18 Aug 2025', dot: 'green' },
  { title: 'Property tax receipt added', desc: 'Document added to your vault.', date: '', dot: 'green' },
];

const TAB_LIST = ['Overview', 'Documents', 'Government records', 'Activity'];

export default function PropertyPage({ params }) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState('Overview');
  const property = PROPERTIES[id] || PROPERTIES[2];

  return (
    <div className={s.page}>
      <Header showSearch hasNotifications userInitials="K" />

      <main className={s.main}>
        {/* ── Sub-header ──────────────────────── */}
        <div className={s.subHeader}>
          <a href="/" className={s.backLink}>
            <IconChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            Back to your properties
          </a>
          <button className={s.editBtn}>
            <IconEdit size={16} />
            Edit property
          </button>
        </div>

        {/* ── Hero ────────────────────────────── */}
        <div className={s.hero}>
          <div className={s.heroImagePlaceholder} style={{ background: property.gradient }} />
          <div className={s.heroOverlay} />
          <div className={s.heroContent}>
            <div className={s.heroLeft}>
              <div className={s.heroType}>{property.type}</div>
              <h1 className={s.heroTitle}>{property.name}</h1>
              <div className={s.heroLocation}>{property.location}</div>
              <div className={s.heroTags}>
                {property.tags.map((tag) => (
                  <span key={tag} className={s.heroTag}>{tag}</span>
                ))}
              </div>
            </div>
            {property.handwritten && (
              <div className={s.heroRight}>
                <div className={s.heroHandwritten}>
                  {property.handwritten.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Alert Banner ────────────────────── */}
        {property.alert && (
          <div className={s.alertBanner}>
            <div className={s.alertIcon}>
              <IconAlertTriangle size={24} />
            </div>
            <div className={s.alertBody}>
              <div className={s.alertLabel}>Needs your attention</div>
              <div className={s.alertTitle}>{property.alert.title}</div>
              <div className={s.alertDesc}>{property.alert.desc}</div>
            </div>
            <div className={s.alertAction}>
              <button className={s.alertBtn}>
                {property.alert.action}
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Tabs ────────────────────────────── */}
        <div className={s.tabs}>
          {TAB_LIST.map((tab) => (
            <button
              key={tab}
              className={`${s.tab} ${activeTab === tab ? s.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── About this property ─────────────── */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>About this property</h2>
            <button className={s.sectionAction}>
              <IconEdit size={14} /> Edit
            </button>
          </div>
          <div className={s.aboutGrid}>
            <div className={s.aboutItem}>
              <div className={s.aboutIcon}><IconMapPin size={18} /></div>
              <div className={s.aboutLabel}>Location</div>
              <div className={s.aboutValue}>{property.location}</div>
            </div>
            <div className={s.aboutItem}>
              <div className={s.aboutIcon}><IconFile size={18} /></div>
              <div className={s.aboutLabel}>Survey number</div>
              <div className={s.aboutValue}>{property.surveyNo}</div>
            </div>
            <div className={s.aboutItem}>
              <div className={s.aboutIcon}><IconHome size={18} /></div>
              <div className={s.aboutLabel}>Area</div>
              <div className={s.aboutValue}>{property.area}</div>
            </div>
            <div className={s.aboutItem}>
              <div className={s.aboutIcon}><IconShield size={18} /></div>
              <div className={s.aboutLabel}>Property type</div>
              <div className={s.aboutValue}>{property.propertyType}</div>
            </div>
          </div>
        </div>

        {/* ── Documents ───────────────────────── */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>
              Your documents <span className={s.sectionCount}>{DOCUMENTS.filter(d => d.status === 'added').length}</span>
            </h2>
            <button className={s.sectionAction}>+ Add document</button>
          </div>
          <div className={s.docList}>
            {DOCUMENTS.map((doc) => (
              <div key={doc.name} className={s.docRow}>
                <div className={s.docIcon}><IconFile size={18} /></div>
                <div className={s.docInfo}>
                  <div className={s.docName}>{doc.name}</div>
                  <div className={s.docDate}>{doc.date}</div>
                </div>
                <span className={
                  doc.status === 'added' ? s.docStatusAdded :
                  doc.status === 'needs-update' ? s.docStatusNeedsUpdate :
                  s.docStatusAdd
                }>
                  {doc.status === 'added' ? 'Added' :
                   doc.status === 'needs-update' ? 'Needs update' : 'Add'}
                </span>
                <span className={s.docChevron}><IconChevronRight size={16} /></span>
              </div>
            ))}
          </div>
        </div>

        {/* ── What Vault checked ──────────────── */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>What Vault checked</h2>
            <a href="#" className={s.sectionLink}>
              See all checks <IconChevronRight size={14} />
            </a>
          </div>
          <div className={s.checksGrid}>
            {CHECKS.map((check) => (
              <div key={check.name} className={s.checkCard}>
                <div className={`${s.checkIcon} ${check.variant === 'green' ? s.checkIconGreen : s.checkIconAmber}`}>
                  {check.variant === 'green' ? <IconCheckCircle size={18} /> : <IconAlertTriangle size={18} />}
                </div>
                <div className={s.checkName}>{check.name}</div>
                <div className={s.checkResult}>{check.result}</div>
                {check.time && <div className={s.checkTime}>{check.time}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent activity ─────────────────── */}
        <div className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>Recent activity</h2>
            <a href="#" className={s.sectionLink}>
              See all activity <IconChevronRight size={14} />
            </a>
          </div>
          <div className={s.activityList}>
            {ACTIVITY.map((item, i) => (
              <div key={i} className={s.activityRow}>
                <div className={`${s.activityDot} ${item.dot === 'red' ? s.activityDotRed : s.activityDotGreen}`} />
                <div className={s.activityBody}>
                  <div className={s.activityTitle}>{item.title}</div>
                  <div className={s.activityDesc}>{item.desc}</div>
                </div>
                {item.date && <div className={s.activityDate}>{item.date}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ──────────────────────── */}
        <div className={s.bottomCta}>
          <div className={s.bottomCtaLeft}>
            <div className={s.bottomCtaTitle}>We're on your side</div>
            <div className={s.bottomCtaDesc}>
              Vault keeps checking your property records so you can have peace of mind.
            </div>
          </div>
          <a href="#" className={s.bottomCtaLink}>
            Learn how it works <span>&rarr;</span>
          </a>
        </div>
      </main>
    </div>
  );
}

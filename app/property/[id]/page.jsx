'use client';
import { useState, useEffect, useRef } from 'react';
import s from './property.module.css';
import Header from '@/components/vault/Header';
import Button from '@/components/vault/Button';
import Modal from '@/components/vault/Modal';
import {
  IconChevronRight,
  IconMapPin,
  IconHome,
  IconFile,
  IconEdit,
  IconAlertTriangle,
  IconAlertCircle,
  IconInfo,
  IconCheckCircle,
  IconShield,
  IconUpload,
  IconUploadCloud,
  IconSearch,
  IconSparkle,
  IconPlus,
  IconX,
  IconMoreHorizontal,
  IconCalendar,
  IconDownload,
  IconExternalLink,
  IconHeadphones,
  IconFileText,
  IconExclamation,
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
    image: '/properties/apartment.jpg',
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
    image: '/properties/family-land.jpg',
    gradient: 'linear-gradient(135deg, #5a8f3c 0%, #7ab356 30%, #95c76e 50%, #a8d580 70%, #6b9f4a 100%)',
    handwritten: 'Our family\nland for\ngenerations',
    alert: {
      title: 'We found a newer property record.',
      desc: 'Your saved EC is from 2024. A new record was registered in July 2025.',
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
    image: '/properties/plot.jpg',
    gradient: 'linear-gradient(135deg, #6A9FB5 0%, #89B5C7 40%, #B0D4E0 100%)',
  },
};

const DOCUMENTS = [
  { name: 'Sale deed', desc: 'Proof of ownership', category: 'Ownership', date: 'Added on 12 Jan 2023', status: 'added' },
  { name: 'Encumbrance Certificate (EC)', desc: 'Shows if there are any loans or liabilities', category: 'Legal', date: 'Added on 29 Mar 2024', status: 'added' },
  {
    name: 'Property tax receipt',
    desc: 'Latest property tax payment',
    category: 'Tax',
    date: 'Added on 10 Apr 2023',
    status: 'needs-update',
    update: {
      heading: 'Property tax receipt needs an update',
      subtext: 'A newer property tax record (2025) is available for this property.',
      before: { kind: 'Property tax receipt', headline: '2023', meta: 'Saved in Vault' },
      after: { kind: 'Property tax record', headline: '2025', meta: 'Available now' },
      uploadTitle: 'Add the latest receipt',
      uploadDesc: 'Upload the 2025 property tax receipt to keep your records up to date.',
      help: {
        title: 'Need help finding it?',
        desc: 'Terra can look it up from government records for you.',
      },
    },
  },
  { name: 'Pattay / Pahani', desc: 'Land ownership record (Telangana)', category: 'Land record', date: 'Added on 6 Feb 2023', status: 'added' },
  { name: 'Mutation certificate', desc: 'Shows latest ownership changes', category: 'Legal', date: null, status: 'missing' },
];

const CHECKS = [
  { name: 'Government records', result: 'No new changes', time: 'Today', variant: 'green' },
  { name: 'Prohibited land status (22A)', result: 'No issues found', time: 'Today', variant: 'green' },
  { name: 'Property records', result: 'available', time: '', variant: 'green' },
  { name: 'Satellite monitoring', result: 'No changes detected', time: '10 days ago', variant: 'green' },
];

const OVERVIEW_ACTIVITY = [
  { title: 'New property record found', desc: 'A newer record in this area was found in government data.', date: '18 Aug 2025', dot: 'red' },
  { title: 'Vault checked government records', desc: 'No new issues found.', date: '18 Aug 2025', dot: 'green' },
  { title: 'Property tax receipt added', desc: 'Document added to your vault.', date: '', dot: 'green' },
];

const DOC_ACTIVITY = [
  { title: 'Property tax receipt marked as needing update', desc: 'We found a newer government record that may affect this document.', date: '26 Aug 2025', dot: 'red' },
  { title: 'Encumbrance Certificate added', desc: 'Document added by you.', date: '22 Mar 2024', dot: 'green' },
  { title: 'Sale deed added', desc: 'Document added by you.', date: '12 Jan 2023', dot: 'green' },
];

const GOVT_RECORDS = [
  { name: 'Encumbrance Certificate (EC)', source: 'IGRS Telangana', date: 'Last checked 18 Aug 2025', status: 'up-to-date', desc: 'No new encumbrances found since your last check.' },
  { name: 'Property registration', source: 'Sub-Registrar Office', date: 'Last checked 18 Aug 2025', status: 'new-record', desc: 'A new registration was recorded in July 2025.' },
  { name: 'Land revenue records (Pahani)', source: 'Dharani Portal', date: 'Last checked 15 Aug 2025', status: 'up-to-date', desc: 'Ownership details match your records.' },
  { name: 'Prohibited list (Section 22A)', source: 'Revenue Department', date: 'Last checked 18 Aug 2025', status: 'clear', desc: 'This property is not on the prohibited list.' },
  { name: 'Mutation status', source: 'Tahsildar Office', date: 'Last checked 10 Aug 2025', status: 'up-to-date', desc: 'Mutation records are up to date.' },
  { name: 'RERA registration', source: 'Telangana RERA', date: 'Not applicable', status: 'na', desc: 'RERA applies to under-construction projects only.' },
];

const GOVT_CHECKS_TIMELINE = [
  { title: 'New property registration found', desc: 'A newer registration was recorded at the Sub-Registrar Office. This may affect your EC.', date: '18 Aug 2025', dot: 'red' },
  { title: 'Vault checked all government databases', desc: 'Checked IGRS, Dharani, Revenue Department, and RERA portals.', date: '18 Aug 2025', dot: 'green' },
  { title: 'Prohibited list status cleared', desc: 'Property verified as not on Section 22A prohibited list.', date: '18 Aug 2025', dot: 'green' },
  { title: 'Land revenue records verified', desc: 'Pahani / Dharani records match your ownership details.', date: '15 Aug 2025', dot: 'green' },
];

const GOVT_SOURCES = [
  { name: 'IGRS Telangana', desc: 'Registration & encumbrance records', lastChecked: 'Today' },
  { name: 'Dharani Portal', desc: 'Land ownership & revenue records', lastChecked: 'Today' },
  { name: 'Revenue Department', desc: 'Prohibited land & mutation status', lastChecked: 'Today' },
  { name: 'Telangana RERA', desc: 'Real estate regulatory records', lastChecked: '3 days ago' },
];

const ALL_ACTIVITY = [
  { title: 'New property registration found', desc: 'A newer registration was recorded at the Sub-Registrar Office in July 2025.', date: '18 Aug 2025', dot: 'red', category: 'govt' },
  { title: 'Vault checked all government databases', desc: 'Checked IGRS, Dharani, Revenue Department, and RERA portals. No other issues found.', date: '18 Aug 2025', dot: 'green', category: 'govt' },
  { title: 'Property tax receipt marked as needing update', desc: 'We found a newer government record that may affect this document.', date: '26 Aug 2025', dot: 'red', category: 'documents' },
  { title: 'Satellite monitoring — no changes', desc: 'No physical changes detected on the property in the latest satellite imagery.', date: '15 Aug 2025', dot: 'green', category: 'monitoring' },
  { title: 'Prohibited list check — clear', desc: 'This property is not listed under Section 22A prohibited lands.', date: '18 Aug 2025', dot: 'green', category: 'govt' },
  { title: 'Land revenue records verified', desc: 'Pahani / Dharani ownership details match your records.', date: '15 Aug 2025', dot: 'green', category: 'govt' },
  { title: 'Encumbrance Certificate added', desc: 'Document uploaded by you.', date: '29 Mar 2024', dot: 'green', category: 'documents' },
  { title: 'Property details updated', desc: 'You updated the area and survey number for this property.', date: '15 Mar 2024', dot: 'blue', category: 'property' },
  { title: 'Sale deed added', desc: 'Document uploaded by you.', date: '12 Jan 2023', dot: 'green', category: 'documents' },
  { title: 'Pattay / Pahani added', desc: 'Document uploaded by you.', date: '6 Feb 2023', dot: 'green', category: 'documents' },
  { title: 'Property tax receipt added', desc: 'Document uploaded by you.', date: '10 Apr 2023', dot: 'green', category: 'documents' },
  { title: 'Property added to Vault', desc: 'You added "Family Land" to your Vault. Vault will now monitor this property.', date: '8 Jan 2023', dot: 'green', category: 'property' },
];

const ACTIVITY_FILTERS = [
  { key: 'all', label: 'All activity' },
  { key: 'govt', label: 'Government records' },
  { key: 'documents', label: 'Documents' },
  { key: 'monitoring', label: 'Monitoring' },
  { key: 'property', label: 'Property changes' },
];

const TAB_LIST = ['Documents', 'Overview', 'Government records', 'Activity'];

const DOC_FILTERS = [
  { key: 'all', label: 'All', count: 5 },
  { key: 'added', label: 'Added', count: 3 },
  { key: 'needs-update', label: 'Needs update', count: 1, tone: 'danger' },
  { key: 'missing', label: 'Missing', count: 1, tone: 'warning' },
];

function OverviewTab({ property }) {
  return (
    <>
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
                s.docStatusMissing
              }>
                {doc.status === 'added' ? 'Added' :
                 doc.status === 'needs-update' ? 'Needs update' : 'Missing'}
              </span>
              <span className={s.docChevron}><IconChevronRight size={16} /></span>
            </div>
          ))}
        </div>
      </div>

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

      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>Recent activity</h2>
          <a href="#" className={s.sectionLink}>
            See all activity <IconChevronRight size={14} />
          </a>
        </div>
        <div className={s.activityList}>
          {OVERVIEW_ACTIVITY.map((item, i) => (
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
    </>
  );
}

function DocumentsTab({ onUpdateDoc }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState(null);

  const byFilter = activeFilter === 'all' ? DOCUMENTS : DOCUMENTS.filter((d) => d.status === activeFilter);
  const query = searchQuery.trim().toLowerCase();
  const filtered = query ? byFilter.filter((d) => d.name.toLowerCase().includes(query)) : byFilter;

  return (
    <>
      {/* ── Filters, search, sort ───────────── */}
      <div className={s.docFilters}>
        <div className={s.filterChips}>
          {DOC_FILTERS.map((f) => (
            <button
              key={f.key}
              className={`${s.filterChip} ${activeFilter === f.key ? s.filterChipActive : ''} ${
                f.tone === 'danger' ? s.filterChipDanger : f.tone === 'warning' ? s.filterChipWarning : ''
              }`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.tone === 'danger' && <IconAlertTriangle size={13} />}
              {f.tone === 'warning' && <IconAlertCircle size={13} />}
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        <div className={s.docSearch}>
          <IconSearch size={16} />
          <input
            type="search"
            className={s.docSearchInput}
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search documents"
          />
        </div>

        <div className={s.sortControl}>
          <span className={s.sortLabel}>Sort by</span>
          <select className={s.sortSelect} defaultValue="latest" aria-label="Sort documents">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* ── Document table ─────────────────── */}
      <div className={`${s.section} ${s.docListSection}`}>
        <div className={s.docList}>
          {filtered.map((doc) => (
            <div
              key={doc.name}
              className={`${s.docRowFull} ${doc.status === 'needs-update' ? s.docRowNeedsUpdate : ''}`}
            >
              <div
                className={`${s.docIcon} ${
                  doc.status === 'needs-update' ? s.docIconDanger :
                  doc.status === 'missing' ? s.docIconWarning : ''
                }`}
              >
                <IconFile size={18} />
              </div>
              <div className={s.docInfoFull}>
                <div className={s.docName}>{doc.name}</div>
                <div className={s.docDate}>{doc.desc}</div>
              </div>
              <div className={s.docCategoryCol}>
                <span className={s.docCategoryPill}>{doc.category}</span>
              </div>
              <div className={s.docDateCol}>
                {doc.date ? (
                  <><IconCalendar size={13} /> {doc.date}</>
                ) : (
                  <span className={s.docDateNone}>&mdash;</span>
                )}
              </div>
              <div className={s.docStatusCol}>
                {doc.status === 'added' && (
                  <span className={s.docStatusAdded}>
                    <IconCheckCircle size={14} /> Added
                  </span>
                )}
                {doc.status === 'needs-update' && (
                  <span className={s.docStatusNeedsUpdate}>
                    <IconAlertTriangle size={14} /> Needs update
                  </span>
                )}
                {doc.status === 'missing' && (
                  <span className={s.docStatusMissing}>
                    <IconAlertCircle size={14} /> Missing
                  </span>
                )}
              </div>
              <div className={s.docActionCol}>
                {doc.status === 'added' && (
                  <Button variant="secondary" size="sm" onClick={() => setPreviewDoc(doc)}>View</Button>
                )}
                {doc.status === 'needs-update' && (
                  <Button variant="danger" size="sm" onClick={() => onUpdateDoc(doc)}>Update</Button>
                )}
                {doc.status === 'missing' && (
                  <Button variant="secondary" size="sm" onClick={() => onUpdateDoc(doc)}>Add document</Button>
                )}
              </div>
              <button className={s.docMenuBtn} aria-label={`More options for ${doc.name}`}>
                <IconMoreHorizontal size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Upload area ────────────────────── */}
      <div className={s.uploadArea}>
        <div className={s.uploadIcon}>
          <IconUpload size={28} />
        </div>
        <div className={s.uploadTitle}>Add another document</div>
        <div className={s.uploadDesc}>
          Drag and drop your file here, or <span className={s.uploadLink}>choose a file</span>
        </div>
        <div className={s.uploadMeta}>PDF, JPG or PNG. Max 10 MB</div>
      </div>

      {/* ── Recent updates ─────────────────── */}
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>Recent updates</h2>
          <a href="#" className={s.sectionLink}>
            See all activity <IconChevronRight size={14} />
          </a>
        </div>
        <div className={s.activityList}>
          {DOC_ACTIVITY.map((item, i) => (
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

      {/* ── Bottom CTA ─────────────────────── */}
      <div className={s.bottomCta}>
        <div className={s.bottomCtaLeft}>
          <div className={s.bottomCtaTitle}>We keep your documents safe</div>
          <div className={s.bottomCtaDesc}>
            Your documents are securely stored and only visible to you. We also check for updates
            in government records and let you know if anything needs your attention.
          </div>
        </div>
        <a href="#" className={s.bottomCtaLink}>
          Learn how it works <span>&rarr;</span>
        </a>
      </div>

     <DocumentPreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
    </>
  );
}

function DocumentPreviewContent({ doc }) {
  const yearMatch = doc.date?.match(/\d{4}/);
  const title = yearMatch ? `${doc.name} (${yearMatch[0]})` : doc.name;

  return (
    <>
      <div className={s.pmHeader}>
        <div className={s.pmHeaderIcon}><IconFileText size={20} /></div>
        <div className={s.pmHeaderText}>
          <h2 className={s.pmHeading}>{title}</h2>
          <p className={s.pmSubtext}>We&apos;re unable to show a preview right now</p>
        </div>
      </div>

      <div className={s.pmBody}>
        <div className={s.pmPreviewBox}>
          <div className={s.pmPreviewIconWrap}>
            <IconFile size={32} />
            <span className={s.pmPreviewBadge}>
              <IconExclamation size={13} />
            </span>
          </div>
          <div className={s.pmPreviewTitle}>Preview isn&apos;t available right now</div>
          <p className={s.pmPreviewDesc}>
            You can still download the file to view it.
          </p>
          <Button variant="danger" icon={IconDownload} fullWidth>
            Download document
          </Button>
          <div className={s.pmMeta}>PDF &middot; 2.4 MB</div>
        </div>

        <div className={s.pmInfoBox}>
          <div className={s.pmInfoIcon}><IconInfo size={18} /></div>
          <div>
            <div className={s.pmInfoTitle}>What&apos;s happening?</div>
            <div className={s.pmInfoDesc}>
              We&apos;re facing a temporary issue while generating document previews.
              Our team is working on it, and preview should be available soon.
            </div>
          </div>
        </div>

        <div className={s.pmDivider} />

        <div className={s.pmHelp}>
          <div className={s.pmHelpIcon}><IconHeadphones size={18} /></div>
          <div className={s.pmHelpBody}>
            <div className={s.pmHelpTitle}>Need help?</div>
            <div className={s.pmHelpDesc}>
              Still unable to open the file? You can try again later or contact our support team.
            </div>
          </div>
          <Button variant="secondary" size="sm" iconRight={IconExternalLink}>
            Contact support
          </Button>
        </div>
      </div>
    </>
  );
}

function DocumentPreviewModal({ doc, onClose }) {
  if (!doc) return null;

  return (
    <Modal open={!!doc} onClose={onClose} bare className={s.previewModal}>
      <button className={s.umClose} onClick={onClose} aria-label="Close">
        <IconX size={20} />
      </button>
      <DocumentPreviewContent doc={doc} />
    </Modal>
  );
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function DocumentUpdateModal({ doc, onClose }) {
  const [files, setFiles] = useState([]);
  const [saved, setSaved] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [terraAsked, setTerraAsked] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setFiles([]);
    setSaved(false);
    setDragActive(false);
    setTerraAsked(false);
    setPreviewing(false);
  }, [doc]);

  if (!doc) return null;

  if (previewing) {
    return (
      <Modal open={!!doc} onClose={onClose} bare className={s.updateModal}>
        <button className={s.umClose} onClick={onClose} aria-label="Close">
          <IconX size={20} />
        </button>
        <div className={s.umPreviewBar}>
          <button className={s.umBackBtn} onClick={() => setPreviewing(false)}>
            <IconChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            Back
          </button>
        </div>
        <DocumentPreviewContent doc={doc} />
      </Modal>
    );
  }

  const isAdd = doc.status === 'missing';
  const u = doc.update || {};
  const heading = isAdd
    ? `Add ${doc.name.toLowerCase()}`
    : (u.heading || `${doc.name} needs an update`);
  const subtext = isAdd
    ? 'Add this document so Vault can keep it with your property records.'
    : (u.subtext || 'A newer version of this record is available for this property.');

  const addFiles = (list) => setFiles((prev) => [...prev, ...Array.from(list)]);
  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  return (
    <Modal open={!!doc} onClose={onClose} title={heading} bare className={s.updateModal}>
      <button className={s.umClose} onClick={onClose} aria-label="Close">
        <IconX size={20} />
      </button>

      {saved ? (
        <div className={s.umBody}>
          <div className={s.modalSuccess}>
            <div className={s.modalSuccessIcon}><IconCheckCircle size={30} /></div>
            <div className={s.modalSuccessTitle}>Your document is being added</div>
            <div className={s.modalSuccessDesc}>
              We&apos;re saving &ldquo;{files[0]?.name}&rdquo; to your vault and checking it
              against government records. We&apos;ll let you know once it&apos;s confirmed.
            </div>
            <div className={s.umFooter}>
              <Button onClick={onClose}>Done</Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={s.umHeader}>
            <div className={s.umHeaderIcon}><IconFile size={20} /></div>
            <div>
              <h2 className={s.umHeading}>{heading}</h2>
              <p className={s.umSubtext}>
                <IconInfo size={15} />
                <span>{subtext}</span>
              </p>
            </div>
          </div>

          <div className={s.umBody}>
            {!isAdd && u.before && u.after && (
              <div className={s.umCompare}>
                <div className={`${s.umCard} ${s.umCardOld}`}>
                  <div className={s.umCardMeta}>{u.before.meta}</div>
                  <div className={s.umCardIcon}><IconFile size={16} /></div>
                  <div className={s.umCardKind}>{u.before.kind}</div>
                  <div className={s.umCardHeadline}>{u.before.headline}</div>
                  <Button variant="secondary" size="sm" className={s.umCardBtn} onClick={() => setPreviewing(true)}>View</Button>
                </div>
                <div className={s.umArrow}><IconChevronRight size={20} /></div>
                <div className={`${s.umCard} ${s.umCardNew}`}>
                  <div className={`${s.umCardMeta} ${s.umCardMetaNew}`}>{u.after.meta}</div>
                  <div className={`${s.umCardIcon} ${s.umCardIconNew}`}><IconFile size={16} /></div>
                  <div className={s.umCardKind}>{u.after.kind}</div>
                  <div className={`${s.umCardHeadline} ${s.umCardHeadlineNew}`}>{u.after.headline}</div>
                </div>
              </div>
            )}

            <div className={s.umDivider} />

            <div className={s.umUploadTitle}>{u.uploadTitle || 'Add the latest document'}</div>
            <p className={s.umUploadDesc}>
              {u.uploadDesc || 'Upload the latest version to keep your records up to date.'}
            </p>

            <div
              className={`${s.umDropzone} ${dragActive ? s.umDropzoneActive : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload a document"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
            >
              <div className={s.umDropIcon}><IconUploadCloud size={32} /></div>
              <div className={s.umDropTitle}>Drop your document here</div>
              <div className={s.umDropSub}>or <span className={s.umDropLink}>choose a file</span></div>
              <div className={s.umDropHint}>PDF, JPG or PNG · Max 10 MB</div>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                className={s.umHiddenInput}
                onChange={(e) => { if (e.target.files?.length) addFiles(e.target.files); }}
                tabIndex={-1}
              />
            </div>

            {files.map((file, i) => (
              <div key={i} className={s.umFile}>
                <IconFile size={18} />
                <span className={s.umFileName}>{file.name}</span>
                <span className={s.umFileSize}>{formatSize(file.size)}</span>
                <button
                  className={s.umFileRemove}
                  onClick={(e) => { e.stopPropagation(); setFiles(files.filter((_, idx) => idx !== i)); }}
                  aria-label={`Remove ${file.name}`}
                >
                  <IconX size={16} />
                </button>
              </div>
            ))}

            <div className={s.umOr}>OR</div>

            <div className={s.umHelp}>
              <div className={s.umHelpIcon}>
                {terraAsked ? <IconSparkle size={20} /> : <IconSearch size={18} />}
              </div>
              <div className={s.umHelpBody}>
                <div className={s.umHelpTitle}>
                  {terraAsked ? 'Terra is on it' : (u.help?.title || 'Need help finding it?')}
                </div>
                <div className={s.umHelpDesc}>
                  {terraAsked
                    ? 'Terra is checking government records — we’ll add it here automatically once it’s found.'
                    : (u.help?.desc || 'Terra can look it up from government records for you.')}
                </div>
              </div>
              {!terraAsked && (
                <Button
                  variant="secondary"
                  size="sm"
                  iconRight={IconChevronRight}
                  onClick={() => setTerraAsked(true)}
                >
                  Ask Terra
                </Button>
              )}
            </div>

            {files.length > 0 && (
              <div className={s.umFooter}>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button onClick={() => setSaved(true)}>Save document</Button>
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}

function GovernmentRecordsTab({ property }) {
  return (
    <>
      {/* ── Sources we check ───────────────── */}
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>
            Sources we check <span className={s.sectionCount}>{GOVT_SOURCES.length}</span>
          </h2>
          <a href="#" className={s.sectionLink}>
            How it works <IconChevronRight size={14} />
          </a>
        </div>
        <div className={s.govtSourceGrid}>
          {GOVT_SOURCES.map((src) => (
            <div key={src.name} className={s.govtSourceCard}>
              <div className={`${s.checkIcon} ${s.checkIconGreen}`}>
                <IconCheckCircle size={18} />
              </div>
              <div className={s.govtSourceName}>{src.name}</div>
              <div className={s.govtSourceDesc}>{src.desc}</div>
              <div className={s.govtSourceTime}>Last checked: {src.lastChecked}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Records found ──────────────────── */}
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>
            Records found <span className={s.sectionCount}>{GOVT_RECORDS.length}</span>
          </h2>
        </div>
        <div className={s.docList}>
          {GOVT_RECORDS.map((rec) => (
            <div key={rec.name} className={s.govtRecordRow}>
              <div className={s.govtRecordIcon}>
                {rec.status === 'new-record' ? (
                  <IconAlertTriangle size={18} />
                ) : rec.status === 'na' ? (
                  <IconFile size={18} />
                ) : (
                  <IconCheckCircle size={18} />
                )}
              </div>
              <div className={s.govtRecordInfo}>
                <div className={s.govtRecordName}>{rec.name}</div>
                <div className={s.govtRecordDesc}>{rec.desc}</div>
              </div>
              <div className={s.govtRecordMeta}>
                <div className={s.govtRecordSource}>{rec.source}</div>
                <div className={s.govtRecordDate}>{rec.date}</div>
              </div>
              <span className={s.govtRecordStatus}>
                {rec.status === 'up-to-date' && (
                  <span className={s.govtStatusGreen}>Up to date</span>
                )}
                {rec.status === 'new-record' && (
                  <span className={s.govtStatusAmber}>New record found</span>
                )}
                {rec.status === 'clear' && (
                  <span className={s.govtStatusGreen}>Clear</span>
                )}
                {rec.status === 'na' && (
                  <span className={s.govtStatusMuted}>Not applicable</span>
                )}
              </span>
              <span className={s.docChevron}><IconChevronRight size={16} /></span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Check timeline ─────────────────── */}
      <div className={s.section}>
        <div className={s.sectionHeader}>
          <h2 className={s.sectionTitle}>Check history</h2>
          <a href="#" className={s.sectionLink}>
            See all checks <IconChevronRight size={14} />
          </a>
        </div>
        <div className={s.activityList}>
          {GOVT_CHECKS_TIMELINE.map((item, i) => (
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

      {/* ── Bottom CTA ─────────────────────── */}
      <div className={s.bottomCta}>
        <div className={s.bottomCtaLeft}>
          <div className={s.bottomCtaTitle}>Your property, always monitored</div>
          <div className={s.bottomCtaDesc}>
            Vault checks government records regularly so you never miss an update.
            We'll notify you if anything changes.
          </div>
        </div>
        <a href="#" className={s.bottomCtaLink}>
          Learn how it works <span>&rarr;</span>
        </a>
      </div>
    </>
  );
}

function ActivityTab({ property }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = activeFilter === 'all'
    ? ALL_ACTIVITY
    : ALL_ACTIVITY.filter(a => a.category === activeFilter);

  const grouped = {};
  filtered.forEach((item) => {
    const month = item.date ? item.date.replace(/^\d+\s/, '') : 'Other';
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(item);
  });

  return (
    <>
      {/* ── Filter chips ───────────────────── */}
      <div className={s.docFilters}>
        <div className={s.filterChips}>
          {ACTIVITY_FILTERS.map((f) => (
            <button
              key={f.key}
              className={`${s.filterChip} ${activeFilter === f.key ? s.filterChipActive : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Activity summary cards ─────────── */}
      <div className={s.activitySummaryGrid}>
        <div className={s.activitySummaryCard}>
          <div className={s.activitySummaryNumber}>{ALL_ACTIVITY.length}</div>
          <div className={s.activitySummaryLabel}>Total events</div>
        </div>
        <div className={s.activitySummaryCard}>
          <div className={`${s.activitySummaryNumber} ${s.activitySummaryRed}`}>
            {ALL_ACTIVITY.filter(a => a.dot === 'red').length}
          </div>
          <div className={s.activitySummaryLabel}>Need attention</div>
        </div>
        <div className={s.activitySummaryCard}>
          <div className={`${s.activitySummaryNumber} ${s.activitySummaryGreen}`}>
            {ALL_ACTIVITY.filter(a => a.category === 'govt').length}
          </div>
          <div className={s.activitySummaryLabel}>Govt checks</div>
        </div>
        <div className={s.activitySummaryCard}>
          <div className={s.activitySummaryNumber}>
            {ALL_ACTIVITY.filter(a => a.category === 'documents').length}
          </div>
          <div className={s.activitySummaryLabel}>Document updates</div>
        </div>
      </div>

      {/* ── Grouped timeline ───────────────── */}
      {Object.entries(grouped).map(([month, items]) => (
        <div key={month} className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>{month}</h2>
            <span className={s.activityMonthCount}>{items.length} events</span>
          </div>
          <div className={s.activityList}>
            {items.map((item, i) => (
              <div key={i} className={s.activityRow}>
                <div className={`${s.activityDot} ${
                  item.dot === 'red' ? s.activityDotRed :
                  item.dot === 'blue' ? s.activityDotBlue :
                  s.activityDotGreen
                }`} />
                <div className={s.activityBody}>
                  <div className={s.activityTitle}>{item.title}</div>
                  <div className={s.activityDesc}>{item.desc}</div>
                </div>
                <div className={s.activityMeta}>
                  <div className={s.activityDate}>{item.date}</div>
                  <div className={s.activityCategory}>{
                    item.category === 'govt' ? 'Government' :
                    item.category === 'documents' ? 'Documents' :
                    item.category === 'monitoring' ? 'Monitoring' :
                    'Property'
                  }</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── Bottom CTA ─────────────────────── */}
      <div className={s.bottomCta}>
        <div className={s.bottomCtaLeft}>
          <div className={s.bottomCtaTitle}>Always in the loop</div>
          <div className={s.bottomCtaDesc}>
            Vault tracks every change and check so you have a complete
            history of your property. We'll alert you when something needs attention.
          </div>
        </div>
        <a href="#" className={s.bottomCtaLink}>
          Notification settings <span>&rarr;</span>
        </a>
      </div>
    </>
  );
}

export default function PropertyPage({ params }) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState('Documents');
  const [updateDoc, setUpdateDoc] = useState(null);
  const property = PROPERTIES[id] || PROPERTIES[2];

  return (
    <div className={s.page}>
      <Header showSearch hasNotifications userInitials="K" />

      <main className={s.main}>
        <div className={s.hero}>
          <div className={s.heroMedia}>
            <div
              className={s.heroImagePlaceholder}
              style={property.gradient ? { background: property.gradient } : undefined}
            />
            {property.image && (
              <img
                src={property.image}
                alt={property.name}
                className={s.heroImage}
                loading="eager"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <div className={s.heroShade} />
          </div>

          <div className={s.heroInner}>
            <div className={s.heroScrim} />
            <div className={s.heroTopBar}>
              <a href="/" className={s.backLink}>
                <IconChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                Back to your properties
              </a>
              <div className={s.heroActions}>
                <button className={s.editBtn}>
                  <IconEdit size={16} />
                  Edit property
                </button>
                <button className={s.menuBtn} aria-label="More options">
                  <IconMoreHorizontal size={18} />
                </button>
              </div>
            </div>

            <div className={s.heroContent}>
              <h1 className={s.heroTitle}>{property.name}</h1>
              <div className={s.heroLocation}>
                <IconMapPin size={17} />
                {property.location}
              </div>
              <div className={s.heroPills}>
                <span className={`${s.heroPill} ${
                  property.status === 'all-good' ? s.heroPillGood :
                  property.status === 'needs-attention' ? s.heroPillAttention :
                  s.heroPillCheck
                }`}>
                  <span className={s.heroPillDot} />
                  {property.status === 'all-good' ? 'All good' :
                   property.status === 'needs-attention' ? 'Needs attention' :
                   'Check needed'}
                </span>
                <span className={s.heroPillGlass}>{property.propertyType}</span>
                <span className={s.heroPillGlass}>{property.area}</span>
              </div>
            </div>

            <button className={s.mapBtn}>
              <IconMapPin size={15} />
              View on map
            </button>
          </div>
        </div>

        {property.alert && (
          <div className={s.alertBanner}>
            <div className={s.alertIcon}>
              <IconAlertCircle size={22} />
            </div>
            <div className={s.alertBody}>
              <div className={s.alertLabel}>Needs your attention</div>
              <div className={s.alertTitle}>{property.alert.title}</div>
              <div className={s.alertDesc}>{property.alert.desc}</div>
            </div>
           <div className={s.alertAction}>
            <button
              className={s.alertBtn}
              onClick={() => {
                const taxReceipt = DOCUMENTS.find(
                  (doc) => doc.name === 'Property tax receipt'
                );
                setUpdateDoc(taxReceipt);
              }}
            >
              {property.alert.action}
              <span>&rarr;</span>
            </button>
          </div>
          </div>
        )}

        <div className={s.tabs} role="tablist">
          {TAB_LIST.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`${s.tab} ${activeTab === tab ? s.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div key={activeTab} className={s.tabPanel}>
          {activeTab === 'Overview' && <OverviewTab property={property} />}
          {activeTab === 'Documents' && <DocumentsTab onUpdateDoc={setUpdateDoc} />}
          {activeTab === 'Government records' && <GovernmentRecordsTab property={property} />}
          {activeTab === 'Activity' && <ActivityTab property={property} />}
        </div>

        <DocumentUpdateModal doc={updateDoc} onClose={() => setUpdateDoc(null)} />
      </main>
    </div>
  );
}

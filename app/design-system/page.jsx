'use client';
import { useState } from 'react';
import s from './page.module.css';

import Button from '@/components/vault/Button';
import Badge from '@/components/vault/Badge';
import Input from '@/components/vault/Input';
import Select from '@/components/vault/Select';
import PropertyCard from '@/components/vault/PropertyCard';
import DocumentRow from '@/components/vault/DocumentRow';
import Alert from '@/components/vault/Alert';
import EmptyState from '@/components/vault/EmptyState';
import ErrorState from '@/components/vault/ErrorState';
import Skeleton from '@/components/vault/Skeleton';
import Header from '@/components/vault/Header';
import Tabs from '@/components/vault/Tabs';
import Timeline from '@/components/vault/Timeline';
import Modal from '@/components/vault/Modal';
import { Toast, ToastContainer } from '@/components/vault/Toast';
import FileUpload from '@/components/vault/FileUpload';
import Avatar from '@/components/vault/Avatar';
import {
  IconSearch, IconPlus, IconRefresh, IconChevronRight,
  IconHome, IconFile, IconShield, IconEdit, IconTrash,
  IconCheckCircle, IconAlertTriangle, IconAlertCircle,
} from '@/components/vault/Icons';

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [pillTab, setPillTab] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [showToasts, setShowToasts] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);

  return (
    <div className={s.page}>
      <Header activeNav="properties" hasNotifications userInitials="VL" />

      <main className={s.main}>
        {/* Hero */}
        <div className={s.hero}>
          <h1 className={s.heroTitle}>Vault Design System</h1>
          <p className={s.heroSub}>
            The visual foundation for Vault by Landeed. Every token, component, and pattern
            that future screens will use — built for clarity, trust, and simplicity.
          </p>
        </div>

        {/* ─── COLORS ──────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Colours</h2>
          <p className={s.sectionDesc}>Semantic tokens — not raw hex. Every surface, text, and state colour references a token.</p>

          <div className={s.rowLabel}>Backgrounds &amp; Surfaces</div>
          <div className={s.swatchGrid}>
            {[
              ['var(--color-bg)',             '--color-bg',             'Page background'],
              ['var(--color-surface)',        '--color-surface',        'Card / panel'],
              ['var(--color-surface-subtle)', '--color-surface-subtle', 'Subtle surface'],
            ].map(([bg, v, label]) => (
              <div key={v} className={s.swatch}>
                <div className={s.swatchColor} style={{ background: bg }} />
                <div className={s.swatchLabel}>{label}<span className={s.swatchVar}>{v}</span></div>
              </div>
            ))}
          </div>

          <div className={s.rowLabel} style={{ marginTop: 'var(--space-6)' }}>Brand &amp; Semantic</div>
          <div className={s.swatchGrid}>
            {[
              ['var(--color-brand)',      '--color-brand',      'Brand'],
              ['var(--color-brand-hover)','--color-brand-hover','Brand hover'],
              ['var(--color-brand-subtle)','--color-brand-subtle','Brand subtle'],
              ['var(--color-success)',    '--color-success',    'Success'],
              ['var(--color-success-bg)', '--color-success-bg', 'Success bg'],
              ['var(--color-warning)',    '--color-warning',    'Warning'],
              ['var(--color-warning-bg)', '--color-warning-bg', 'Warning bg'],
              ['var(--color-danger)',     '--color-danger',     'Danger'],
              ['var(--color-danger-bg)',  '--color-danger-bg',  'Danger bg'],
              ['var(--color-info)',       '--color-info',       'Info'],
              ['var(--color-info-bg)',    '--color-info-bg',    'Info bg'],
            ].map(([bg, v, label]) => (
              <div key={v} className={s.swatch}>
                <div className={s.swatchColor} style={{ background: bg }} />
                <div className={s.swatchLabel}>{label}<span className={s.swatchVar}>{v}</span></div>
              </div>
            ))}
          </div>

          <div className={s.rowLabel} style={{ marginTop: 'var(--space-6)' }}>Text &amp; Borders</div>
          <div className={s.swatchGrid}>
            {[
              ['var(--color-text-primary)',   '--color-text-primary',   'Primary text'],
              ['var(--color-text-secondary)', '--color-text-secondary', 'Secondary text'],
              ['var(--color-text-muted)',     '--color-text-muted',     'Muted text'],
              ['var(--color-border)',         '--color-border',         'Border'],
              ['var(--color-border-subtle)',  '--color-border-subtle',  'Border subtle'],
            ].map(([bg, v, label]) => (
              <div key={v} className={s.swatch}>
                <div className={s.swatchColor} style={{ background: bg }} />
                <div className={s.swatchLabel}>{label}<span className={s.swatchVar}>{v}</span></div>
              </div>
            ))}
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── TYPOGRAPHY ──────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Typography</h2>
          <p className={s.sectionDesc}>Inter — optimised for legibility across all sizes. Comfortable for a 40–55 year old user.</p>

          {[
            ['Display',    'var(--text-display)', '36px / 600',  { fontSize: 'var(--text-display)', fontWeight: 600, lineHeight: 1.2 }],
            ['H1',         'var(--text-h1)',      '30px / 600',  { fontSize: 'var(--text-h1)',      fontWeight: 600, lineHeight: 1.25 }],
            ['H2',         'var(--text-h2)',      '24px / 600',  { fontSize: 'var(--text-h2)',      fontWeight: 600, lineHeight: 1.3 }],
            ['H3',         'var(--text-h3)',      '20px / 600',  { fontSize: 'var(--text-h3)',      fontWeight: 600, lineHeight: 1.35 }],
            ['Body Large', 'var(--text-body-lg)', '18px / 400',  { fontSize: 'var(--text-body-lg)', fontWeight: 400, lineHeight: 1.6 }],
            ['Body',       'var(--text-body)',    '16px / 400',  { fontSize: 'var(--text-body)',    fontWeight: 400, lineHeight: 1.6 }],
            ['Body Small', 'var(--text-body-sm)', '14px / 400',  { fontSize: 'var(--text-body-sm)', fontWeight: 400, lineHeight: 1.5 }],
            ['Caption',    'var(--text-caption)', '13px / 400',  { fontSize: 'var(--text-caption)', fontWeight: 400, lineHeight: 1.4 }],
            ['Button',     'var(--text-button)',  '15px / 500',  { fontSize: 'var(--text-button)',  fontWeight: 500, lineHeight: 1 }],
            ['Label',      'var(--text-label)',   '14px / 500',  { fontSize: 'var(--text-label)',   fontWeight: 500, lineHeight: 1 }],
          ].map(([name, token, meta, style]) => (
            <div key={name} className={s.typeRow}>
              <span className={s.typeLabel}>{name}</span>
              <span className={s.typeSample} style={style}>
                Vault watches over your properties.
              </span>
              <span className={s.typeMeta}>{meta}</span>
            </div>
          ))}
        </section>

        <hr className={s.divider} />

        {/* ─── SPACING ─────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Spacing</h2>
          <p className={s.sectionDesc}>A consistent scale from 4px to 80px. Used for padding, margins, and gaps.</p>

          {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80].map((px) => (
            <div key={px} className={s.spacingRow}>
              <span className={s.spacingLabel}>{px}px</span>
              <div className={s.spacingBar} style={{ width: px * 2 }} />
            </div>
          ))}
        </section>

        <hr className={s.divider} />

        {/* ─── BORDER RADIUS ───────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Border Radius</h2>
          <p className={s.sectionDesc}>Small, consistent radius tokens. Pills reserved for status badges and compact filters.</p>

          <div className={s.radiusRow}>
            {[
              ['8px',    'var(--radius-sm)'],
              ['12px',   'var(--radius-md)'],
              ['16px',   'var(--radius-lg)'],
              ['20px',   'var(--radius-xl)'],
              ['Full',   'var(--radius-full)'],
            ].map(([label, r]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div className={s.radiusBox} style={{ borderRadius: r }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── BUTTONS ─────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Buttons</h2>
          <p className={s.sectionDesc}>Action-oriented labels. Primary for the main action, secondary for supporting, tertiary for low-emphasis.</p>

          <div className={s.rowLabel}>Variants</div>
          <div className={s.row}>
            <Button>Add property</Button>
            <Button variant="secondary">Save as draft</Button>
            <Button variant="tertiary">Learn more</Button>
            <Button variant="danger" icon={IconTrash}>Remove property</Button>
            <Button variant="ghost">Cancel</Button>
          </div>

          <div className={s.rowLabel}>Sizes</div>
          <div className={s.row}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>

          <div className={s.rowLabel}>With icons</div>
          <div className={s.row}>
            <Button icon={IconPlus}>Add property</Button>
            <Button variant="secondary" icon={IconRefresh}>Try again</Button>
            <Button variant="tertiary" iconRight={IconChevronRight}>Review what changed</Button>
          </div>

          <div className={s.rowLabel}>States</div>
          <div className={s.row}>
            <Button loading>Adding...</Button>
            <Button disabled>Not available</Button>
            <Button variant="secondary" loading>Checking...</Button>
            <Button variant="secondary" disabled>Disabled</Button>
          </div>

          <div className={s.rowLabel}>Full width</div>
          <div style={{ maxWidth: 360 }}>
            <Button fullWidth icon={IconPlus}>Add your first property</Button>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── INPUTS ──────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Form Inputs</h2>
          <p className={s.sectionDesc}>Large, comfortable inputs with explicit labels. Never placeholder-only.</p>

          <div className={s.inputRow}>
            <Input label="Property name" placeholder="e.g. Family Land" />
            <Input label="Location" placeholder="Warangal, Telangana" icon={IconSearch} />
          </div>
          <div className={s.inputRow} style={{ marginTop: 'var(--space-4)' }}>
            <Input label="Email" placeholder="you@example.com" helper="We'll send property alerts here." />
            <Input label="Survey number" placeholder="123/A" error="This field is required." required />
          </div>
          <div style={{ maxWidth: 600, marginTop: 'var(--space-4)' }}>
            <Input label="Notes" textarea placeholder="Any additional details about this property..." />
          </div>
          <div className={s.inputRow} style={{ marginTop: 'var(--space-4)' }}>
            <Select label="Property type">
              <option value="">Select type...</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Plot</option>
              <option>Agricultural land</option>
              <option>Commercial</option>
            </Select>
            <Select label="State">
              <option value="">Select state...</option>
              <option>Telangana</option>
              <option>Andhra Pradesh</option>
              <option>Karnataka</option>
              <option>Maharashtra</option>
              <option>Tamil Nadu</option>
            </Select>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── STATUS BADGES ───────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Status System</h2>
          <p className={s.sectionDesc}>Human-readable statuses — no numerical health scores. Each status has icon + colour + label.</p>

          <div className={s.row}>
            <Badge status="all-good" dot />
            <Badge status="needs-attention" dot />
            <Badge status="check-needed" dot />
            <Badge status="missing-info" dot />
            <Badge status="couldnt-check" dot />
          </div>

          <div className={s.rowLabel}>Generic semantic badges</div>
          <div className={s.row}>
            <Badge variant="success">Added</Badge>
            <Badge variant="warning">Needs update</Badge>
            <Badge variant="danger">Missing</Badge>
            <Badge variant="info">New</Badge>
            <Badge variant="neutral">Draft</Badge>
          </div>

          <div className={s.rowLabel}>Sizes</div>
          <div className={s.row}>
            <Badge variant="success" size="sm">Small</Badge>
            <Badge variant="success" size="md">Medium</Badge>
            <Badge variant="success" size="lg">Large</Badge>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── ALERTS ──────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Alerts / Attention</h2>
          <p className={s.sectionDesc}>Prominent but not alarming. Status label + headline + explanation + single CTA.</p>

          <div className={s.col} style={{ gap: 'var(--space-5)' }}>
            <Alert
              variant="needs-attention"
              headline="We found a newer property record."
              description="Your saved EC is from 2024. A newer record is now available."
            >
              <Button size="sm" iconRight={IconChevronRight}>Review what changed</Button>
            </Alert>

            <Alert
              variant="check-needed"
              headline="This property hasn't been checked recently."
              description="Vault last checked government records 45 days ago. We'll check again soon."
            />

            <Alert
              variant="missing-info"
              headline="Your latest tax receipt isn't here yet."
              description="Adding your latest property tax receipt helps Vault keep your records complete."
            >
              <Button size="sm" variant="secondary" icon={IconPlus}>Add document</Button>
            </Alert>

            <Alert
              variant="couldnt-check"
              headline="We couldn't check this property right now."
              description="We couldn't reach the relevant records. Your saved documents are safe. We'll try again automatically."
            >
              <Button size="sm" variant="secondary" icon={IconRefresh}>Try again</Button>
            </Alert>

            <Alert
              variant="all-good"
              headline="Your documents are up to date."
              description="Nothing new found. Vault checked government records today."
            />
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── PROPERTY CARDS ──────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Property Cards</h2>
          <p className={s.sectionDesc}>Identity-first cards: name, location, status, one-line explanation. Not data-heavy.</p>

          <div className={s.cardGrid}>
            <PropertyCard
              name="Family Land"
              location="Warangal, Telangana"
              status="needs-attention"
              explanation="A new property record was found."
              lastChecked="Checked 2 days ago"
            />
            <PropertyCard
              name="Jubilee Hills Apartment"
              location="Hyderabad, Telangana"
              status="all-good"
              explanation="All documents are up to date."
              lastChecked="Checked today"
            />
            <PropertyCard
              name="Farmland — Nalgonda"
              location="Nalgonda, Telangana"
              status="check-needed"
              explanation="Hasn't been checked in 45 days."
              lastChecked="Checked 45 days ago"
            />
            <PropertyCard
              name="Chennai Flat"
              location="Anna Nagar, Tamil Nadu"
              status="missing-info"
              explanation="Property tax receipt is missing."
              lastChecked="Checked 5 days ago"
            />
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── DOCUMENT ROWS ───────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Document Rows</h2>
          <p className={s.sectionDesc}>Clean rows inside a surface. Icon + name + date + status + optional action.</p>

          <div className={s.docList}>
            <DocumentRow name="Sale deed" date="Added 12 Jan 2023" status="added" />
            <DocumentRow name="Property tax receipt" date="Added 10 Apr 2023" status="needs-update" actionLabel="Update" onAction={() => {}} />
            <DocumentRow name="Encumbrance Certificate" date="" status="missing" actionLabel="Add document" onAction={() => {}} />
            <DocumentRow name="Pattadar passbook" date="Found 3 Sep 2025" status="new" actionLabel="Review" onAction={() => {}} />
            <DocumentRow name="Mutation record" date="" status="couldnt-fetch" />
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── TABS ────────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Tabs</h2>
          <p className={s.sectionDesc}>Two variants: underline (page-level) and pills (inline segmented control).</p>

          <div className={s.rowLabel}>Underline</div>
          <Tabs
            items={[
              { key: 'overview',  label: 'Overview' },
              { key: 'documents', label: 'Documents' },
              { key: 'activity',  label: 'Activity' },
              { key: 'settings',  label: 'Settings' },
            ]}
            activeKey={activeTab}
            onChange={setActiveTab}
          />

          <div className={s.rowLabel} style={{ marginTop: 'var(--space-8)' }}>Pills</div>
          <Tabs
            variant="pills"
            items={[
              { key: 'all',     label: 'All' },
              { key: 'active',  label: 'Active' },
              { key: 'checked', label: 'Checked' },
            ]}
            activeKey={pillTab}
            onChange={setPillTab}
          />
        </section>

        <hr className={s.divider} />

        {/* ─── TIMELINE ────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Activity Timeline</h2>
          <p className={s.sectionDesc}>Readable activity — not developer logs. Grouped by date, with coloured dots for severity.</p>

          <div className={s.surface} style={{ maxWidth: 540 }}>
            <Timeline groups={[
              {
                label: 'Today',
                items: [
                  { text: 'Vault checked government records.', time: '2:30 pm', color: 'brand' },
                  { text: 'No changes found.', time: '2:31 pm' },
                ],
              },
              {
                label: 'Yesterday',
                items: [
                  { text: 'A newer property record was found.', time: '11:00 am', color: 'danger' },
                  { text: 'Sale deed verified successfully.', time: '10:45 am', color: 'brand' },
                ],
              },
              {
                label: '15 Aug',
                items: [
                  { text: 'Property tax receipt added.', time: '4:15 pm', color: 'brand' },
                ],
              },
            ]} />
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── AVATARS ─────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Avatars</h2>
          <p className={s.sectionDesc}>Initials-based by default. Three sizes.</p>
          <div className={s.row}>
            <Avatar initials="SK" size="sm" />
            <Avatar initials="VL" size="md" />
            <Avatar initials="PR" size="lg" />
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── FILE UPLOAD ─────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>File Upload</h2>
          <p className={s.sectionDesc}>Friendly drag-and-drop with human copy. Shows uploaded files with remove option.</p>

          <div style={{ maxWidth: 540 }}>
            <FileUpload files={uploadFiles} onFilesChange={setUploadFiles} />
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── EMPTY STATE ─────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Empty States</h2>
          <p className={s.sectionDesc}>Explain the value, not just "no data." Always provide a clear next action.</p>

          <div className={s.surface}>
            <EmptyState
              title="Let's look after your properties."
              description="Add your first property and Vault will keep your documents together and let you know when something needs your attention."
            >
              <Button icon={IconPlus}>Add a property</Button>
              <Button variant="tertiary">I'll do this later</Button>
            </EmptyState>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── ERROR STATE ─────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Error States</h2>
          <p className={s.sectionDesc}>Friendly, reassuring. "Your data is safe." Always offer a way forward.</p>

          <div className={s.surface}>
            <ErrorState
              title="We couldn't load your properties right now."
              description="Your saved documents are safe. We'll try again automatically."
            >
              <Button variant="secondary" icon={IconRefresh}>Try again</Button>
              <Button variant="tertiary">I'll check later</Button>
            </ErrorState>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── SKELETON ────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Loading / Skeleton States</h2>
          <p className={s.sectionDesc}>"Checking your property..." not "Loading..." — explain what Vault is doing.</p>

          <div className={s.surface} style={{ maxWidth: 440 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Skeleton variant="heading" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                <Skeleton variant="avatar" width={40} height={40} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="text" width="30%" />
                </div>
              </div>
              <Skeleton variant="card" />
              <Skeleton variant="row" />
              <Skeleton variant="row" />
            </div>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── MODAL ───────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Modal</h2>
          <p className={s.sectionDesc}>Focused overlay for confirmations and short forms. Closes on escape and overlay click.</p>

          <Button variant="secondary" onClick={() => setModalOpen(true)}>Open modal</Button>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Remove this property?"
            footer={
              <>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => setModalOpen(false)}>Remove property</Button>
              </>
            }
          >
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              This will remove "Family Land" from your Vault. Your uploaded documents will be kept for 30 days in case you change your mind.
            </p>
          </Modal>
        </section>

        <hr className={s.divider} />

        {/* ─── TOASTS ──────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Toasts</h2>
          <p className={s.sectionDesc}>Brief confirmations and status updates. Four variants: success, warning, error, info.</p>

          <Button variant="secondary" onClick={() => setShowToasts((v) => !v)}>
            {showToasts ? 'Hide toasts' : 'Show toasts'}
          </Button>

          {showToasts && (
            <ToastContainer>
              <Toast variant="success" title="Document added." message="Sale deed was added to Family Land." onClose={() => setShowToasts(false)} />
              <Toast variant="warning" title="Document needs updating." message="Your property tax receipt is from 2023." />
              <Toast variant="error" title="Upload failed." message="The file was too large. Try a smaller file." />
              <Toast variant="info" title="Checking your property..." message="Vault is looking at government records." />
            </ToastContainer>
          )}
        </section>

        <hr className={s.divider} />

        {/* ─── SHADOWS ─────────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Shadows</h2>
          <p className={s.sectionDesc}>Four levels of elevation. Used sparingly — most surfaces use borders, not shadows.</p>
          <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
            {['sm', 'md', 'lg', 'xl'].map((level) => (
              <div
                key={level}
                style={{
                  width: 120,
                  height: 80,
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: `var(--shadow-${level})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-caption)',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'monospace',
                }}
              >
                --shadow-{level}
              </div>
            ))}
          </div>
        </section>

        <hr className={s.divider} />

        {/* ─── HEADER NAV ──────────────────────────────── */}
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Navigation (Header)</h2>
          <p className={s.sectionDesc}>
            Top navigation only — no left sidebar. Logo + nav links + notifications + avatar.
            The header at the top of this page is a live instance.
          </p>
        </section>

      </main>
    </div>
  );
}

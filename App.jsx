import { useState, useEffect, useRef } from "react";

// ============================================================
// LUXADMIN — Interactive Product Demo
// This is the pitch. A fiduciary sees this and thinks:
// "I need this yesterday."
// ============================================================

const DEMO_DATA = {
  stats: {
    totalEntities: 147,
    activeEntities: 142,
    overdue: 18,
    dueSoon: 23,
    onTrack: 101,
    penaltyExposureCents: 1485000,
    lninReadyPercent: 71,
    lninBlockedEntities: 41,
  },
  entities: [
    { id: 1, name: "Meridian Holdings S.A.", rcs: "B254321", type: "SA", status: "overdue", fyEnd: "31/12", nextDeadline: "Dépôt comptes annuels 2024", nextDeadlineDays: -245, penalty: 500, penaltyDaily: true, lninReady: false, lninTotal: 5, lninVerified: 3, assigned: "Ana S.", persons: [
      { name: "Jean-Claude Müller", role: "Administrateur", lnin: "✓", nat: "LU" },
      { name: "Sophie Laurent", role: "Administrateur", lnin: "⏳", nat: "FR" },
      { name: "Klaus Bergmann", role: "Administrateur", lnin: "✓", nat: "DE" },
      { name: "Nordic Capital AB", role: "Actionnaire (100%)", lnin: "—", nat: "SE" },
      { name: "Maria Rossi", role: "Commissaire", lnin: "✗", nat: "IT" },
    ]},
    { id: 2, name: "Atlas Participations S.à r.l.", rcs: "B267890", type: "SARL", status: "overdue", fyEnd: "31/12", nextDeadline: "Dépôt comptes annuels 2024", nextDeadlineDays: -98, penalty: 200, penaltyDaily: false, lninReady: false, lninTotal: 3, lninVerified: 2, assigned: "Luc S.", persons: [
      { name: "Ahmed El-Amine", role: "Gérant", lnin: "✗", nat: "MA" },
      { name: "Olivier Fontaine", role: "Gérant", lnin: "✓", nat: "BE" },
      { name: "Thames River Ltd", role: "Associé (100%)", lnin: "—", nat: "GB" },
    ]},
    { id: 3, name: "Vega Property S.A.", rcs: "B278901", type: "SA", status: "overdue", fyEnd: "30/06", nextDeadline: "Confirmation RBE 2025", nextDeadlineDays: -45, penalty: 0, penaltyDaily: false, lninReady: true, lninTotal: 4, lninVerified: 4, assigned: "Ana S.", persons: [
      { name: "Christina Papadopoulos", role: "Administrateur", lnin: "✓", nat: "GR" },
      { name: "Jean-Claude Müller", role: "Administrateur", lnin: "✓", nat: "LU" },
      { name: "Olivier Fontaine", role: "Administrateur", lnin: "✓", nat: "BE" },
      { name: "Nordic Capital AB", role: "Actionnaire (60%)", lnin: "—", nat: "SE" },
    ]},
    { id: 4, name: "Delta Capital S.à r.l.", rcs: "B289012", type: "SARL", status: "due_soon", fyEnd: "31/12", nextDeadline: "AGM 2025", nextDeadlineDays: 12, penalty: 0, penaltyDaily: false, lninReady: true, lninTotal: 2, lninVerified: 2, assigned: "Luc S.", persons: [
      { name: "Klaus Bergmann", role: "Gérant", lnin: "✓", nat: "DE" },
      { name: "Olivier Fontaine", role: "Gérant", lnin: "✓", nat: "BE" },
    ]},
    { id: 5, name: "Epsilon SPF", rcs: "B290123", type: "SPF", status: "due_soon", fyEnd: "31/12", nextDeadline: "Conseil de Gérance Q1 2026", nextDeadlineDays: 18, penalty: 0, penaltyDaily: false, lninReady: false, lninTotal: 2, lninVerified: 1, assigned: "Ana S.", persons: [
      { name: "Yuki Tanaka", role: "Gérant", lnin: "✗", nat: "JP" },
      { name: "Maria Rossi", role: "Actionnaire (50%)", lnin: "✗", nat: "IT" },
    ]},
    { id: 6, name: "Zeta Finance S.A.", rcs: "B301234", type: "SA", status: "on_track", fyEnd: "31/03", nextDeadline: "AGM 2025", nextDeadlineDays: 128, penalty: 0, penaltyDaily: false, lninReady: true, lninTotal: 3, lninVerified: 3, assigned: "Luc S.", persons: [
      { name: "Olivier Fontaine", role: "Administrateur", lnin: "✓", nat: "BE" },
      { name: "Klaus Bergmann", role: "Administrateur", lnin: "✓", nat: "DE" },
      { name: "Zeta Investments Ltd", role: "Actionnaire (100%)", lnin: "—", nat: "GB" },
    ]},
    { id: 7, name: "Theta Real Estate S.A.", rcs: "B323456", type: "SA", status: "due_soon", fyEnd: "30/09", nextDeadline: "Conseil d'Administration Q1", nextDeadlineDays: 22, penalty: 0, penaltyDaily: false, lninReady: false, lninTotal: 3, lninVerified: 1, assigned: "Ana S.", persons: [
      { name: "Christina Papadopoulos", role: "Administrateur", lnin: "✓", nat: "GR" },
      { name: "Yuki Tanaka", role: "Administrateur", lnin: "✗", nat: "JP" },
      { name: "Theta Holdings BV", role: "Actionnaire (100%)", lnin: "—", nat: "NL" },
    ]},
    { id: 8, name: "Lambda Group S.A.", rcs: "B345678", type: "SA", status: "overdue", fyEnd: "31/12", nextDeadline: "Dépôt comptes annuels 2024", nextDeadlineDays: -220, penalty: 500, penaltyDaily: true, lninReady: true, lninTotal: 4, lninVerified: 4, assigned: "Luc S.", persons: [
      { name: "Jean-Claude Müller", role: "Administrateur", lnin: "✓", nat: "LU" },
      { name: "Klaus Bergmann", role: "Administrateur", lnin: "✓", nat: "DE" },
      { name: "Sophie Laurent", role: "Administrateur", lnin: "✓", nat: "FR" },
      { name: "Lambda Capital LLC", role: "Actionnaire (100%)", lnin: "—", nat: "US" },
    ]},
    { id: 9, name: "Sigma Investments S.à r.l.", rcs: "B356789", type: "SARL", status: "on_track", fyEnd: "31/12", nextDeadline: "AGM 2025", nextDeadlineDays: 95, penalty: 0, penaltyDaily: false, lninReady: true, lninTotal: 2, lninVerified: 2, assigned: "Ana S.", persons: [
      { name: "Ahmed El-Amine", role: "Gérant", lnin: "✓", nat: "MA" },
      { name: "Sigma Partners SCA", role: "Associé (100%)", lnin: "—", nat: "LU" },
    ]},
    { id: 10, name: "Omega Wealth S.A.", rcs: "B367890", type: "SA", status: "on_track", fyEnd: "31/12", nextDeadline: "AGM 2025", nextDeadlineDays: 95, penalty: 0, penaltyDaily: false, lninReady: true, lninTotal: 3, lninVerified: 3, assigned: "Luc S.", persons: [
      { name: "Jean-Claude Müller", role: "Administrateur", lnin: "✓", nat: "LU" },
      { name: "Christina Papadopoulos", role: "Administrateur", lnin: "✓", nat: "GR" },
      { name: "Omega Family Trust", role: "Actionnaire (100%)", lnin: "—", nat: "CH" },
    ]},
    { id: 11, name: "Phoenix Trading S.à r.l.", rcs: "B378901", type: "SARL", status: "on_track", fyEnd: "31/03", nextDeadline: "Dépôt comptes annuels 2025", nextDeadlineDays: 142, penalty: 0, penaltyDaily: false, lninReady: true, lninTotal: 2, lninVerified: 2, assigned: "Ana S.", persons: [
      { name: "Olivier Fontaine", role: "Gérant", lnin: "✓", nat: "BE" },
      { name: "Phoenix Group Holding BV", role: "Associé (100%)", lnin: "—", nat: "NL" },
    ]},
    { id: 12, name: "Nexus Holdings S.A.", rcs: "B389012", type: "SA", status: "due_soon", fyEnd: "31/12", nextDeadline: "Renouvellement domiciliation", nextDeadlineDays: 8, penalty: 0, penaltyDaily: false, lninReady: false, lninTotal: 5, lninVerified: 3, assigned: "Luc S.", persons: [
      { name: "Klaus Bergmann", role: "Administrateur", lnin: "✓", nat: "DE" },
      { name: "Maria Rossi", role: "Administrateur", lnin: "✗", nat: "IT" },
      { name: "Sophie Laurent", role: "Administrateur", lnin: "✓", nat: "FR" },
      { name: "Ahmed El-Amine", role: "Administrateur", lnin: "✗", nat: "MA" },
      { name: "Nexus Capital Partners LP", role: "Actionnaire (100%)", lnin: "—", nat: "KY" },
    ]},
  ],
};

const formatEur = (cents) => {
  return new Intl.NumberFormat("fr-LU", { style: "currency", currency: "EUR" }).format(cents / 100);
};

// ============================================================
// STATUS BADGE
// ============================================================
function StatusBadge({ status }) {
  const config = {
    overdue: { label: "En retard", bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
    due_soon: { label: "Échéance proche", bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
    on_track: { label: "En ordre", bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
  };
  const c = config[status] || config.on_track;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 99, background: c.bg, color: c.color, fontSize: 12, fontWeight: 600, letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {c.label}
    </span>
  );
}

// ============================================================
// LNIN INDICATOR
// ============================================================
function LninBadge({ ready, total, verified }) {
  if (total === 0) return <span style={{ color: "#9ca3af", fontSize: 13 }}>—</span>;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: ready ? "#065f46" : "#991b1b", fontWeight: 500 }}>
      <span style={{ fontSize: 11 }}>{ready ? "✓" : "⚠"}</span>
      {verified}/{total}
    </span>
  );
}

// ============================================================
// TYPE BADGE
// ============================================================
function TypeBadge({ type }) {
  const colors = {
    SA: { bg: "#ede9fe", color: "#5b21b6" },
    SARL: { bg: "#dbeafe", color: "#1e40af" },
    SPF: { bg: "#fce7f3", color: "#9d174d" },
    SCSp: { bg: "#d1fae5", color: "#065f46" },
  };
  const c = colors[type] || { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, background: c.bg, color: c.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>
      {type}
    </span>
  );
}

// ============================================================
// STAT CARD
// ============================================================
function StatCard({ label, value, sub, color, icon, accent, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay || 0); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      background: accent ? `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)` : "#fff",
      borderRadius: 12,
      padding: "20px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      boxShadow: accent ? `0 4px 20px ${accent}33` : "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      minWidth: 0,
    }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: accent ? "rgba(255,255,255,0.8)" : "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: accent ? "#fff" : (color || "#111827"), letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: accent ? "rgba(255,255,255,0.7)" : "#9ca3af", marginTop: 2 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ============================================================
// DOCUMENT PREVIEW MODAL
// ============================================================
function DocumentModal({ entity, onClose }) {
  const isSA = entity.type === "SA";
  const boardName = isSA ? "Conseil d'Administration" : "Conseil de Gérance";
  const memberTitle = isSA ? "administrateurs" : "gérants";

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: 680, maxHeight: "85vh", overflow: "auto",
        boxShadow: "0 25px 60px rgba(0,0,0,0.3)", animation: "modalIn 0.3s ease"
      }}>
        <div style={{ padding: "24px 28px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>⚡ Généré par IA — Prêt à réviser</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Procès-Verbal du {boardName}</div>
          </div>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>×</button>
        </div>
        <div style={{ padding: "28px", fontFamily: "'Times New Roman', Georgia, serif", fontSize: 14.5, lineHeight: 1.75, color: "#1f2937" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.1em" }}>{entity.name}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{isSA ? "Société Anonyme" : entity.type === "SPF" ? "Société de Gestion de Patrimoine Familial" : "Société à Responsabilité Limitée"}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>RCS Luxembourg {entity.rcs}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Siège social : 15, Boulevard Royal, L-2449 Luxembourg</div>
            <div style={{ width: 60, height: 2, background: "#d1d5db", margin: "18px auto 0" }} />
          </div>

          <div style={{ textAlign: "center", fontWeight: 700, fontSize: 15, marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Procès-Verbal de la réunion du {boardName}
          </div>
          <div style={{ textAlign: "center", fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
            tenue au siège social en date du ______ 2026 à _____ heures
          </div>

          <p><strong>Sont présents :</strong></p>
          {entity.persons && entity.persons.length > 0 ? (
            <ul style={{ paddingLeft: 20, margin: "8px 0 16px" }}>
              {entity.persons.filter(p => p.role.includes("dministrateur") || p.role.includes("érant")).map((p, i) => (
                <li key={i} style={{ marginBottom: 4 }}>Monsieur/Madame <strong>{p.name}</strong>, {p.role}</li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#9ca3af", fontStyle: "italic" }}>[Liste des {memberTitle} présents]</p>
          )}

          <p>Le {boardName.toLowerCase()} se réunit conformément aux dispositions des statuts de la Société et de la loi modifiée du 10 août 1915 concernant les sociétés commerciales.</p>

          <p>Le président constate que {isSA ? "la moitié au moins des administrateurs sont présents ou représentés" : "le quorum requis est atteint"} et que le {boardName.toLowerCase()} peut valablement délibérer sur les points portés à l'ordre du jour.</p>

          <p style={{ fontWeight: 700, marginTop: 20 }}>ORDRE DU JOUR :</p>
          <ol style={{ paddingLeft: 20 }}>
            <li>Approbation des comptes annuels de l'exercice clos le {entity.fyEnd}/2025</li>
            <li>Affectation du résultat</li>
            <li>Décharge aux {memberTitle}</li>
            <li>Divers</li>
          </ol>

          <p style={{ marginTop: 20 }}><strong>PREMIÈRE RÉSOLUTION</strong></p>
          <p>Le {boardName.toLowerCase()}, après examen des comptes annuels de l'exercice social clos le {entity.fyEnd}/2025, décide de les approuver tels qu'ils lui ont été présentés, faisant apparaître un {isSA ? "bénéfice" : "résultat"} de _______ EUR.</p>

          <p style={{ marginTop: 16 }}><strong>DEUXIÈME RÉSOLUTION</strong></p>
          <p>Le {boardName.toLowerCase()} décide d'affecter le résultat de l'exercice comme suit :</p>
          <ul style={{ paddingLeft: 20 }}>
            <li>Dotation à la réserve légale : _______ EUR</li>
            <li>Report à nouveau : _______ EUR</li>
          </ul>

          <p style={{ marginTop: 16 }}><strong>TROISIÈME RÉSOLUTION</strong></p>
          <p>Le {boardName.toLowerCase()} décide d'accorder décharge pleine et entière aux {memberTitle} pour l'exercice de leur mandat au cours de l'exercice social écoulé.</p>

          <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
            <p>Plus rien ne figurant à l'ordre du jour, la séance est levée à _____ heures.</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ borderTop: "1px solid #9ca3af", width: 180, marginBottom: 4 }} />
                <div style={{ fontSize: 12, color: "#6b7280" }}>Le Président</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ borderTop: "1px solid #9ca3af", width: 180, marginBottom: 4 }} />
                <div style={{ fontSize: 12, color: "#6b7280" }}>Le Secrétaire</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28, padding: "12px 16px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #bbf7d0", fontSize: 12, color: "#166534" }}>
            <strong>🤖 Note IA :</strong> Ce document a été généré automatiquement en respectant les exigences de la loi du 10 août 1915. 
            {isSA ? " Le quorum de la moitié des administrateurs (art. 444-4) et la majorité simple (art. 444-5) sont respectés." : " Les règles de gérance des articles 710-1 et suivants sont respectées."}
            {" "}Version française fait foi. À réviser par le collaborateur avant approbation.
          </div>
          <div style={{ marginTop: 10, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0", fontSize: 11, color: "#64748b", textAlign: "center" }}>
            Démonstration · Données fictives · Aucune valeur juridique
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ENTITY DETAIL PANEL
// ============================================================
function EntityDetail({ entity, onClose, onGenerate }) {
  return (
    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(520px, 90vw)", background: "#fff", boxShadow: "-8px 0 30px rgba(0,0,0,0.12)", zIndex: 900, display: "flex", flexDirection: "column", animation: "slideIn 0.25s ease" }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <TypeBadge type={entity.type} />
            <StatusBadge status={entity.status} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>{entity.name}</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>RCS Luxembourg {entity.rcs} · Clôture {entity.fyEnd}</div>
        </div>
        <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", flexShrink: 0 }}>×</button>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
        {/* Penalty warning */}
        {entity.penalty > 0 && (
          <div style={{ padding: "14px 16px", background: entity.penaltyDaily ? "#fef2f2" : "#fffbeb", borderRadius: 10, border: `1px solid ${entity.penaltyDaily ? "#fecaca" : "#fde68a"}`, marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: entity.penaltyDaily ? "#991b1b" : "#92400e" }}>
              {entity.penaltyDaily ? "⚠ RÉGIME PÉNALITÉS JOURNALIÈRES ACTIF" : "⚠ Majoration applicable"}
            </div>
            <div style={{ fontSize: 12, color: entity.penaltyDaily ? "#b91c1c" : "#a16207", marginTop: 4 }}>
              {entity.penaltyDaily
                ? `Retard supérieur à 7 mois. Majoration de €${entity.penalty} + pénalité journalière de €40/jour en cours. Exposition croissante.`
                : `Retard de ${Math.abs(entity.nextDeadlineDays)} jours. Majoration actuelle : €${entity.penalty}. Risque d'escalade.`}
            </div>
          </div>
        )}

        {/* LNIN Status */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Statut LNIN</div>
          <div style={{ padding: "12px 16px", background: entity.lninReady ? "#f0fdf4" : "#fef2f2", borderRadius: 8, border: `1px solid ${entity.lninReady ? "#bbf7d0" : "#fecaca"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: entity.lninReady ? "#065f46" : "#991b1b" }}>
                {entity.lninReady ? "✓ Prêt — Tous les LNIN vérifiés" : `⚠ ${entity.lninTotal - entity.lninVerified} LNIN manquant(s) — Dépôts bloqués`}
              </span>
              <span style={{ fontSize: 22, fontWeight: 800, color: entity.lninReady ? "#065f46" : "#dc2626" }}>
                {entity.lninVerified}/{entity.lninTotal}
              </span>
            </div>
            {!entity.lninReady && (
              <div style={{ fontSize: 12, color: "#b91c1c", marginTop: 6 }}>
                Depuis le 1er octobre 2025, l'entité est bloquée pour tout dépôt au RCS tant que les LNIN ne sont pas complets.
              </div>
            )}
          </div>
        </div>

        {/* Persons */}
        {entity.persons && entity.persons.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Dirigeants & Actionnaires</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {entity.persons.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: i % 2 === 0 ? "#f9fafb" : "#fff", borderRadius: 6, fontSize: 13 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "#111827" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{p.role} · {p.nat}</div>
                  </div>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: p.lnin === "✓" ? "#059669" : p.lnin === "⏳" ? "#d97706" : p.lnin === "✗" ? "#dc2626" : "#9ca3af"
                  }}>
                    LNIN {p.lnin}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming deadlines */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>Prochaines échéances</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DeadlineRow label={entity.nextDeadline} days={entity.nextDeadlineDays} />
            <DeadlineRow label="Confirmation annuelle RBE" days={entity.nextDeadlineDays + 45} />
            <DeadlineRow label={entity.type === "SA" ? "Conseil d'Administration Q2" : "Conseil de Gérance Q2"} days={entity.nextDeadlineDays + 90} />
          </div>
        </div>

        {/* Generate document */}
        <button onClick={() => onGenerate(entity)} style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
          transition: "transform 0.15s",
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          ⚡ Générer PV du {entity.type === "SA" ? "Conseil d'Administration" : "Conseil de Gérance"}
        </button>
        <div style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", marginTop: 8 }}>
          Document généré par IA en français juridique · Révision humaine requise
        </div>
      </div>
    </div>
  );
}

function DeadlineRow({ label, days }) {
  const overdue = days < 0;
  const soon = days >= 0 && days <= 30;
  const color = overdue ? "#dc2626" : soon ? "#d97706" : "#059669";
  const bg = overdue ? "#fef2f2" : soon ? "#fffbeb" : "#f0fdf4";
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: bg, borderRadius: 8, fontSize: 13 }}>
      <span style={{ fontWeight: 500, color: "#374151" }}>{label}</span>
      <span style={{ fontWeight: 700, color, fontSize: 12, whiteSpace: "nowrap" }}>
        {overdue ? `${Math.abs(days)}j en retard` : soon ? `${days}j restants` : `${days}j`}
      </span>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function LuxAdminDemo() {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [docEntity, setDocEntity] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentView, setCurrentView] = useState("dashboard");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  const entities = DEMO_DATA.entities.filter(e => {
    if (filter !== "all" && e.status !== filter) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.rcs.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = DEMO_DATA.stats;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 800 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, background: "linear-gradient(135deg, #3b82f6, #60a5fa)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#fff" }}>L</div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>LuxAdmin</span>
            <span style={{ fontSize: 10, padding: "2px 6px", background: "rgba(96,165,250,0.2)", color: "#93c5fd", borderRadius: 4, fontWeight: 600, letterSpacing: "0.05em" }}>BETA</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[{ id: "dashboard", label: "Tableau de bord" }, { id: "entities", label: "Entités" }].map(tab => (
              <button key={tab.id} onClick={() => setCurrentView(tab.id)} style={{
                padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
                background: currentView === tab.id ? "rgba(255,255,255,0.15)" : "transparent",
                color: currentView === tab.id ? "#fff" : "rgba(255,255,255,0.6)",
                transition: "all 0.2s",
              }}>{tab.label}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Fiduciaire Pilote S.A.</div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#fff" }}>MD</div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px" }}>
        {/* Demo disclaimer banner — prominent, always visible */}
        <div style={{
          padding: "10px 16px",
          background: "linear-gradient(90deg, #eff6ff 0%, #f0f9ff 100%)",
          borderRadius: 10,
          border: "1px solid #bfdbfe",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 13,
          color: "#1e40af",
        }}>
          <span style={{ fontSize: 16 }}>ℹ️</span>
          <span>
            <strong>Démonstration interactive</strong> — Toutes les données présentées sont fictives. Aucune donnée personnelle n'est collectée ni stockée.
            Les noms d'entités, personnes et numéros RCS sont inventés à des fins d'illustration uniquement.
          </span>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
          <StatCard delay={0} label="Entités actives" value={stats.activeEntities} sub={`sur ${stats.totalEntities} au total`} />
          <StatCard delay={80} label="En retard" value={stats.overdue} sub={`+ ${stats.dueSoon} échéances proches`} color="#dc2626" />
          <StatCard delay={160} label="Exposition pénalités" value={formatEur(stats.penaltyExposureCents)} sub="Loi du 23 janvier 2025" accent="#dc2626" />
          <StatCard delay={240} label="LNIN prêt" value={`${stats.lninReadyPercent}%`} sub={`${stats.lninBlockedEntities} entités bloquées`} color={stats.lninReadyPercent < 80 ? "#d97706" : "#059669"} />
        </div>

        {/* Penalty alert banner */}
        {stats.penaltyExposureCents > 0 && (
          <div style={{
            padding: "16px 20px",
            background: "linear-gradient(90deg, #fef2f2 0%, #fff1f2 100%)",
            borderRadius: 12,
            border: "1px solid #fecaca",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.6s ease 0.4s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24, animation: "pulse 2s infinite" }}>⚠️</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#991b1b" }}>
                  Exposition pénalités : {formatEur(stats.penaltyExposureCents)}
                </div>
                <div style={{ fontSize: 12, color: "#b91c1c" }}>
                  {stats.overdue} dépôts en retard au RCS. {2} entités en régime de pénalités journalières (€40/jour). Action immédiate requise.
                </div>
              </div>
            </div>
            <button style={{ padding: "8px 16px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
              Voir les urgences
            </button>
          </div>
        )}

        {/* Filter bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { id: "all", label: "Toutes", count: DEMO_DATA.entities.length },
              { id: "overdue", label: "En retard", count: DEMO_DATA.entities.filter(e => e.status === "overdue").length },
              { id: "due_soon", label: "Échéance proche", count: DEMO_DATA.entities.filter(e => e.status === "due_soon").length },
              { id: "on_track", label: "En ordre", count: DEMO_DATA.entities.filter(e => e.status === "on_track").length },
            ].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                background: filter === f.id ? "#111827" : "#f3f4f6",
                color: filter === f.id ? "#fff" : "#6b7280",
                transition: "all 0.2s",
              }}>
                {f.label} <span style={{ opacity: 0.6, marginLeft: 4 }}>{f.count}</span>
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Rechercher entité ou RCS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, width: 240, outline: "none", background: "#fff" }}
          />
        </div>

        {/* Entity table */}
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 0.6fr 2fr 1fr 0.8fr 1fr", padding: "12px 20px", background: "#f9fafb", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #e5e7eb" }}>
            <div>Entité</div>
            <div>Forme</div>
            <div>Prochaine échéance</div>
            <div>Statut</div>
            <div>LNIN</div>
            <div style={{ textAlign: "right" }}>Pénalité</div>
          </div>
          {entities.map((entity, i) => (
            <div
              key={entity.id}
              onClick={() => setSelectedEntity(entity)}
              style={{
                display: "grid",
                gridTemplateColumns: "2.5fr 0.6fr 2fr 1fr 0.8fr 1fr",
                padding: "14px 20px",
                borderBottom: i < entities.length - 1 ? "1px solid #f3f4f6" : "none",
                cursor: "pointer",
                transition: "background 0.15s",
                alignItems: "center",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(6px)",
                transitionDelay: `${0.05 * i}s`,
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#f9fafb"}
              onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{entity.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>RCS {entity.rcs} · {entity.assigned}</div>
              </div>
              <div><TypeBadge type={entity.type} /></div>
              <div>
                <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{entity.nextDeadline}</div>
                <div style={{ fontSize: 12, color: entity.nextDeadlineDays < 0 ? "#dc2626" : entity.nextDeadlineDays <= 30 ? "#d97706" : "#6b7280", fontWeight: entity.nextDeadlineDays < 0 ? 700 : 400 }}>
                  {entity.nextDeadlineDays < 0 ? `${Math.abs(entity.nextDeadlineDays)}j en retard` : `${entity.nextDeadlineDays}j restants`}
                </div>
              </div>
              <div><StatusBadge status={entity.status} /></div>
              <div><LninBadge ready={entity.lninReady} total={entity.lninTotal} verified={entity.lninVerified} /></div>
              <div style={{ textAlign: "right" }}>
                {entity.penalty > 0 ? (
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#dc2626" }}>
                    €{entity.penalty}{entity.penaltyDaily ? <span style={{ fontSize: 10, fontWeight: 400 }}> +40/j</span> : ""}
                  </span>
                ) : (
                  <span style={{ fontSize: 13, color: "#d1d5db" }}>—</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {entities.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#9ca3af", fontSize: 14 }}>
            Aucune entité ne correspond à votre recherche.
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "32px 0 16px", fontSize: 12, color: "#9ca3af" }}>
          <strong style={{ color: "#6b7280" }}>LuxAdmin</strong> · Administration corporate intelligente pour fiduciaires luxembourgeois
          <br />
          Données 100% fictives · Aucune donnée personnelle collectée · Conforme RGPD
          <br />
          <span style={{ fontSize: 11 }}>IA rédige, l'humain décide · Aucun dépôt automatique au RCS</span>
        </div>
      </div>

      {/* Entity detail panel */}
      {selectedEntity && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.2)", zIndex: 850 }} onClick={() => setSelectedEntity(null)} />
          <EntityDetail entity={selectedEntity} onClose={() => setSelectedEntity(null)} onGenerate={(e) => { setDocEntity(e); }} />
        </>
      )}

      {/* Document modal */}
      {docEntity && <DocumentModal entity={docEntity} onClose={() => setDocEntity(null)} />}
    </div>
  );
}

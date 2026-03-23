/* ============================================================
   data.js — Mock data + shared utilities
   
   BACKEND INTEGRATION POINTS are marked with:
   // ⚡ BACKEND: <description>
   ============================================================ */

'use strict';

/* ---- Mock transaction data ------------------------------------------------
   ⚡ BACKEND: Replace MOCK_TRANSACTIONS with the parsed contents of the
   scored CSV returned by the ML pipeline. Each row should map to one object.
   Expected CSV columns:
     transaction_id, account_id, date, time, transaction_type, amount,
     channel, branch_code, anomaly_score, anomaly_flag, risk_level,
     anomaly_type (comma-separated if multiple)
   -------------------------------------------------------------------------- */
const MOCK_TRANSACTIONS = [
  { id:'TXN-00841', account:'ACC-1042', date:'2026-03-18', time:'09:14', type:'Cash Withdrawal',    amount:50000, channel:'Counter',   branch:'BR-01', score:94, flag:1, risk:'high',   anomaly:'Rounded Amount, High Frequency' },
  { id:'TXN-00842', account:'ACC-1042', date:'2026-03-18', time:'09:22', type:'Cash Withdrawal',    amount:50000, channel:'Counter',   branch:'BR-01', score:91, flag:1, risk:'high',   anomaly:'Rounded Amount, Near Duplicate' },
  { id:'TXN-00193', account:'ACC-2287', date:'2026-03-15', time:'14:05', type:'Account Transfer',   amount:187400,channel:'NEFT',      branch:'BR-02', score:88, flag:1, risk:'high',   anomaly:'Unusually Large Transaction' },
  { id:'TXN-00477', account:'ACC-3301', date:'2026-03-12', time:'11:30', type:'Internal Adjustment',amount:12000, channel:'Internal', branch:'BR-01', score:85, flag:1, risk:'high',   anomaly:'Reversal Abuse' },
  { id:'TXN-00512', account:'ACC-0091', date:'2026-03-10', time:'08:45', type:'Cash Withdrawal',    amount:200000,channel:'Counter',  branch:'BR-03', score:83, flag:1, risk:'high',   anomaly:'Dormant Account Activity' },
  { id:'TXN-00611', account:'ACC-4410', date:'2026-03-09', time:'16:58', type:'Account Transfer',   amount:10000, channel:'IMPS',     branch:'BR-02', score:79, flag:1, risk:'high',   anomaly:'Rapid Fund Transfer' },
  { id:'TXN-00612', account:'ACC-4410', date:'2026-03-09', time:'17:01', type:'Account Transfer',   amount:10000, channel:'IMPS',     branch:'BR-02', score:77, flag:1, risk:'high',   anomaly:'Rapid Fund Transfer' },
  { id:'TXN-00613', account:'ACC-4410', date:'2026-03-09', time:'17:04', type:'Account Transfer',   amount:10000, channel:'IMPS',     branch:'BR-02', score:76, flag:1, risk:'high',   anomaly:'Rapid Fund Transfer' },
  { id:'TXN-00720', account:'ACC-1887', date:'2026-03-08', time:'10:20', type:'Reversal',           amount:45000, channel:'Internal', branch:'BR-01', score:72, flag:1, risk:'medium', anomaly:'Reversal Abuse' },
  { id:'TXN-00731', account:'ACC-1887', date:'2026-03-08', time:'10:35', type:'Reversal',           amount:45000, channel:'Internal', branch:'BR-01', score:70, flag:1, risk:'medium', anomaly:'Near Duplicate, Reversal Abuse' },
  { id:'TXN-00310', account:'ACC-5502', date:'2026-03-07', time:'13:10', type:'Loan Disbursement',  amount:500000,channel:'Counter',  branch:'BR-03', score:68, flag:1, risk:'medium', anomaly:'Unusually Large Transaction' },
  { id:'TXN-00419', account:'ACC-2100', date:'2026-03-06', time:'15:45', type:'Vendor Payment',     amount:25000, channel:'NEFT',     branch:'BR-02', score:65, flag:1, risk:'medium', anomaly:'Repeated Vendor Payment' },
  { id:'TXN-00420', account:'ACC-2100', date:'2026-03-06', time:'15:52', type:'Vendor Payment',     amount:25000, channel:'NEFT',     branch:'BR-02', score:64, flag:1, risk:'medium', anomaly:'Repeated Vendor Payment' },
  { id:'TXN-00421', account:'ACC-2100', date:'2026-03-06', time:'16:01', type:'Vendor Payment',     amount:25000, channel:'NEFT',     branch:'BR-02', score:63, flag:1, risk:'medium', anomaly:'Repeated Vendor Payment' },
  { id:'TXN-00880', account:'ACC-3310', date:'2026-03-05', time:'12:00', type:'Cash Deposit',       amount:9900,  channel:'Counter',  branch:'BR-01', score:58, flag:1, risk:'medium', anomaly:'Split Transaction' },
  { id:'TXN-00881', account:'ACC-3310', date:'2026-03-05', time:'12:08', type:'Cash Deposit',       amount:9900,  channel:'Counter',  branch:'BR-01', score:57, flag:1, risk:'medium', anomaly:'Split Transaction' },
  { id:'TXN-00882', account:'ACC-3310', date:'2026-03-05', time:'12:15', type:'Cash Deposit',       amount:9900,  channel:'Counter',  branch:'BR-01', score:55, flag:1, risk:'medium', anomaly:'Split Transaction' },
  { id:'TXN-00215', account:'ACC-7711', date:'2026-03-04', time:'09:00', type:'EMI Repayment',      amount:3200,  channel:'Online',   branch:'BR-02', score:42, flag:1, risk:'low',    anomaly:'Sudden Behaviour Change' },
  { id:'TXN-00301', account:'ACC-6604', date:'2026-03-03', time:'11:22', type:'Cash Withdrawal',    amount:30000, channel:'Counter',  branch:'BR-03', score:38, flag:1, risk:'low',    anomaly:'Rounded Amount' },
  { id:'TXN-00155', account:'ACC-1120', date:'2026-03-01', time:'10:05', type:'Account Transfer',   amount:5500,  channel:'NEFT',     branch:'BR-01', score:31, flag:1, risk:'low',    anomaly:'Unusual Frequency' },
  // Clean transactions (flag=0) — these appear in account detail views
  { id:'TXN-00100', account:'ACC-1042', date:'2026-03-01', time:'10:00', type:'Cash Deposit',       amount:12000, channel:'Counter',  branch:'BR-01', score:8,  flag:0, risk:'low',    anomaly:'' },
  { id:'TXN-00101', account:'ACC-1042', date:'2026-03-05', time:'09:30', type:'EMI Repayment',      amount:4500,  channel:'Online',   branch:'BR-01', score:5,  flag:0, risk:'low',    anomaly:'' },
  { id:'TXN-00102', account:'ACC-1042', date:'2026-03-10', time:'14:20', type:'Cash Withdrawal',    amount:3000,  channel:'Counter',  branch:'BR-01', score:11, flag:0, risk:'low',    anomaly:'' },
  { id:'TXN-00200', account:'ACC-4410', date:'2026-03-01', time:'11:00', type:'Cash Deposit',       amount:8000,  channel:'Counter',  branch:'BR-02', score:6,  flag:0, risk:'low',    anomaly:'' },
  { id:'TXN-00201', account:'ACC-4410', date:'2026-03-05', time:'15:00', type:'Account Transfer',   amount:2000,  channel:'NEFT',     branch:'BR-02', score:9,  flag:0, risk:'low',    anomaly:'' },
];

/* ---- Anomaly type summary (for explorer page) ----------------------------
   ⚡ BACKEND: Derive this from the scored CSV by grouping on anomaly_type.
   -------------------------------------------------------------------------- */
const ANOMALY_TYPES = [
  { name:'Rounded Amount',            count:4,  risk:'medium', desc:'Transactions involving suspiciously round figures such as Rs.10,000 or Rs.50,000, repeated within a short window.' },
  { name:'Near Duplicate',            count:3,  risk:'high',   desc:'Same or very similar payments recorded more than once within minutes, differing only slightly in amount or timestamp.' },
  { name:'Unusually Large Transaction',count:2, risk:'high',   desc:'Single transaction amounts that are significantly higher than the account\'s historical average.' },
  { name:'Rapid Fund Transfer',       count:3,  risk:'high',   desc:'Quick movement of funds across multiple accounts in sequence, each individual hop appearing routine.' },
  { name:'Reversal Abuse',            count:3,  risk:'high',   desc:'Excessive reversal or correction entries not corresponding to clear legitimate causes.' },
  { name:'Dormant Account Activity',  count:1,  risk:'high',   desc:'Significant transactions appearing in accounts that had been inactive for an extended period.' },
  { name:'Split Transaction',         count:3,  risk:'medium', desc:'A large payment broken into several smaller amounts, often to stay below a reporting threshold.' },
  { name:'Repeated Vendor Payment',   count:3,  risk:'medium', desc:'Multiple payments to the same recipient in quick succession with no clear business justification.' },
  { name:'Sudden Behaviour Change',   count:1,  risk:'low',    desc:'A sharp shift in how an account is being used, with no clear explanation from transaction history.' },
  { name:'High Frequency',            count:1,  risk:'high',   desc:'Excessive number of transactions from a single account within a short duration.' },
  { name:'Unusual Frequency',         count:1,  risk:'low',    desc:'Transaction frequency slightly above normal for this account type and period.' },
];

/* ---- Run summary (for dashboard) -----------------------------------------
   ⚡ BACKEND: Populate this from the pipeline's run metadata:
   total rows processed, number flagged, processing time, model info, etc.
   -------------------------------------------------------------------------- */
const RUN_SUMMARY = {
  file:         'transactions_march_2026.csv',
  processed:    new Date('2026-03-22T14:32:00'),
  total:        4217,
  flagged:      20,
  highRisk:     8,
  mediumRisk:   9,
  lowRisk:      3,
  contamination: 0.05,
  model:        'IsolationForest (n_estimators=100)',
  processingMs: 3840,
};

/* ---- Utilities ---- */
const Utils = {
  fmt: {
    currency: n => '₹' + n.toLocaleString('en-IN'),
    date:     s => new Date(s).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
    pct:      n => (n * 100).toFixed(1) + '%',
    score:    n => n.toString().padStart(2,'0'),
  },

  scoreColor(score) {
    if (score >= 75) return '#ff6b6b';
    if (score >= 50) return '#e0ac44';
    return '#52c491';
  },

  riskClass(risk) {
    return { high:'high', medium:'medium', low:'low' }[risk] || 'low';
  },

  /* Build the sidebar HTML — call once per page, pass current page key */
  sidebar(active) {
    const links = [
      { key:'upload',   href:'index.html',    icon:'⬆',  label:'Upload & Process' },
      { key:'dashboard',href:'dashboard.html',icon:'◈',  label:'Dashboard' },
      { key:'flagged',  href:'flagged.html',  icon:'⚑',  label:'Flagged Transactions', badge: RUN_SUMMARY.flagged },
      { key:'account',  href:'account.html',  icon:'◎',  label:'Account Detail' },
      { key:'explorer', href:'explorer.html', icon:'⊞',  label:'Anomaly Explorer' },
      { key:'export',   href:'export.html',   icon:'↓',  label:'Export Report' },
    ];
    return `
      <div class="sidebar-section">Navigation</div>
      ${links.map(l => `
        <a href="${l.href}" class="nav-link ${l.key === active ? 'active' : ''}">
          <span class="icon">${l.icon}</span>
          ${l.label}
          ${l.badge ? `<span class="badge">${l.badge}</span>` : ''}
        </a>
      `).join('')}
    `;
  },

  /* Build topbar HTML */
  topbar(status = 'ready') {
    const dot = status === 'ready' ? '<span class="dot"></span>' : '<span class="dot idle"></span>';
    const label = status === 'ready' ? 'Results loaded' : 'No file processed';
    return `
      <a href="index.html" class="topbar-logo">MOMENTUM<span> / audit</span></a>
      <span class="topbar-sep"></span>
      <span class="topbar-status">${dot} ${label}</span>
    `;
  },

  /* Show a toast notification */
  toast(msg, type = 'success') {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = `toast ${type === 'error' ? 'error' : ''} show`;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3200);
  },

  /* Simple sort helper for tables */
  sortBy(arr, key, asc = true) {
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) return asc ? -1 : 1;
      if (a[key] > b[key]) return asc ? 1 : -1;
      return 0;
    });
  },

  /* Paginate */
  paginate(arr, page, perPage) {
    const start = (page - 1) * perPage;
    return arr.slice(start, start + perPage);
  },
};

//REAL BACKEND CALL
async function fetchBackendData(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:5000/upload", {  
    method: "POST",
    body: formData
  });

  const result = await response.json();          
  return result;            
}

function mapBackendToUI(data) {                         // Line 15
  return data.map(row => ({
    id: row.transaction_id || 'TXN',
    account: row.account_id || 'ACC',
    date: row.date || '',
    time: row.time || '',
    type: row.type || '',
    amount: row.amount || 0,
    channel: row.channel || '',
    branch: row.branch || '',
    score: Math.round((row.score || 0) * 100),   // convert 0–1 → %
    flag: row.flag || 0,
    risk: (row.risk || '').toLowerCase(),
    anomaly: row.anomaly_type || ''
  }));
}

document.getElementById("fileInput").addEventListener("change", async function () {   // Line 16
  const file = this.files[0];                                                         // Line 17
  if (!file) return;

  Utils.toast("Processing file...");                                                  // Line 18

  try {
    const result = await fetchBackendData(file);                                      // Line 19

    console.log(result);                                                              // Line 20

    if (result.data) {
      const mapped = mapBackendToUI(result.data);                                     // Line 21

      // 🔥 REPLACE MOCK DATA
      window.MOCK_TRANSACTIONS = mapped;                                              // Line 22

      Utils.toast("Analysis complete");                                               // Line 23

      location.reload();  // refresh UI with new data                                  // Line 24
    }

  } catch (err) {
    console.error(err);                                                               // Line 25
    Utils.toast("Error processing file", "error");                                    // Line 26
  }
});
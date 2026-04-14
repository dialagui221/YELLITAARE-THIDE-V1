// Migrated from the original monolithic index.html

window.YELLITAARE_MIGRATED = true;


/* ─── ACCORDION FAQ ──────────────────────────────────────────────────── */
function toggleFaq(btn) {
  const body = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.accordion-btn.open').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) { btn.classList.add('open'); body.classList.add('open'); }
}

/* ─── GALLERY CATS ───────────────────────────────────────────────────── */
document.querySelectorAll('.faq-cat').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('div').querySelectorAll('.faq-cat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ─── DON SELECTION ──────────────────────────────────────────────────── */
function selectDon(card) {
  card.closest('.don-grid').querySelectorAll('.don-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

navigate('accueil');
setTimeout(() => {
  document.querySelectorAll('#page-accueil .fade').forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), i * 80);
  });
}, 100);



/* ─── SYSTÈME MODAL ──────────────────────────────────────────────────── */
function openModal(id) {
  var el = document.getElementById('modal-' + id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  var el = document.getElementById('modal-' + id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function(m) {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
    closeMemberModal();
  }
});

/* ─── SHA-256 HELPER (fonctionne en HTTP, HTTPS et file://) ──────── */
function hashPassword(pwd) {
  return new Promise(function(resolve) {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      crypto.subtle.digest('SHA-256', new TextEncoder().encode(pwd)).then(function(buf) {
        resolve(Array.from(new Uint8Array(buf)).map(function(b) { return b.toString(16).padStart(2,'0'); }).join(''));
      }).catch(function() { resolve(sha256Fallback(pwd)); });
    } else {
      resolve(sha256Fallback(pwd));
    }
  });
}
function sha256Fallback(str) {
  var K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  var H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  var b=[];for(var i=0;i<str.length;i++){var c=str.charCodeAt(i);if(c<128)b.push(c);
    else if(c<2048){b.push(192|(c>>6),128|(c&63));}else{b.push(224|(c>>12),128|((c>>6)&63),128|(c&63));}}
  var bl=b.length*8;b.push(128);while(b.length%64!==56)b.push(0);
  b.push(0,0,0,0,(bl>>>24)&255,(bl>>>16)&255,(bl>>>8)&255,bl&255);
  for(var ch=0;ch<b.length;ch+=64){
    var w=[];for(var i=0;i<16;i++)w[i]=(b[ch+i*4]<<24)|(b[ch+i*4+1]<<16)|(b[ch+i*4+2]<<8)|b[ch+i*4+3];
    for(var i=16;i<64;i++){var s0=((w[i-15]>>>7)|(w[i-15]<<25))^((w[i-15]>>>18)|(w[i-15]<<14))^(w[i-15]>>>3);
      var s1=((w[i-2]>>>17)|(w[i-2]<<15))^((w[i-2]>>>19)|(w[i-2]<<13))^(w[i-2]>>>10);w[i]=(w[i-16]+s0+w[i-7]+s1)|0;}
    var a=H[0],B=H[1],C=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
    for(var i=0;i<64;i++){var S1=((e>>>6)|(e<<26))^((e>>>11)|(e<<21))^((e>>>25)|(e<<7));
      var t1=(h+S1+((e&f)^(~e&g))+K[i]+w[i])|0;var S0=((a>>>2)|(a<<30))^((a>>>13)|(a<<19))^((a>>>22)|(a<<10));
      var t2=(S0+((a&B)^(a&C)^(B&C)))|0;h=g;g=f;f=e;e=(d+t1)|0;d=C;C=B;B=a;a=(t1+t2)|0;}
    H[0]=(H[0]+a)|0;H[1]=(H[1]+B)|0;H[2]=(H[2]+C)|0;H[3]=(H[3]+d)|0;
    H[4]=(H[4]+e)|0;H[5]=(H[5]+f)|0;H[6]=(H[6]+g)|0;H[7]=(H[7]+h)|0;}
  return H.map(function(v){return('00000000'+((v<0?v+4294967296:v).toString(16))).slice(-8);}).join('');
}

/* ─── NAVIGATION ─────────────────────────────────────────────────────── */
const PAGES = ['accueil','qui','projets','baaba','actualites','galerie','adhesion','contact','faq','dons','mentions','tdb'];
function navigate(id) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-links button,.nav-links a').forEach(b=>b.classList.remove('active'));
  const page = document.getElementById('page-'+id);
  if (page) page.classList.add('active');
  const navBtn = document.getElementById('nav-'+id);
  if (navBtn) navBtn.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if (id === 'tdb') {
    if (!isAdminAuthenticated()) {
      var pwd = prompt('🔒 Accès administrateur réservé à Wagne Sileymane\nEntrez le code administrateur :');
      if (!pwd) return;
      hashPassword(pwd).then(function(hash) {
        if (hash === ADMIN_ACCOUNTS.admin.hash) {
          sessionStorage.setItem('yell_admin_auth', 'true');
          setAdminSession({ username:'wagne-sileymane', role:'admin', scope:'all', label:'Wagne Sileymane' });
          document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
          document.getElementById('page-tdb').classList.add('active');
          window.scrollTo({top:0,behavior:'smooth'});
          updateAdminIdentityUI();
          initTDB(); gsInit();
          showToast('✅ Accès administrateur activé — Wagne Sileymane');
        } else {
          alert('❌ Code administrateur incorrect.');
        }
      });
      return;
    }
    updateAdminIdentityUI();
    initTDB(); gsInit();
  }
  if (id === 'galerie') { renderGallery(); }
}

function switchAdhMode(mode) {
  document.getElementById('adh-online-panel').style.display = mode === 'online' ? 'block' : 'none';
  document.getElementById('adh-print-panel').style.display = mode === 'print' ? 'block' : 'none';
  document.getElementById('adh-mode-online').classList.toggle('active', mode === 'online');
  document.getElementById('adh-mode-print').classList.toggle('active', mode === 'print');
}

/* ── Remplir et imprimer le formulaire d'un adhérent ─────────────── */
function printMemberForm(ref) {
  var m = loadMembers().find(function(x) { return x.reference === ref; });
  if (!m) { showToast('⚠ Membre introuvable'); return; }

  // Fermer le modal si ouvert
  closeMemberModal();

  // Naviguer vers la page adhésion en mode impression
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.getElementById('page-adhesion').classList.add('active');
  switchAdhMode('print');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Remplir le formulaire
  var form = document.getElementById('print-form');
  if (!form) return;

  // Référence
  var refField = form.querySelector('.pf-ref');
  if (refField) refField.textContent = 'Réf : ' + (m.reference || '—');

  // Photo
  var photoBox = form.querySelector('.pf-photo-box');
  if (photoBox) {
    if (m.photoUrl) {
      var urls = getPhotoFallbacks(m.photoUrl);
      photoBox.style.border = '2px solid #1A5C2A';
      var img = new Image();
      var tryIdx = 0;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:6px;';
      img.onload = function() { photoBox.innerHTML = ''; photoBox.appendChild(img); };
      img.onerror = function() {
        tryIdx++;
        if (tryIdx < urls.length) { img.src = urls[tryIdx]; }
        else { photoBox.style.border = '2px dashed #ccc'; photoBox.innerHTML = '<span>Photo<br>non disponible</span>'; }
      };
      img.src = urls[0];
    } else {
      photoBox.innerHTML = '<span>Photo<br>identité</span>';
    }
  }

  // Informations personnelles
  var fields = form.querySelectorAll('.pf-grid .pf-input');
  var personalData = [
    m.nom || '',
    m.prenom || '',
    m.datenais || '',
    (m.sexe === 'Masculin' ? '☑ Masculin   ☐ Féminin' : m.sexe === 'Féminin' ? '☐ Masculin   ☑ Féminin' : '☐ Masculin   ☐ Féminin'),
    m.tel || '',
    m.email || '',
    m.profession || '',
    m.adresse || ''
  ];
  for (var i = 0; i < Math.min(fields.length, personalData.length); i++) {
    if (personalData[i]) fields[i].textContent = personalData[i];
  }

  // Section d'appartenance (cocher la bonne)
  var sectionChecks = form.querySelectorAll('.pf-checkboxes')[0];
  if (sectionChecks) {
    var checks = sectionChecks.querySelectorAll('.pf-check');
    var sectionNames = ['Résidents de Thidé','Nouakchott','Nouadhibou','Zouerat','Diaspora Afrique','Diaspora Europe','Diaspora Amérique'];
    checks.forEach(function(chk, idx) {
      var name = sectionNames[idx] || '';
      var isMatch = (m.zone || '').toLowerCase().indexOf(name.toLowerCase()) !== -1;
      chk.textContent = (isMatch ? '☑ ' : '☐ ') + name;
    });
  }

  // Catégorie de cotisation (cocher la bonne)
  var catRows = form.querySelectorAll('.pf-table tbody tr');
  var catKeywords = ['Résident de Thidé','Ressortissant','Diaspora Afrique','Diaspora Europe','Membre de soutien'];
  catRows.forEach(function(row, idx) {
    var cells = row.querySelectorAll('td');
    if (cells.length > 0) {
      var keyword = catKeywords[idx] || '';
      var isMatch = (m.categorie || '').toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      cells[0].textContent = isMatch ? '☑' : '☐';
    }
  });

  // Mode de paiement (cocher le bon)
  var payChecks = form.querySelectorAll('.pf-checkboxes')[1];
  if (payChecks) {
    var pChecks = payChecks.querySelectorAll('.pf-check');
    var payNames = ['Bankily','Masrevi','Seddad','Espèces','Virement'];
    pChecks.forEach(function(chk, idx) {
      var name = payNames[idx] || '';
      var isMatch = (m.paiement || '').toLowerCase().indexOf(name.toLowerCase()) !== -1;
      chk.textContent = (isMatch ? '☑ ' : '☐ ') + chk.textContent.substring(2);
    });
  }

  // Référence transaction
  var refTxField = form.querySelector('.pf-grid:last-of-type .pf-input');
  // Find the ref transaction field more precisely
  var allGrids = form.querySelectorAll('.pf-grid');
  for (var g = 0; g < allGrids.length; g++) {
    var label = allGrids[g].querySelector('label');
    if (label && label.textContent.indexOf('transaction') !== -1) {
      var inp = allGrids[g].querySelector('.pf-input');
      if (inp) inp.textContent = m.refTx || '';
    }
  }

  // Engagement (tout coché)
  var engChecks = form.querySelector('.pf-engagement');
  if (engChecks) {
    var eChecks = engChecks.querySelectorAll('.pf-check');
    eChecks.forEach(function(chk) {
      chk.textContent = '☑' + chk.textContent.substring(1);
    });
  }

  // Date de soumission dans la signature
  var sigBlocks = form.querySelectorAll('.pf-sig-block');
  if (sigBlocks.length >= 2) {
    var dateField = sigBlocks[1].querySelector('.pf-input');
    if (dateField) dateField.textContent = m.date || '';
  }

  // Statut dans le cadre admin
  var adminBox = form.querySelector('.pf-admin-box');
  if (adminBox) {
    var adminFields = adminBox.querySelectorAll('.pf-input');
    if (adminFields.length >= 4) {
      adminFields[0].textContent = m.date || ''; // date réception
      var statusText = m.status === 'valide' ? '☑ Accepté   ☐ Refusé' :
                       m.status === 'refuse' ? '☐ Accepté   ☑ Refusé' :
                       '☐ Accepté   ☐ Refusé';
      adminFields[3].textContent = statusText;
      if (m.montant) adminFields[2].textContent = m.montant.toLocaleString('fr-FR') + ' MRU';
    }
  }

  // Déclencher l'impression après un court délai
  setTimeout(function() {
    window.print();
  }, 600);
}

/* ─── SCROLL NAV ─────────────────────────────────────────────────────── */
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>20);
});

/* ─── HAMBURGER ──────────────────────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ─── FADE IN ────────────────────────────────────────────────────────── */

/* ─── TOAST ──────────────────────────────────────────────────────────── */
function showToast(msg) {
  var t = document.getElementById('global-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'global-toast';
    t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);background:#1A5C2A;color:#fff;padding:12px 24px;border-radius:40px;font-size:14px;font-weight:600;font-family:Outfit,sans-serif;z-index:9999;opacity:0;transition:all .3s;box-shadow:0 8px 24px rgba(0,0,0,.2);pointer-events:none;white-space:nowrap;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(function() {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(20px)';
  }, 3200);
}
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
},{threshold:0.12});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));

/* ─── ACCORDION ──────────────────────────────────────────────────────── */
function toggleAccordion(btn) {
  const body = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  btn.classList.toggle('open',!isOpen);
  body.classList.toggle('open',!isOpen);
}

/* ═══════════════════════════════════════════════════════════════════════
   FIREBASE + localStorage — Stockage hybride
   Firebase = données partagées entre appareils en temps réel
   localStorage = fallback hors-ligne
═══════════════════════════════════════════════════════════════════════ */
const TDB_KEY = 'yellitaare_members';
var fbApp = null;
var fbDB = null;
var fbReady = false;
var fbListenerAttached = false;

// ── Initialisation Firebase ──────────────────────────────────────────
function fbInit() {
  try {
    var configStr = localStorage.getItem('yell_firebase_config');
    if (!configStr) { fbSetStatus('off', 'Firebase non configuré — données en local uniquement'); return; }
    var config = JSON.parse(configStr);
    if (!config.databaseURL) { fbSetStatus('error', 'Config invalide — databaseURL manquant'); return; }

    if (!fbApp) {
      fbApp = firebase.initializeApp(config);
      fbDB = firebase.database();
    }
    fbReady = true;
    fbSetStatus('online', '🟢 Firebase connecté — données synchronisées en temps réel');

    // Écouter les changements en temps réel
    if (!fbListenerAttached) {
      fbListenerAttached = true;
      fbDB.ref('members').on('value', function(snap) {
        var data = snap.val();
        if (data) {
          var list = Array.isArray(data) ? data : Object.values(data);
          localStorage.setItem(TDB_KEY, JSON.stringify(list));
          // Rafraîchir le TDB si la page est active
          if (document.getElementById('page-tdb')?.classList.contains('active')) {
            initTDB();
          }
        }
      });
      fbDB.ref('spaces').on('value', function(snap) {
        var data = snap.val();
        if (data) {
          localStorage.setItem('yellitaare_spaces', JSON.stringify(data));
        }
      });
      fbDB.ref('gallery').on('value', function(snap) {
        var data = snap.val();
        if (data) {
          localStorage.setItem('yellitaare_gallery', JSON.stringify(Array.isArray(data) ? data : Object.values(data)));
          renderGallery();
        }
      });
    }

    // Migration initiale : pousser les données locales vers Firebase si Firebase est vide
    fbDB.ref('members').once('value', function(snap) {
      if (!snap.val() || (Array.isArray(snap.val()) && snap.val().length === 0)) {
        var local = JSON.parse(localStorage.getItem(TDB_KEY) || '[]');
        if (local.length > 0) {
          fbDB.ref('members').set(local);
          
        }
      }
    });
    fbDB.ref('spaces').once('value', function(snap) {
      if (!snap.val()) {
        var localSpaces = JSON.parse(localStorage.getItem('yellitaare_spaces') || '{}');
        if (Object.keys(localSpaces).length > 0) {
          fbDB.ref('spaces').set(localSpaces);
          
        }
      }
    });

  } catch(e) {
    console.error('Firebase init error:', e);
    fbSetStatus('error', '🔴 Erreur Firebase : ' + e.message);
    fbReady = false;
  }
}

function fbSetStatus(state, msg) {
  var dot = document.getElementById('fb-dot');
  var txt = document.getElementById('fb-status-txt');
  if (!dot || !txt) return;
  if (state === 'online') { dot.style.background = '#16A34A'; dot.style.boxShadow = '0 0 6px rgba(22,163,74,.5)'; }
  else if (state === 'error') { dot.style.background = '#DC2626'; dot.style.boxShadow = '0 0 6px rgba(220,38,38,.5)'; }
  else { dot.style.background = '#F59E0B'; dot.style.boxShadow = '0 0 6px rgba(245,158,11,.5)'; }
  txt.textContent = msg;
}

function toggleFbConfig() {
  var panel = document.getElementById('fb-config-panel');
  if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  var input = document.getElementById('fb-config-input');
  var saved = localStorage.getItem('yell_firebase_config');
  if (input && saved) input.value = saved;
}

function fbSaveConfig() {
  var input = document.getElementById('fb-config-input');
  if (!input) return;
  var val = input.value.trim();
  try {
    var config = JSON.parse(val);
    if (!config.databaseURL) { showToast('⚠ Le champ databaseURL est requis'); return; }
    localStorage.setItem('yell_firebase_config', val);
    // Recharger la page pour initialiser Firebase
    showToast('✅ Configuration Firebase sauvegardée — rechargement...');
    setTimeout(function() { location.reload(); }, 1500);
  } catch(e) {
    showToast('⚠ JSON invalide — vérifiez le format');
  }
}

function fbClearConfig() {
  if (!confirm('Désactiver Firebase ? Les données resteront en local.')) return;
  localStorage.removeItem('yell_firebase_config');
  fbReady = false;
  fbApp = null;
  fbDB = null;
  fbSetStatus('off', 'Firebase désactivé — données en local uniquement');
  showToast('Firebase désactivé');
}

function fbSyncNow() {
  if (!fbReady) { showToast('⚠ Firebase non configuré'); return; }
  var members = loadMembers();
  fbDB.ref('members').set(members).then(function() {
    var spaces = JSON.parse(localStorage.getItem('yellitaare_spaces') || '{}');
    return fbDB.ref('spaces').set(spaces);
  }).then(function() {
    var gallery = JSON.parse(localStorage.getItem('yellitaare_gallery') || '[]');
    return fbDB.ref('gallery').set(gallery);
  }).then(function() {
    showToast('✅ Synchronisation Firebase terminée');
    fbSetStatus('online', '🟢 Firebase synchronisé — ' + members.length + ' membre(s)');
  }).catch(function(e) {
    showToast('⚠ Erreur sync : ' + e.message);
  });
}

// Initialiser Firebase au chargement
document.addEventListener('DOMContentLoaded', function() { fbInit(); });

// ── Fonctions de stockage (Firebase + localStorage) ─────────────────
function loadMembers() {
  try { return JSON.parse(localStorage.getItem(TDB_KEY) || '[]'); }
  catch(e) { return []; }
}

function saveMembers(list) {
  localStorage.setItem(TDB_KEY, JSON.stringify(list));
  if (fbReady && fbDB) {
    fbDB.ref('members').set(list).catch(function(e) { console.warn('Firebase write error:', e); });
  }
}

function saveMemberToTDB(data) {
  const list = loadMembers();
  list.unshift(data);
  saveMembers(list);
}

function updateMemberStatus(ref, newStatus) {
  const list = loadMembers();
  const idx = list.findIndex(m=>m.reference===ref);
  if (idx !== -1) { list[idx].status = newStatus; saveMembers(list); }
}

function deleteMember(ref) {
  const list = loadMembers().filter(m=>m.reference!==ref);
  saveMembers(list);
}

function clearAllData() {
  localStorage.removeItem(TDB_KEY);
  if (fbReady && fbDB) fbDB.ref('members').remove();
  initTDB();
}

/* ═══════════════════════════════════════════════════════════════════════
   GOOGLE SHEETS — SYNCHRONISATION
═══════════════════════════════════════════════════════════════════════ */
var APPS_SCRIPT_URL = localStorage.getItem('yell_api_url') ||
  'https://script.google.com/macros/s/AKfycbzn_r-Hxt91MWl9zOVHbYaebzSD3VMDPjisiF0EOlwyLMvKbQ-IMTJx5rGNzvrZAwpNVA/exec';

function gsGetUrl() {
  return localStorage.getItem('yell_api_url') || APPS_SCRIPT_URL;
}

function gsSetStatus(state, msg) {
  var dot = document.getElementById('gs-dot');
  var txt = document.getElementById('gs-status-txt');
  if (!dot || !txt) return;
  if (state === 'online') {
    dot.style.background = '#16A34A';
    dot.style.boxShadow  = '0 0 6px rgba(22,163,74,.5)';
  } else if (state === 'error') {
    dot.style.background = '#DC2626';
    dot.style.boxShadow  = '0 0 6px rgba(220,38,38,.5)';
  } else {
    dot.style.background = '#F59E0B';
    dot.style.boxShadow  = '0 0 6px rgba(245,158,11,.5)';
  }
  txt.textContent = msg;
}

function gsInit() {
  var inp = document.getElementById('gs-url-input');
  if (inp) inp.value = gsGetUrl();
  gsCheckConnection();
}

function gsSaveUrl() {
  var inp = document.getElementById('gs-url-input');
  if (!inp) return;
  var url = inp.value.trim();
  if (!url || url.indexOf('https://script.google.com/') !== 0) {
    gsSetStatus('error', 'URL invalide — doit commencer par https://script.google.com/');
    return;
  }
  localStorage.setItem('yell_api_url', url);
  APPS_SCRIPT_URL = url;
  gsSetStatus('checking', 'URL sauvegardée. Test de connexion...');
  setTimeout(gsCheckConnection, 500);
}

function gsCheckConnection() {
  var url = gsGetUrl();
  gsSetStatus('checking', 'Connexion en cours...');
  var inp = document.getElementById('gs-url-input');
  if (inp) inp.value = url;

  var cb = '_gsCb_' + Date.now();
  var s  = document.createElement('script');
  var done = false;
  window[cb] = function(data) {
    done = true;
    delete window[cb];
    try { document.head.removeChild(s); } catch(e) {}
    if (Array.isArray(data)) {
      gsSetStatus('online', '🟢 Connecté — ' + data.length + ' adhérent(s) sur Google Sheets');
      if (data.length > 0) mergeRemoteMembers(data);
    } else {
      gsSetStatus('online', '🟢 Sheets connecté (réponse reçue)');
    }
  };
  s.onerror = function() {
    if (done) return;
    done = true;
    delete window[cb];
    try { document.head.removeChild(s); } catch(e) {}
    gsSetStatus('error', '🔴 Connexion impossible — vérifiez l\'URL et le déploiement');
  };
  s.src = url + '?action=list&callback=' + cb;
  document.head.appendChild(s);
  setTimeout(function() {
    if (!done) {
      done = true;
      delete window[cb];
      try { document.head.removeChild(s); } catch(e) {}
      gsSetStatus('error', '🔴 Timeout — Apps Script ne répond pas');
    }
  }, 10000);
}

function normalizeStatus(s) {
  if (!s) return 'attente';
  var v = String(s).toLowerCase().trim();
  if (v.indexOf('valid') !== -1) return 'valide';
  if (v.indexOf('refus') !== -1 || v.indexOf('rejet') !== -1) return 'refuse';
  return 'attente';
}

// Convertir une URL Google Drive en URL image directe
function convertDriveUrl(url) {
  if (!url) return null;
  url = String(url).trim();
  if (!url) return null;

  // Déjà une URL image directe
  if (url.indexOf('lh3.googleusercontent.com') !== -1) return url;
  if (url.indexOf('data:image') === 0) return url;
  if (url.indexOf('drive.google.com/thumbnail') !== -1) return url;

  // Extraire le File ID de Google Drive (plusieurs formats)
  var fileId = null;
  var match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match) fileId = match[1];
  if (!fileId) { match = url.match(/\/d\/([a-zA-Z0-9_-]+)/); if (match) fileId = match[1]; }
  if (!fileId) { match = url.match(/uc\?.*id=([a-zA-Z0-9_-]+)/); if (match) fileId = match[1]; }

  if (fileId) {
    // Utiliser thumbnail Google Drive (plus fiable, fonctionne même semi-privé)
    return 'https://drive.google.com/thumbnail?id=' + fileId + '&sz=w400';
  }

  // Si c'est déjà une URL http valide (autre hébergeur)
  if (url.indexOf('http') === 0) return url;

  return null;
}

// Générer les URLs alternatives pour une photo
function getPhotoFallbacks(url) {
  if (!url) return [];
  var fileId = null;
  var match = String(url).match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match) fileId = match[1];
  if (!fileId) { match = String(url).match(/\/d\/([a-zA-Z0-9_-]+)/); if (match) fileId = match[1]; }
  if (!fileId) { match = String(url).match(/thumbnail\?id=([a-zA-Z0-9_-]+)/); if (match) fileId = match[1]; }
  if (!fileId) { match = String(url).match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/); if (match) fileId = match[1]; }
  if (!fileId) return [url];
  return [
    'https://drive.google.com/thumbnail?id=' + fileId + '&sz=w400',
    'https://lh3.googleusercontent.com/d/' + fileId,
    'https://drive.google.com/uc?export=view&id=' + fileId
  ];
}

function mergeRemoteMembers(data) {
  var local = loadMembers();
  var localRefs = {};
  local.forEach(function(m) { localRefs[m.reference] = true; });
  var added = 0;

  // Cherche une valeur parmi plusieurs noms de clés (exact puis partiel)
  function pick(row, keys) {
    for (var i = 0; i < keys.length; i++) {
      if (row[keys[i]] !== undefined && row[keys[i]] !== '') return String(row[keys[i]]);
    }
    // Fallback : recherche partielle insensible à la casse
    for (var i = 0; i < keys.length; i++) {
      var lk = keys[i].toLowerCase();
      for (var k in row) {
        if (k.toLowerCase().indexOf(lk) !== -1 && row[k] !== undefined && row[k] !== '') {
          return String(row[k]);
        }
      }
    }
    return '';
  }

  function formatDate(raw) {
    if (!raw) return '';
    try {
      var d = new Date(raw);
      if (isNaN(d.getTime())) return String(raw);
      return d.toLocaleDateString('fr-FR', {day:'2-digit', month:'long', year:'numeric'});
    } catch(e) { return String(raw); }
  }

  function extractMontant(val) {
    if (!val) return 0;
    var nums = String(val).replace(/[^\d]/g, '');
    return parseInt(nums) || 0;
  }

  data.forEach(function(r) {
    // === MAPPING EXACT des colonnes Google Sheets ===
    var dateStr   = pick(r, ['Horodateur','Timestamp','date_soumission']);
    var nom       = pick(r, ['Nom','nom']);
    var prenom    = pick(r, ['Prénom','Prenom','prenom']);
    var datenais  = pick(r, ['Date de naissance','date_naissance']);
    var sexe      = pick(r, ['Sexe','sexe']);
    var tel       = pick(r, ['Téléphone','Telephone','tel']);
    var email     = pick(r, ['Email','email','E-mail']);
    var zone      = pick(r, ['Section','Zone','zone']);
    var profession= pick(r, ['Profession','profession']);
    var adresse   = pick(r, ['Lieu de résidence (Adresse)','Adresse','adresse']);
    var categorie = pick(r, ['Catégorie','categorie','Catégorie cotisation']);
    var paiement  = pick(r, ['Mode de paiement','mode_paiement','Paiement']);
    var refTx     = pick(r, ['Référence transaction','reference_transaction','refTx']);
    var statut    = pick(r, ['statut_paiement','Statut','statut','Status']);
    var photoRaw  = pick(r, ['Photo de l\'adhérent','Photo','photo','photoUrl','photo_adherent']);

    // Convertir l'URL Google Drive en URL image directe
    var photoUrl = convertDriveUrl(photoRaw);

    // Référence : générer depuis le timestamp (Google Forms n'en a pas)
    var ref = pick(r, ['reference','Reference','Référence']);
    if (!ref) {
      var hash = dateStr ? new Date(dateStr).getTime() : Date.now();
      ref = 'GF-' + hash;
    }
    if (localRefs[ref]) return;

    var montant = extractMontant(categorie);

    local.push({
      reference : ref,
      date      : formatDate(dateStr),
      nom       : nom,
      prenom    : prenom,
      datenais  : datenais,
      sexe      : sexe,
      tel       : tel,
      email     : email,
      zone      : zone,
      profession: profession,
      adresse   : adresse,
      categorie : categorie,
      montant   : montant,
      paiement  : paiement,
      refTx     : refTx,
      photoUrl  : photoUrl,
      status    : normalizeStatus(statut || 'attente')
    });
    localRefs[ref] = true;
    added++;
  });
  if (added > 0) {
    saveMembers(local);
    initTDB();
    
  }
}

function sendViaJSONP(url, payload) {
  return new Promise(function(resolve) {
    var cbName = '_yell_' + Date.now() + '_' + Math.floor(Math.random()*9999);
    var script;
    var timer;
    var done = false;

    function cleanup(ok) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      delete window[cbName];
      if (script && script.parentNode) {
        try { script.parentNode.removeChild(script); } catch(e) {}
      }
      resolve(ok);
    }

    window[cbName] = function(resp) {
      cleanup(resp && (resp.status === 'ok' || resp.status === 'duplicate'));
    };

    var params = ['action=save', 'callback=' + cbName];
    Object.keys(payload).forEach(function(key) {
      var val = payload[key];
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(String(val != null ? val : '')));
    });

    var fullUrl = url + '?' + params.join('&');

    script = document.createElement('script');
    script.src = fullUrl;
    script.onerror = function() {
      var img = new Image();
      img.onload = function() { cleanup(true); };
      img.onerror = function() { cleanup(true); };
      img.src = fullUrl.replace('callback=' + cbName, 'callback=_noop');
      setTimeout(function() { if (!done) cleanup(true); }, 10000);
    };

    document.head.appendChild(script);

    timer = setTimeout(function() {
      if (!done) {
        var img = new Image();
        img.onload = function() { cleanup(true); };
        img.onerror = function() { cleanup(true); };
        img.src = fullUrl.replace('callback=' + cbName, 'callback=_noop');
        setTimeout(function() { if (!done) cleanup(true); }, 8000);
      }
    }, 20000);
  });
}

function sendToGoogleSheets(payload) {
  return sendViaJSONP(gsGetUrl(), payload);
}

function gsSync() {
  var url = gsGetUrl();
  if (!url || url.indexOf('script.google.com') === -1) {
    gsSetStatus('error', '⚠ URL non configurée — saisissez l\'URL Apps Script ci-dessus');
    return;
  }
  var members = loadMembers();
  if (!members.length) {
    gsSetStatus('checking', '📭 Aucun dossier local à synchroniser — récupération depuis Sheets...');
    gsCheckConnection();
    return;
  }
  gsSetStatus('checking', '⏳ Synchronisation de ' + members.length + ' dossier(s)...');
  var sent = 0;
  var total = members.length;
  members.forEach(function(m) {
    var payload = {
      'Nom': m.nom || '',
      'Prénom': m.prenom || '',
      'Date de naissance': m.datenais || '',
      'Sexe': m.sexe || '',
      'Téléphone': m.tel || '',
      'Email': m.email || '',
      'Section': m.zone || '',
      'Profession': m.profession || '',
      'Lieu de résidence (Adresse)': m.adresse || '',
      'Catégorie': m.categorie || '',
      'Mode de paiement': m.paiement || '',
      'Référence transaction': m.refTx || '',
      'statut_paiement': m.status || 'attente'
    };
    sendToGoogleSheets(payload).then(function(ok) {
      sent++;
      if (sent >= total) {
        gsSetStatus('online', '✅ Synchronisation terminée — ' + sent + '/' + total + ' dossier(s)');
        gsCheckConnection();
      }
    });
  });
}

function gsDiag() {
  var panel = document.getElementById('gs-diag-panel');
  if (!panel) return;
  panel.style.display = 'block';
  panel.innerHTML = '';
  var url = gsGetUrl();
  var log = function(msg) { panel.innerHTML += msg + '\n'; panel.scrollTop = panel.scrollHeight; };
  log('=== DIAGNOSTIC GOOGLE SHEETS ===');
  log('URL : ' + url);
  log('');
  log('TEST 1 : JSONP GET ?action=list...');
  var t = Date.now();
  var cb = '_diag_' + Date.now();
  var s = document.createElement('script');
  var diagDone = false;
  window[cb] = function(data) {
    diagDone = true;
    delete window[cb];
    try { document.head.removeChild(s); } catch(e) {}
    log('  Temps   : ' + (Date.now()-t) + 'ms');
    if (Array.isArray(data)) {
      log('  JSON OK : ' + data.length + ' element(s)');
      if (data.length > 0) {
        log('  Colonnes : ' + Object.keys(data[0]).join(', '));
        log('  Exemple  : ' + JSON.stringify(data[0]).substring(0, 300));
      }
    } else {
      log('  Reponse : ' + JSON.stringify(data).substring(0,200));
    }
    log('');
    log('TEST 2 : envoi test JSONP...');
    sendToGoogleSheets({ reference: 'TEST-DIAG-' + Date.now(), statut_paiement: 'Test - a supprimer' })
      .then(function(ok) {
        log('  Envoi : ' + (ok ? 'OK' : 'ECHEC'));
        log('');
        log('=== FIN DIAGNOSTIC ===');
      });
  };
  s.onerror = function() {
    diagDone = true;
    delete window[cb];
    try { document.head.removeChild(s); } catch(e) {}
    log('  ERREUR : script JSONP non chargé');
    log('  → Vérifiez le déploiement Apps Script');
    log('');
    log('=== FIN DIAGNOSTIC ===');
  };
  s.src = url + '?action=list&callback=' + cb;
  document.head.appendChild(s);
  setTimeout(function() {
    if (!diagDone) {
      diagDone = true;
      delete window[cb];
      try { document.head.removeChild(s); } catch(e) {}
      log('  TIMEOUT après ' + (Date.now()-t) + 'ms');
      log('');
      log('=== FIN DIAGNOSTIC ===');
    }
  }, 15000);
}

/* ── INITIALISATION TDB ─────────────────────────────────────────────── */
function initTDB() {
  const members = loadMembers();
  renderKPIs(members);
  renderCharts(members);
  renderTable();
  renderDocs();
  const now = new Date().toLocaleString('fr-FR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
  const el = document.getElementById('tdb-last-update');
  if (el) el.textContent = 'Mis à jour : '+now;
}

/* ── KPIs ────────────────────────────────────────────────────────────── */
function renderKPIs(members) {
  const total    = members.length;
  const valides  = members.filter(m=>m.status==='valide').length;
  const attente  = members.filter(m=>m.status==='attente').length;
  const montant  = members.filter(m=>m.status!=='refuse').reduce((s,m)=>s+(m.montant||0),0);
  const tauxV    = total ? Math.round((valides/total)*100) : 0;
  // ce mois
  const now = new Date();
  const moisLabel = now.toLocaleDateString('fr-FR',{month:'long',year:'numeric'});
  const ceMois   = members.filter(m=>{
    if (!m.date) return false;
    try { const d=new Date(m.date.split(' ').reverse().join('-')); return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear(); } catch(e){return false;}
  }).length;

  setText('kpi-total', total);
  setText('kpi-valide', valides);
  setText('kpi-attente', attente);
  setText('kpi-montant', montant.toLocaleString('fr-FR')+' MRU');
  setText('kpi-taux-valid', tauxV+'% taux validation');
  setText('kpi-delta-total', ceMois > 0 ? `+${ceMois} en ${moisLabel}` : '— ce mois');
  setText('kpi-delta-att', attente > 0 ? `${attente} dossier${attente>1?'s':''} à traiter` : '✓ Tout validé');
  setText('kpi-delta-mnt', `Sur ${total} dossier${total>1?'s':''}`);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ── DONUT CHART ─────────────────────────────────────────────────────── */
const ZONE_COLORS = {
  'Village de Thidé':           '#1A5C2A',
  'Nationaux (Mauritanie)':     '#C9982A',
  'Diaspora – Afrique':         '#2E7D32',
  'Diaspora – Europe / Amériques': '#9B7015',
  'Membre de soutien':          '#6B7280'
};
const ZONE_SHORT = {
  'Village de Thidé':'Village','Nationaux (Mauritanie)':'Nationaux',
  'Diaspora – Afrique':'Diaspora Afrique','Diaspora – Europe / Amériques':'Diaspora Europe/Amér.',
  'Membre de soutien':'Soutien'
};

function renderCharts(members) {
  renderDonut(members);
  renderBarChart(members);
}

function renderDonut(members) {
  const svg    = document.getElementById('donut-svg');
  const legend = document.getElementById('donut-legend');
  if (!svg || !legend) return;

  const counts = {};
  members.forEach(m=>{ counts[m.zone]=(counts[m.zone]||0)+1; });
  const total = members.length;

  if (total === 0) {
    svg.innerHTML = `<circle cx="60" cy="60" r="46" fill="none" stroke="#E5E7EB" stroke-width="14"/>
      <text x="60" y="64" text-anchor="middle" font-size="11" fill="#9CA3AF">Aucun</text>`;
    legend.innerHTML = '<div style="font-size:12px;color:#9CA3AF">Pas encore de données</div>';
    return;
  }

  const cx=60,cy=60,r=46,ri=30;
  let startAngle = -Math.PI/2;
  let paths = '';
  Object.entries(counts).forEach(([zone,count])=>{
    const angle = (count/total)*2*Math.PI;
    const endAngle = startAngle+angle;
    const x1=cx+r*Math.cos(startAngle),y1=cy+r*Math.sin(startAngle);
    const x2=cx+r*Math.cos(endAngle),y2=cy+r*Math.sin(endAngle);
    const ix1=cx+ri*Math.cos(startAngle),iy1=cy+ri*Math.sin(startAngle);
    const ix2=cx+ri*Math.cos(endAngle),iy2=cy+ri*Math.sin(endAngle);
    const large = angle>Math.PI?1:0;
    const color = ZONE_COLORS[zone]||'#6B7280';
    paths += `<path d="M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${ri},${ri} 0 ${large},0 ${ix1},${iy1} Z" fill="${color}" opacity=".9"/>`;
    startAngle = endAngle;
  });
  paths += `<text x="60" y="57" text-anchor="middle" font-family="Georgia,serif" font-size="20" font-weight="700" fill="#1A5C2A">${total}</text>
    <text x="60" y="70" text-anchor="middle" font-size="9" fill="#6B7280">membres</text>`;
  svg.innerHTML = paths;

  legend.innerHTML = Object.entries(counts).map(([zone,count])=>`
    <div class="tdb-legend-item">
      <div class="tdb-legend-dot" style="background:${ZONE_COLORS[zone]||'#6B7280'}"></div>
      <span>${ZONE_SHORT[zone]||zone}</span>
      <span class="tdb-legend-pct">${count}</span>
    </div>`).join('');
}

function renderBarChart(members) {
  const el = document.getElementById('bar-chart');
  if (!el) return;
  const cats = {
    'Résident de Thidé':0,'Ressortissant – villes mauritaniennes':0,
    'Diaspora Afrique':0,'Diaspora Europe / Amériques':0,'Membre de soutien':0
  };
  members.forEach(m=>{
    const k = Object.keys(cats).find(c=>m.categorie&&m.categorie.includes(c.split(' ')[0].split('–')[0].trim()));
    if (k) cats[k]++;
    else {
      // fallback: match by first word
      const first = (m.categorie||'').split(' ')[0];
      const match = Object.keys(cats).find(c=>c.startsWith(first));
      if (match) cats[match]++;
    }
  });
  const max = Math.max(...Object.values(cats), 1);
  const CAT_SHORT = {
    'Résident de Thidé':'Village · 100 MRU',
    'Ressortissant – villes mauritaniennes':'Nationaux · 300 MRU',
    'Diaspora Afrique':'Diaspora Afrique · 500 MRU',
    'Diaspora Europe / Amériques':'Diaspora Europe · 1 000 MRU',
    'Membre de soutien':'Soutien · 2 000 MRU'
  };
  el.innerHTML = Object.entries(cats).map(([cat,count])=>`
    <div class="tdb-bar-row">
      <div class="tdb-bar-label">${CAT_SHORT[cat]||cat}</div>
      <div class="tdb-bar-bg"><div class="tdb-bar-fill" style="width:${Math.round((count/max)*100)}%"></div></div>
      <div class="tdb-bar-count">${count}</div>
    </div>`).join('');
}

/* ── TABLE ───────────────────────────────────────────────────────────── */
function renderTable() {
  const members  = loadMembers();
  const search   = (document.getElementById('tdb-search')?.value||'').toLowerCase();
  const fZone    = document.getElementById('tdb-filter-zone')?.value||'';
  const fStatus  = document.getElementById('tdb-filter-status')?.value||'';
  const fPaie    = document.getElementById('tdb-filter-paie')?.value||'';

  let filtered = members.filter(m=>{
    const matchSearch = !search || 
      (m.nom+' '+m.prenom).toLowerCase().includes(search) ||
      (m.reference||'').toLowerCase().includes(search) ||
      (m.tel||'').includes(search);
    const matchZone   = !fZone   || (m.zone||'').toLowerCase().includes(fZone.toLowerCase());
    const matchStatus = !fStatus || m.status===fStatus;
    const matchPaie   = !fPaie   || (m.paiement||'').toLowerCase().includes(fPaie.toLowerCase());
    return matchSearch&&matchZone&&matchStatus&&matchPaie;
  });

  const countEl = document.getElementById('tdb-count');
  if (countEl) countEl.textContent = `${filtered.length} dossier${filtered.length>1?'s':''}`;

  const container = document.getElementById('tdb-table-container');
  if (!container) return;

  if (filtered.length === 0) {
    const isEmpty = members.length === 0;
    container.innerHTML = `<div class="tdb-empty">
      <div class="tdb-empty-icon">${isEmpty?'📋':'🔍'}</div>
      <h3>${isEmpty?'Aucun dossier reçu':'Aucun résultat'}</h3>
      <p>${isEmpty?'Les dossiers d\'adhésion soumis via le formulaire apparaîtront ici automatiquement.':'Modifiez vos critères de recherche pour afficher des résultats.'}</p>
      ${isEmpty?`<button class="btn btn-primary" onclick="loadDemoData();initTDB()">Charger des données démo</button>`:''}
    </div>`;
    return;
  }

  const statusBadge = s => {
    const cfg = {
      attente: {cls:'status-attente', label:'⏳ En attente'},
      valide:  {cls:'status-valide',  label:'✅ Validé'},
      refuse:  {cls:'status-refuse',  label:'❌ Refusé'}
    };
    const c = cfg[s]||{cls:'status-attente',label:'?'};
    return `<span class="tdb-status-badge ${c.cls}">${c.label}</span>`;
  };

  container.innerHTML = `<div style="overflow-x:auto"><table class="tdb-table">
    <thead>
      <tr>
        <th>Horodateur</th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Date de naissance</th>
        <th>Sexe</th>
        <th>Téléphone</th>
        <th>Email</th>
        <th>Section</th>
        <th>Profession</th>
        <th>Adresse</th>
        <th>Catégorie</th>
        <th>Mode de paiement</th>
        <th>Réf. transaction</th>
        <th>Photo</th>
        <th>Statut</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${filtered.map(m=>`<tr>
        <td style="font-size:12px;color:var(--gris);white-space:nowrap">${m.date||'—'}</td>
        <td style="font-weight:600">${(m.nom||'—').toUpperCase()}</td>
        <td>${m.prenom||'—'}</td>
        <td style="font-size:12px;color:var(--gris)">${m.datenais||'—'}</td>
        <td style="font-size:12px">${m.sexe||'—'}</td>
        <td style="font-size:12px;white-space:nowrap">${m.tel||'—'}</td>
        <td style="font-size:12px;color:var(--gris)">${m.email||'—'}</td>
        <td style="font-size:12px">${(m.zone||'—')}</td>
        <td style="font-size:12px;color:var(--gris)">${m.profession||'—'}</td>
        <td style="font-size:12px;color:var(--gris)">${m.adresse||'—'}</td>
        <td>
          <div style="font-size:12px;font-weight:600;color:var(--vert)">${m.categorie||'—'}</div>
          <div style="font-size:11px;color:var(--or-fonce);font-weight:700">${m.montant?m.montant.toLocaleString('fr-FR')+'\u00a0MRU':''}</div>
        </td>
        <td style="font-size:12px">${(m.paiement||'—')}</td>
        <td style="font-size:11px;font-family:monospace;color:var(--gris)">${m.refTx||'—'}</td>
        <td>${m.photoUrl?`<img src="${m.photoUrl}" style="width:36px;height:36px;object-fit:cover;border-radius:6px;border:1px solid rgba(26,92,42,.15);" onerror="this.style.display='none'">`:'<span style="color:var(--gris);font-size:11px">—</span>'}</td>
        <td>${statusBadge(m.status)}</td>
        <td>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="tdb-action-btn view"    onclick="viewMember('${m.reference}')">Voir</button>
            ${m.status!=='valide' ?`<button class="tdb-action-btn validate" onclick="changeStatus('${m.reference}','valide')">Valider</button>`:''}
            ${m.status!=='refuse' ?`<button class="tdb-action-btn refuse"   onclick="changeStatus('${m.reference}','refuse')">Refuser</button>`:''}
            <button class="tdb-action-btn view" style="background:#FDF6E3;color:#9B7015" onclick="printMemberForm('${m.reference}')">🖨</button>
          </div>
        </td>
      </tr>`).join('')}
    </tbody>
  </table></div>`;
}

function changeStatus(ref, newStatus) {
  updateMemberStatus(ref, newStatus);
  initTDB();
}

function resetFilters() {
  ['tdb-search','tdb-filter-zone','tdb-filter-status','tdb-filter-paie'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.value='';
  });
  renderTable();
}

/* ── MODAL MEMBRE ────────────────────────────────────────────────────── */
function viewMember(ref) {
  const m = loadMembers().find(x=>x.reference===ref);
  if (!m) return;
  setText('mem-name',  `${m.prenom||''} ${(m.nom||'').toUpperCase()}`);
  setText('mem-ref',   m.reference||'—');
  setText('mem-zone',  m.zone||'—');
  setText('mem-dob',   m.datenais||'—');
  setText('mem-sex',   m.sexe||'—');
  setText('mem-tel',   m.tel||'—');
  setText('mem-email', m.email||'—');
  setText('mem-prof',  m.profession||'—');
  setText('mem-adr',   m.adresse||'—');
  setText('mem-cat',   m.categorie||'—');
  setText('mem-cotis', m.montant?(m.montant.toLocaleString('fr-FR')+' MRU'):'—');
  setText('mem-paie',  m.paiement||'—');
  setText('mem-reftx', m.refTx||'—');
  setText('mem-date',  m.date||'—');
  const statusLabels = {attente:'⏳ En attente de validation',valide:'✅ Validé',refuse:'❌ Refusé'};
  setText('mem-status-disp', statusLabels[m.status]||m.status);

  const photo = document.getElementById('mem-photo');
  if (photo) {
    var defaultSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:36px;color:rgba(255,255,255,.5)"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>';
    if (m.photoUrl) {
      var urls = getPhotoFallbacks(m.photoUrl);
      var img = new Image();
      var tryIdx = 0;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover';
      img.onload = function() { photo.innerHTML = ''; photo.appendChild(img); };
      img.onerror = function() {
        tryIdx++;
        if (tryIdx < urls.length) { img.src = urls[tryIdx]; }
        else { photo.innerHTML = defaultSvg; }
      };
      img.src = urls[0];
    } else {
      photo.innerHTML = defaultSvg;
    }
  }

  const actions = document.getElementById('mem-actions');
  if (actions) {
    let btns = `<button class="btn btn-outline" style="font-size:13px;padding:8px 18px" onclick="closeMemberModal()">Fermer</button>`;
    if (m.status!=='valide') btns+=`<button class="btn btn-primary" style="font-size:13px;padding:8px 18px" onclick="changeStatus('${ref}','valide');closeMemberModal()">✅ Valider</button>`;
    if (m.status!=='refuse') btns+=`<button class="btn" style="background:#FEE2E2;color:#991B1B;font-size:13px;padding:8px 18px;border-radius:40px;border:none;font-weight:600;cursor:pointer" onclick="if(confirm('Refuser ce dossier ?')){changeStatus('${ref}','refuse');closeMemberModal()}">❌ Refuser</button>`;
    btns+=`<button class="btn" style="background:#F3F4F6;color:#6B7280;font-size:13px;padding:8px 18px;border-radius:40px;border:none;font-weight:600;cursor:pointer" onclick="if(confirm('Supprimer définitivement ce dossier ?')){deleteMember('${ref}');closeMemberModal();initTDB()}">🗑 Supprimer</button>`;
    btns+=`<button class="btn btn-gold" style="font-size:13px;padding:8px 18px" onclick="printMemberForm('${ref}')">🖨 Imprimer le formulaire</button>`;
    actions.innerHTML = btns;
  }

  document.getElementById('member-modal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeMemberModal() {
  const m = document.getElementById('member-modal');
  if (m) { m.classList.remove('open'); document.body.style.overflow=''; }
}

/* ── EXPORT CSV ──────────────────────────────────────────────────────── */
function exportCSV() {
  const members = loadMembers();
  if (!members.length) { alert('Aucun dossier à exporter.'); return; }
  const headers = ['Référence','Date','Prénom','Nom','Date naissance','Sexe','Téléphone','Email','Zone','Profession','Adresse','Catégorie','Montant (MRU)','Paiement','Réf. transaction','Statut'];
  const rows = members.map(m=>[
    m.reference,m.date,m.prenom,m.nom,m.datenais,m.sexe,m.tel,m.email,
    m.zone,m.profession,m.adresse,m.categorie,m.montant,m.paiement,m.refTx,m.status
  ].map(v=>`"${(v||'').toString().replace(/"/g,'""')}"`));
  const csv = [headers.join(','),...rows.map(r=>r.join(','))].join('\n');
  const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download='YELLITAARE_adhesions_'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
}

/* ═══════════════════════════════════════════════════════════════════════
   ADMIN TABS & MULTI-COMPTES
═══════════════════════════════════════════════════════════════════════ */

// Comptes : { identifiant: { hash, role, scope, label } }
// role: admin (tout voir), section, commission
// scope: slug de la section/commission
var ADMIN_ACCOUNTS = {
  'admin':               { hash:'007e9f12ad26bd017334eff0d5f04b439a3147b9af29b00b6f5266c10cbe1f9b', role:'admin', scope:'all', label:'Wagne Sileymane' },
  'thide':               { hash:'7326111b5f44e5500f27c029929aa5dc6b94ad0a318f1f128aba8862d771fc1e', role:'section', scope:'thide', label:'Section Thidé' },
  'nouakchott':          { hash:'9ef6f1add29057af2dc26ea2c276ed49c10f7883d211b2c575f8104f49e862f4', role:'section', scope:'nouakchott', label:'Section Nouakchott' },
  'nouadhibou':          { hash:'12f822c120bfb5cf5a81ff4dfdf1700a097d9a13af81e19b9314a43a2fec3067', role:'section', scope:'nouadhibou', label:'Section Nouadhibou' },
  'zouerat':             { hash:'463796acf6033abcb1f94ea490aa75c31468df35e901a51d37a114f402a372ac', role:'section', scope:'zouerat', label:'Section Zouerat' },
  'diaspora-afrique':    { hash:'4a34a37376b813173b33661969b17f479330c1fe6743b35538bc2ac740a30fde', role:'section', scope:'diaspora-afrique', label:'Section Diaspora Afrique' },
  'diaspora-europe':     { hash:'d9cbbf5e06238591e5991ee2e1bfe8dbd1906e09ecac356b9c219e74423457e9', role:'section', scope:'diaspora-europe', label:'Section Diaspora Europe' },
  'diaspora-amerique':   { hash:'77dd8987d8a171e5312c705412222908aed16bb26ec0cb453d46213ff7014af3', role:'section', scope:'diaspora-amerique', label:'Section Diaspora Amérique' },
  'education':           { hash:'2ad2d9791362876a81103d50e8dc1e2d4d02c89a792f915b6e8d082a3811a0f8', role:'commission', scope:'education', label:'Commission Éducation & Formation' },
  'sante':               { hash:'b5179097564950d58b40e17b91713d52716e297b9c6e4851b412059a7fdb5d05', role:'commission', scope:'sante', label:'Commission Santé & Bien-être' },
  'infra':               { hash:'e137d950acf23457b3e2ec5ee9dc501feb749c290e3528c676632ebdb22d932a', role:'commission', scope:'infra', label:'Commission Infrastructures & Habitat' },
  'culture':             { hash:'d0e358dab6b312684c212e262fdf720826e28e22be5a568bd4713c5f31e29aba', role:'commission', scope:'culture', label:'Commission Culture & Patrimoine' },
  'finances':            { hash:'5c7dab93bf7a49279b696df5232379b17eda09199ce49f7edb6e9baf5c711af0', role:'commission', scope:'finances', label:'Commission Finances & Ressources' },
  'diaspora':            { hash:'b89ac20d47c556cb8a125e2a12f35323e3d59615fc7848f6b468732ae049656a', role:'commission', scope:'diaspora', label:'Commission Diaspora & Relations Ext.' },
  'jeunesse':            { hash:'3dda61c80e0da96100772645a6f84a0c8a70d87038374a1be031abffe29a1f86', role:'commission', scope:'jeunesse', label:'Commission Jeunesse & Sports' },
  'agriculture':         { hash:'83a4b7c9d86cc2a5aecd2e606dc9e79bc6b61b18a62e7241eccd32700f595f94', role:'commission', scope:'agriculture', label:'Commission Agriculture & Env.' }
};

var currentAdminUser = null;

function getAdminSession() {
  try { return JSON.parse(sessionStorage.getItem('yell_admin_session')); }
  catch(e) { return null; }
}

function setAdminSession(user) {
  sessionStorage.setItem('yell_admin_session', JSON.stringify(user));
  currentAdminUser = user;
}

function clearAdminSession() {
  // Supprimer toutes les sessions admin et espaces
  var keysToRemove = [];
  for (var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    if (key && (key.indexOf('yell_') === 0)) keysToRemove.push(key);
  }
  keysToRemove.forEach(function(k) { sessionStorage.removeItem(k); });
  currentAdminUser = null;
}
function isAdminAuthenticated() {
  return !!sessionStorage.getItem('yell_admin_auth');
}

function updateAdminIdentityUI() {
  var session = getAdminSession();
  var el = document.getElementById('admin-welcome');
  if (!el) return;
  if (isAdminAuthenticated()) {
    var label = session && session.label ? session.label : 'Wagne Sileymane';
    el.textContent = 'Accès administrateur actif — ' + label;
  } else {
    el.textContent = 'Gestion des adhésions, sections, commissions, documents et galerie';
  }
}

function switchAdminTab(tab, btn) {
  document.querySelectorAll('.admin-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.admin-panel').forEach(function(p) { p.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  var panel = document.getElementById('admin-panel-' + tab);
  if (panel) panel.classList.add('active');

  if (tab === 'sections') { updateSpaceCounts('section'); updateSectionCardCounts(); }
  if (tab === 'commissions') updateSpaceCounts('commission');
  if (tab === 'documents') renderDocs();
  if (tab === 'galerie') renderGalleryAdmin();
}

/* ═══════════════════════════════════════════════════════════════════════
   ESPACES SECTIONS & COMMISSIONS
═══════════════════════════════════════════════════════════════════════ */
var SPACE_DATA_KEY = 'yellitaare_spaces';
var currentSpaceType = '';
var currentSpaceSlug = '';

function loadSpaces() {
  try { return JSON.parse(localStorage.getItem(SPACE_DATA_KEY) || '{}'); }
  catch(e) { return {}; }
}

function saveSpaces(data) {
  localStorage.setItem(SPACE_DATA_KEY, JSON.stringify(data));
  if (fbReady && fbDB) {
    fbDB.ref('spaces').set(data).catch(function(e) { console.warn('Firebase spaces write error:', e); });
  }
}

function getSpaceKey(type, slug) { return type + ':' + slug; }

function getSpace(type, slug) {
  var data = loadSpaces();
  var key = getSpaceKey(type, slug);
  if (!data[key]) data[key] = { activities: [], docs: [], folders: [] };
  if (!Array.isArray(data[key].folders)) data[key].folders = [];
  return data[key];
}

function saveSpace(type, slug, space) {
  var data = loadSpaces();
  data[getSpaceKey(type, slug)] = space;
  saveSpaces(data);
}

function updateSpaceCounts(type) {
  var data = loadSpaces();
  var prefix = type + ':';
  Object.keys(data).forEach(function(key) {
    if (key.indexOf(prefix) === 0) {
      var slug = key.replace(prefix, '');
      var el = document.getElementById('count-' + type + '-' + slug);
      var total = (data[key].docs || []).length + (data[key].activities || []).length;
      if (el) el.textContent = total + ' élément(s)';
    }
  });
}

var SPACE_LABELS = {
  'section:thide':'Résidents de Thidé','section:nouakchott':'Nouakchott','section:nouadhibou':'Nouadhibou',
  'section:zouerat':'Zouerat','section:diaspora-afrique':'Diaspora Afrique','section:diaspora-europe':'Diaspora Europe',
  'section:diaspora-amerique':'Diaspora Amérique / Autres',
  'commission:education':'Éducation & Formation','commission:sante':'Santé & Bien-être',
  'commission:infra':'Infrastructures & Habitat','commission:culture':'Culture & Patrimoine',
  'commission:finances':'Finances & Ressources','commission:diaspora':'Diaspora & Relations Ext.',
  'commission:jeunesse':'Jeunesse & Sports','commission:agriculture':'Agriculture & Environnement'
};

function openSpace(type, slug) {
  // Vérifier si déjà authentifié pour cet espace
  var authKey = 'yell_space_auth_' + type + '_' + slug;
  if (!sessionStorage.getItem(authKey)) {
    var label = SPACE_LABELS[type + ':' + slug] || slug;
    var pwd = prompt('🔑 Mot de passe pour « ' + label + ' » :');
    if (!pwd) return;

    var account = ADMIN_ACCOUNTS[slug];
    if (!account) {
      alert('❌ Espace non configuré.');
      return;
    }

    hashPassword(pwd).then(function(hash) {
      if (hash === account.hash) {
        sessionStorage.setItem(authKey, 'true');
        doOpenSpace(type, slug);
        showToast('✅ Accès autorisé — ' + label);
      } else {
        alert('❌ Mot de passe incorrect.');
      }
    });
    return;
  }
  doOpenSpace(type, slug);
}

function doOpenSpace(type, slug) {
  currentSpaceType = type;
  currentSpaceSlug = slug;

  var label = SPACE_LABELS[type + ':' + slug] || slug;
  var titleEl = document.getElementById('space-title-' + type);
  if (titleEl) titleEl.textContent = label;

  var grid = document.getElementById(type + 's-grid');
  if (grid) grid.style.display = 'none';
  var detail = document.getElementById('space-detail-' + type);
  if (detail) detail.style.display = 'block';

  renderSpaceContent(type, slug);

  // Si c'est une section, charger les adhérents de cette section
  if (type === 'section') {
    renderSectionMembers();
  }
}

function closeSpaceDetail(type) {
  var grid = document.getElementById(type + 's-grid');
  if (grid) grid.style.display = '';
  var detail = document.getElementById('space-detail-' + type);
  if (detail) detail.style.display = 'none';
}

function renderSpaceContent(type, slug) {
  var space = getSpace(type, slug);

  // Activités
  var actContainer = document.getElementById('activities-' + type);
  if (actContainer) {
    if (space.activities.length === 0) {
      actContainer.innerHTML = '<p style="font-size:13px;color:var(--gris);padding:16px 0;">Aucune activité enregistrée.</p>';
    } else {
      actContainer.innerHTML = space.activities.map(function(a, i) {
        return '<div class="activity-card">' +
          '<div style="flex:1;"><div class="activity-date">' + a.date + '</div><div class="activity-text">' + a.text + '</div></div>' +
          '<button class="doc-btn delete" onclick="deleteActivity(' + jsq(type) + ',' + jsq(slug) + ',' + i + ')">✕</button></div>';
      }).join('');
    }
  }

  // Documents
  var docsContainer = document.getElementById('docs-' + type);
  if (docsContainer) {
    if (!Array.isArray(space.folders)) space.folders = [];
    if (space.docs.length === 0 && space.folders.length === 0) {
      docsContainer.innerHTML = '<p style="font-size:13px;color:var(--gris);padding:16px 0;">Aucun document.</p>';
    } else {
      docsContainer.innerHTML = buildFolderBlocks(space.folders, space.docs, function(folder) {
        return {
          rename: folder === 'Non classé' ? '' : 'renameSpaceFolder(' + jsq(type) + ',' + jsq(slug) + ',' + jsq(folder) + ')',
          move: folder === 'Non classé' ? '' : 'moveSpaceFolder(' + jsq(type) + ',' + jsq(slug) + ',' + jsq(folder) + ')',
          remove: folder === 'Non classé' ? '' : 'deleteSpaceFolder(' + jsq(type) + ',' + jsq(slug) + ',' + jsq(folder) + ')',
          download: function(doc) { return '<button class="doc-btn download" onclick="downloadSpaceDoc(' + jsq(type) + ',' + jsq(slug) + ',' + jsq(doc.id) + ')">↓ Télécharger</button>'; },
          deleteDoc: function(doc) { return '<button class="doc-btn delete" onclick="deleteSpaceDoc(' + jsq(type) + ',' + jsq(slug) + ',' + jsq(doc.id) + ')">✕</button>'; }
        };
      });
    }
  }
}


var appModalState = null;

function openAppModal(options) {
  var modal = document.getElementById('app-action-modal');
  if (!modal) return;
  appModalState = options || {};
  document.getElementById('app-modal-icon').textContent = options.icon || '📁';
  document.getElementById('app-modal-title').textContent = options.title || 'Action';
  document.getElementById('app-modal-sub').textContent = options.subtitle || '';
  document.getElementById('app-modal-text').innerHTML = options.text || '';
  document.getElementById('app-modal-error').className = 'app-modal-error';
  document.getElementById('app-modal-error').textContent = '';

  var fields = document.getElementById('app-modal-fields');
  var html = '';
  (options.fields || []).forEach(function(field) {
    if (field.type === 'input') {
      html += '<div class="form-group" style="margin-bottom:14px"><label>' + (field.label || '') + '</label><input class="app-modal-input" id="' + field.id + '" type="text" value="' + escapeHtml(field.value || '') + '" placeholder="' + escapeHtml(field.placeholder || '') + '"></div>';
    } else if (field.type === 'select') {
      html += '<div class="form-group" style="margin-bottom:14px"><label>' + (field.label || '') + '</label><select class="app-modal-select" id="' + field.id + '">';
      (field.options || []).forEach(function(opt) {
        var val = typeof opt === 'string' ? opt : opt.value;
        var lab = typeof opt === 'string' ? opt : (opt.label || opt.value);
        var sel = (field.value || '') === val ? ' selected' : '';
        html += '<option value="' + escapeHtml(val) + '"' + sel + '>' + escapeHtml(lab) + '</option>';
      });
      html += '</select>';
      if (field.note) html += '<div class="app-modal-note">' + field.note + '</div>';
      html += '</div>';
    }
  });
  fields.innerHTML = html;

  var actions = document.getElementById('app-modal-actions');
  actions.innerHTML = '';
  var cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-outline';
  cancelBtn.type = 'button';
  cancelBtn.textContent = options.cancelText || 'Annuler';
  cancelBtn.onclick = function() { closeAppModal(false); };
  actions.appendChild(cancelBtn);

  var confirmBtn = document.createElement('button');
  confirmBtn.className = 'btn ' + (options.confirmClass || 'btn-primary');
  confirmBtn.type = 'button';
  confirmBtn.textContent = options.confirmText || 'Valider';
  confirmBtn.onclick = function() {
    var values = {};
    (options.fields || []).forEach(function(field) {
      var el = document.getElementById(field.id);
      values[field.id] = el ? el.value : '';
    });
    if (typeof options.onConfirm === 'function') options.onConfirm(values);
  };
  actions.appendChild(confirmBtn);

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(function() {
    var first = fields.querySelector('input,select,textarea');
    if (first) { first.focus(); if (first.select) first.select(); }
  }, 30);
  modal.onkeydown = function(e) {
    if (e.key === 'Enter' && e.target && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      confirmBtn.click();
    }
  };
}

function closeAppModal(restoreBody) {
  var modal = document.getElementById('app-action-modal');
  if (modal) modal.classList.remove('open');
  if (restoreBody !== false) document.body.style.overflow = '';
  else document.body.style.overflow = '';
  appModalState = null;
}

function setAppModalError(message) {
  var box = document.getElementById('app-modal-error');
  if (!box) return;
  if (!message) {
    box.className = 'app-modal-error';
    box.textContent = '';
    return;
  }
  box.textContent = message;
  box.className = 'app-modal-error show';
}

function askFolderNameModal(title, subtitle, label, initialValue, placeholder, onConfirm, icon) {
  openAppModal({
    icon: icon || '📁',
    title: title,
    subtitle: subtitle || 'Gestion des dossiers',
    text: '',
    fields: [{ type:'input', id:'folder_name', label: label || 'Nom du dossier', value: initialValue || '', placeholder: placeholder || '' }],
    confirmText: 'Valider',
    confirmClass: 'btn-primary',
    onConfirm: function(values) {
      var name = normalizeFolderName(values.folder_name || '');
      if (!name) { setAppModalError('Veuillez saisir un nom de dossier.'); return; }
      onConfirm(name);
    }
  });
}

function askFolderTargetModal(title, subtitle, text, folders, currentValue, onConfirm) {
  var opts = [{ value:'Non classé', label:'Non classé' }].concat((folders || []).map(function(f){ return { value:f, label:f }; }));
  openAppModal({
    icon: '📂',
    title: title,
    subtitle: subtitle || 'Déplacement de dossier',
    text: text || '',
    fields: [{ type:'select', id:'target_folder', label:'Dossier de destination', options: opts, value: currentValue || 'Non classé', note:'Tous les documents du dossier seront transférés vers cette destination.' }],
    confirmText: 'Déplacer',
    confirmClass: 'btn-primary',
    onConfirm: function(values) {
      onConfirm(normalizeFolderName(values.target_folder || 'Non classé') || 'Non classé');
    }
  });
}

function confirmFolderModal(title, text, confirmText, onConfirm) {
  openAppModal({
    icon: '🗑️',
    title: title,
    subtitle: 'Confirmation requise',
    text: text,
    fields: [],
    confirmText: confirmText || 'Confirmer',
    confirmClass: 'btn-gold',
    onConfirm: function() { onConfirm(); }
  });
}


function addActivity(type) {
  var text = prompt('📌 Décrivez l\'activité :');
  if (!text || !text.trim()) return;
  var space = getSpace(type, currentSpaceSlug);
  space.activities.unshift({
    date: new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' }),
    text: text.trim()
  });
  saveSpace(type, currentSpaceSlug, space);
  renderSpaceContent(type, currentSpaceSlug);
  showToast('✅ Activité ajoutée');
}

function deleteActivity(type, slug, index) {
  if (!confirm('Supprimer cette activité ?')) return;
  var space = getSpace(type, slug);
  space.activities.splice(index, 1);
  saveSpace(type, slug, space);
  renderSpaceContent(type, slug);
}


function normalizeFolderName(name) {
  return (name || '').replace(/\s+/g, ' ').trim();
}

function createSpaceFolder(type) {
  var label = SPACE_LABELS[type + ':' + currentSpaceSlug] || currentSpaceSlug;
  askFolderNameModal('Créer un dossier', label, 'Nom du dossier', '', 'Ex. Rapports, PV, Budget…', function(name) {
    var space = getSpace(type, currentSpaceSlug);
    if (!Array.isArray(space.folders)) space.folders = [];
    var exists = space.folders.some(function(f) { return f.toLowerCase() === name.toLowerCase(); });
    if (exists) { setAppModalError('Ce dossier existe déjà.'); return; }
    space.folders.unshift(name);
    saveSpace(type, currentSpaceSlug, space);
    renderSpaceContent(type, currentSpaceSlug);
    closeAppModal();
    showToast('📁 Dossier créé');
  }, '📁');
}

function renameSpaceFolder(type, slug, oldName) {
  if (oldName === 'Non classé') { showToast('⚠️ Le dossier « Non classé » ne peut pas être renommé'); return; }
  var space = getSpace(type, slug);
  if (!Array.isArray(space.folders)) space.folders = [];
  askFolderNameModal('Renommer le dossier', SPACE_LABELS[type + ':' + slug] || slug, 'Nouveau nom', oldName, 'Saisissez le nouveau nom du dossier', function(newName) {
    if (newName === oldName) { closeAppModal(); return; }
    if (space.folders.some(function(f) { return f.toLowerCase() === newName.toLowerCase() && f.toLowerCase() !== oldName.toLowerCase(); })) {
      setAppModalError('Un dossier avec ce nom existe déjà.');
      return;
    }
    space.folders = space.folders.map(function(f) { return f.toLowerCase() === oldName.toLowerCase() ? newName : f; });
    space.docs = space.docs.map(function(doc) {
      if (normalizeFolderName(doc.folder || 'Non classé').toLowerCase() === oldName.toLowerCase()) doc.folder = newName;
      return doc;
    });
    saveSpace(type, slug, space);
    renderSpaceContent(type, slug);
    updateSpaceCounts(type);
    closeAppModal();
    showToast('✏️ Dossier renommé');
  }, '✏️');
}

function moveSpaceFolder(type, slug, oldName) {
  if (oldName === 'Non classé') { showToast('⚠️ Le dossier « Non classé » ne peut pas être déplacé'); return; }
  var space = getSpace(type, slug);
  if (!Array.isArray(space.folders)) space.folders = [];
  var possible = space.folders.filter(function(f) { return f.toLowerCase() !== oldName.toLowerCase(); });
  askFolderTargetModal('Déplacer le dossier', SPACE_LABELS[type + ':' + slug] || slug, 'Choisissez le dossier de destination pour « ' + escapeHtml(oldName) + ' ».', possible, possible[0] || 'Non classé', function(target) {
    space.folders = space.folders.filter(function(f) { return f.toLowerCase() !== oldName.toLowerCase(); });
    if (target !== 'Non classé' && !space.folders.some(function(f) { return f.toLowerCase() === target.toLowerCase(); })) {
      space.folders.unshift(target);
    }
    space.docs = space.docs.map(function(doc) {
      if (normalizeFolderName(doc.folder || 'Non classé').toLowerCase() === oldName.toLowerCase()) doc.folder = target;
      return doc;
    });
    saveSpace(type, slug, space);
    renderSpaceContent(type, slug);
    updateSpaceCounts(type);
    closeAppModal();
    showToast('📂 Dossier déplacé vers « ' + target + ' »');
  });
}

function deleteSpaceFolder(type, slug, name) {
  if (name === 'Non classé') { showToast('⚠️ Le dossier « Non classé » ne peut pas être supprimé'); return; }
  confirmFolderModal('Supprimer le dossier', 'Le dossier <strong>' + escapeHtml(name) + '</strong> sera supprimé et ses documents seront déplacés vers <strong>Non classé</strong>.', 'Supprimer', function() {
    var space = getSpace(type, slug);
    if (!Array.isArray(space.folders)) space.folders = [];
    space.folders = space.folders.filter(function(f) { return f.toLowerCase() !== name.toLowerCase(); });
    space.docs = space.docs.map(function(doc) {
      if (normalizeFolderName(doc.folder || 'Non classé').toLowerCase() === name.toLowerCase()) doc.folder = 'Non classé';
      return doc;
    });
    saveSpace(type, slug, space);
    renderSpaceContent(type, slug);
    updateSpaceCounts(type);
    closeAppModal();
    showToast('🗑 Dossier supprimé');
  });
}

function chooseFolderNameModal(folders, scopeLabel, onConfirm) {
  folders = Array.isArray(folders) ? folders : [];
  openAppModal({
    icon: '📁',
    title: 'Choisir un dossier',
    subtitle: scopeLabel || 'Classement du document',
    text: 'Sélectionnez un dossier existant ou saisissez un nouveau nom pour classer le document.',
    fields: [
      { type:'select', id:'existing_folder', label:'Dossier existant', options:[{value:'Non classé',label:'Non classé'}].concat(folders.map(function(f){ return {value:f,label:f}; })), value: folders[0] || 'Non classé', note:'Vous pouvez aussi laisser cette valeur et saisir un nouveau dossier ci-dessous.' },
      { type:'input', id:'new_folder', label:'Ou créer un nouveau dossier', value:'', placeholder:'Nouveau dossier (optionnel)' }
    ],
    confirmText: 'Valider',
    confirmClass: 'btn-primary',
    onConfirm: function(values) {
      var newName = normalizeFolderName(values.new_folder || '');
      var chosen = newName || normalizeFolderName(values.existing_folder || 'Non classé') || 'Non classé';
      onConfirm(chosen);
    }
  });
}

function handleSpaceDocUpload(input, type) {
  var files = input.files;
  if (!files || !files.length) return;
  var space = getSpace(type, currentSpaceSlug);
  if (!Array.isArray(space.folders)) space.folders = [];
  chooseFolderNameModal(space.folders, SPACE_LABELS[type + ':' + currentSpaceSlug] || currentSpaceSlug, function(selectedFolder) {
    if (selectedFolder !== 'Non classé' && !space.folders.some(function(f) { return f.toLowerCase() === selectedFolder.toLowerCase(); })) {
      space.folders.unshift(selectedFolder);
    }
    var count = 0;
    var total = files.length;

    for (var i = 0; i < files.length; i++) {
    (function(file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('⚠ "' + file.name + '" dépasse 4 Mo.');
        count++;
        if (count >= total) { input.value = ''; renderSpaceContent(type, currentSpaceSlug); }
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        space.docs.unshift({
          id: 'SD-' + Date.now() + '-' + Math.floor(Math.random() * 9999),
          name: file.name,
          type: getDocType(file.name),
          size: file.size,
          folder: selectedFolder,
          date: new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' }),
          data: e.target.result
        });
        count++;
        if (count >= total) {
          try {
            saveSpace(type, currentSpaceSlug, space);
            input.value = '';
            renderSpaceContent(type, currentSpaceSlug);
            updateSpaceCounts(type);
            showToast('✅ ' + total + ' document(s) ajouté(s)');
          } catch(err) {
            alert('⚠ Espace de stockage insuffisant.');
            input.value = '';
          }
        }
      };
      reader.readAsDataURL(file);
    })(files[i]);
    }
    closeAppModal();
  });
}

function downloadSpaceDoc(type, slug, docId) {
  var space = getSpace(type, slug);
  var doc = space.docs.find(function(d) { return d.id === docId; });
  if (!doc) return;
  var a = document.createElement('a');
  a.href = doc.data; a.download = doc.name;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

function deleteSpaceDoc(type, slug, docId) {
  openAppModal({
    icon: '🗑️',
    title: 'Supprimer le document',
    subtitle: SPACE_LABELS[type + ':' + slug] || slug,
    text: 'Ce document sera retiré de cet espace documentaire.',
    fields: [],
    confirmText: 'Supprimer',
    confirmClass: 'btn-gold',
    onConfirm: function() {
      var space = getSpace(type, slug);
      space.docs = space.docs.filter(function(d) { return d.id !== docId; });
      saveSpace(type, slug, space);
      renderSpaceContent(type, slug);
      updateSpaceCounts(type);
      closeAppModal();
      showToast('🗑 Document supprimé');
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   TDB PAR SECTION — Adhérents filtrés
═══════════════════════════════════════════════════════════════════════ */

// Mapping slug → noms possibles dans le champ "Section" du Google Form
var SECTION_SLUG_NAMES = {
  'thide':             ['Résidents de Thidé','Thidé','thide','Village de Thidé','Résident de Thidé'],
  'nouakchott':        ['Nouakchott','nouakchott','NKC'],
  'nouadhibou':        ['Nouadhibou','nouadhibou','NDB'],
  'zouerat':           ['Zouerat','zouerat','ZRTE'],
  'diaspora-afrique':  ['Diaspora Afrique','diaspora afrique','Diaspora – Afrique'],
  'diaspora-europe':   ['Diaspora Europe','diaspora europe','Diaspora – Europe','Diaspora – Europe / Amériques'],
  'diaspora-amerique': ['Diaspora Amérique','Diaspora Amérique / Autres','diaspora amerique','Diaspora – Amériques']
};

function getSectionMembers(slug) {
  var members = loadMembers();
  var names = SECTION_SLUG_NAMES[slug] || [slug];
  return members.filter(function(m) {
    var zone = (m.zone || '').toLowerCase().trim();
    return names.some(function(n) { return zone.indexOf(n.toLowerCase()) !== -1; });
  });
}

function renderSectionMembers() {
  var slug = currentSpaceSlug;
  var sectionMembers = getSectionMembers(slug);

  // Filtres
  var search = (document.getElementById('sec-search')?.value || '').toLowerCase();
  var fStatus = document.getElementById('sec-filter-status')?.value || '';

  var filtered = sectionMembers.filter(function(m) {
    var matchSearch = !search || (m.nom + ' ' + m.prenom).toLowerCase().indexOf(search) !== -1 ||
      (m.tel || '').indexOf(search) !== -1 || (m.reference || '').toLowerCase().indexOf(search) !== -1;
    var matchStatus = !fStatus || m.status === fStatus;
    return matchSearch && matchStatus;
  });

  // KPIs section
  var total = sectionMembers.length;
  var valides = sectionMembers.filter(function(m) { return m.status === 'valide'; }).length;
  var attente = sectionMembers.filter(function(m) { return m.status === 'attente'; }).length;
  var montantTotal = 0;
  sectionMembers.forEach(function(m) { if (m.status === 'valide' && m.montant) montantTotal += m.montant; });

  setText('sec-kpi-total', total);
  setText('sec-kpi-valide', valides);
  setText('sec-kpi-attente', attente);
  setText('sec-kpi-montant', montantTotal ? montantTotal.toLocaleString('fr-FR') : '0');

  // Tableau
  var container = document.getElementById('section-members-table');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:40px 24px;color:var(--gris);">' +
      '<div style="font-size:36px;margin-bottom:10px;">' + (total === 0 ? '📋' : '🔍') + '</div>' +
      '<h3 style="font-family:Playfair Display,serif;font-size:16px;color:var(--vert);margin-bottom:6px;">' +
      (total === 0 ? 'Aucun adhérent dans cette section' : 'Aucun résultat') + '</h3>' +
      '<p style="font-size:13px;">' + (total === 0 ? 'Les adhérents apparaîtront ici après synchronisation avec Google Sheets.' : 'Modifiez vos critères de recherche.') + '</p></div>';
    return;
  }

  var statusBadge = function(s) {
    var cfg = { attente: {cls:'status-attente',label:'⏳ En attente'}, valide: {cls:'status-valide',label:'✅ Validé'}, refuse: {cls:'status-refuse',label:'❌ Refusé'} };
    var c = cfg[s] || cfg.attente;
    return '<span class="tdb-status-badge ' + c.cls + '">' + c.label + '</span>';
  };

  container.innerHTML = '<div style="padding:10px 16px;font-size:12px;color:var(--gris);border-bottom:1px solid var(--gris-clair);">' +
    filtered.length + ' adhérent(s) affiché(s) sur ' + total + ' total</div>' +
    '<div style="overflow-x:auto"><table class="tdb-table"><thead><tr>' +
    '<th>Adhérent</th><th>Téléphone</th><th>Catégorie</th><th>Paiement</th><th>Date</th><th>Statut</th><th>Actions</th>' +
    '</tr></thead><tbody>' +
    filtered.map(function(m) {
      return '<tr>' +
        '<td><div class="tdb-member-name">' + (m.prenom || '') + ' ' + (m.nom || '').toUpperCase() + '</div>' +
        '<div class="tdb-member-ref">' + (m.email || '—') + '</div></td>' +
        '<td style="font-size:12px;white-space:nowrap">' + (m.tel || '—') + '</td>' +
        '<td><div style="font-size:12px;font-weight:600;color:var(--vert)">' + (m.categorie || '—') + '</div>' +
        '<div style="font-size:11px;color:var(--or-fonce);font-weight:700">' + (m.montant ? m.montant.toLocaleString('fr-FR') + '\u00a0MRU' : '') + '</div></td>' +
        '<td style="font-size:12px">' + (m.paiement || '—') + '</td>' +
        '<td style="font-size:12px;color:var(--gris)">' + (m.date || '—') + '</td>' +
        '<td>' + statusBadge(m.status) + '</td>' +
        '<td><div style="display:flex;gap:6px;flex-wrap:wrap">' +
        '<button class="tdb-action-btn view" onclick="viewMember(\'' + m.reference + '\')">Voir</button>' +
        (m.status !== 'valide' ? '<button class="tdb-action-btn validate" onclick="changeSectionStatus(\'' + m.reference + '\',\'valide\')">Valider</button>' : '') +
        (m.status !== 'refuse' ? '<button class="tdb-action-btn refuse" onclick="changeSectionStatus(\'' + m.reference + '\',\'refuse\')">Refuser</button>' : '') +
        '<button class="tdb-action-btn view" style="background:#FDF6E3;color:#9B7015" onclick="printMemberForm(\'' + m.reference + '\')">🖨</button>' +
        '</div></td></tr>';
    }).join('') +
    '</tbody></table></div>';
}

function changeSectionStatus(ref, newStatus) {
  updateMemberStatus(ref, newStatus);
  renderSectionMembers();
  // Aussi rafraîchir le TDB global
  var members = loadMembers();
  renderKPIs(members);
}

function exportSectionCSV() {
  var slug = currentSpaceSlug;
  var members = getSectionMembers(slug);
  if (!members.length) { showToast('📭 Aucun adhérent à exporter.'); return; }

  var label = SPACE_LABELS['section:' + slug] || slug;
  var headers = ['Nom','Prénom','Téléphone','Email','Catégorie','Montant (MRU)','Paiement','Réf. transaction','Date','Statut'];
  var rows = members.map(function(m) {
    return [m.nom, m.prenom, m.tel, m.email, m.categorie, m.montant, m.paiement, m.refTx, m.date, m.status]
      .map(function(v) { return '"' + (v || '').toString().replace(/"/g, '""') + '"'; });
  });
  var csv = [headers.join(',')].concat(rows.map(function(r) { return r.join(','); })).join('\n');
  var blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'YELLITAARE_section_' + slug + '_' + new Date().toISOString().slice(0, 10) + '.csv';
  a.click();
  showToast('✅ Export CSV — ' + label);
}

// Mise à jour des compteurs sur les cartes sections (nombre d'adhérents)
function updateSectionCardCounts() {
  Object.keys(SECTION_SLUG_NAMES).forEach(function(slug) {
    var count = getSectionMembers(slug).length;
    var el = document.getElementById('count-section-' + slug);
    if (el) el.textContent = count + ' adhérent(s)';
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   GESTION DES DOCUMENTS GÉNÉRAUX
═══════════════════════════════════════════════════════════════════════ */

function jsq(value) {
  return JSON.stringify(value == null ? '' : String(value));
}

function getOrderedFolders(folders, docs) {
  var map = {};
  var ordered = [];
  (Array.isArray(folders) ? folders : []).forEach(function(name) {
    name = normalizeFolderName(name);
    if (!name || map[name.toLowerCase()]) return;
    map[name.toLowerCase()] = true;
    ordered.push(name);
  });
  (Array.isArray(docs) ? docs : []).forEach(function(doc) {
    var name = normalizeFolderName(doc.folder || 'Non classé') || 'Non classé';
    if (!map[name.toLowerCase()]) {
      map[name.toLowerCase()] = true;
      ordered.push(name);
    }
  });
  if (!map['non classé']) ordered.push('Non classé');
  return ordered;
}

function renderFolderActions(scope, actions) {
  var btns = [];
  if (actions.rename) btns.push('<button class="doc-btn download" onclick="' + actions.rename + '">Renommer</button>');
  if (actions.move) btns.push('<button class="doc-btn download" onclick="' + actions.move + '">Déplacer</button>');
  if (actions.remove) btns.push('<button class="doc-btn delete" onclick="' + actions.remove + '">Supprimer</button>');
  return btns.join('');
}

function buildFolderBlocks(folders, docs, actionsBuilder) {
  var ordered = getOrderedFolders(folders, docs);
  var html = '';
  ordered.forEach(function(folder) {
    var folderDocs = docs.filter(function(doc) {
      return normalizeFolderName(doc.folder || 'Non classé') === folder;
    });
    var actions = actionsBuilder ? actionsBuilder(folder) : {};
    html += '<div class="folder-block">' +
      '<div class="folder-head">' +
        '<div class="folder-title">📁 <span>' + folder + '</span> <span class="folder-count">' + folderDocs.length + ' document(s)</span></div>' +
        '<div class="doc-actions">' + renderFolderActions(folder, actions) + '</div>' +
      '</div>';

    if (!folderDocs.length) {
      html += '<div class="folder-empty">Aucun document dans ce dossier.</div>';
    } else {
      html += folderDocs.map(function(doc) {
        return '<div class="doc-card">' +
          '<div class="doc-icon ' + doc.type + '">' + getDocIcon(doc.type) + '</div>' +
          '<div class="doc-info">' +
            '<div class="doc-folder-badge">📁 ' + folder + '</div>' +
            '<div class="doc-name" title="' + doc.name + '">' + doc.name + '</div>' +
            '<div class="doc-meta">' + getDocLabel(doc.type) + ' · ' + formatFileSize(doc.size) + ' · ' + doc.date + '</div>' +
          '</div>' +
          '<div class="doc-actions">' +
            actions.download(doc) +
            actions.deleteDoc(doc) +
          '</div>' +
        '</div>';
      }).join('');
    }

    html += '</div>';
  });
  return html;
}

var DOC_KEY = 'yellitaare_docs';
var DOC_FOLDER_KEY = 'yellitaare_doc_folders';
var currentDocFilter = 'all';

function loadDocFolders() {
  try { return JSON.parse(localStorage.getItem(DOC_FOLDER_KEY) || '[]'); }
  catch(e) { return []; }
}

function saveDocFolders(list) {
  localStorage.setItem(DOC_FOLDER_KEY, JSON.stringify(list));
}

function createDocFolder() {
  askFolderNameModal('Créer un dossier', 'Documents généraux', 'Nom du dossier', '', 'Ex. Comptes rendus, Rapports, Photos…', function(name) {
    var folders = loadDocFolders();
    var exists = folders.some(function(f) { return f.toLowerCase() === name.toLowerCase(); });
    if (exists) { setAppModalError('Ce dossier existe déjà.'); return; }
    folders.unshift(name);
    saveDocFolders(folders);
    renderDocs();
    closeAppModal();
    showToast('📁 Dossier créé');
  }, '📁');
}

function renameDocFolder(oldName) {
  if (oldName === 'Non classé') { showToast('⚠️ Le dossier « Non classé » ne peut pas être renommé'); return; }
  askFolderNameModal('Renommer le dossier', 'Documents généraux', 'Nouveau nom', oldName, 'Saisissez le nouveau nom du dossier', function(newName) {
    if (newName === oldName) { closeAppModal(); return; }
    var folders = loadDocFolders();
    if (folders.some(function(f) { return f.toLowerCase() === newName.toLowerCase() && f.toLowerCase() !== oldName.toLowerCase(); })) {
      setAppModalError('Un dossier avec ce nom existe déjà.');
      return;
    }
    folders = folders.map(function(f) { return f.toLowerCase() === oldName.toLowerCase() ? newName : f; });
    saveDocFolders(folders);
    var docs = loadDocs().map(function(doc) {
      if (normalizeFolderName(doc.folder || 'Non classé').toLowerCase() === oldName.toLowerCase()) doc.folder = newName;
      return doc;
    });
    saveDocs(docs);
    renderDocs();
    closeAppModal();
    showToast('✏️ Dossier renommé');
  }, '✏️');
}

function moveDocFolder(oldName) {
  if (oldName === 'Non classé') { showToast('⚠️ Le dossier « Non classé » ne peut pas être déplacé'); return; }
  var folders = loadDocFolders().filter(function(f) { return f.toLowerCase() !== oldName.toLowerCase(); });
  askFolderTargetModal('Déplacer le dossier', 'Documents généraux', 'Choisissez le dossier de destination pour « ' + escapeHtml(oldName) + ' ».', folders, folders[0] || 'Non classé', function(target) {
    var allFolders = loadDocFolders().filter(function(f) { return f.toLowerCase() !== oldName.toLowerCase(); });
    if (target !== 'Non classé' && !allFolders.some(function(f) { return f.toLowerCase() === target.toLowerCase(); })) {
      allFolders.unshift(target);
    }
    saveDocFolders(allFolders);
    var docs = loadDocs().map(function(doc) {
      if (normalizeFolderName(doc.folder || 'Non classé').toLowerCase() === oldName.toLowerCase()) doc.folder = target;
      return doc;
    });
    saveDocs(docs);
    renderDocs();
    closeAppModal();
    showToast('📂 Dossier déplacé vers « ' + target + ' »');
  });
}

function deleteDocFolder(name) {
  if (name === 'Non classé') { showToast('⚠️ Le dossier « Non classé » ne peut pas être supprimé'); return; }
  confirmFolderModal('Supprimer le dossier', 'Le dossier <strong>' + escapeHtml(name) + '</strong> sera supprimé et ses documents seront déplacés vers <strong>Non classé</strong>.', 'Supprimer', function() {
    var folders = loadDocFolders().filter(function(f) { return f.toLowerCase() !== name.toLowerCase(); });
    saveDocFolders(folders);
    var docs = loadDocs().map(function(doc) {
      if (normalizeFolderName(doc.folder || 'Non classé').toLowerCase() === name.toLowerCase()) doc.folder = 'Non classé';
      return doc;
    });
    saveDocs(docs);
    renderDocs();
    closeAppModal();
    showToast('🗑 Dossier supprimé');
  });
}

function loadDocs() {
  try { return JSON.parse(localStorage.getItem(DOC_KEY) || '[]'); }
  catch(e) { return []; }
}

function saveDocs(list) {
  localStorage.setItem(DOC_KEY, JSON.stringify(list));
}

function getDocType(filename) {
  var ext = filename.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (['doc','docx'].indexOf(ext) !== -1) return 'word';
  if (['xls','xlsx','csv'].indexOf(ext) !== -1) return 'excel';
  if (['jpg','jpeg','png','gif','bmp','webp'].indexOf(ext) !== -1) return 'image';
  return 'other';
}

function getDocIcon(type) {
  var icons = { pdf:'📕', word:'📘', excel:'📗', image:'🖼', other:'📄' };
  return icons[type] || '📄';
}

function getDocLabel(type) {
  var labels = { pdf:'PDF', word:'Word', excel:'Excel', image:'Image', other:'Fichier' };
  return labels[type] || 'Fichier';
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' o';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / 1048576).toFixed(1) + ' Mo';
}

function handleDocUpload(input) {
  var files = input.files;
  if (!files || !files.length) return;

  var docs = loadDocs();
  var folders = loadDocFolders();
  chooseFolderNameModal(folders, 'Documents généraux', function(selectedFolder) {
    if (selectedFolder !== 'Non classé' && !folders.some(function(f) { return f.toLowerCase() === selectedFolder.toLowerCase(); })) {
      folders.unshift(selectedFolder);
      saveDocFolders(folders);
    }
    var count = 0;
    var total = files.length;

    // Vérifier taille totale localStorage (~5 Mo max)
    var currentSize = (localStorage.getItem(DOC_KEY) || '').length;

    for (var i = 0; i < files.length; i++) {
    (function(file) {
      // Limite 4 Mo par fichier pour localStorage
      if (file.size > 4 * 1024 * 1024) {
        alert('⚠ Le fichier "' + file.name + '" dépasse 4 Mo et ne peut pas être stocké localement.');
        count++;
        if (count >= total) { input.value = ''; renderDocs(); }
        return;
      }

      var reader = new FileReader();
      reader.onload = function(e) {
        var doc = {
          id: 'DOC-' + Date.now() + '-' + Math.floor(Math.random() * 9999),
          name: file.name,
          type: getDocType(file.name),
          size: file.size,
          folder: selectedFolder,
          date: new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }),
          data: e.target.result
        };
        docs.unshift(doc);
        count++;

        if (count >= total) {
          try {
            saveDocs(docs);
            input.value = '';
            renderDocs();
            showToast('✅ ' + total + ' document(s) ajouté(s)');
          } catch(err) {
            alert('⚠ Espace de stockage insuffisant. Supprimez des documents existants ou réduisez la taille des fichiers.');
            input.value = '';
          }
        }
      };
      reader.readAsDataURL(file);
    })(files[i]);
    }
    closeAppModal();
  });
}

function downloadDoc(docId) {
  var docs = loadDocs();
  var doc = docs.find(function(d) { return d.id === docId; });
  if (!doc) return;

  var a = document.createElement('a');
  a.href = doc.data;
  a.download = doc.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function deleteDoc(docId) {
  openAppModal({
    icon: '🗑️',
    title: 'Supprimer le document',
    subtitle: 'Documents généraux',
    text: 'Ce document sera supprimé définitivement.',
    fields: [],
    confirmText: 'Supprimer',
    confirmClass: 'btn-gold',
    onConfirm: function() {
      var docs = loadDocs().filter(function(d) { return d.id !== docId; });
      saveDocs(docs);
      renderDocs();
      closeAppModal();
      showToast('🗑 Document supprimé');
    }
  });
}

function filterDocs(type, btn) {
  currentDocFilter = type;
  document.querySelectorAll('.doc-filter').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  renderDocs();
}

function renderDocs() {
  var docs = loadDocs();
  var filtered = currentDocFilter === 'all' ? docs : docs.filter(function(d) { return d.type === currentDocFilter; });
  var container = document.getElementById('doc-list-container');
  if (!container) return;

  if (filtered.length === 0) {
    var msg = docs.length === 0
      ? 'Cliquez sur « + Ajouter un document » pour importer vos fichiers.'
      : 'Aucun document de ce type.';
    container.innerHTML = '<div style="text-align:center;padding:48px 24px;color:var(--gris);">' +
      '<div style="font-size:48px;margin-bottom:12px;">📂</div>' +
      '<h3 style="font-family:\'Playfair Display\',serif;font-size:18px;color:var(--vert);margin-bottom:8px;">Aucun document</h3>' +
      '<p style="font-size:13px;line-height:1.6;">' + msg + '</p></div>';
    return;
  }

  var folders = loadDocFolders();
  var html = buildFolderBlocks(folders, filtered, function(folder) {
    return {
      rename: folder === 'Non classé' ? '' : 'renameDocFolder(' + jsq(folder) + ')',
      move: folder === 'Non classé' ? '' : 'moveDocFolder(' + jsq(folder) + ')',
      remove: folder === 'Non classé' ? '' : 'deleteDocFolder(' + jsq(folder) + ')',
      download: function(doc) { return '<button class="doc-btn download" onclick="downloadDoc(' + jsq(doc.id) + ')">↓ Télécharger</button>'; },
      deleteDoc: function(doc) { return '<button class="doc-btn delete" onclick="deleteDoc(' + jsq(doc.id) + ')">✕</button>'; }
    };
  });

  container.innerHTML = html;
}

/* ── DONNÉES DÉMO ────────────────────────────────────────────────────── */
function loadDemoData() {
  const zones=['Village de Thidé','Nationaux (Mauritanie)','Diaspora – Afrique','Diaspora – Europe / Amériques'];
  const cats=[
    {label:'Résident de Thidé',montant:100},
    {label:'Ressortissant – villes mauritaniennes',montant:300},
    {label:'Diaspora Afrique',montant:500},
    {label:'Diaspora Europe / Amériques',montant:1000}
  ];
  const statuses=['attente','attente','valide','valide','valide','refuse'];
  const paies=['Bankily (Chinguitel)','Masrevi (Mauritel)','Seddad (BCM)','Espèces (Trésorier)','Virement / Transfert international'];
  const prenoms=['Amadou','Fatimata','Mamadou','Aissatou','Ibrahima','Mariama','Oumar','Kadiatou'];
  const noms=['BAH','DIALLO','SY','BARRY','SALL','BALDÉ','DIOP','CAMARA'];
  const mois=['janvier','février','mars','avril','mai','juin'];
  const demo = Array.from({length:14},(_, i)=>{
    const z=zones[i%zones.length];
    const c=cats[i%cats.length];
    const j=String(Math.floor(Math.random()*28)+1).padStart(2,'0');
    const mo=mois[i%mois.length];
    return {
      reference:`ADH-YELLITAARE-2025-${1000+i}`,
      date:`${j} ${mo} 2025`,
      nom:noms[i%noms.length], prenom:prenoms[i%prenoms.length],
      datenais:`${String(Math.floor(Math.random()*28)+1).padStart(2,'0')}/${String(Math.floor(Math.random()*12)+1).padStart(2,'0')}/${1965+Math.floor(Math.random()*35)}`,
      sexe:i%2===0?'Masculin':'Féminin',
      tel:`+222 ${20+Math.floor(Math.random()*20)} ${String(Math.floor(Math.random()*90)+10)} ${String(Math.floor(Math.random()*90)+10)} ${String(Math.floor(Math.random()*90)+10)}`,
      email: i%3===0?`${prenoms[i%prenoms.length].toLowerCase()}.${noms[i%noms.length].toLowerCase()}@gmail.com`:'',
      zone:z, profession:['Agriculteur','Enseignant','Commerçant','Ingénieur','Fonctionnaire','Étudiant'][i%6],
      adresse:z.includes('Village')?'Village de Thidé':z.includes('Nation')?'Nouakchott':'Paris, France',
      categorie:c.label, montant:c.montant,
      paiement:paies[i%paies.length],
      refTx:i%4!==0?`REF-${Math.random().toString(36).slice(2,10).toUpperCase()}`:'',
      status:statuses[i%statuses.length],
      photoUrl:null
    };
  });
  saveMembers(demo);
}

/* ═══════════════════════════════════════════════════════════════════════
   GALERIE DYNAMIQUE
═══════════════════════════════════════════════════════════════════════ */
var GAL_KEY = 'yellitaare_gallery';
var currentGalFilter = 'all';
var editingGalId = null;
var galImageData = null;

var GAL_COLORS = ['g1','g2','g3','g4','g5','g6'];
var GAL_DEFAULTS = [
  { id:'def-1', titre:'École réhabilitée — Village de Thidé', categorie:'projets', emoji:'🏫', layout:'wide tall', color:'g1', imageUrl:null },
  { id:'def-2', titre:'Projet Baaba Maal', categorie:'evenements', emoji:'🎵', layout:'normal', color:'g2', imageUrl:null },
  { id:'def-3', titre:'Mosquée communautaire', categorie:'village', emoji:'🕌', layout:'normal', color:'g3', imageUrl:null },
  { id:'def-4', titre:'Réunion de section — Nouakchott', categorie:'diaspora', emoji:'🤝', layout:'normal', color:'g4', imageUrl:null },
  { id:'def-5', titre:'Projet eau potable', categorie:'projets', emoji:'💧', layout:'normal', color:'g5', imageUrl:null },
  { id:'def-6', titre:'Rencontre diaspora Europe', categorie:'diaspora', emoji:'🌍', layout:'wide', color:'g6', imageUrl:null }
];

function loadGallery() {
  try {
    var data = JSON.parse(localStorage.getItem(GAL_KEY) || 'null');
    return data && data.length > 0 ? data : GAL_DEFAULTS;
  } catch(e) { return GAL_DEFAULTS; }
}

function saveGallery(list) {
  localStorage.setItem(GAL_KEY, JSON.stringify(list));
  if (typeof fbReady !== 'undefined' && fbReady && fbDB) {
    fbDB.ref('gallery').set(list).catch(function(e) { console.warn('Firebase gallery error:', e); });
  }
}

function renderGallery() {
  var items = loadGallery();
  var filtered = currentGalFilter === 'all' ? items : items.filter(function(g) { return g.categorie === currentGalFilter; });

  var grid = document.getElementById('gallery-grid');
  var empty = document.getElementById('gallery-empty');
  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  grid.innerHTML = filtered.map(function(g, i) {
    var layoutClass = (g.layout || 'normal').split(' ').filter(function(c) { return c === 'wide' || c === 'tall'; }).join(' ');
    var colorClass = g.color || GAL_COLORS[i % GAL_COLORS.length];
    var bgStyle = g.imageUrl
      ? 'background-image:url(' + g.imageUrl + ');background-size:cover;background-position:center;'
      : '';
    var content = g.imageUrl ? '' : '<span>' + (g.emoji || '📷') + '</span>';
    var count = getGalleryFileCount(g);

    return '<div class="gallery-item ' + colorClass + ' ' + layoutClass + '" style="' + bgStyle + '" onclick="handleGalleryTileClick(\'' + g.id + '\')" title="Ajouter des fichiers ou un dossier">' +
      '<div class="gallery-admin-badge">＋ Ajouter</div>' +
      '<div class="gallery-file-count">' + count + ' fichier(s)</div>' +
      content +
      '<div class="gallery-caption">' + (g.titre || '') + '</div>' +
    '</div>';
  }).join('');
}

function filterGallery(cat, btn) {
  currentGalFilter = cat;
  document.querySelectorAll('.faq-cat').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  renderGallery();
}

function getGalleryFolderName(item) {
  return normalizeFolderName((item && item.titre) ? item.titre : 'Galerie');
}

function getGalleryFileCount(item) {
  var folder = getGalleryFolderName(item);
  return loadDocs().filter(function(doc) {
    return normalizeFolderName(doc.folder || 'Non classé') === folder;
  }).length;
}

function ensureDocFolderExists(name) {
  var folder = normalizeFolderName(name) || 'Non classé';
  if (folder === 'Non classé') return folder;
  var folders = loadDocFolders();
  var exists = folders.some(function(f) { return f.toLowerCase() === folder.toLowerCase(); });
  if (!exists) {
    folders.unshift(folder);
    saveDocFolders(folders);
  }
  return folder;
}

function saveFilesDirectlyToFolder(files, folderName, callback) {
  if (!files || !files.length) return;
  var docs = loadDocs();
  var folder = ensureDocFolderExists(folderName);
  var count = 0;
  var total = files.length;

  for (var i = 0; i < files.length; i++) {
    (function(file) {
      if (file.size > 4 * 1024 * 1024) {
        count++;
        showToast('⚠ ' + file.name + ' dépasse 4 Mo');
        if (count >= total) {
          try { saveDocs(docs); } catch(e) {}
          renderDocs(); renderGallery();
          if (callback) callback(count);
        }
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        var relativeName = file.webkitRelativePath ? file.webkitRelativePath : file.name;
        docs.unshift({
          id: 'DOC-' + Date.now() + '-' + Math.floor(Math.random() * 9999),
          name: relativeName,
          type: getDocType(file.name),
          size: file.size,
          folder: folder,
          date: new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }),
          data: e.target.result
        });
        count++;
        if (count >= total) {
          try {
            saveDocs(docs);
            renderDocs();
            renderGallery();
            if (callback) callback(total);
          } catch(err) {
            alert('⚠ Espace de stockage insuffisant. Supprimez des documents existants ou réduisez la taille des fichiers.');
          }
        }
      };
      reader.readAsDataURL(file);
    })(files[i]);
  }
}

function triggerGalleryInput(itemId, directoryMode) {
  var items = loadGallery();
  var item = items.find(function(g) { return g.id === itemId; });
  if (!item) return;
  var input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  if (directoryMode) {
    input.setAttribute('webkitdirectory', '');
    input.setAttribute('directory', '');
  }
  input.style.display = 'none';
  input.addEventListener('change', function() {
    if (!input.files || !input.files.length) return;
    saveFilesDirectlyToFolder(input.files, getGalleryFolderName(item), function(total) {
      showToast(directoryMode ? '📁 ' + total + ' fichier(s) du dossier ajoutés' : '📎 ' + total + ' fichier(s) ajoutés');
    });
    input.remove();
  });
  document.body.appendChild(input);
  input.click();
}

function handleGalleryTileClick(itemId) {
  var items = loadGallery();
  var item = items.find(function(g) { return g.id === itemId; });
  if (!item) return;
  if (!isAdminAuthenticated()) {
    showToast('🔒 Réservé à l’administrateur Wagne Sileymane');
    return;
  }
  var chooseFolder = confirm('Cliquez sur OK pour ajouter des fichiers, ou sur Annuler pour ajouter un dossier complet dans « ' + getGalleryFolderName(item) + ' ».');
  triggerGalleryInput(itemId, !chooseFolder);
}

// Initialiser la galerie au chargement de la page
document.addEventListener('DOMContentLoaded', function() { renderGallery(); });

// ── Admin galerie ────────────────────────────────────────────────────

function openAddGalleryModal() {
  editingGalId = null;
  galImageData = null;
  document.getElementById('gallery-modal-title').textContent = 'Ajouter une photo';
  document.getElementById('gal-titre').value = '';
  document.getElementById('gal-categorie').value = '';
  document.getElementById('gal-emoji').value = '';
  document.getElementById('gal-layout').value = 'normal';
  document.getElementById('gal-preview').innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:36px;color:var(--gris);"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>';
  document.getElementById('gal-file-input').value = '';
  document.getElementById('gallery-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function editGalleryItem(id) {
  var items = loadGallery();
  var item = items.find(function(g) { return g.id === id; });
  if (!item) return;

  editingGalId = id;
  galImageData = item.imageUrl || null;
  document.getElementById('gallery-modal-title').textContent = 'Modifier la photo';
  document.getElementById('gal-titre').value = item.titre || '';
  document.getElementById('gal-categorie').value = item.categorie || '';
  document.getElementById('gal-emoji').value = item.emoji || '';
  document.getElementById('gal-layout').value = item.layout || 'normal';

  if (item.imageUrl) {
    document.getElementById('gal-preview').innerHTML = '<img src="' + item.imageUrl + '" style="max-height:120px;border-radius:8px;">';
  }
  document.getElementById('gallery-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
  document.getElementById('gallery-modal').classList.remove('open');
  document.body.style.overflow = '';
  editingGalId = null;
  galImageData = null;
}

function previewGalleryImage(input) {
  var file = input.files[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) { showToast('⚠ Image trop lourde (max 3 Mo)'); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    galImageData = e.target.result;
    document.getElementById('gal-preview').innerHTML = '<img src="' + galImageData + '" style="max-height:120px;border-radius:8px;">';
  };
  reader.readAsDataURL(file);
}

function saveGalleryItem() {
  var titre = document.getElementById('gal-titre').value.trim();
  var categorie = document.getElementById('gal-categorie').value;
  var emoji = document.getElementById('gal-emoji').value.trim();
  var layout = document.getElementById('gal-layout').value;

  if (!titre) { showToast('⚠ Veuillez saisir un titre'); return; }
  if (!categorie) { showToast('⚠ Veuillez choisir une catégorie'); return; }

  var items = loadGallery();

  if (editingGalId) {
    var idx = items.findIndex(function(g) { return g.id === editingGalId; });
    if (idx !== -1) {
      items[idx].titre = titre;
      items[idx].categorie = categorie;
      items[idx].emoji = emoji || items[idx].emoji;
      items[idx].layout = layout;
      if (galImageData) items[idx].imageUrl = galImageData;
    }
  } else {
    var colorIdx = items.length % GAL_COLORS.length;
    items.push({
      id: 'gal-' + Date.now(),
      titre: titre,
      categorie: categorie,
      emoji: emoji || '📷',
      layout: layout,
      color: GAL_COLORS[colorIdx],
      imageUrl: galImageData || null
    });
  }

  try {
    saveGallery(items);
    closeGalleryModal();
    renderGallery();
    renderGalleryAdmin();
    showToast(editingGalId ? '✅ Photo modifiée' : '✅ Photo ajoutée à la galerie');
  } catch(e) {
    showToast('⚠ Espace de stockage insuffisant — réduisez la taille de l\'image');
  }
}

function deleteGalleryItem(id) {
  if (!confirm('Supprimer cette photo de la galerie ?')) return;
  var items = loadGallery().filter(function(g) { return g.id !== id; });
  saveGallery(items);
  renderGallery();
  renderGalleryAdmin();
  showToast('🗑 Photo supprimée');
}

function renderGalleryAdmin() {
  var items = loadGallery();
  var container = document.getElementById('gallery-admin-list');
  if (!container) return;

  // Stats
  setText('gal-count-all', items.length);
  setText('gal-count-projets', items.filter(function(g) { return g.categorie === 'projets'; }).length);
  setText('gal-count-evenements', items.filter(function(g) { return g.categorie === 'evenements'; }).length);
  var vd = items.filter(function(g) { return g.categorie === 'village' || g.categorie === 'diaspora'; }).length;
  setText('gal-count-village', vd);

  if (items.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:48px;color:var(--gris);"><div style="font-size:48px;margin-bottom:12px;">📷</div><h3 style="font-family:Playfair Display,serif;font-size:18px;color:var(--vert);margin-bottom:8px;">Aucune photo</h3><p style="font-size:13px;">Cliquez « + Ajouter une photo » pour commencer.</p></div>';
    return;
  }

  var catLabels = { projets:'🏗 Projets', evenements:'🎉 Événements', village:'🏡 Village', diaspora:'🌍 Diaspora' };
  container.innerHTML = items.map(function(g) {
    var thumb = g.imageUrl
      ? '<img src="' + g.imageUrl + '" style="width:56px;height:56px;object-fit:cover;border-radius:8px;flex-shrink:0;">'
      : '<div style="width:56px;height:56px;border-radius:8px;background:var(--vert-clair);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;">' + (g.emoji || '📷') + '</div>';
    var layoutLabel = { normal:'Normal', wide:'Large', tall:'Haut', 'wide tall':'Grande' }[g.layout] || g.layout;

    return '<div class="doc-card">' +
      thumb +
      '<div class="doc-info">' +
        '<div class="doc-name">' + g.titre + '</div>' +
        '<div class="doc-meta">' + (catLabels[g.categorie] || g.categorie) + ' · ' + layoutLabel + '</div>' +
      '</div>' +
      '<div class="doc-actions">' +
        '<button class="doc-btn download" onclick="editGalleryItem(\'' + g.id + '\')">✏ Modifier</button>' +
        '<button class="doc-btn delete" onclick="deleteGalleryItem(\'' + g.id + '\')">✕</button>' +
      '</div></div>';
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════════════
   SYSTÈME BILINGUE — FRANÇAIS / PULAAR
═══════════════════════════════════════════════════════════════════════ */
var currentLang = localStorage.getItem('yell_lang') || 'fr';

var TRANSLATIONS = {
  // Navigation
  nav_qui:       { fr: 'Qui sommes-nous',    pu: 'Ko min woni' },
  nav_projets:   { fr: 'Projets',            pu: 'Golleeji' },
  nav_actus:     { fr: 'Actualités',         pu: 'Kabaruuji' },
  nav_galerie:   { fr: 'Galerie',            pu: 'Nataali' },
  nav_contact:   { fr: 'Contact',            pu: 'Jokkondiral' },
  nav_admin:     { fr: '⚙ Administration',   pu: '⚙ Toppitaare' },
  nav_adhesion:  { fr: 'Adhérer',            pu: 'Naatugol' },

  // Mobile menu
  mob_projets:   { fr: 'Projets & réalisations',      pu: 'Golleeji e golle gasɗe' },
  mob_actus:     { fr: 'Actualités & agenda',          pu: 'Kabaruuji e kalanndirye' },
  mob_contact:   { fr: 'Nous contacter',               pu: 'Jokkondire e amen' },
  mob_dons:      { fr: 'Faire un don',                 pu: 'Waɗde ballal' },
  mob_adhesion:  { fr: 'Adhérer à l\'organisation →',  pu: 'Naatugol e fedde ndee →' },

  // Hero
  hero_pill:     { fr: 'Organisation communautaire inclusive',
                   pu: 'Fedde renndo nde yimɓe fof mbaawi naatde' },
  hero_title:    { fr: 'Ensemble pour <em>Thidé</em>,<br>de partout dans le monde',
                   pu: 'Denndaangal ngam <em>Thidé</em>,<br>iwde e leyɗeele fof' },
  hero_sub:      { fr: 'YELLITAARE Thidé unit les ressortissants du village — résidents, citadins et diaspora — autour d\'un cadre formel, transparent et exigeant, au service du développement durable de la communauté.',
                   pu: 'YELLITAARE Thidé renndinta yimɓe wuro ngoo — hoɗɓe, wuurɓe e nder galleeji e diaspora — ngam ƴellitaare wuro e renndo men.' },

  // Page Adhésion
  adh_title:     { fr: 'Formulaire d\'Adhésion',       pu: 'Fiilde Naatugol' },
  adh_sub:       { fr: 'Rejoignez YELLITAARE Thidé en remplissant le formulaire ci-dessous — accessible depuis tout appareil.',
                   pu: 'Naatee e YELLITAARE Thidé — heɓtinee fiilde les — heɓotoo e kala kaɓirɗe.' },

  // Sections communes
  sec_valeurs:         { fr: 'Nos valeurs fondamentales',   pu: 'Kattanɗe men ceedtiiɗe' },
  sec_gouvernance:     { fr: 'Gouvernance',                 pu: 'Laamu fedde' },
  sec_qui_titre:       { fr: 'Histoire, valeurs & gouvernance', pu: 'Taariixa, kattanɗe e laamu' },
  sec_projets_titre:   { fr: 'Projets & réalisations',     pu: 'Golleeji e golle gasɗe' },
  sec_actus_titre:     { fr: 'Actualités & agenda',         pu: 'Kabaruuji e kalanndirye' },
  sec_galerie_titre:   { fr: 'Galerie photos & vidéos',     pu: 'Nataali e wideyooji' },
  sec_contact_titre:   { fr: 'Nous contacter',              pu: 'Jokkondire e amen' },
  sec_faq_titre:       { fr: 'Questions fréquentes',        pu: 'Naamne ɗe yimɓe ɓuri naamnaade' },
  sec_dons_titre:      { fr: 'Soutenir YELLITAARE Thidé',   pu: 'Wallude YELLITAARE Thidé' },
  sec_mentions_titre:  { fr: 'Mentions légales & CGU',       pu: 'Sarɗiiji laawol' },

  // Boutons communs
  btn_en_savoir:    { fr: 'En savoir plus',              pu: 'Ɓeydu humpito' },
  btn_nous_rejoindre:{ fr: 'Nous rejoindre',             pu: 'Naatde e amen' },
  btn_decouvrir:    { fr: 'Découvrir nos projets',       pu: 'Yiyde golleeji amen' },
  btn_telecharger:  { fr: 'Télécharger',                 pu: 'Aawde' },
  btn_fermer:       { fr: 'Fermer',                      pu: 'Uddu' },
  btn_histoire:     { fr: 'Notre histoire',                pu: 'Taariixa men' },

  // Footer
  footer_brand:     { fr: 'YELLITAARE Thidé',            pu: 'YELLITAARE Thidé' },
  footer_tagline:   { fr: '<span data-i18n="footer_tagline">Organisation Communautaire Inclusive de Thidé.</span>',
                      pu: 'Fedde Renndo nde Yimɓe Fof Naatata — Thidé.' },

  // Statistiques Hero
  stat_1960:        { fr: '<span data-i18n="stat_1960">Premières solidarités organisées entre ressortissants</span>',
                      pu: 'Ballondiral gadanal hakkunde yimɓe Thidé' },
  stat_sections:    { fr: '<span data-i18n="stat_sections">Sections : Village · Villes · Diaspora internationale</span>',
                      pu: 'Cate : Wuro · Galleeji · Diaspora' },
  stat_commissions: { fr: '<span data-i18n="stat_commissions">Commissions thématiques pilotant les projets</span>',
                      pu: 'Gollorɗe toppitiingol golleeji' },

  // Cotisations
  cotis_resident:      { fr: 'Résident de Thidé',                      pu: 'Koɗo Thidé' },
  cotis_ressortissant: { fr: 'Ressortissant – villes mauritaniennes',   pu: 'Wuurɗo e galleeji Muritani' },
  cotis_diaspora_af:   { fr: 'Diaspora Afrique',                        pu: 'Diaspora Afrik' },
  cotis_diaspora_eu:   { fr: 'Diaspora Europe / Amériques',             pu: 'Diaspora Orop / Amerik' },

  // Sections géographiques
  section_thide:            { fr: 'Résidents de Thidé',             pu: 'Hoɗɓe Thidé' },
  section_nouakchott:       { fr: 'Nouakchott',                     pu: 'Nawakshot' },
  section_nouadhibou:       { fr: 'Nouadhibou',                     pu: 'Nawaadibu' },
  section_zouerat:          { fr: 'Zouerat',                        pu: 'Suweeraat' },
  section_diaspora_afrique: { fr: 'Diaspora Afrique',               pu: 'Diaspora Afrik' },
  section_diaspora_europe:  { fr: 'Diaspora Europe',                pu: 'Diaspora Orop' },
  section_diaspora_amerique:{ fr: 'Diaspora Amérique / Autres',     pu: 'Diaspora Amerik / Goɗɗi' },

  // Commissions
  com_education:   { fr: 'Éducation & Formation',        pu: 'Jaŋde e Nehdi' },
  com_sante:       { fr: 'Santé & Bien-être',            pu: 'Cellal e Jam' },
  com_infra:       { fr: 'Infrastructures & Habitat',    pu: 'Mahanaaɗe e Hoɗorde' },
  com_culture:     { fr: 'Culture & Patrimoine',         pu: 'Pinal e Ndonaandi' },
  com_finances:    { fr: 'Finances & Ressources',        pu: 'Jawdi e Doole' },
  com_diaspora:    { fr: 'Diaspora & Relations Ext.',     pu: 'Diaspora e Jokkondire' },
  com_jeunesse:    { fr: 'Jeunesse & Sports',            pu: 'Sukaaɓe e Coftal' },
  com_agriculture: { fr: 'Agriculture & Environnement',  pu: 'Ndema e Taariinde' },

  // Pages — Titres
  page_qui_title:       { fr: 'Histoire, valeurs & gouvernance',    pu: 'Taariixa, kattanɗe e laamu fedde' },
  page_qui_sub:         { fr: 'De la solidarité spontanée des années 1960 à la refondation formelle d\'aujourd\'hui — l\'histoire de YELLITAARE Thidé est celle de toute une communauté.',
                          pu: 'Gila ballondiral gadanal e hitaande 1960 haa hannde — taariixa YELLITAARE Thidé ko taariixa renndo men fof.' },
  page_projets_title:   { fr: 'Projets & réalisations',             pu: 'Golleeji e golle gasɗe' },
  page_projets_sub:     { fr: 'Ce que la communauté de Thidé construit, ensemble, depuis des décennies et pour les générations à venir.',
                          pu: 'Ko renndo Thidé mahata, denndaangal, gila duuɓi keewɗi ngam ɓesngu ngu arata.' },
  page_actus_title:     { fr: 'Actualités & agenda',                pu: 'Kabaruuji e kalanndirye' },
  page_actus_sub:       { fr: 'Nouvelles de Thidé, de ses sections locales et de l\'organisation — restez connectés à votre communauté.',
                          pu: 'Kabaruuji Thidé, cate mum e fedde ndee — keddee e jokkondiral e renndo mon.' },
  page_galerie_title:   { fr: 'Galerie photos & vidéos',            pu: 'Nataali e wideyooji' },
  page_galerie_sub:     { fr: 'Les moments forts de la communauté — projets, événements, vie du village de Thidé.',
                          pu: 'Sahaaji teeŋtuɗi renndo ngoo — golleeji, pottitte, nguurndam wuro Thidé.' },
  page_contact_title:   { fr: 'Nous contacter',                     pu: 'Jokkondire e amen' },
  page_contact_sub:     { fr: 'Le Secrétariat Général et les sections locales sont à votre écoute.',
                          pu: 'Kuuɓal Binndol e cate leydi ɗii ana keɗii on.' },
  page_faq_title:       { fr: 'Questions fréquentes',               pu: 'Naamne ɗe yimɓe ɓuri naamnaade' },
  page_faq_sub:         { fr: 'Tout ce que vous devez savoir sur YELLITAARE Thidé, l\'adhésion et le fonctionnement de l\'organisation.',
                          pu: 'Ko kala ko kaanɗon anndude dow YELLITAARE Thidé, naatugol e no fedde ndee gollortoo.' },
  page_dons_title:      { fr: 'Soutenir YELLITAARE Thidé',          pu: 'Wallude YELLITAARE Thidé' },
  page_dons_sub:        { fr: 'Votre contribution finance directement les projets communautaires de Thidé. Chaque don compte.',
                          pu: 'Ballal mon wallata golleeji renndo Thidé. Kala ballal ana himmi.' },
  page_mentions_title:  { fr: 'Mentions légales & CGU',             pu: 'Sarɗiiji laawol' },

  // Homepage sections
  home_histoire_label:  { fr: 'Notre histoire',                     pu: 'Taariixa men' },
  home_histoire_title:  { fr: 'De la solidarité spontanée à la gouvernance formelle',
                          pu: 'Gila ballondiral haa laamu moƴƴu fedde' },
  home_org_label:       { fr: 'Organisation',                       pu: 'Fedde' },
  home_org_title:       { fr: 'Trois sections, une seule communauté',
                          pu: 'Cate tati, renndo gooto' },
  home_vie_label:       { fr: 'Vie du village',                     pu: 'Nguurndam wuro' },
  home_actus_title:     { fr: 'Actualités récentes',                pu: 'Kabaruuji kesi' },

  // Qui sommes-nous sections
  qui_preambule:        { fr: 'Préambule',                          pu: 'Gadanol' },
  qui_contexte:         { fr: 'Contexte et évolution historique',   pu: 'Daliilu e ƴellitaare taariixa' },
  qui_valeurs_label:    { fr: 'Nos valeurs',                        pu: 'Kattanɗe men' },
  qui_valeurs_title:    { fr: 'Les principes qui nous guident',     pu: 'Laabi ɗi peewni en' },
  qui_organes:          { fr: 'Organes',                            pu: 'Terɗe fedde' },
  qui_gouv_title:       { fr: 'Structure de gouvernance',           pu: 'No fedde ndee tiindorii' },

  // Projets
  projets_label:        { fr: 'Nos projets',                       pu: 'Golleeji amen' },
  projets_actifs_title: { fr: 'Projets communautaires',            pu: 'Golleeji renndo' }
};

function switchLang() {
  currentLang = currentLang === 'fr' ? 'pu' : 'fr';
  localStorage.setItem('yell_lang', currentLang);
  applyLang();
}

function applyLang() {
  var btnLabel = currentLang === 'fr' ? 'PU' : 'FR';
  var btn = document.getElementById('lang-btn');
  var btnMob = document.getElementById('lang-btn-mob');
  if (btn) btn.textContent = btnLabel;
  if (btnMob) btnMob.textContent = (currentLang === 'fr' ? '🌍 Pulaar' : '🇫🇷 Français');

  // Remplacer tous les éléments avec data-i18n
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var tr = TRANSLATIONS[key];
    if (tr && tr[currentLang]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = tr[currentLang];
      } else {
        el.innerHTML = tr[currentLang];
      }
    }
  });

  // Titre du document
  document.title = currentLang === 'fr'
    ? 'YELLITAARE Thidé — Organisation Communautaire Inclusive'
    : 'YELLITAARE Thidé — Fedde Renndo nde Yimɓe Fof Naatata';
}

// Appliquer la langue au chargement
document.addEventListener('DOMContentLoaded', function() {
  updateAdminIdentityUI();
  if (currentLang !== 'fr') applyLang();
});




// PWA — Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(reg) {
      
    }).catch(function(err) {
      
    });
  });
}



(function(){
  const CONTACT_DEST_EMAIL = 'wagne1269@gmail.com';
  const form = document.getElementById('contact-form');
  const statusBox = document.getElementById('contact-form-status');
  const submitBtn = document.getElementById('contact-submit-btn');

  function showContactStatus(message, type){
    if(!statusBox) return;
    statusBox.className = 'contact-form-status ' + (type || 'success');
    statusBox.style.display = 'block';
    statusBox.textContent = message;
  }

  async function sendContactForm(event){
    event.preventDefault();
    if(!form) return;

    const payload = {
      nom: (document.getElementById('contact-nom')?.value || '').trim(),
      prenom: (document.getElementById('contact-prenom')?.value || '').trim(),
      email: (document.getElementById('contact-email')?.value || '').trim(),
      section: (document.getElementById('contact-section')?.value || '').trim(),
      objet: (document.getElementById('contact-objet')?.value || '').trim(),
      message: (document.getElementById('contact-message')?.value || '').trim(),
      _subject: 'Nouveau message de contact — ' + ((document.getElementById('contact-objet')?.value || '').trim() || 'Sans objet'),
      _captcha: 'false',
      _template: 'table'
    };

    if(!payload.nom || !payload.prenom || !payload.email || !payload.objet || !payload.message){
      showContactStatus('Veuillez renseigner tous les champs obligatoires.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    showContactStatus('Envoi du message...', 'success');

    try{
      const response = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(CONTACT_DEST_EMAIL), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if(response.ok && (result.success === true || result.success === 'true' || !('success' in result))){
        showContactStatus('Message envoyé avec succès vers ' + CONTACT_DEST_EMAIL + '.', 'success');
        form.reset();
      }else{
        showContactStatus((result.message || "L'envoi a échoué.") + " Lors du tout premier envoi, il faut confirmer l'adresse de réception dans l'email d'activation reçu.", 'error');
      }
    }catch(error){
      showContactStatus("Impossible d'envoyer le message pour l'instant. Vérifiez la connexion internet ou la configuration du service d'envoi.", 'error');
    }finally{
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    }
  }

  if(form){
    form.addEventListener('submit', sendContactForm);
  }
})();

/* StudyOrbital S8.2 — one consistent navigation hierarchy and a compact home.
   Existing tracker calculation, record, and localStorage logic is preserved. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const main=document.querySelector('main.wrap');
if(!main||$('soShellReady'))return;

const NAV=[
 {id:'home',label:'Home',icon:'▦',group:'',target:'summary',desc:'Preparation overview'},
 {id:'plan',label:'Chapter Plan',icon:'☷',group:'Study',target:'chapterPlanSection',desc:'Continue chapter preparation'},
 {id:'qb',label:'Question Bank',icon:'▤',group:'Study',target:'questionBankSection',desc:'Practice and track questions'},
 {id:'daily',label:'Daily Log',icon:'◷',group:'Study',target:'dailyLogSection',desc:'Record study hours and habits'},
 {id:'tests',label:'My Tests',icon:'▥',group:'Performance',target:'orbTestingSection',desc:'Save and compare test results'},
 {id:'analysis',label:'Analysis',icon:'⌁',group:'Performance',target:'orbAnalysisSection',desc:'Review saved study and test trends'},
 {id:'leave',label:'Leave Records',icon:'◌',group:'Records',target:'orbLeaveSection',desc:'Track study breaks'},
 {id:'library',label:'Personal Storage',icon:'▣',group:'Records',target:'soPersonalStorageSection',desc:'Keep private notes and reference files'},
 {id:'backup',label:'Data & Backup',icon:'⇄',group:'Records',target:'snapshotSection',desc:'Export or restore your records'}
];
const sections=[...main.querySelectorAll(':scope > section.card')];
const header=main.querySelector(':scope > .hero');
if(!header)return;

// Keep the established content and handlers; align section order with the navigation.
const snapshotSection=sections.find(s=>s.querySelector('h2')?.textContent.includes('Save / Export Tracker Snapshot'))||null;
if(snapshotSection)snapshotSection.id='snapshotSection';
const labelMap={summary:'Preparation overview',chapterPlanSection:'Chapter Plan',questionBankSection:'Question Bank',dailyLogSection:'Daily Log',orbTestingSection:'My Tests',orbAnalysisSection:'Analysis',orbLeaveSection:'Leave Records',soPersonalStorageSection:'Personal Storage',snapshotSection:'Data & Backup'};
Object.entries(labelMap).forEach(([id,label])=>{
 const node=$(id);const heading=node?.querySelector(':scope > h2,:scope > .qb-title-row h2');
 if(heading)heading.textContent=label;
});

const workspace=document.createElement('div');workspace.className='so-workspace';workspace.id='soWorkspace';
const sidebar=document.createElement('aside');sidebar.className='so-sidebar';sidebar.setAttribute('aria-label','Main navigation');
sidebar.innerHTML='<div class="so-sidebar-label">WORKSPACE</div>';
const makeNavButton=item=>{
 const b=document.createElement('button');b.type='button';b.className='so-nav-button';b.dataset.page=item.id;
 b.setAttribute('aria-label',item.label);b.innerHTML=`<span class="so-nav-icon" aria-hidden="true">${item.icon}</span><span>${item.label}</span>`;
 return b;
};
const desktopNav=document.createElement('nav');desktopNav.className='so-desktop-nav';desktopNav.setAttribute('aria-label','Workspace sections');
let currentGroup='';
NAV.forEach(item=>{
 if(item.group!==currentGroup){currentGroup=item.group;if(currentGroup){const label=document.createElement('div');label.className='so-nav-group-label';label.textContent=currentGroup;desktopNav.appendChild(label)}}
 desktopNav.appendChild(makeNavButton(item));
});
sidebar.appendChild(desktopNav);
const sideFoot=document.createElement('div');sideFoot.className='so-sidebar-footer';sideFoot.id='soStorageStatus';
sideFoot.innerHTML='<span class="so-storage-dot"></span><strong>Device save active</strong><br>Account sync activates after secure setup.';
sidebar.appendChild(sideFoot);

// The mobile bar has four high-frequency destinations; the remaining pages live once in More.
const mobileNav=document.createElement('nav');mobileNav.className='so-mobile-nav';mobileNav.setAttribute('aria-label','Quick navigation');
const mobileIDs=['home','daily','tests','analysis','more'];
const mobileTitles={home:'Home',daily:'Daily Log',tests:'My Tests',analysis:'Analysis',more:'More'};
const mobileIcons={home:'▦',daily:'◷',tests:'▥',analysis:'⌁',more:'···'};
mobileIDs.forEach(id=>{
 const item=NAV.find(x=>x.id===id)||{id,label:'More',icon:'···',desc:'More workspace sections'};
 const b=makeNavButton({...item,label:mobileTitles[id],icon:mobileIcons[id]});
 if(id==='more')b.dataset.more='1';mobileNav.appendChild(b);
});
const moreMenu=document.createElement('div');moreMenu.className='so-more-menu';moreMenu.hidden=true;moreMenu.setAttribute('role','menu');
let moreGroup='';
NAV.filter(x=>!mobileIDs.includes(x.id)).forEach(item=>{
 if(item.group!==moreGroup){moreGroup=item.group;const label=document.createElement('div');label.className='so-more-menu-group-label';label.textContent=moreGroup;moreMenu.appendChild(label)}
 const b=makeNavButton(item);b.setAttribute('role','menuitem');moreMenu.appendChild(b);
});

const intro=document.createElement('section');intro.className='so-home-intro';intro.id='soHomeIntro';
intro.innerHTML='<div class="so-kicker">STUDY WORKSPACE</div><div class="so-welcome-row"><div class="so-welcome-copy"><h2>Good morning.</h2><p>Your preparation, clearly in view.</p></div><div class="so-home-tools" id="soHomeTools" aria-label="Quick tools"></div></div>';

// Sort only top-level sections into the exact same order as navigation; unknown sections remain present.
const priority=new Map(NAV.map((item,index)=>[item.target,index]));
const otherChildren=[...main.children].filter(node=>node!==header);
const originalSections=otherChildren.filter(node=>node.matches?.('section.card'));
const nonSections=otherChildren.filter(node=>!node.matches?.('section.card'));
originalSections.sort((a,b)=>(priority.get(a.id)??999)-(priority.get(b.id)??999));
workspace.append(intro,...originalSections,...nonSections);
main.replaceChildren(header,sidebar,workspace);

const creditFooter=document.createElement('div');creditFooter.className='so-app-footer';creditFooter.setAttribute('aria-label','StudyOrbital creator credits');
creditFooter.innerHTML='<div class="so-credit-mark" aria-hidden="true">◈</div><div class="so-credit-content"><div class="so-credit-primary"><span class="so-credit-label">SYSTEM ARCHITECT</span><strong>SATYA SINGH</strong></div><div class="so-credit-meta"><span class="so-credit-item"><span class="so-credit-symbol" aria-hidden="true">@</span><span>Author Tag</span><strong>singhsn9462</strong></span><span class="so-credit-item"><span class="so-credit-symbol" aria-hidden="true">#</span><span>Age</span><strong>16</strong></span><span class="so-credit-item so-credit-passion"><span class="so-credit-symbol" aria-hidden="true">✦</span><span>Developed by</span><strong>Passion</strong></span></div></div>';
main.append(creditFooter);
main.classList.add('so-app');
const logo=header.querySelector('.studyorbit-logo');if(logo)logo.alt='StudyOrbital';
const modelLabel=header.querySelector('.orbit-model-label');if(modelLabel){modelLabel.textContent='S8.2';modelLabel.setAttribute('aria-label','Model S8.2 Structure and Profile Update')}
const floatingTodo=$('todoFab');
if(floatingTodo){
 floatingTodo.innerHTML='<span class="todo-fab-symbol" aria-hidden="true">✓</span><span class="todo-fab-label">To-do list</span>';
 floatingTodo.setAttribute('aria-label','To-do list');floatingTodo.classList.add('todo-docked');$('soHomeTools').appendChild(floatingTodo);
}
const todoHeading=document.querySelector('#todoOverlay .todo-heading');if(todoHeading)todoHeading.textContent='To-do list';
const searchWrap=document.createElement('div');searchWrap.className='so-search-wrap';
searchWrap.innerHTML='<label class="so-search-box"><span aria-hidden="true">⌕</span><input type="search" id="soGlobalSearch" placeholder="Search sections…" autocomplete="off" aria-label="Search StudyOrbital sections"></label><div id="soSearchResults" class="so-search-results" hidden></div>';
header.appendChild(searchWrap);
let activePage='home';
const greetingHour=new Date().getHours();
const greeting=greetingHour<12?'Good morning.':greetingHour<17?'Good afternoon.':'Good evening.';
const greetingTitle=document.querySelector('#soHomeIntro .so-welcome-row h2');if(greetingTitle)greetingTitle.textContent=greeting;

function openPage(page){
 const item=NAV.find(n=>n.id===page);if(!item)return;
 activePage=page;moreMenu.hidden=true;
 const todoControl=$('todoFab'),homeTools=$('soHomeTools');
 if(todoControl&&homeTools){if(page==='home'){todoControl.classList.add('todo-docked');homeTools.appendChild(todoControl)}else{todoControl.classList.remove('todo-docked');document.body.appendChild(todoControl)}}
 workspace.querySelectorAll(':scope > section.card').forEach(s=>{s.hidden=s.id!==item.target});
 intro.hidden=page!=='home';
 const target=$(item.target);
 if(target){target.hidden=false;if(target.classList.contains('accordion-section')){target.classList.remove('collapsed');const heading=target.querySelector(':scope > h2,:scope > .qb-title-row');if(heading)heading.setAttribute('aria-expanded','true')}if(target.classList.contains('orbit-section')){target.classList.remove('closed');const heading=target.querySelector(':scope > h2');if(heading)heading.setAttribute('aria-expanded','true')}}
 document.querySelectorAll('.so-nav-button[data-page]').forEach(b=>{
  const isMore=Boolean(b.dataset.more);const curr=b.dataset.page===page||isMore&&!mobileIDs.includes(page);
  b.setAttribute('aria-current',curr?'page':'false');b.classList.toggle('is-current',curr);
 });
 window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}
function clickNav(e){const b=e.target.closest('button[data-page]');if(!b)return;if(b.dataset.more){moreMenu.hidden=!moreMenu.hidden;return}openPage(b.dataset.page)}
desktopNav.addEventListener('click',clickNav);mobileNav.addEventListener('click',clickNav);moreMenu.addEventListener('click',clickNav);
workspace.addEventListener('click',e=>{const b=e.target.closest('[data-open-page]');if(b)openPage(b.dataset.openPage)});
document.body.append(mobileNav,moreMenu);
const search=$('soGlobalSearch'),results=$('soSearchResults');
function findPages(term){const t=term.toLowerCase().trim();return NAV.filter(item=>item.label.toLowerCase().includes(t)||item.desc.toLowerCase().includes(t)||({plan:'chapter chapters stages',qb:'practice questions attempts',daily:'hours revision note log',tests:'scores exam test',analysis:'charts graphs trend',leave:'break absence',backup:'restore export json data',library:'notes files documents personal storage vault'}[item.id]||'').includes(t)).slice(0,6)}
function renderSearch(){const term=search.value.trim();results.replaceChildren();if(!term){results.hidden=true;return}const hits=findPages(term);hits.forEach(item=>{const b=document.createElement('button');b.type='button';b.className='so-search-result';b.innerHTML=`<span>${item.icon}</span><span><strong>${item.label}</strong><small>${item.desc}</small></span><span>↗</span>`;b.addEventListener('click',()=>{search.value='';results.hidden=true;openPage(item.id);search.blur()});results.appendChild(b)});if(!hits.length){const p=document.createElement('p');p.className='so-search-empty';p.textContent='No matching section. Try “Daily Log”, “Analysis” or “Backup”.';results.appendChild(p)}results.hidden=false}
search.addEventListener('input',renderSearch);search.addEventListener('focus',()=>{if(search.value.trim())renderSearch()});document.addEventListener('click',e=>{if(!searchWrap.contains(e.target))results.hidden=true});document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus()}if(e.key==='Escape'){results.hidden=true;moreMenu.hidden=true}});
const searchCSS=document.createElement('style');
searchCSS.textContent=`.so-search-wrap{position:relative;flex:0 1 300px;margin-left:auto;min-width:90px}.so-search-box{display:flex;align-items:center;gap:8px;height:36px;padding:0 10px;border:1px solid #273a50;border-radius:9px;background:#101b2b;color:#8da4bb}.so-search-box input{min-width:0;width:100%;border:0!important;outline:none!important;background:transparent!important;box-shadow:none!important;color:#e8f2fa!important;font-size:12px!important;padding:0!important;min-height:0!important}.so-search-box input::placeholder{color:#788da4}.so-search-results{position:absolute;right:0;top:43px;width:min(320px,calc(100vw - 24px));max-height:60vh;overflow:auto;background:#0f1a2b;border:1px solid #2c4158;border-radius:11px;padding:6px;box-shadow:0 14px 35px #0008;z-index:90}.so-search-result{display:grid;grid-template-columns:22px minmax(0,1fr) 14px;align-items:center;gap:8px;width:100%;padding:10px;border:0!important;border-radius:7px!important;background:transparent!important;text-align:left;color:#dfeaf5!important;box-shadow:none!important}.so-search-result:hover{background:#1a2a3d!important}.so-search-result strong,.so-search-result small{display:block}.so-search-result strong{font-size:12px}.so-search-result small{font-size:10px;color:#879db3;margin-top:2px}.so-search-empty{margin:8px;padding:7px;color:#9aacc0;font-size:12px}@media(max-width:680px){.so-search-wrap{flex:1 1 auto;max-width:200px}.so-search-box{height:33px;padding:0 8px}.so-search-results{right:-45px;top:40px}.so-more-menu{display:block}}`;
document.head.appendChild(searchCSS);
main.dataset.soShellReady='1';const marker=document.createElement('span');marker.id='soShellReady';marker.hidden=true;main.appendChild(marker);openPage('home');
})();

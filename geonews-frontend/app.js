// ── State ──
let activeTab = 'news';
let selectedLayer = null;
let currentCountry = null;
let allFeatures = [];
let labels = [];
let geojson = null;

// ── Mock news data per region ──
const newsDb = {
  default: [
    { tag:'politics', tagClass:'tag-politics', headline:'UN Security Council meets for emergency session on global tensions', source:'Reuters', time:'2h ago' },
    { tag:'economy',  tagClass:'tag-economy',  headline:'Global markets show resilience amid geopolitical uncertainty', source:'Bloomberg', time:'4h ago' },
    { tag:'climate',  tagClass:'tag-climate',  headline:'Record temperatures reported across three continents this week', source:'BBC', time:'6h ago' },
  ],
  US: [
    { tag:'politics', tagClass:'tag-politics', headline:'Congress passes landmark infrastructure bill after months of debate', source:'AP News', time:'1h ago' },
    { tag:'economy',  tagClass:'tag-economy',  headline:'Federal Reserve holds interest rates steady in latest meeting', source:'WSJ', time:'3h ago' },
    { tag:'science',  tagClass:'tag-science',  headline:'NASA announces next Artemis moon mission launch window', source:'NASA', time:'5h ago' },
  ],
  Russia: [
    { tag:'conflict', tagClass:'tag-conflict', headline:'Eastern Europe security summit convenes in Warsaw', source:'Reuters', time:'2h ago' },
    { tag:'economy',  tagClass:'tag-economy',  headline:'Energy trade routes shift as pipeline capacity expands', source:'FT', time:'5h ago' },
    { tag:'politics', tagClass:'tag-politics', headline:'Diplomatic channels reopen after months of silence', source:'BBC', time:'7h ago' },
  ],
  China: [
    { tag:'economy',  tagClass:'tag-economy',  headline:'Manufacturing output hits 18-month high as exports surge', source:'Xinhua', time:'1h ago' },
    { tag:'science',  tagClass:'tag-science',  headline:'Space station expansion module successfully docks', source:'CGTN', time:'4h ago' },
    { tag:'politics', tagClass:'tag-politics', headline:'Belt and Road infrastructure projects reach 50-nation milestone', source:'Reuters', time:'8h ago' },
  ],
  India: [
    { tag:'economy',  tagClass:'tag-economy',  headline:'GDP growth forecast raised to 7.2% by IMF for fiscal year', source:'Mint', time:'2h ago' },
    { tag:'science',  tagClass:'tag-science',  headline:'Chandrayaan mission data reveals new lunar mineral deposits', source:'ISRO', time:'6h ago' },
    { tag:'climate',  tagClass:'tag-climate',  headline:'Monsoon season brings relief to drought-hit central regions', source:'Hindu', time:'8h ago' },
  ],
  Germany: [
    { tag:'politics', tagClass:'tag-politics', headline:'Coalition government reaches agreement on energy transition plan', source:'DW', time:'3h ago' },
    { tag:'economy',  tagClass:'tag-economy',  headline:'Automotive sector posts strongest quarter in three years', source:'Spiegel', time:'5h ago' },
    { tag:'climate',  tagClass:'tag-climate',  headline:'Germany exceeds renewable energy target ahead of schedule', source:'DW', time:'9h ago' },
  ],
  Brazil: [
    { tag:'climate',  tagClass:'tag-climate',  headline:'Amazon conservation initiative adds 2 million hectares of protection', source:'Globo', time:'1h ago' },
    { tag:'economy',  tagClass:'tag-economy',  headline:'Agricultural exports reach record $180B as demand surges', source:'Reuters', time:'4h ago' },
    { tag:'politics', tagClass:'tag-politics', headline:'Regional summit addresses infrastructure connectivity gaps', source:'AP', time:'7h ago' },
  ],
};

const statsDb = {
  default: { pop:'—',     gdp:'—',       area:'—',          hdi:'—'    },
  US:      { pop:'331M',  gdp:'$25.5T',  area:'9.8M km²',   hdi:'0.926' },
  Russia:  { pop:'144M',  gdp:'$2.2T',   area:'17.1M km²',  hdi:'0.822' },
  China:   { pop:'1.41B', gdp:'$17.9T',  area:'9.6M km²',   hdi:'0.768' },
  India:   { pop:'1.44B', gdp:'$3.7T',   area:'3.3M km²',   hdi:'0.644' },
  Germany: { pop:'84M',   gdp:'$4.1T',   area:'357K km²',   hdi:'0.942' },
  Brazil:  { pop:'215M',  gdp:'$1.9T',   area:'8.5M km²',   hdi:'0.754' },
};

// ── Toast ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ── Panel render ──
function renderPanel(name) {
  document.getElementById('panelCountry').textContent = name;
  document.getElementById('panelMeta').textContent = '↳ showing latest intelligence';
  document.getElementById('panelTabs').style.display = 'flex';
  document.getElementById('selectedChip').style.display = 'flex';
  document.getElementById('selectedName').textContent = name;
  renderTab(activeTab, name);
}

function renderTab(tab, name) {
  activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
  });

  const body = document.getElementById('panelBody');

  if (tab === 'news') if (tab === 'news') {
  body.innerHTML =
    '<div class="news-loading">' +
    '<div class="skeleton" style="height:80px;border-radius:10px;"></div>' +
    '<div class="skeleton" style="height:80px;border-radius:10px;"></div>' +
    '<div class="skeleton" style="height:80px;border-radius:10px;"></div>' +
    '</div>';

  fetch(`http://k8s-geonews-backends-93ca54a87d-dded4b954a3a5d2f.elb.eu-north-1.amazonaws.com/news?country=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.news || data.news.length === 0) {
        body.innerHTML = "<p>No news found</p>";
        return;
      }

      body.innerHTML = data.news.map(n => `
        <div class="news-card">
          <div class="news-tag tag-science">LIVE</div>
          <div class="news-headline">${n}</div>
          <div class="news-meta">
            <span>GeoNews</span>
            <span>${data.riskLevel || "normal"}</span>
          </div>
        </div>
      `).join('');
   })
    .catch(err => {
      console.error(err);
      body.innerHTML = "<p>Error loading news</p>";
    });

} else if (tab === 'stats') {
  const s = statsDb[name] || statsDb.default;
  body.innerHTML = `
    <div> class="stat-row">
        <div class="stat-item">
          <div class="stat-label">POPULATION</div>
          <div class="stat-value">${s.pop}</div>
          <div class="stat-sub">Latest census estimate</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">GDP (NOMINAL)</div>
          <div class="stat-value">${s.gdp}</div>
          <div class="stat-sub">World Bank 2023</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">LAND AREA</div>
          <div class="stat-value">${s.area}</div>
          <div class="stat-sub">Total territory</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">HDI INDEX</div>
          <div class="stat-value">${s.hdi}</div>
          <div class="stat-sub">Human Development Index</div>
          <div class="bar-wrap">
            <div class="bar-fill" style="width:${s.hdi !== '—' ? (parseFloat(s.hdi) * 100) + '%' : '0%'};"></div>
          </div>
        </div>
      </div>
    `;

  } else if (tab === 'info') {
    body.innerHTML = `
      <div style="padding:4px 0;">
        <div class="stat-item" style="margin-bottom:8px;">
          <div class="stat-label">COUNTRY NAME</div>
          <div class="stat-value" style="font-size:15px;">${name}</div>
        </div>
        <p style="font-size:12px; color:var(--text-secondary); line-height:1.7; margin-top:4px;">
          Data for <strong style="color:var(--text-primary);">${name}</strong> is sourced from OpenStreetMap boundaries and cross-referenced with public intelligence feeds. Click any news headline to open the full article.
        </p>
        <div style="margin-top:12px; padding:10px; background:var(--bg-card); border-radius:8px; border:1px solid var(--border);">
          <div style="font-size:11px; font-family:var(--mono); color:var(--text-muted); margin-bottom:6px;">REGION CODE</div>
          <div style="font-size:14px; font-family:var(--mono); color:var(--cyan);">${name.toUpperCase().replace(/\s/g, '-').slice(0, 12)}</div>
        </div>
      </div>
    `;
  }
}



// ── Tab click ──
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentCountry) renderTab(btn.dataset.tab, currentCountry);
  });
});
 

// ── Globe setup ──
const globe = Globe()(document.getElementById('globe'))
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-day.jpg')
  .atmosphereColor('#ffffff')
  .atmosphereAltitude(0.01);

globe.pointOfView({ lat: 15, lng: 0, altitude: 2 });

function resizeGlobe() {
  const container = document.getElementById('globe-container');
  const size = Math.min(container.clientWidth, container.clientHeight);
  globe.width(size);
  globe.height(size);
}

resizeGlobe();
window.addEventListener('resize', resizeGlobe);
globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.4;

// ── Load Countries onto Globe ──
fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
  .then(res => res.json())
  .then(data => {
    allFeatures = data.features;
    document.getElementById('countryCount').textContent = allFeatures.length;

    globe
      .polygonsData(data.features)
      .polygonCapColor(() => 'rgba(0,0,0,0)')
      .polygonSideColor(() => 'rgba(0,0,0,0)')
      .polygonStrokeColor(() => 'rgba(255,255,255,0.15)')
      .onPolygonHover(country => {
        document.body.style.cursor = country ? 'pointer' : null;
      })
      .onPolygonClick(country => {
        const name = country.properties.name;
        const nameLower = name.toLowerCase();
        if (['bermuda'].includes(nameLower)) return;
        currentCountry = name;
        renderPanel(name);
        
        showToast(`→ ${name} loaded`);
      });

    // ── Load country coordinates for labels + search ──
    fetch('countries-coordinates.json')
      .then(res => res.json())
      .then(coordData => {
        labels = coordData.map(c => ({
          name: (c.name || c.country).toLowerCase().trim(),
          lat: c.lat || c.latitude,
          lng: c.lng || c.longitude
        }));

        console.log('Labels loaded:', labels.length);

        globe
          .labelsData(labels)
          .labelText(d => d.name)
          .labelSize(0.5)
          .labelColor(() => '#1f2937')
          .labelAltitude(0.01);

        // ── Search ──
        const searchInput   = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        searchInput.addEventListener('input', () => {
          const q = searchInput.value.trim().toLowerCase();

          if (!q) {
            searchResults.style.display = 'none';
            return;
          }

          const matches = labels.filter(c => c.name.includes(q)).slice(0, 7);

          if (!matches.length) {
            searchResults.style.display = 'none';
            return;
          }

          searchResults.innerHTML = matches.map(c =>
            `<div class="search-result-item" data-name="${c.name}">${c.name}</div>`
          ).join('');

          searchResults.style.display = 'block';
        });

        searchResults.addEventListener('click', e => {
          const item = e.target.closest('.search-result-item');
          if (!item) return;

          const name = item.dataset.name;
          searchInput.value = '';
          searchResults.style.display = 'none';

          const match = labels.find(c => c.name === name);
          if (!match) return;

          renderPanel(name);
          

          globe.pointOfView({ lat: match.lat, lng: match.lng, altitude: 1.5 }, 1200);
          showToast(`→ ${name} loaded`);
        });

        // Close dropdown on outside click
        document.addEventListener('click', e => {
          if (!document.getElementById('searchWrap').contains(e.target)) {
            searchResults.style.display = 'none';
          }
        });
      })
      .catch(() => showToast('⚠ Could not load countries-coordinates.json'));
  })
  .catch(() => showToast('⚠ Could not load country data'));

// ── Tooltip ──
const tooltip = document.getElementById('mapTooltip');

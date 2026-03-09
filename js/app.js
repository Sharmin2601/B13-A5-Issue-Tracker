let currentIssues = [];

async function loadIssues(status = 'all') {
    const container = document.getElementById("issuesContainer");
    container.innerHTML = Array.from({ length: 8 }).map(() => `
        <div class="bg-white rounded-xl p-6 border h-64 flex flex-col justify-between">
            <div class="space-y-3">
                <div class="skeleton w-8 h-8 rounded-full"></div>
                <div class="skeleton w-full h-4"></div>
                <div class="skeleton w-3/4 h-4"></div>
            </div>
        </div>`).join('');

    try {
        const issues = await API.fetchAll();
        currentIssues = issues; 
        const filtered = status === 'all' ? issues : issues.filter(i => (i.status || "").toLowerCase() === status.toLowerCase());
        renderIssues(filtered);
    } catch (error) {
        container.innerHTML = `<div class="col-span-full text-center py-20 text-red-500">Failed to load issues.</div>`;
    }
}

function renderIssues(issues) {
    const container = document.getElementById("issuesContainer");
    
    // --- RESTORED HEADER TEXT ---
    const countHeader = document.getElementById("issueCount");
    if (countHeader) {
        countHeader.innerHTML = `
            <h1 class="text-2xl font-bold text-gray-900">${issues.length} Issues</h1>
            <p class="text-sm text-gray-500 mt-1">Track and manage your project issues</p>
        `;
    }

    container.innerHTML = "";

    issues.forEach(issue => {
        const statusStr = (issue.status || "").toLowerCase();
        const isOpen = statusStr === 'open';
        const borderClass = isOpen ? 'border-top-open' : 'border-top-closed';
        const statusImg = isOpen ? './assets/Open-Status.png' : './assets/Closed- Status .png';
        
        // --- RESTORED LABELS & ICONS ---
        const bugIcon = `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/></svg>`;
        const starIcon = `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;
        const helpIcon = `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`;

        let labelsHTML = "";
        const rawLabel = issue.label || issue.labels || "";
        const apiLabel = Array.isArray(rawLabel) ? rawLabel.join(" ").toUpperCase() : String(rawLabel).toUpperCase();

        if (apiLabel.includes("BUG")) {
            labelsHTML += `<span class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold bg-red-50 text-red-500 border border-red-100 uppercase">${bugIcon} Bug</span>`;
        }
        if (apiLabel.includes("ENHANCEMENT")) {
            labelsHTML += `<span class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold bg-green-50 text-green-500 border border-green-100 uppercase">${starIcon} Enhancement</span>`;
        }
        if (apiLabel.includes("HELP")) {
            labelsHTML += `<span class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold bg-orange-50 text-orange-500 border border-orange-100 uppercase">${helpIcon} Help Wanted</span>`;
        }

        const prio = (issue.priority || "LOW").toUpperCase();
        let prioStyles = prio === "HIGH" ? "bg-red-50 text-red-600 border-red-100" 
                       : prio === "MEDIUM" ? "bg-orange-50 text-orange-600 border-orange-100" 
                       : "bg-purple-50 text-purple-600 border-purple-100";

        container.innerHTML += `
            <div onclick="openIssueDetails(${issue.id})" class="issue-card ${borderClass} cursor-pointer hover:shadow-xl transition-all">
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <img src="${statusImg}" class="w-8 h-8 object-contain">
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${prioStyles}">${prio}</span>
                    </div>
                    <h3 class="font-bold text-gray-800 text-sm mb-2 line-clamp-2">${issue.title}</h3>
                    <p class="text-[11px] text-gray-400 mb-4 line-clamp-3">${issue.description}</p>
                    <div class="flex flex-wrap gap-2">${labelsHTML}</div>
                </div>
                <div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                    <div><p class="font-bold text-gray-600">#${issue.id} by ${issue.author}</p><p>Mar 9, 2026</p></div>
                    <img src="./assets/Aperture.png" class="w-4 h-4 opacity-10">
                </div>
            </div>`;
    });
}


function searchIssues() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const filtered = currentIssues.filter(i => (i.title + i.description + i.author).toLowerCase().includes(query));
    renderIssues(filtered);
}
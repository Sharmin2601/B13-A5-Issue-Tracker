let currentIssues = [];


async function loadIssues(status = 'all') {
    const container = document.getElementById("issuesContainer");
    
  
    container.innerHTML = Array.from({ length: 8 }).map(() => `
        <div class="skeleton h-64 w-full rounded-xl"></div>
    `).join('');

    try {
        const issues = await API.fetchAll();
        currentIssues = issues; 

     
        let displayList = [];
        if (status === 'all') {
            displayList = issues;
        } else {
            displayList = issues.filter(i => (i.status || "").toLowerCase() === status.toLowerCase());
        }

        renderIssues(displayList);
    } catch (error) {
        console.error("API Error:", error);
        container.innerHTML = `<div class="col-span-full text-center py-20 text-red-500 font-bold">Failed to load issues from API.</div>`;
    }
}


function changeTab(status) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('tab-active');
        btn.classList.add('text-gray-500');
    });
    
    const activeTab = document.getElementById(`tab-${status}`);
    if (activeTab) {
        activeTab.classList.add('tab-active');
        activeTab.classList.remove('text-gray-500');
    }
    
    loadIssues(status);
}


function searchIssues() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    const filtered = currentIssues.filter(i => {
        const title = (i.title || "").toLowerCase();
        const author = (i.author || "").toLowerCase();
        const id = String(i.id || "");
        const description = (i.description || "").toLowerCase();

        return title.includes(query) || 
               author.includes(query) || 
               id.includes(query) || 
               description.includes(query);
    });
        
    renderIssues(filtered);
}

function renderIssues(issues) {
    const container = document.getElementById("issuesContainer");
    const countHeader = document.getElementById("issueCount");
    
    if (countHeader) {
        countHeader.innerHTML = `
            <h1 class="text-2xl font-bold text-gray-900">${issues.length} Issues</h1>
            <p class="text-sm text-gray-500 mt-1">Track and manage your project issues</p>
        `;
    }

    container.innerHTML = "";

    if (issues.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-20 text-gray-400">No issues found matching your criteria.</div>`;
        return;
    }

    issues.forEach(issue => {
 
    const rawStatus = (issue.status || "").toLowerCase();
    const formattedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);

    const isOpen = rawStatus === 'open';
    const borderClass = isOpen ? 'border-top-open' : 'border-top-closed';
    const statusImg = isOpen ? './assets/Open-Status.png' : './assets/Closed- Status .png'; 
        
       
        let labelsHTML = "";
        const labelText = String(issue.label || issue.labels || "").toLowerCase();
        
        if (labelText.includes("bug")) {
            labelsHTML += `<span class="bg-red-50 text-red-500 px-2 py-1 rounded text-[10px] font-bold border border-red-100 uppercase mr-2">Bug</span>`;
        }
        if (labelText.includes("help") || labelText.includes("wanted")) {
            labelsHTML += `<span class="bg-orange-50 text-orange-500 px-2 py-1 rounded text-[10px] font-bold border border-orange-100 uppercase mr-2">Help Wanted</span>`;
        }
        if (labelsHTML === "") {
            labelsHTML = `<span class="bg-green-50 text-green-500 px-2 py-1 rounded text-[10px] font-bold border border-green-100 uppercase">Enhancement</span>`;
        }
        // -------------------------

        const prio = (issue.priority || "LOW").toUpperCase();
        const prioStyles = prio === "HIGH" ? "bg-red-50 text-red-600 border-red-100" 
                         : "bg-purple-50 text-purple-600 border-purple-100";

        container.innerHTML += `
            <div onclick="openIssueDetails('${issue.id}')" class="issue-card ${borderClass} cursor-pointer hover:shadow-xl transition-all flex flex-col justify-between h-full">
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
                    <div>
                        <p class="font-bold text-gray-600">#${issue.id} by ${issue.author}</p>
                        <p>${new Date(issue.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                    <img src="./assets/Aperture.png" class="w-4 h-4 opacity-10">
                </div>
            </div>`;
    });
}

function openIssueDetails(id) {
    const modal = document.getElementById("issueModal");
    const issue = currentIssues.find(i => String(i.id) === String(id));
    if (issue) {
        document.getElementById("modalTitle").innerText = issue.title;
        document.getElementById("modalDesc").innerText = issue.description;
        document.getElementById("modalAssignee").innerText = issue.author;
        
        const statusEl = document.getElementById("modalStatus");
        statusEl.innerText = issue.status;
        statusEl.style.backgroundColor = issue.status.toLowerCase() === 'open' ? '#22c55e' : '#9333ea';
        
        modal.showModal();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadIssues();
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchIssues();
        });
    
        searchInput.addEventListener('input', searchIssues);
    }
});
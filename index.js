document.addEventListener('DOMContentLoaded', function() {

    const tabs = document.querySelectorAll('.tab');
    const searchInput = document.getElementById('factionSearch');
    const viewButtons = document.querySelectorAll('.view-btn');
    const cardView = document.getElementById('cardView');
    const tableView = document.getElementById('tableView');
    const factionCards = document.querySelectorAll('.faction');
    const factionTableRows = document.querySelectorAll('.faction-table tbody tr');
    const groupDetails = document.querySelectorAll('.group');
    
 
    let currentFilter = 'all';
    let currentSearch = '';
    let currentView = 'cards';
    
  
    updateGroupCounts();
    
   
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
        
            tabs.forEach(t => t.classList.remove('is-active'));
            tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
            tab.classList.add('is-active');
            tab.setAttribute('aria-selected', 'true');
            
           
            currentFilter = tab.getAttribute('data-filter');
            applyFilters();
        });
    });
    
   
    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value.toLowerCase();
        applyFilters();
    });
    
   
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
          
            viewButtons.forEach(b => {
                b.classList.remove('is-active');
                b.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('is-active');
            button.setAttribute('aria-pressed', 'true');
            
     
            currentView = button.getAttribute('data-view');
            if (currentView === 'cards') {
                cardView.removeAttribute('hidden');
                tableView.setAttribute('hidden', 'true');
            } else {
                cardView.setAttribute('hidden', 'true');
                tableView.removeAttribute('hidden');
            }
           
            if (currentView === 'table') {
                updateGroupCounts();
            }
        });
    });
    

    function applyFilters() {

        factionCards.forEach(card => {
            const group = card.getAttribute('data-group');
            const name = card.getAttribute('data-name').toLowerCase();
            const tags = card.getAttribute('data-tags').toLowerCase();
            
            const matchesFilter = currentFilter === 'all' || group === currentFilter;
            const matchesSearch = currentSearch === '' || 
                                 name.includes(currentSearch) || 
                                 tags.includes(currentSearch);
            
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        

        if (currentView === 'table') {
            let hasVisibleRows = false;
            
            groupDetails.forEach(group => {
                const groupType = group.getAttribute('data-group');
                const tableRows = group.querySelectorAll('tbody tr');
                let groupHasVisibleRows = false;
                
                tableRows.forEach(row => {
                    const name = row.getAttribute('data-name').toLowerCase();
                    const matchesFilter = currentFilter === 'all' || groupType === currentFilter;
                    const matchesSearch = currentSearch === '' || name.includes(currentSearch);
                    
                    if (matchesFilter && matchesSearch) {
                        row.style.display = 'table-row';
                        groupHasVisibleRows = true;
                        hasVisibleRows = true;
                    } else {
                        row.style.display = 'none';
                    }
                });
                
 
                if (groupHasVisibleRows) {
                    group.style.display = 'block';
                } else {
                    group.style.display = 'none';
                }
            });
            
 
            updateGroupCounts();
        }
    }
    
 
    function updateGroupCounts() {
        if (currentView === 'table') {
            groupDetails.forEach(group => {
                const groupType = group.getAttribute('data-group');
                const countElement = group.querySelector('.count');
                const tableRows = group.querySelectorAll('tbody tr');
         
                let visibleCount = 0;
                tableRows.forEach(row => {
                    if (row.style.display !== 'none') {
                        visibleCount++;
                    }
                });
                
                countElement.textContent = `(${visibleCount})`;
            });
        }
    }
    groupDetails.forEach(group => {
        const summary = group.querySelector('summary');
        summary.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                group.open = !group.open;
            }
        });
    });
});
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

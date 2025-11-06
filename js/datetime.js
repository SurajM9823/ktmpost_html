function updateDynamicDateTime() {
    const now = new Date();
    
    // Update English date
    const engDateElement = document.querySelector('.header__dateEng');
    if (engDateElement) {
        const engDate = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        engDateElement.textContent = engDate;
    }
    
    // Update Nepali date
    const nepDateElement = document.querySelector('.header-date');
    if (nepDateElement) {
        const nepaliDays = ['आइतबार', 'सोमबार', 'मंगलवार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'];
        const nepaliMonths = ['बैशाख', 'जेठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'];
        const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        
        // Base date: Today = Kartik 18, 2072 (Tuesday)
        const baseEngDate = new Date(); // Today
        const baseNepYear = 2072;
        const baseNepMonth = 6; // Kartik (index 6)
        const baseNepDay = 18;
        
        // Calculate days difference
        const daysDiff = Math.floor((now - baseEngDate) / (1000 * 60 * 60 * 24));
        
        // Calculate Nepali date
        let nepDay = baseNepDay + daysDiff;
        let nepMonth = baseNepMonth;
        let nepYear = baseNepYear;
        
        // Adjust for month changes (simplified - 30 days per month)
        while (nepDay > 30) {
            nepDay -= 30;
            nepMonth++;
            if (nepMonth > 11) {
                nepMonth = 0;
                nepYear++;
            }
        }
        
        while (nepDay < 1) {
            nepDay += 30;
            nepMonth--;
            if (nepMonth < 0) {
                nepMonth = 11;
                nepYear--;
            }
        }
        
        const dayName = nepaliDays[now.getDay()];
        const monthName = nepaliMonths[nepMonth];
        const nepDayStr = nepDay.toString().split('').map(d => nepaliDigits[parseInt(d)]).join('');
        const nepYearStr = nepYear.toString().split('').map(d => nepaliDigits[parseInt(d)]).join('');
        
        nepDateElement.textContent = `${dayName}, ${monthName} ${nepDayStr}, ${nepYearStr}`;
    }
}

// Initialize dates when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateDynamicDateTime);
} else {
    updateDynamicDateTime();
}
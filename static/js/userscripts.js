// script.js

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    sidebar.classList.toggle('active');
    content.classList.toggle('shifted');
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}


document.addEventListener('click', function(event) {
    var sidebar = document.getElementById("sidebar");
    var hamburgerMenu = document.querySelector('.hamburger-menu');
    
    // Check if the click is outside the sidebar and hamburger menu
    if (!sidebar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
        sidebar.classList.remove("active");
    }
});
// scripts.js

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    sidebar.classList.toggle('active');
    content.classList.toggle('shifted');
}

// Dotted Line Chart
const dottedLineCtx = document.getElementById('dottedLineChart').getContext('2d');
const dottedLineChart = new Chart(dottedLineCtx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Order Data',
            data: [10, 20, 30, 40, 50, 60],
            borderColor: '#FB8122',
            borderWidth: 1,
            fill: false,
            pointRadius: 5,
            pointHoverRadius: 10,
            showLine: true,
            borderDash: [5, 5]
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Donut Pie Chart
const donutCtx = document.getElementById('donutChart').getContext('2d');
const donutChart = new Chart(donutCtx, {
    type: 'doughnut',
    data: {
        labels: ['Completed', 'In Transit', 'Pending'],
        datasets: [{
            label: 'Tracking Status',
            data: [30, 40, 30],
            backgroundColor: ['#FB8122', '#E1E2E2', '#3C4855']
        }]
    },
    options: {
        responsive: true
    }
});

// Bar Chart
const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'New Orders',
            data: [5, 10, 15, 20, 25, 30],
            backgroundColor: '#FB8122'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function showDetails(id, name, destination, weight) {
    document.getElementById('modalParcelId').textContent = id;
    document.getElementById('modalParcelName').textContent = name;
    document.getElementById('modalParcelDestination').textContent = destination;
    document.getElementById('modalParcelWeight').textContent = weight;
    
    const modal = document.getElementById('parcelModal');
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('parcelModal');
    modal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('parcelModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
let ordersChart;
let statusChart;

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    sidebar.classList.toggle('active');
    content.classList.toggle('shifted');
}

function updateCharts(year, month) {
    const ordersData = getOrdersDataForYear(year);
    const statusData = getOrderStatusDataForYear(year);

    // Update bar chart
    const ordersCtx = document.getElementById('ordersChart').getContext('2d');
    if (ordersChart) {
        ordersChart.destroy();
    }
    ordersChart = new Chart(ordersCtx, {
        type: 'bar',
        data: {
            labels: ordersData.months,
            datasets: [{
                label: `Orders in ${year}`,
                data: ordersData.orders,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (e, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const selectedMonth = ordersData.months[index];
                    showOrdersForMonth(year, selectedMonth);
                }
            }
        }
    });

    // Update donut chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    if (statusChart) {
        statusChart.destroy();
    }
    statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: statusData.labels,
            datasets: [{
                label: 'Order Status',
                data: statusData.values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });
}

function getOrdersDataForYear(year) {
    // Dummy data, replace with actual data fetching logic
    return {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        orders: [12, 19, 3, 5, 2, 3, 7, 10, 15, 8, 6, 11]
    };
}

function getOrderStatusDataForYear(year) {
    // Dummy data, replace with actual data fetching logic
    return {
        labels: ['Delivered', 'Pending', 'Cancelled'],
        values: [70, 20, 10]
    };
}

function showOrdersForMonth(year, month) {
    const orders = getOrdersForMonth(year, month);

    const tbody = document.getElementById('ordersTable').querySelector('tbody');
    tbody.innerHTML = '';

    orders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td>${order.status}</td>
        `;
        tbody.appendChild(tr);
    });
}

function getOrdersForMonth(year, month) {
    // Dummy data, replace with actual data fetching logic
    return [
        { id: 1, customer: 'John Doe', date: `${month} 15, ${year}`, status: 'Delivered' },
        { id: 2, customer: 'Jane Smith', date: `${month} 20, ${year}`, status: 'Pending' }
    ];
}

document.addEventListener('DOMContentLoaded', function () {
    // Get current date
    var today = new Date();
    var currentMonthIndex = today.getMonth();
    var currentYear = today.getFullYear();
    var currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);

    // Initialize Pikaday date picker
    var picker = new Pikaday({
        field: document.getElementById('datepicker'),
        format: 'YYYY-MM-DD',
        onSelect: function(date) {
            const selectedDate = new Date(date);
            const selectedYear = selectedDate.getFullYear();
            const selectedMonthIndex = selectedDate.getMonth();
            const selectedMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(selectedDate);
            updateCharts(selectedYear, selectedMonthIndex); // Update charts based on selected year and month
            updateOrdersTable(selectedDate); // Update orders table based on selected date
        }
    });

    // Set default date for Pikaday
    picker.setDate(today);

    // Initialize charts and orders table with current month data
    updateCharts(currentYear, currentMonthIndex);
    updateOrdersTable(today);
});

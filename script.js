// Sample customer and product data
const customers = [
    { name: 'John Doe', address: 'No 19 Jalan Tenggiri, Taman Ikan, 81000 Johor Bahru, Johor' },
    { name: 'Jane Doe', address: 'No 101 Jalan Shah’Bandar, Taman Sri Bunga, 47100 Puchong, Selangor' }
];

const products = [
    { description: 'Chocolate Cake', price: 90.00 },
    { description: 'Vanilla Cake', price: 99.00 },
    { description: 'Rainbow Cake', price: 130.01 },
    { description: 'Macademia Cake', price: 99.99 }
];

let selectedProducts = [];

const customerDropdown = document.getElementById('customer');
const customerAddressInput = document.getElementById('customer-address-input');

// Populate customer dropdown
function populateCustomerDropdown() {
    customerDropdown.innerHTML = '<option value="">Select customer...</option>';
    customers.forEach((customer, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = customer.name;
        customerDropdown.appendChild(option);
    });
}

populateCustomerDropdown();

// Display selected customer details in form fields
customerDropdown.addEventListener('change', () => {
    const selectedIndex = customerDropdown.value;
    if (selectedIndex !== '') {
        customerAddressInput.value = customers[selectedIndex].address;
    } else {
        customerAddressInput.value = '';
    }
});

// Populate product dropdown
const productDropdown = document.getElementById('product');
products.forEach((product, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = product.description;
    productDropdown.appendChild(option);
});

// Add product to table
document.getElementById('add-product').addEventListener('click', () => {
    const selectedIndex = productDropdown.value;
    if (selectedIndex !== '') {
        const product = products[selectedIndex];
        selectedProducts.push({
            ...product,
            qty: 1,
            originalIndex: selectedIndex
        });

        updateTable();
        productDropdown.querySelector(`option[value="${selectedIndex}"]`).disabled = true;
        productDropdown.value = '';
    }
});

function updateTable() {
    const tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = '';
    let grandTotal = 0;

    selectedProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.description}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>
                <input type="number" min="1" value="${product.qty}" data-index="${index}" 
                    class="form-control form-control-sm qty-input" />
            </td>
            <td>${(product.price * product.qty).toFixed(2)}</td>
            <td>
                <button data-index="${index}" class="btn btn-sm btn-danger delete-btn">&times;</button>
            </td>
        `;
        tableBody.appendChild(row);
        grandTotal += product.price * product.qty;
    });

    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);

    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = e.target.dataset.index;
            selectedProducts[index].qty = Math.max(1, e.target.value);
            updateTable();
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            productDropdown.querySelector(`option[value="${selectedProducts[index].originalIndex}"]`).disabled = false;
            selectedProducts.splice(index, 1);
            updateTable();
        });
    });
}

// Confirm order
document.getElementById('confirm-order').addEventListener('click', () => {
    if (selectedProducts.length === 0 || customerDropdown.value === '') {
        alert('Please select a customer and add at least one product.');
        return;
    }

    const customer = customers[customerDropdown.value];
    let orderSummary = `
<div class="mb-2">
    <p><strong>Customer:</strong> ${customer.name}</p>
    <p><strong>Address:</strong> ${customer.address}</p>
    <hr>
</div>
<table class="table table-bordered">
    <thead class="table-light">
        <tr>
            <th>Description</th>
            <th>Unit Price (RM)</th>
            <th>Qty</th>
            <th>Total (RM)</th>
        </tr>
    </thead>
    <tbody>
`;

    let grandTotal = 0;
    selectedProducts.forEach(product => {
        const total = product.price * product.qty;
        grandTotal += total;
        orderSummary += `
    <tr>
        <td>${product.description}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>${product.qty}</td>
        <td>${total.toFixed(2)}</td>
    </tr>
`;
    });

    orderSummary += `
    </tbody>
</table>
<div class="text-end mt-3 fw-bold">
    Grand Total: RM ${grandTotal.toFixed(2)}
</div>
`;

    document.getElementById('modal-content').innerHTML = orderSummary;
    new bootstrap.Modal(document.getElementById('order-modal')).show();
});

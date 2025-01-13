
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
                <div style="display: flex; align-items: center; gap: 4px; justify-content: center;">
                    <button class="decrement-btn" data-index="${index}" style="padding: 4px 8px; background-color: #d1d5db; border: none; border-radius: 4px;">-</button>
                    <input type="text" value="${product.qty}" data-index="${index}" class="qty-input" style="width: 40px; text-align: center; border: 1px solid #d1d5db; padding: 4px;" />
                    <button class="increment-btn" data-index="${index}" style="padding: 4px 8px; background-color: #d1d5db; border: none; border-radius: 4px;">+</button>
                </div>
            </td>
            <td>${(product.price * product.qty).toFixed(2)}</td>
            <td><button data-index="${index}" class="delete-btn" style="padding: 4px 8px; background-color: #ef4444; color: white; border: none; border-radius: 4px;">&times;</button></td>
        `;
        tableBody.appendChild(row);
        grandTotal += product.price * product.qty;
    });

    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);

    document.querySelectorAll('.qty-input').forEach(input => {
        let typingTimeout;

        input.addEventListener('input', (e) => {
            clearTimeout(typingTimeout);
            const index = e.target.dataset.index;
            const newQty = e.target.value;

            // Allow empty input temporarily
            if (newQty === '' || isNaN(newQty)) {
                return; // Do nothing until a valid number is entered
            }

            // Debounce update call to wait for user to finish typing
            typingTimeout = setTimeout(() => {
                const parsedQty = parseInt(newQty, 10);
                if (parsedQty === 0) {
                    alert('Quantity cannot be zero. Please enter a valid quantity.');
                    input.value = selectedProducts[index].qty; // Reset to the previous value
                    return;
                }
                if (parsedQty > 0) {
                    selectedProducts[index].qty = parsedQty;
                    updateTable();
                }
            }, 300);
        });
    });


    document.querySelectorAll('.increment-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            selectedProducts[index].qty += 1;
            updateTable();
        });
    });

    document.querySelectorAll('.decrement-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (selectedProducts[index].qty > 1) {
                selectedProducts[index].qty -= 1;
                updateTable();
            }
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
    document.getElementById('modal-customer-name').textContent = customer.name;
    document.getElementById('modal-customer-address').textContent = customer.address;

    let orderSummary = '';
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

    document.getElementById('modal-product-list').innerHTML = orderSummary;
    document.getElementById('modal-grand-total').textContent = grandTotal.toFixed(2);

    document.getElementById('order-modal').style.display = 'flex';
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('order-modal').style.display = 'none';
});

document.getElementById('print-modal').addEventListener('click', () => {
const customerName = document.getElementById('modal-customer-name').textContent;
const customerAddress = document.getElementById('modal-customer-address').textContent;
const productList = document.getElementById('modal-product-list').innerHTML;
const grandTotal = document.getElementById('modal-grand-total').textContent;

// Open a new window for printing
const printWindow = window.open('', '', 'width=600,height=600');

// Add content and styles to the new window
printWindow.document.write(`
<html>
<head>
    <title>Order Summary</title>
    <style>
        body {
            font-family: 'Open Sans', sans-serif;
            margin: 20px;
            padding: 0;
            color: #333;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
        }
        .table th, .table td {
            padding: 12px;
            border: 1px solid #e5e7eb;
            text-align: center;
        }
        .table th {
            background-color: #f3f4f6;
            font-weight: 700;
        }
        .text-right {
            text-align: right;
        }
        .font-semibold {
            font-weight: 600;
        }
        .text-lg {
            font-size: 18px;
        }
    </style>
</head>
<body>
    <h2 style="text-align: center;">Order Summary</h2>
    <div style="padding: 16px; background-color: #f3f4f6; border-radius: 4px; margin-bottom: 16px;">
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Address:</strong> ${customerAddress}</p>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Unit Price (RM)</th>
                <th>Qty</th>
                <th>Total (RM)</th>
            </tr>
        </thead>
        <tbody>
            ${productList}
        </tbody>
    </table>
    <div class="text-right font-semibold">
        <p class="text-lg">Grand Total: RM ${grandTotal}</p>
    </div>
</body>
</html>
`);

// Close the document and trigger print
printWindow.document.close();
printWindow.print();
});


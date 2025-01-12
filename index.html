<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .form-container {
            height: 700px;
            max-width: 600px;
        }

        .table-container {
            height: 400px;
            overflow-y: auto;
        }
    </style>
</head>

<body class="bg-light min-vh-100 d-flex align-items-center justify-content-center">
    <div class="container bg-white shadow p-5 rounded form-container d-flex flex-column justify-content-between">
        <h2 class="text-center mb-4">Order Form</h2>

        <!-- Customer Selection -->
        <div class="mb-4">
            <label for="customer" class="form-label">Select Customer</label>
            <select id="customer" class="form-select">
                <option value="">Select customer...</option>
            </select>
            <div id="customer-address" class="mt-2 fw-semibold">&nbsp;</div>
        </div>

        <!-- Product Selection -->
        <div class="mb-4">
            <label for="product" class="form-label">Select Product</label>
            <div class="input-group">
                <select id="product" class="form-select">
                    <option value="">Select product...</option>
                </select>
                <button id="add-product" class="btn btn-primary">+</button>
            </div>
        </div>

        <!-- Product Table -->
        <div class="table-container mb-3">
            <table id="product-table" class="table table-bordered">
                <thead class="table-light">
                    <tr>
                        <th>Description</th>
                        <th>Unit Price (RM)</th>
                        <th>Qty</th>
                        <th>Total (RM)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <!-- Grand Total -->
        <div class="text-end fw-bold">
            Grand Total: <span id="grand-total">0.00</span>
        </div>

        <!-- Confirm Order Button -->
        <button id="confirm-order" class="btn btn-success w-100 mt-4">Confirm Order</button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="order-modal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="orderModalLabel">Order Summary</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-content"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
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

        // Populate customer dropdown
        const customerDropdown = document.getElementById('customer');
        customers.forEach((customer, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = customer.name;
            customerDropdown.appendChild(option);
        });

        // Display customer address on selection
        customerDropdown.addEventListener('change', () => {
            const selectedIndex = customerDropdown.value;
            document.getElementById('customer-address').textContent =
                selectedIndex !== '' ? customers[selectedIndex].address : '';
        });

        // Populate product dropdown
        const productDropdown = document.getElementById('product');
        products.forEach((product, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = product.description;
            productDropdown.appendChild(option);
        });

        // Add product to the table
        document.getElementById('add-product').addEventListener('click', () => {
            const selectedIndex = productDropdown.value;
            if (selectedIndex !== '') {
                const product = products[selectedIndex];
                selectedProducts.push({ ...product, qty: 1, originalIndex: selectedIndex });

                updateTable();

                // Disable the selected option
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

            // Handle quantity change
            document.querySelectorAll('.qty-input').forEach(input => {
                input.addEventListener('input', (e) => {
                    const index = e.target.dataset.index;
                    selectedProducts[index].qty = Math.max(1, e.target.value);
                    updateTable();
                });
            });

            // Handle product deletion
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
                <p><strong>Customer:</strong> ${customer.name}</p>
                <p><strong>Address:</strong> ${customer.address}</p>
                <h5 class="mt-3">Items Ordered:</h5>
                <ul>
            `;

            selectedProducts.forEach(product => {
                orderSummary += `<li>${product.description} - Qty: ${product.qty}, Total: RM ${(product.price * product.qty).toFixed(2)}</li>`;
            });

            orderSummary += `</ul><p class="mt-3 fw-bold">Grand Total: RM ${document.getElementById('grand-total').textContent}</p>`;

            // Show order summary in modal
            document.getElementById('modal-content').innerHTML = orderSummary;
            new bootstrap.Modal(document.getElementById('order-modal')).show();
        });
    </script>
</body>

</html>

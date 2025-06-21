document.addEventListener('DOMContentLoaded', () => {
    const colors = ['blue', 'green', 'red', 'purple', 'indigo'];
    let colorIndex = 0;

    // Getting all necessary elements
    const totalMoneyForm = document.getElementById('totalMoneyForm');
    const totalMoneyInput = document.getElementById('totalMoney');
    const displayMoney = document.getElementById('displayMoney');
    const modalForm = document.getElementById('modalForm');
    const titleOfSpending = document.getElementById('titleOfSpending');
    const amountSpending = document.getElementById('amountSpending');
    const spendingDate = document.getElementById('spendingDate');
    const popupModal = document.getElementById('popupModal');
    const closeModal = document.getElementById('closeModal');
    const addNewSpending = document.getElementById('addnewspendings');
    const spendingCardsContainer = document.querySelector('.grid'); 
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const editTitle = document.getElementById('editTitle');
    const editDate = document.getElementById('editDate');
    const editAmount = document.getElementById('editAmount');
    const cancelEdit = document.getElementById('cancelEdit');
    const sortAllByDate = document.getElementById('sortAllByDate')
    const deleteAllSpendings = document.getElementById('deleteAllSpendings')
    const submitMoney = document.getElementById('submitMoney')
    const sortAllByName = document.getElementById('sortAllByName')
    const sortAmountButton = document.getElementById('sortAllByAmount'); 
    const totalMoneyDisplay = document.getElementById('totalMoneyDisplay')
    const resetMoney = document.getElementById('resetMoney')

    //--------------------------------------------------------------------\\

    function instructions() {
        window.alert("To remove a spending, please left click the spending.")
        window.alert("To edit a spending, please right click the spending.")
    }

    instructions()

    resetMoney.addEventListener('click', function() {
        if (displayMoney.classList.contains('text-green-700')) {
            displayMoney.textContent = "0.00"
        } else {
            displayMoney.textContent = "0.00"
            displayMoney.classList.add('text-green-700')
        }
    })
 
    const savedMoney = localStorage.getItem('totalMoney');
    if (savedMoney) {
        document.getElementById('displayMoney').textContent = savedMoney;
    }

    if (totalMoneyForm && totalMoneyInput && displayMoney) {
        totalMoneyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const value = parseFloat(totalMoneyInput.value) || 0;
            displayMoney.textContent = value.toFixed(2);
            localStorage.setItem('totalMoney', value.toFixed(2));
            totalMoneyForm.reset();
            calcLeft();
        });
    } else {
        console.error("Something went wrong, try again later.")
    }

    let spendingCards = JSON.parse(localStorage.getItem('spendingCards')) || [];

    function createSpendingCard(cardData) {
        if (!cardData) {
            console.error('Card data is required');
            return null;
        }

        const currentColor = cardData.color || colors[colorIndex];
        const cardId = cardData.id || Date.now().toString();
        
        const cardInfo = {
            id: cardId,
            title: cardData.title,
            date: cardData.date,
            amount: cardData.amount,
            color: currentColor
        };
        
        localStorage.setItem(`card_${cardId}`, JSON.stringify(cardInfo));

        const newCard = document.createElement('article');
        newCard.className = 'flex flex-col items-center justify-center border rounded-lg p-4 shadow-sm hover:border hover:border-red-500 hover:bg-red-200 hover:cursor-pointer';
        newCard.dataset.id = cardId;
        
        newCard.innerHTML = `
            <h2 class="text-lg font-semibold mb-2">${cardInfo.title}</h2>
            <p class="text-sm text-gray-400 mb-2">${cardInfo.date}</p>
            <p class="text-xl text-${currentColor}-400">$${parseFloat(cardInfo.amount).toFixed(2)}</p>
        `;

        newCard.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to delete this spending?')) {
                newCard.remove();
                localStorage.removeItem(`card_${cardId}`);
                spendingCards = spendingCards.filter(card => card.id !== cardId);
                localStorage.setItem('spendingCards', JSON.stringify(spendingCards));
                calcLeft(); 
            }
        });

        // Right click to edit
        newCard.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const cardData = JSON.parse(localStorage.getItem(`card_${cardId}`));
            
            if (cardData) {
                editTitle.value = cardData.title;
                editAmount.value = cardData.amount;
                editDate.value = cardData.date;
                editForm.dataset.cardId = cardId;
                
                if (typeof editModal.showModal === 'function') {
                    editModal.showModal();
                } else {
                    editModal.classList.remove('hidden');
                }
            }
        });

        const gridContainer = document.querySelector('.grid');
        if (gridContainer) {
            gridContainer.appendChild(newCard);
            if (!cardData.color) {
                colorIndex = (colorIndex + 1) % colors.length;
            }
        }

        return newCard;
    }

    function debugCards() {
        console.log('All stored cards:');
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('card_')) {
                console.log(key, JSON.parse(localStorage.getItem(key)));
            }
        });
    }

    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cardId = editForm.dataset.cardId;
            const card = document.querySelector(`[data-id="${cardId}"]`);
            
            const updatedData = {
                id: cardId,
                title: editTitle.value,
                date: editDate.value,
                amount: editAmount.value,
                color: JSON.parse(localStorage.getItem(`card_${cardId}`)).color // Keep the original color
            };

            localStorage.setItem(`card_${cardId}`, JSON.stringify(updatedData));

            card.querySelector('h2').textContent = updatedData.title;
            card.querySelector('p:nth-child(2)').textContent = updatedData.date;
            card.querySelector('p:last-child').textContent = `$${parseFloat(updatedData.amount).toFixed(2)}`;

            if (typeof editModal.close === 'function') {
                editModal.close();
            } else {
                editModal.classList.add('hidden');
            }
            editForm.reset();
            calcLeft();
        });
    }

    if (cancelEdit) {
        cancelEdit.addEventListener('click', () => {
            if (typeof editModal.close === 'function') {
                editModal.close();
            } else {
                editModal.classList.add('hidden');
            }
            editForm.reset();
        });
    }

    function loadExistingCards() {
        const cards = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('card_')) {
                const cardData = JSON.parse(localStorage.getItem(key));
                cards.push(cardData);
            }
        }
        
        cards.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        
        cards.forEach(cardData => {
            createSpendingCard(cardData);
        });
        
        calcLeft(); 
    }

    loadExistingCards();

    popupModal.addEventListener("click", function() {
        if (popupModal.classList.contains == "hidden") {
            popupModal.classList.remove("hidden")
            console.log("Showing popup")
        } 
    })

    if (addNewSpending && popupModal && closeModal) {
        addNewSpending.addEventListener('click', () => {
            if (typeof popupModal.showModal === 'function') {
                popupModal.showModal();
            } else {
                popupModal.classList.remove('hidden');
            }
        });

        closeModal.addEventListener('click', () => {
            if (typeof popupModal.close === 'function') {
                popupModal.close();
            } else {
                popupModal.classList.add('hidden');
            }
        });
    }

    const freeOption = document.getElementById('freeOption');
    if (freeOption && amountSpending) {
        freeOption.addEventListener('change', () => {
            if (freeOption.checked) {
                amountSpending.value = '0';
                amountSpending.disabled = true;
            } else {
                amountSpending.disabled = false;
                amountSpending.value = '';
            }
        });
    }

    if (modalForm && titleOfSpending && amountSpending && spendingDate && spendingCardsContainer) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const cardData = {
                id: Date.now().toString(),
                title: titleOfSpending.value,
                date: spendingDate.value,
                amount: amountSpending.value
            };

            spendingCards.push(cardData);
            localStorage.setItem('spendingCards', JSON.stringify(spendingCards));

            createSpendingCard(cardData);
            
            popupModal.close();
            modalForm.reset();
            calcLeft();
        });
    } 

    deleteAllSpendings.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete all spendings? This action cannot be undone.')) {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('card_')) {
                    localStorage.removeItem(key);
                }
            });
            
            spendingCards = [];
            localStorage.setItem('spendingCards', JSON.stringify(spendingCards));
            
            const gridContainer = document.querySelector('.grid');
            const existingCards = gridContainer.querySelectorAll('article:not(#addnewspendings)');
            existingCards.forEach(card => card.remove());
            
            colorIndex = 0;
            calcLeft();
        }
    });

    function createCardElement(cardData) {
        const newCard = document.createElement('article');
        newCard.className = 'flex flex-col items-center justify-center border rounded-lg p-4 shadow-sm hover:border hover:border-red-500 hover:bg-red-200 hover:cursor-pointer';
        newCard.dataset.id = cardData.id;
        
        newCard.innerHTML = `
            <h2 class="text-lg font-semibold mb-2">${cardData.title}</h2>
            <p class="text-sm text-gray-400 mb-2">${cardData.date}</p>
            <p class="text-xl text-${cardData.color}-400">$${parseFloat(cardData.amount).toFixed(2)}</p>
        `;

        newCard.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to delete this spending?')) {
                newCard.remove();
                localStorage.removeItem(`card_${cardData.id}`);
                spendingCards = spendingCards.filter(card => card.id !== cardData.id);
                localStorage.setItem('spendingCards', JSON.stringify(spendingCards));
                calcLeft(); 
            }
        });

        newCard.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const cardData = JSON.parse(localStorage.getItem(`card_${newCard.dataset.id}`));
            
            if (cardData) {
                editTitle.value = cardData.title;
                editAmount.value = cardData.amount;
                editDate.value = cardData.date;
                editForm.dataset.cardId = newCard.dataset.id;
                
                if (typeof editModal.showModal === 'function') {
                    editModal.showModal();
                } else {
                    editModal.classList.remove('hidden');
                }
            }
        });

        return newCard;
    }

    function sortCardsByDate() {
        const cards = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('card_')) {
                const cardData = JSON.parse(localStorage.getItem(key));
                cards.push(cardData);
            }
        }

        cards.sort((a, b) => new Date(a.date) - new Date(b.date));

        const gridContainer = document.querySelector('.grid');
        const existingCards = gridContainer.querySelectorAll('article:not(#addnewspendings)');
        existingCards.forEach(card => card.remove());

        cards.forEach(cardData => {
            const newCard = createCardElement(cardData);
            gridContainer.appendChild(newCard);
        });
    }

    function sortCardsByName() {
        const cards = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('card_')) {
                const cardData = JSON.parse(localStorage.getItem(key));
                cards.push(cardData);
            }
        }

        cards.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            return titleA.localeCompare(titleB);
        });

        const gridContainer = document.querySelector('.grid');
        const existingCards = gridContainer.querySelectorAll('article:not(#addnewspendings)');
        existingCards.forEach(card => card.remove());

        cards.forEach(cardData => {
            const newCard = createCardElement(cardData);
            gridContainer.appendChild(newCard);
        });
    }

    function sortAllByAmount() {
        const gridContainer = document.querySelector('.grid');
        const cards = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('card_')) {
                const cardData = JSON.parse(localStorage.getItem(key));
                cards.push(cardData);
            }
        }

        cards.sort((a, b) => {
            return parseFloat(b.amount) - parseFloat(a.amount);
        });

        const existingCards = gridContainer.querySelectorAll('article:not(#addnewspendings)');
        existingCards.forEach(card => card.remove());

        cards.forEach(cardData => {
            const newCard = createCardElement(cardData);
            gridContainer.appendChild(newCard);
        });
    }

    if (sortAllByDate) {
        sortAllByDate.addEventListener('click', sortCardsByDate);
    }

    if (sortAllByName) {
        sortAllByName.addEventListener('click', sortCardsByName);
    }
    
    if (sortAmountButton) {
        sortAmountButton.addEventListener('click', sortAllByAmount);
    }

    function calcLeft() {
        const originalTotal = parseFloat(localStorage.getItem('totalMoney')) || 0;
        
        let spentMoney = 0;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('card_')) {
                const cardData = JSON.parse(localStorage.getItem(key));
                console.log(cardData);
                
                const thisCardValue = parseFloat(cardData.amount) || 0;
                spentMoney += thisCardValue;
            }
        }
        
        const moneyLeft = originalTotal - spentMoney;
        
        if (moneyLeft >= 0) {
            totalMoneyDisplay.classList.remove('text-red-600');
            totalMoneyDisplay.classList.add('text-green-700');
            displayMoney.textContent = moneyLeft.toFixed(2);
        } else {
            totalMoneyDisplay.classList.remove('text-green-700');
            totalMoneyDisplay.classList.add('text-red-600');
            displayMoney.textContent = `-${Math.abs(moneyLeft).toFixed(2)}`
        }
        
    }
    
    calcLeft();
});

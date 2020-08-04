export default class Sort {
    constructor(element) {
        this.todoObj = element;
        this.todoObj.footer.addEventListener('click', this);
    }

    handleEvent(event) {
        const activeBtn = this.todoObj.footer.querySelector('.btn.-active');
        const sortBtn = event.target.closest('[data-sort-btn]');
        if (activeBtn) {
            activeBtn.classList.remove('-active');
        }
        if (sortBtn) {
            sortBtn.classList.add('-active');
            const sortCase = sortBtn.dataset.sortType;
            switch (sortCase) {
                case 'all':
                    for (const line of this.todoObj.todoLines) {
                        line.classList.remove('-hidden');
                    }
                    break;
                case 'active':
                    for (const line of this.todoObj.todoLines) {
                        line.classList.remove('-hidden');
                        if (line.dataset.fulfilled) {
                            line.classList.add('-hidden');
                        }
                    }
                    break;
                case 'completed':
                    for (const line of this.todoObj.todoLines) {
                        line.classList.remove('-hidden');
                        if (!line.dataset.fulfilled) {
                            line.classList.add('-hidden');
                        }
                    }
                    break;
            }
        }
    }
}

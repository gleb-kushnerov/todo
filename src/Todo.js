export default class Todo {
    constructor(element) {
        this.element = element;
        this.todoWrapper = element.querySelector('[data-wrapper]');
        this.input = element.querySelector('[data-input]');
        this.footer = element.querySelector('[data-footer]');
        this.todoLines;
        this.isFulfilled = true;
        this.notFulfilledQuantity = 0;
        this.fulfilledQuantity= 0;
        this.isListEmpty = true;
        this.input.addEventListener('keydown', this);
        this.element.addEventListener('click', this);
        this.todoWrapper.addEventListener('change', this);
    }

    handleEvent(event) {
        switch (event.type) {
            case 'keydown':
                if (event.keyCode === 13 && this.input.value && this.input.value.trim()) {
                    this.addTodo();
                    this.updateTodo();
                }
                break;
            case 'click':
                const destroyBtn = event.target.closest('[data-destroy]');
                const destroyCompletedBtn = event.target.closest('[data-delete-completed-btn]');
                if (destroyBtn) {
                    event.target.closest('[data-fulfilled]').remove();
                    this.updateTodo();
                } else if (destroyCompletedBtn) {
                    [...this.todoLines].forEach((line)=> {
                        if (line.dataset.fulfilled) {
                            line.remove();
                        }
                    });
                    this.updateTodo();
                }
                break;
            case 'change':
                const lineElement = event.target.closest('[data-fulfilled]');
                if (event.target.checked) {
                    lineElement.dataset.fulfilled = 'yes';
                    lineElement.classList.add('-done');
                    this.updateTodo();
                } else {
                    lineElement.dataset.fulfilled = '';
                    lineElement.classList.remove('-done');
                    this.updateTodo();
                }
                break;
        }
    }

    addTodo() {
        const templateElement = document.createElement("template");
        const todoLineHTML = `
            <div class="todo-line" data-fulfilled>
                <div class="wrapper">
                    <label class="label">
                        <input type="checkbox" class="checkbox">
                        <span class="fake-checkbox"></span>
                    </label>
                    ${this.input.value}
                </div>
                <button class="remove-line" data-destroy>x</button>
            </div>
        `
        templateElement.innerHTML = todoLineHTML;

        this.todoWrapper.append(templateElement.content);
        this.input.value = '';
        this.isFulfilled = false;
    }

    updateTodo() {
        this.todoLines = this.todoWrapper.querySelectorAll('[data-fulfilled]');
        const quantityElement = this.footer.querySelector('[data-quantity]');
        let quantityHTML = '';
        this.isListEmpty = !this.todoLines.length;
        this.notFulfilledQuantity = [...this.todoLines].reduce((acc, line) => {
            if (!line.dataset.fulfilled) {
                return acc + 1;
            } else {
                return acc;
            }
        }, 0);

        this.fulfilledQuantity = [...this.todoLines].reduce((acc, line) => {
            if (line.dataset.fulfilled) {
                return acc + 1;
            } else {
                return acc;
            }
        }, 0);

        if (this.notFulfilledQuantity === 1) {
            quantityHTML = '1 item left';
        } else {
            quantityHTML = `${this.notFulfilledQuantity} items left`;
        }
        quantityElement.innerHTML = quantityHTML;
        if (this.notFulfilledQuantity === 0) this.isFulfilled = true;
        this.footer.classList.toggle('hidden', this.isFulfilled && this.isListEmpty);
        this.element.querySelector('[data-delete-completed-btn]').classList.toggle('-hidden', !this.fulfilledQuantity);
    }
}

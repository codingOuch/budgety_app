// Budget Controller
var budgetController = (function () {
    // data
    var Expenses, Income
    Expenses = function(id, description, value){
        this.id = id,
        this.description = description,
        this.value = value
    };
    
    Income = function(id, description, value){
        this.id = id,
        this.description = description,
        this.value = value
    };

    data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    // function
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(element => {
            sum += element.value;
        });
        data.totals[type] = sum;
    }
    // API
    return {
        addItems: function(type, description, value){
            var newItem, ID; 
            // Create new ID
            if (data.allItems[type].length > 0 ) {
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else {
                ID = 0;
            };
            
            // Create new Item based on 'inc' or 'exp' type
            if (type === 'inc') {
                newItem = new Income(ID, description, value);
            }else if (type === 'exp') {
                newItem = new Expenses(ID, description, value);
            }

            // Push it to the data structure
            data.allItems[type].push(newItem);

            // Return the newItem
            return newItem;
        },

        calculateBudget: function(){
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate budget: income - expenses
            data.budget = data.totals['inc'] - data.totals['exp'];

            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
            } else{
                data.percentage = -1;
            }
        },

        getBudgets: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        }
    }


})();


var UIController = (function () {
    //some code
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'

    }
       
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        
        getDOMstrings: function(){
            return DOMstrings;
        },
        
        addListItems: function (obj, type) {
            var html, newHtml, element

            // Create html placeholder
            if (type === 'inc') {
                // insert the data into the Income div
                // 1. 写好待insert的HTML代码
                element = DOMstrings.incomeContainer;
                html = `
                <div class="item clearfix" id="income-%id">
                <div class="item__description">%description</div>
                <div class="right clearfix">
                    <div class="item__value">+ %value</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`
            }
            else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html =`<div class="item clearfix" id="expense-%id">
                <div class="item__description">%description</div>
                <div class="right clearfix">
                    <div class="item__value">- %value</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`
            }

            // Replace the placeholder 
            newHtml = html.replace('%id', obj.id);
            newHtml = newHtml.replace('%description', obj.description);
            newHtml = newHtml.replace('%value', obj.value);

            // Insert the new html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        displayBudget: function () {
            
        },

        clearFields: function(){
            document.querySelector(DOMstrings.inputDescription).value = "";
            document.querySelector(DOMstrings.inputValue).value = "";
            document.querySelector(DOMstrings.inputDescription).focus();
        }

    }

})();


var Controller = (function(budgetCtrl, UICtrl){
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
        document.querySelector(DOM.inputValue).addEventListener('keypress', function(e){
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem
            }
        })

    };

    var updateBudget = function(){
        var budget
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        budget = budgetCtrl.getBudgets();
        console.log(budget);
        // 3. Display the budget on the UI

    };

    var ctrlAddItem = function(){
        var input, newItem;
        // 1. Get the input data
        input = UICtrl.getInput();
        if (input.description != null && !isNaN(input.value) && input.value >0) {
            // 2. Add the item to the budgetController
            newItem = budgetCtrl.addItems(input.type, input.description, input.value)
            // 3. Add the item to the UI
            UICtrl.addListItems(newItem, input.type)
            // 4. clear the fields
            UICtrl.clearFields();
            // 5. Caculate and update budget
            updateBudget();
            // 6. Caculate and update percentage
        } else{
            alert('Please enter the valid value!')
        }
        
    };


    return {
        init: function(){
            console.log('Application has started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

Controller.init();

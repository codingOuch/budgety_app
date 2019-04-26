// Budget Controller
var budgetController = (function () {
    // Some code
    var data = {
        allItems: {
            exp:[],
            inc:[]
        },
        totals: {
            exp:[],
            inc:[]
        }
    }

    return {
        addItem: function(type, des, val){
            var newItem, ID
        }
    }
})();


var UIController = (function () {
    //some code
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'

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
        
        addListItems: function (type, description, value) {
            if (type === 'inc') {
                // insert the data into the Income div
                // 1. 写好待insert的HTML代码
                var html = '<div class="item clearfix"> \
                <div class="item__description">${description}</div> \
                <div class="right clearfix"> \
                    <div class="item__value">+ 2,100.00</div>\
                    <div class="item__delete">\
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>\
                    </div>\
                </div>\
            </div>'
                    
                
                // 2. 执行insert

            }
            else if (type === 'exp') {
                // insert the data into the Expenses div
                console.log("You chose exp");
            }
        },

        displayBudget: function () {
            return {
                
            }
        }

    }

})();


var Controller = (function(budgetCtrl, UICtrl){
    var DOM = UICtrl.getDOMstrings();
    var ctrlAddItem = function () {
        // 1. Get the field input data
        var input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        

        // 3. Add the item to the UI
        UICtrl.addListItems(input.type);

        // 4. Calculate the budget 

        // 5. Display the budget on the UI


    }


    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.querySelector(DOM.inputValue).addEventListener('keypress', function(event){
        if(event.keyCode === '13' || event.which === 13){
            ctrlAddItem();
        }
    })

})(budgetController, UIController);


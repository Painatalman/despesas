var Form = require('mongoose-forms').Form;
var Model = require('../movimento.js');

module.exports = function(options){
    return Form(Model,{
        method:'post',
        action:'/movimento/new',
        maps: ['title','description','date','value', 'isDespesa','wasPaidByOther'],
        fields:{
            title:{
                validate: function(value){
                    if (value.length < 2 || value.length > 20)
                        {
                            throw new Error("Minimum 2 characters and maximum 20");
                        }
                    else{
                        return value;
                    }
                }
            }
        },
        submit: {
            template: 'Submit'
      }
    });
}
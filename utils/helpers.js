const moment =require('moment');

module.exports={
    formateDate:function(dateString){
        return moment(dateString).format('MM/DD/YYYY');
    }
}
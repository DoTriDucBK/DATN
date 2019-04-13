const MyUtils = {
    currencyFormat: function (currency) {
        return currency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    calculateFee: function (numberDay, fee) {
        return parseInt(numberDay) * parseInt(fee) * 4;
    },
    clearBlank : function (obj) {
        console.log(obj.cstm_deli_addr_lat)
        var propNames = Object.getOwnPropertyNames(obj);
        for (var i = 0; i < propNames.length; i++) {
            var propName = propNames[i];
            console.log(propName + "-" + obj[propName])
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                console.log(propName)
                delete obj[propName];
            }
        }
        return obj;
    },
    calculateStar: function (rating,oldStar,timesVote){
        return (rating + oldStar * timesVote)/(timesVote +1);
    }

}
export default MyUtils;
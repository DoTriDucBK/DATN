const MyUtils = {
    currencyFormat: function (currency) {
        return currency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    calculateFee: function (numberDay, fee) {
        return parseInt(numberDay) * parseInt(fee) * 4;
    }

}
export default MyUtils;
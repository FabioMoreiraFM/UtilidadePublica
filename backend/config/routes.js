module.exports = app => {
    app.route('/calculateNetPay').get(app.api.incomeTax.getNetPay)
}
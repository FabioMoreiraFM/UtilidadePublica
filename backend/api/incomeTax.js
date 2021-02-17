module.exports = app => {
    const getNetPay = async (req, res) => {
        const dependents = req.query.dependents
        const grossPay = parseFloat(req.query.grossPay.replace('R$', '').replace('.', '').replace(',', '.'))
        const othersDiscounts = parseFloat(req.query.otherDiscounts.replace('R$', '').replace('.', '').replace(',', '.'))
        
        let targetRange = 0
        let baseSalary = grossPay - dependents*189.59
        
        targetRange = await app.db('income_tax')            
            .where('faixaInicial', '<=', baseSalary)
            .where('faixaFinal', '>=', baseSalary)
            .where({tributacaoId: 1})
            .select('aliquota', 'deducaoIRProgressivo')
            .first()
    
        let tax = (baseSalary * targetRange.aliquota) - targetRange.deducaoIRProgressivo
        baseSalary = baseSalary - tax
        baseSalary = baseSalary - othersDiscounts

        let netPay = grossPay - tax - othersDiscounts

        let detailsTable = [
            {
                description: "Salário Bruto",
                ref: '-',
                earnings: grossPay,
                discounts: '-'
            },
            {
                description: "IRRF",
                ref: targetRange.aliquota,
                earnings: '-',
                discounts: tax
            },
            {
                description: "Outros descontos",
                ref: '-',
                earnings: '-',
                discounts: othersDiscounts
            }
        ]

        let total = {netPay: netPay, discounts: tax + othersDiscounts, grossPay: grossPay}

        res.json({detailsTable, total})
    }

    return {getNetPay}
}

module.exports = {
    __hasValue: function(val) {
        return val !== undefined && val !== null;
    },
    FormatNumber: function(val) {
        val = (val && val.toString()) || '0';
        val = val.replace(/,/g, '').replace(/\$/g, '').replace(/%/g, '').replace('N/A', '0');
        if (isNaN(parseFloat(val))) {
            return 0;
        } else {
            return parseFloat(val);
        }
    },
    pmtFunction: function(rate, nperiod, pv, fv, type) {
        if (!fv) fv = 0;
        if (!type) type = 0;

        if (rate === 0) return -(pv + fv) / nperiod;

        const pvif = Math.pow(1 + rate, nperiod);
        let pmt = rate / (pvif - 1) * -(pv * pvif + fv);

        if (type === 1) {
            pmt /= (1 + rate);
        }

        return pmt;
    },
    calculateCOC: function(objData) {
        let {purchasePrice, downCpy, interestCpy, yearsCpy, taxPercent, InsurancePercent, RentalIncome, MiscIncome, WaterCost,
            Garbage, Gas, Electric, VacancyPercent, RepairCostPercent, CapExPercent, PropertyManageCostPercent, HOAFees, MiscOther,
            ClosingCost, RehabBudget,
        } = objData;


        purchasePrice = this.FormatNumber(purchasePrice);
        RentalIncome = this.FormatNumber(RentalIncome);
        downCpy = this.FormatNumber(downCpy);
        interestCpy = this.FormatNumber(interestCpy);
        yearsCpy = this.FormatNumber(yearsCpy);
        taxPercent = this.FormatNumber(taxPercent);
        InsurancePercent = this.FormatNumber(InsurancePercent);
        MiscIncome = this.FormatNumber(MiscIncome);
        WaterCost = this.FormatNumber(WaterCost);
        Garbage = this.FormatNumber(Garbage);
        Gas = this.FormatNumber(Gas);
        Electric = this.FormatNumber(Electric);
        VacancyPercent = this.FormatNumber(VacancyPercent);
        RepairCostPercent = this.FormatNumber(RepairCostPercent);
        CapExPercent = this.FormatNumber(CapExPercent);
        PropertyManageCostPercent = this.FormatNumber(PropertyManageCostPercent);
        HOAFees = this.FormatNumber(HOAFees);
        MiscOther = this.FormatNumber(MiscOther);
        ClosingCost = this.FormatNumber(ClosingCost);
        RehabBudget = this.FormatNumber(RehabBudget);


        const totalMonthlyRentalIncome = RentalIncome;
        const downPayment = purchasePrice * (downCpy / 100);
        const monthlyPayment = this.pmtFunction((interestCpy / 1200), (yearsCpy * 12), (purchasePrice - downPayment));
        const monthlyTax = (purchasePrice * (taxPercent / 100)) / 12;
        const monthlyInsurance = (purchasePrice * (InsurancePercent / 100)) / 12;
        const mortgage = monthlyPayment - monthlyTax - monthlyInsurance;
        const totalMonthlyIncome = totalMonthlyRentalIncome + MiscIncome;
        const VacancyCost = totalMonthlyRentalIncome * (VacancyPercent / 100);
        const RepairCost = (purchasePrice * (RepairCostPercent / 100)) / 12;
        const CapEx = totalMonthlyIncome * (CapExPercent / 100);
        const PropManage = totalMonthlyRentalIncome * (PropertyManageCostPercent / 100);
        const totalMonthlyExpense = WaterCost + Garbage + Electric + MiscOther +
        Gas + HOAFees + VacancyCost + RepairCost + CapEx + PropManage + (-mortgage);
        const totalAnnualIncome = totalMonthlyIncome * 12;
        const totalAnnualExpense = totalMonthlyExpense * 12;
        const totalInvestment = ClosingCost + RehabBudget + downPayment;
        const totalMonthlyCashFlow = totalMonthlyIncome - totalMonthlyExpense;
        const totalAnnualCashFlow = totalMonthlyCashFlow * 12;
        const BasicCOC = (totalAnnualCashFlow / totalInvestment);
        const COC = BasicCOC * 100;
        const netIncome = (RentalIncome * 12);
        const netExpense = (WaterCost + Garbage + Electric + MiscOther +
          Gas + HOAFees + VacancyCost + RepairCost + PropManage) * 12;
        const netOperatingIncome = (netIncome) - (netExpense);
        const capRate = (netOperatingIncome / purchasePrice) * 100;
        const grossRentMultiplier = netIncome > 0 ? (purchasePrice) / (netIncome) : 0;

        return {
            downPayment: downPayment.toFixed(0),
            purchasePrice: purchasePrice.toFixed(0),
            monthlyPayment: monthlyPayment.toFixed(2),
            monthlyTax: monthlyTax.toFixed(2),
            monthlyInsurance: monthlyInsurance.toFixed(2),
            mortgage: mortgage.toFixed(2),
            totalMonthlyIncome: totalMonthlyIncome.toFixed(2),
            totalMonthlyExpense: totalMonthlyExpense.toFixed(2),
            VacancyCost: VacancyCost.toFixed(0),
            RepairCost: RepairCost.toFixed(0),
            CapExCost: CapEx.toFixed(0),
            PropManageCost: PropManage.toFixed(0),
            totalInvestment: totalInvestment.toFixed(0),
            totalMonthlyCashFlow: totalMonthlyCashFlow.toFixed(2),
            totalAnnualCashFlow: totalAnnualCashFlow.toFixed(2),
            totalAnnualIncome: totalAnnualIncome.toFixed(2),
            totalAnnualExpense: totalAnnualExpense.toFixed(2),
            BasicCOC: BasicCOC.toFixed(4),
            netIncome: netIncome.toFixed(2),
            netExpense: netExpense.toFixed(2),
            netOperatingIncome: netOperatingIncome.toFixed(2),
            COC: COC.toFixed(2),
            capRate: capRate.toFixed(2),
            basicCapRate: (netOperatingIncome / purchasePrice).toFixed(4),
            grossRentMultiplier: grossRentMultiplier.toFixed(2),
        };
    },
    getCookie: function(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i += 1) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    },
    setCookie: function(name, value, days) {
        let expires;
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toGMTString()}`;
        } else {
            expires = '';
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
    },
    eraseCookie: function(name) {
        this.setCookie(name, '', -1);
    },
    authorization: function() {
        return {
            Authorization: `Bearer ${this.getCookie('token')}`,
        };
    },
    emailValidation: (email) => {
        let isValid = false;
        //eslint-disable-next-line
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            isValid = true;
        }
        return isValid;
    },
    isUser: function() {
        if (this.getCookie('user')) {

            return true;

        }

        return false;
    },
    updateProfile: function(updateUser) {
        const curUser = JSON.parse(this.getCookie('user'));
        const newUser = {
            ...curUser,
            ...updateUser,
        };
        console.log(newUser);
        if (this.getCookie('user')) {

            return this.setCookie('user', JSON.stringify(newUser));

        }
    },
};

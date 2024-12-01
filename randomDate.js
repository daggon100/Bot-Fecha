module.exports.RandomDate = {
    generateRandomDate: function() {
        const startDate = new Date(1582, 0, 1);  // 1 de enero de 1582
        const endDate = new Date(2999, 11, 31);  // 31 de diciembre de 2999

        // Generar una fecha aleatoria entre startDate y endDate
        const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        return new Date(randomTimestamp);
    }
};

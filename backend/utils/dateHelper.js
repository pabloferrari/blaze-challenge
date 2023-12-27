

const getFormattedDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const getDateMinusDays = (days) => {
    const currentDate = new Date();
    const resultDate = new Date(currentDate);
    resultDate.setDate(currentDate.getDate() - days);
    const year = resultDate.getFullYear();
    const month = (resultDate.getMonth() + 1).toString().padStart(2, '0');
    const day = resultDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

module.exports = {
    getDateMinusDays,
    getFormattedDate
}
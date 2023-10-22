export const shadeColor = function(currentTotalCase:number, highestTotalCase: number) {
    const percent = Math.ceil(Number(((currentTotalCase / highestTotalCase) * 100).toFixed(2))) 

    if (percent < 1) {
      return '#ffff1a'
    } else if (percent <= 2) {
      return '#ffd699'
    } else if (percent <= 5) {
      return   '#e68a00'
    } else if (percent >= 8 && percent <= 15) {
      return '#ff8c1a'; 
    } else if (percent <= 40) {
      return '#ff8566';
    } else if (percent <= 50) {
        return '#ff6600'; 
    } else if (percent <= 70) {
        return '#ff4000'
    } else if(percent <= 90) {
        return '#b30000'
    } else if (percent >= 91 && percent <= 100) {
        return "#e60000"
    } else if (percent > 100) {
        return '#990000'
    }
    else {
      return '#fff'; // Default color (black) or handle other cases
    }
}

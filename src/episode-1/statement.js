export function statement(invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`

  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf)

    volumeCredits += volumeCreditsFor(perf)
    // 喜劇の時は 10 人につき、さらにポイントを加算
    if ('comedy' === playFor(perf).type)
      volumeCredits += Math.floor(perf.audience / 5)

    // 注文内訳を出力
    result += `  ${playFor(perf).name}: ${usd(thisAmount)} (${
      perf.audience
    } seats)\n`
    totalAmount += thisAmount
  }
  result += `Amount owed is ${usd(totalAmount)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result

  function amountFor(aPerformance) {
    let result = 0
    switch (playFor(aPerformance).type) {
      case 'tragedy':
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      case 'comedy':
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`)
    }
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0
    result += Math.max(aPerformance.audience - 30, 0)
    if ('comedy' === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5)
    return result
  }

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(aNumber / 100)
  }
}

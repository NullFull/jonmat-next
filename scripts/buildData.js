const fs = require('fs').promises
const path = require('path')
const fetch = require('isomorphic-unfetch')
const Papa = require('papaparse')

const RESTAURANTS_SHEET = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTmev0k19hbcpS3ApSf87xdXy6wz1fZiOGlB2sTEusRw2-lFJ273_NzYKzzPQ9hTnAOYnrOoPLau1KE/pub?gid=2015788390&single=true&output=csv'

const EXPENSE_SHEETS = {
  2016: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTmev0k19hbcpS3ApSf87xdXy6wz1fZiOGlB2sTEusRw2-lFJ273_NzYKzzPQ9hTnAOYnrOoPLau1KE/pub?gid=1764752662&single=true&output=csv',
  2018: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTmev0k19hbcpS3ApSf87xdXy6wz1fZiOGlB2sTEusRw2-lFJ273_NzYKzzPQ9hTnAOYnrOoPLau1KE/pub?gid=336516275&single=true&output=csv',
  2020: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTmev0k19hbcpS3ApSf87xdXy6wz1fZiOGlB2sTEusRw2-lFJ273_NzYKzzPQ9hTnAOYnrOoPLau1KE/pub?gid=478721577&single=true&output=csv',
}

const fetchCsv = async url => {
  const response = await fetch(url)
  const text = await response.text()

  const { data } = Papa.parse(text)

  return data.map(row => (
    row.map(cell => cell.trim())
  ))
}

const fetchRestaurants = async () => {
  const data = await fetchCsv(RESTAURANTS_SHEET)

  return data.slice(1).map(row => ({
    name: row[0],
    address: row[1],
    lat: readFirstFloat([row[2], row[4]]),
    lng: readFirstFloat([row[3], row[5]]),
  }))
}

// 문자열 목록을 받아서 처음 만나는 올바른 숫자를 반환
const readFirstFloat = values => values.find(parseFloat)

const parsePrice = s => parseInt(s.replace(',', ''))

// CSV의 첫번째 줄을 키로 오브젝트 목록으로 변환
const jsonlize = csv => {
  const columns = csv[0]

  return csv.slice(1).map(row => (
    Object.fromEntries(
      columns.map((key, i) => [key, row[i]])
    )
  ))
}

const aggregate = expenses => {
  const aggregated = {}

  for (const row of expenses) {
    const name = row['성명법인단체명']
    const address = row['주소']
    const key = `${name}-${address}`

    if (!aggregated[key]) {
      aggregated[key] = {
        name,
        address,
        kind: '기타',  // TODO : 데이터 정리 후 추가
        times: 0,
        totalPrice: 0,
      }
    }

    const restaurant = aggregated[key]
    restaurant.times += 1
    restaurant.totalPrice += parsePrice(row['금회'])
  }

  return aggregated
}

const buildLocationMap = restaurants => (
  Object.fromEntries(
    restaurants.map(restaurant => [restaurant.address, {
      'lat': restaurant.lat,
      'lng': restaurant.lng,
    }])
  )
)

const main = async () => {
  const dataDir = path.resolve('public', 'data')
  await fs.mkdir(dataDir, {
    recursive: true
  })

  // 연도 목록 생성
  const filePath = path.resolve(dataDir, 'years.json')
  await fs.writeFile(filePath, JSON.stringify(Object.keys(EXPENSE_SHEETS)))

  // 주소 -> 좌표 맵 생성
  const restaurants = await fetchRestaurants()
  const locationMap = buildLocationMap(restaurants)

  // 통계 데이터 생성
  for (const [year, sheetUrl] of Object.entries(EXPENSE_SHEETS)) {
    const sheet = await fetchCsv(sheetUrl)
    const expenses = jsonlize(sheet)
    const aggregated = aggregate(expenses)

    // 식당에 좌표 덧붙임
    for (const [key, restaurant] of Object.entries(aggregated)) {
      aggregated[key].location = locationMap[restaurant.address]
    }

    // 횟수 기준 정렬해서 Array화
    const sorted = Object.values(aggregated)
      .sort((a, b) => b.times - a.times)

    const filePath = path.resolve(dataDir, `${year}.json`)
    await fs.writeFile(filePath, JSON.stringify(sorted))
  }
}

main()

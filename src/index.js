import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './App.css'
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter'

// create the assets
// here the name appends with id just to create unique asset name
const createAsset = (id, type) => {
  return {
    id: id,
    assetName: type === 'Stock' ? ['AAPL' + id, 'GOOGL' + id, 'FB' + id, 'TSLA' + id, 'MSFT' + id][Math.floor(Math.random() * 4)] : ['EUR' + id, 'USD' + id, 'GBP' + id, 'NIS' + id, 'AUD' + id][Math.floor(Math.random() * 4)],
    price: Math.random() * 10,
    lastUpdate: Date.now(),
    type: type
  }
}

const getAllAssets = (n) => {
  const result = []
  // call createAsset function to create 200 Stocks and 200 Currencies to make 400 assets
  for (let i = 0; i < n; i++) {
    result.push(createAsset(i + 1, 'Stock'))
    result.push(createAsset(i + 1 + n, 'Currency'))
  }
  return result
}

const headerSortingStyle = { backgroundColor: 'lightgray' }

const numberFilterStyle = numberFilter({
  style: { display: 'inline-grid' },  // custom the style on number filter
  numberStyle: { backgroundColor: 'lightgray', margin: '0px' },  // custom the style on number input/select
  numberClassName: 'custom-number-class',  // custom the class on ber input/select
})

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    headerSortingStyle,
    filter: numberFilterStyle
  },
  {
    dataField: 'assetName',
    text: 'Asset Name',
    sort: true,
    headerSortingStyle,
    filter: textFilter()
  },
  {
    dataField: 'price',
    text: 'Price',
    sort: true,
    headerSortingStyle,
    filter: numberFilterStyle
  },
  {
    dataField: 'lastUpdate',
    text: 'Last Updated',
    sort: true,
    headerSortingStyle,
    filter: numberFilterStyle
  },
  {
    dataField: 'type',
    text: 'Type',
    sort: true,
    headerSortingStyle,
    filter: textFilter()
  }
]

const defaultSorted = [{
  dataField: 'price',
  order: 'desc'
}]

class Table extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assets: getAllAssets(200)
    }
  }

  mockRefreshData () {
    const random = Math.random()

    // map through the assets and store it in newAssets to return the data that is changed
    const newAssets = this.state.assets.map((asset) => {
      // we are either increasing the price or decreasing it
      // so based on random number the price will change from -1 to 1
      const newPrice = random >= 0.5 ? asset.price + random : asset.price - random
      const newLastUpdate = Date.now()
      return { ...asset, price: newPrice, lastUpdate: newLastUpdate }
    })

    // call setState method to provide new value so React will call render() method to reflect the changes
    this.setState({ assets: newAssets })
  }

  componentDidMount () {
    // change value of asset price every second
    this.timerID = setInterval(() => this.mockRefreshData(), 1000)
  }

  componentWillUnmount () {
    // need to use the unmount lifecycle method to stop the timer.
    clearInterval(this.timerID)
  }

  render () {
    return (
      <div>
        <h1 id='title'>Assets Realtime Details</h1>
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={ this.state.assets }
          columns={ columns }
          defaultSorted={ defaultSorted }
          filter={ filterFactory() }
        />
      </div>
    )
  }
}

ReactDOM.render(<Table />, document.getElementById('root'))

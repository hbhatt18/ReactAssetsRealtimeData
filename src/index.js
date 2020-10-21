import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import './App.css';
import $ from 'jquery'
import Rx from 'rxjs/Rx'
import DataTable from 'react-data-table-component';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


const timeObservable = Rx.Observable.interval(9000);
export const mock = Rx.Observable.create((ob) => {
	timeObservable.subscribe(() => {
	  Rx.Observable.from(assets)
		.map(asset => {
		  const random = Math.random();
		  asset.price = random >= 0.5 ? asset.price + random : asset.price - random;
        asset.lastUpdate = Date.now();
		  return asset;
		})
		.subscribe(asset => ob.next(asset));
	});
	return () => null; // we don't care about unsubscribe just for a test
});

const createAsset = (id, type) => {
   return {
     id: id,
     assetName: type === 'Stock' ? ['AAPL','GOOGL','FB', 'TSLA', 'MSFT'][Math.floor(Math.random() * 4)] : ['EUR','USD','GBP', 'NIS', 'AUD'][Math.floor(Math.random() * 4)],
     price: Math.random()*10,
     lastUpdate: Date.now(),
     type: type
   }
 };
 
 const getAllAssets = (n) => {
   const result = [];
   for (let i = 0; i < n; i++) {
     result.push(createAsset(i, 'Stock'));
     result.push(createAsset(i+n, 'Currency'));
   }
   return result;
 }
 
const assets = getAllAssets(200);

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'assetName',
    text: 'Asset Name',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'price',
    text: 'Price',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'lastUpdate',
    text: 'Last Updated',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'type',
    text: 'Type',
    sort: true,
    filter: textFilter()
  }
];

const defaultSorted = [{
  dataField: 'price',
  order: 'desc'
}];

class Table extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
        assets: getAllAssets(200)
     }
  }

 componentDidMount() {
   const mock = Rx.Observable.create((ob) => {
     timeObservable.subscribe(() => {
       Rx.Observable.from(this.state.assets).map((asset) => {
         const random = Math.random();
         asset.price = random >= 0.5 ? asset.price + random : asset.price - random;
         return asset;
       }).subscribe((asset) => ob.next(asset));
     });
     return () => null;
   });
   const p = mock.subscribe((asset) => {
      asset.price = asset.price;
    });
 }

  render(){
    return(
      <div>
      <h1 id='title'>Assets Realtime Details</h1>
    <BootstrapTable
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

ReactDOM.render(<Table />, document.getElementById('root'));

serviceWorker.unregister()
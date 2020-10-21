import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import assetPrices from './assetPrices.js'
import { render } from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import './App.css';
import Rx from 'rxjs/Rx';

const timeObservable = Rx.Observable.interval(1000);
const createAsset = (id, type) => ({
  assetName: 'abc',
  id,
  price: Math.random() * 13,
  type
});
const getAllAssets = (n) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(createAsset(i, 'Stock'));
    result.push(createAsset(i+n, 'Currency'));
  }
  return result;
};
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
          console.log(asset.price);
          ReactDOM.render(<Table />, document.getElementById('root'));
          return asset;
        }).subscribe((asset) => ob.next(asset));
      });
      return () => null;
    });
    const p = mock.subscribe((asset) => {
      // console.log(asset.price);
       asset.price = asset.price;
     });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.assets[0])
    return header.map((key, index) => {
      return <th style={{ padding: "15px" }} key={ index }>{ key.toUpperCase() }</th>;
    });
  }

  renderTableData() {
     return this.state.assets.map((asset, index) => {
        const { id, assetName, price, type } = asset
        return (
           <tr key={id}>
              <td style={{ padding: "15px" }}>{ id }</td>
              <td style={{ padding: "15px" }}>{ assetName }</td>
              <td style={{ padding: "15px" }}>{ price }</td>
              <td style={{ padding: "15px" }}>{ type }</td>
           </tr>
        );
     });
  }

  render() {
    return (
      <div>
        <h1 id='title'>Assets Realtime Details</h1>
        <table id='assets'>
          <thead>
            <tr>
              { this.renderTableHeader() }
            </tr>
          </thead>
          <tbody>
            { this.renderTableData() }
          </tbody>
        </table>
      </div>
    );
  }
}
ReactDOM.render(<Table />, document.getElementById('root'));
serviceWorker.unregister()
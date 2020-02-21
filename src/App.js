import React from 'react';
import axios from 'axios';
import './App.css';
import Loader from 'react-loader-spinner';
import { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.tableResponse = {};
    this.state = {
      loader: true
    }
    this.callApi();
    
  }
  callApi = () => {
    let _symbol = 'BSE,BME,AZN,ASX,SNAP,TWTR,VOD.L'; //Only top five stock market can be seen on free subscription.
    let _url = '/data/mock.json'; //'https://api.worldtradingdata.com/api/v1/stock?symbol='+_symbol+'&api_token=demo';
    axios(_url).then((response) => {
      this.tableResponse = response.data;
      this.setState({ loader: false });
    })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }
  tableRow = (tableData) => {
    let _tableColumnName = ["Company Name", "Symbol", "Currency", "Price Open", "Day high", "Day low", "Day Change", "Change in(%)", "Close yesterday", "Market cap", "Volume", "Volume avg", "Shares", "Stock Exchange", "Timezone name", "EPS in(%)", "Stock Exchange Long"]
    return (
      <div className="table-responsive text-nowrap">
        {/* table-dark  */}
        <table className="table">
          <thead>
            <tr>
              {_tableColumnName.map((th, index) => {
                return (
                  <th key={index}>{th}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {
              tableData && tableData.map((rows, index) => {
              return (
                <tr key={index}>
                  <td>{rows.name}</td>
                  <td>{rows.symbol}</td>
                  <td>{rows.currency}</td>
                  <td>{rows.price_open}</td>
                  <td>{rows.day_high}</td>
                  <td>{rows.day_low}</td>
                  <td>{rows.day_change}</td>
                  <td>{rows.change_pct}</td>
                  <td>{rows.close_yesterday}</td>
                  <td>{rows.market_cap}</td>
                  <td>{rows.volume}</td>
                  <td>{rows.volume_avg}</td>
                  <td>{rows.shares}</td>
                  <td>{rows.stock_exchange_short}</td>
                  <td>{rows.timezone_name}</td>
                  <td>{rows.eps}</td>
                  <td>{rows.stock_exchange_long}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    let _tableRow = !this.state.loader && this.tableRow(this.tableResponse.data);
    return (
      <div className="google-finance">
      <nav className="navbar navbar-dark bg-primary">
        
      </nav>
        {this.state.loader && <Loader className="loader" color="#00BFFF" height={100} width={100} />}
        {!this.state.loader &&
          <div className="App">
            {_tableRow}
          </div>
        }
      </div>
    );
  }
}
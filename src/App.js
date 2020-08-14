import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

class App extends Component {

  /*
  constructor(props) {
    super(props);
    this.state = {
        transaction: [],
    }
  }
  */
  /* ниже тоже самое только в современном синтаксесе, так как мы не используем  props */

  state = {
    transactions: [],
    description: '',
    amount: '',
    resultIncome: 0,
    resultExpress: 0,
    totalBalance: 0,
  }

  addTransaction = add => {

    const transactions = [...this.state.transactions,
        {
            id: `cmr${(+new Date()).toString(16)}`,
            description: this.state.description,
            amount: this.state.amount,  
            add
        }
    ];

    this.setState({ 
        transactions,
        description: '',
        amount: '',        
    }, this.getTotalBalance);
  }

  addAmount = e =>  {
    this.setState({amount: parseFloat(e.target.value)}); 
  }

  addDescription = e =>  {
    this.setState({description: e.target.value}); 
  }

  getIncome() {
    return this.state.transactions
    .filter(item => item.add)
    .reduce((acc, item) => item.amount + acc, 0)
  }

  getExpress() {
    return this.state.transactions
    .filter(item => !item.add)
    .reduce((acc, item) => item.amount + acc, 0)
  }

  getTotalBalance() {
      const resultIncome = this.getIncome();
      const resultExpress = this.getExpress();

      const totalBalance = resultIncome - resultExpress;

      this.setState({
        resultIncome,
        resultExpress,
        totalBalance,
      });
  }
    
  render() {
    return (
        <>
    
          <title> Калькулятор расходов </title>
          <header>
            <h1>Кошелек</h1>
            <h2>Калькулятор расходов</h2>
          </header>
          <main>
            <div className="container">
                <Total 
                    resultExpress={this.state.resultExpress}
                    resultIncome={this.state.resultIncome}
                    totalBalance={this.state.totalBalance}
                />
                <History 
                    transactions={this.state.transactions}
                />
                <Operation 
                    addTransaction={this.addTransaction}
                    addAmount={this.addAmount}
                    addDescription={this.addDescription}
                    description={this.state.description}
                    amount={this.state.amount}
                />
            </div>
          </main>
    
        </>
    );
  }
}

export default App;

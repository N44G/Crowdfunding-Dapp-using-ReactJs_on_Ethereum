import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//import web3 from '../getWeb3';
//import ico from '../contracts/ICO';



class Contribute extends Component {

state = {
  value: '',
  statusError: false,
  statusLoading: false,
  success: false,
  errorMessage:'',
  web3:this.props.web3,
  ico:this.props.ico,
}

onSubmit = async event => {
  event.preventDefault();

try {
  this.setState({statusError: false, statusLoading:true});
  
  const web3=this.state.web3;
  const ico=this.state.ico;
  
  let accounts = await web3.eth.getAccounts();
  
  await ico.methods.endSale().send( {from: accounts[0]} );
  await ico.methods.buyTokens().send({
    from: accounts[0],
    value: web3.utils.toWei(this.state.value, 'ether')
  });
  this.setState({statusLoading:false, success:true});
}catch(err) {
  this.setState({errorMessage: "ERROR "+ err.message, statusLoading:false, success:false, statusError:true  });
}


};


  render() {
    return (
      <div>
        <div class="contribute">Contribute</div>
          <div class=" contributeContainer">
            <form onSubmit= {this.onSubmit}>
              <div class="buyCoins">
                <div class="amountToBuy">Amount of ether to buy:</div>
                <TextField value={this.state.value} onChange= {event => this.setState({value:event.target.value})}> </TextField>
                <div> ≈ {this.state.value * 124} DC </div>
                <div class="etherDC"> (1 ETH ≈ 100 + 25 (Bonus) DC) </div>
              </div>
              <div class="buttonBuy">
                <Button type="submit" variant="contained" color="primary" value="Submit">Buy DC Tokens | 25% Bonus </Button>
              </div>
            </form>


            {this.state.statusError ? (
            <div class="flex errorMessage">
              <i class="material-icons">error_outline</i>
              <div >{this.state.errorMessage}</div>
            </div>)
            : null}

            {this.state.statusLoading ? (
            <div class="flex loadingContainer">
              <div>
                <div class="loadingText"> Waiting For Confirmation</div>
                <div class="loadTextSub">(this can take up to 30 seconds)</div>
              </div>
              <CircularProgress/>
            </div>)
            : null}

            {this.state.success ? (
            <div class="flex successfully">You successfully bought DC Coins!</div>)
            : null}

        </div>
      </div>
    );
  }
}

export default Contribute;




/*
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

class Contribute extends Component {

  render() {
    return (
      <div>
        <div className="contribute">Contribute</div>
          <div className=" contributeContainer">
            <form>
              <div className="buyCoins">
                <div className="amountToBuy">Amount of ether to buy:</div>
                <TextField> </TextField>
                <div> ≈  DC </div>
                <div className="etherDC"> (1 ETH ≈ 100 + 25 (Bonus) DC) </div>
              </div>
              <div className="buttonBuy">
                <Button type="submit" variant="contained" color="primary" value="Submit">Buy DC Tokens | 25% Bonus </Button>
              </div>
            </form>

            <div className="flex errorMessage">
              <i className="material-icons">error_outline</i>
              <div >Error Message: asydassadasdas</div>
            </div>

            <div className="flex loadingContainer">
              <div>
                <div className="loadingText"> Waiting For Confirmation</div>
                <div className="loadTextSub">(this can take up to 30 seconds)</div>
              </div>
              <CircularProgress/>
            </div>

            <div className="flex successfully">You successfully bought DC Coins!</div>

        </div>
      </div>
    );
  }
}

export default Contribute;
*/
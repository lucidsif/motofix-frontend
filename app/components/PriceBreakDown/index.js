/**
*
* PriceBreakDown
*
*/

import React from 'react';
import { Button, Container, List, Image } from 'semantic-ui-react';
import { services } from 'components/QuoteCart';

// TODO: 7/10 Save quote by sending user to signup page where they can email themselves the quote
// TODO: 5/10 Fix css styling so item title is in the vertically aligned in the middle

function PriceBreakDown(props) {
  
  function floatServicePrice(){
    return parseFloat(Math.round(props.totalServicesPrice()*100)/100).toFixed(2);
  }
  function floatPartsPrice(){
    return parseFloat(Math.round(props.totalPartsPrice()*100)/100).toFixed(2);
  }
  function floatTax(){
    let total = props.totalServicesPrice() + props.totalPartsPrice();
    let taxRate = .0875;
    let tax = total*taxRate;
    return parseFloat(Math.round(tax*100)/100).toFixed(2);
  }
  function floatTotalPrice(){
   let subTotal = props.totalServicesPrice() + props.totalPartsPrice();

    let taxRate = .0875;
    let tax = subTotal*taxRate;

    let total = subTotal + tax;
    return parseFloat(Math.round(total*100)/100).toFixed(2);
  }

  function multiplyAndFloat(num){
    let laborPrice = num * 67;
    return parseFloat(Math.round(laborPrice*100)/100).toFixed(2);
  }

  function renderServices(){
    let filtered = services.filter((service) => {
      return props.cart[service.replace(/\s/g, "")].selected;
    })
    console.log(filtered);
    return filtered.map((filteredService) => {
      return (
      <List.Item>
        <List.Content floated='left'><List.Icon name='linkify' /></List.Content>
          <List.Content floated='left' verticalAlign='middle'>
            <span className="service-span">{filteredService}</span></List.Content>
          <List.Content floated='right' verticalAlign="middle">
            <span className="service-span">{multiplyAndFloat(props.cart[filteredService.replace(/\s/g, "")].laborTime)}</span>
        </List.Content>
        <List.Content>
          <List>
            {renderParts(filteredService.replace(/\s/g, ""))}
          </List>
        </List.Content>
      </List.Item>
      )
    })
  }
  function renderParts(serviceName){
    console.log('renderPart: ' + serviceName)
    // todo: dynamically render list of parts and their prices
    return Object.keys(props.part[serviceName]).map((key) => {
      return (
        <List.Item>
          <List.Item>
            <Image verticalAlign='middle' floated='left' src={props.part[serviceName][key].imageURL} size="tiny"/>
            <List.Content floated='left' verticalAlign="middle">
              <span className="part-span">{props.part[serviceName][key].partTitle}</span>
            </List.Content>
            <List.Content floated='right' verticalAlign="middle">
              <span className="'part-span">{props.part[serviceName][key].price.__value__}</span>
            </List.Content>
          </List.Item>
        </List.Item>
      )
    })
  }

  return (
    <Container>
        <List>
          {renderServices()}
        </List>
        <p><a>Have your own parts?</a></p>
        <List divided relaxed>
           <List.Item>
               <List.Content floated='left'>
                   <p>Service Total</p>
               </List.Content>
               <List.Content floated='right'>
                    <p>{floatServicePrice()}</p>
               </List.Content>
           </List.Item>
           <List.Item>
               <List.Content floated='left'>
                   <p>Parts Total</p>
               </List.Content>
               <List.Content floated='right'>
                    <p>{floatPartsPrice()}</p>
               </List.Content>
           </List.Item>
           <List.Item>
               <List.Content floated='left'>
                   <p> Tax on Parts</p>
               </List.Content>
               <List.Content floated='right'>
                    <p>{floatTax()}</p>
               </List.Content>
           </List.Item>
           <List.Item>
               <List.Content floated='left'>
                   <p>Total Price</p>
               </List.Content>
               <List.Content floated='right'>
                    <p>{floatTotalPrice()}</p>
               </List.Content>
           </List.Item>
       </List>

      <div>
        <Button>Save Quote</Button>
        <Button>Schedule Now</Button>
      </div>
    </Container>
  );
}

export default PriceBreakDown;
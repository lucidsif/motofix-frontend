/**
*
* PriceBreakDown
*
*/

import React from 'react';
import { Button, Container, List, Image, Label } from 'semantic-ui-react';
import { services } from 'components/QuoteCart';
import FormModal from 'components/FormModal';

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
      let laborTime = multiplyAndFloat(props.cart[filteredService.replace(/\s/g, "")].laborTime)
      let unAvailableLaborTime = props.cart[filteredService.replace(/\s/g, "")].unavailable
      if(unAvailableLaborTime){
        laborTime = 'N/A'
      }
      return (
      <List.Item key={filteredService}>
        <List.Content floated='left'><List.Icon name='linkify' /></List.Content>
          <List.Content floated='left' verticalAlign='middle'>
            <span className="service-span">{filteredService}</span></List.Content>
          <List.Content floated='right' verticalAlign="middle">
            <span className="service-span">{laborTime}</span>
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
    console.log(props.part)
    console.log('renderPart: ' + serviceName)
    // todo: dynamically render list of parts and their prices
    return Object.keys(props.part[serviceName]).map((key) => {
      if(props.part[serviceName][key].valid){
        return (
          <List.Item key={serviceName+key}>
            <List.Item>
              <Image verticalAlign='middle' floated='left' src={props.part[serviceName][key].imageURL} size="tiny"/>
              <List.Content floated='left' verticalAlign="middle">
                <span className="part-span">
                  <Label>{props.part[serviceName][key].quantity}x</Label> {props.part[serviceName][key].partTitle}</span>
              </List.Content>
              <List.Content floated='right' verticalAlign="middle">
                <span className="'part-span">{props.part[serviceName][key].price.__value__}</span>
              </List.Content>
            </List.Item>
          </List.Item>
        )
      } else {
        return (
          <List.Item key={serviceName+key}>
            <List.Item>
              <Image verticalAlign='middle' floated='left' src={'http://authoritywebsiteincome.com/wp-content/uploads/2013/11/mystery-landing-page.png'} size="tiny"/>
              <List.Content floated='left' verticalAlign="middle">
                <span className="part-span">{key} could not be found for this model at this time</span>
              </List.Content>
              <List.Content floated='right' verticalAlign="middle">
                <span className="'part-span">N/A</span>
              </List.Content>
            </List.Item>
          </List.Item>
        )
      }
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
                   <p>Labor Total</p>
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
        <Button disabled>Schedule Now</Button>
        <FormModal client={props.client} />
      </div>
    </Container>
  );
}

export default PriceBreakDown;

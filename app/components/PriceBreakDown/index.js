/**
*
* PriceBreakDown
*
*/

import React from 'react';
import { Button, Container, List, Image } from 'semantic-ui-react';
//import services from 'components/QuoteCart';

// TODO: 7/10 render parts for selected services
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

  return (
    <Container>
        <List>
            <List.Item>
                <List.Content floated='left'><List.Icon name='linkify' /></List.Content>
                <List.Content floated='left' verticalAlign='middle'>
                    <span className="service-span">Oil Change</span></List.Content>
                <List.Content floated='right' verticalAlign="middle">
                    <span className="service-span">$40.00</span></List.Content>
                <List.Content>
                    <List>
                        <List.Item>
                            <Image verticalAlign='middle' floated='left' src="http://thumbs1.ebaystatic.com/m/m62KDAtw-KaYq44wbFJs29A/140.jpg" size="tiny"/>
                            <List.Content floated='left' verticalAlign="middle">
                                <span className="part-span">Oil filter</span>
                            </List.Content>
                            <List.Content floated='right' verticalAlign="middle">
                                <span className="'part-span">$10.00</span>
                            </List.Content>
                        </List.Item>
                    </List>
                </List.Content>
            </List.Item>
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

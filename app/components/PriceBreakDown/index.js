/**
*
* PriceBreakDown
*
*/

import React from 'react';
import { Button, Container, List, Image } from 'semantic-ui-react';

//TODO: try creating a vertical list of horizontal items?
// TODO: dynamically render services and parts from props.
// TODO: calculate prices
// TODO: 5/10 Fix css styling so item title is in the vertically aligned in the middle

function PriceBreakDown(props) {
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
                    <p>45.00</p>
               </List.Content>
           </List.Item>
           <List.Item>
               <List.Content floated='left'>
                   <p>Parts Total</p>
               </List.Content>
               <List.Content floated='right'>
                    <p>45.00</p>
               </List.Content>
           </List.Item>
           <List.Item>
               <List.Content floated='left'>
                   <p> Tax on Parts</p>
               </List.Content>
               <List.Content floated='right'>
                    <p>45.00</p>
               </List.Content>
           </List.Item>
           <List.Item>
               <List.Content floated='left'>
                   <p>Total Price</p>
               </List.Content>
               <List.Content floated='right'>
                    <p>45.00</p>
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

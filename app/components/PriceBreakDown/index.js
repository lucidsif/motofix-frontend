/**
*
* PriceBreakDown
*
*/

import React from 'react';
import { Button, Container, List, Image, Item, Grid, Segment, Accordion, Icon, Label } from 'semantic-ui-react';

// TODO: dynamically render services and parts from props.
// TODO: calculate prices
// TODO: 5/10 Fix css styling so item title is in the vertically aligned in the middle

function PriceBreakDown(props) {
  return (
    <Container>

        <List>
            <List.Item>
                <List.Content floated='left'>
                    <List.Icon name="settings" size='large'/>
                </List.Content>
                <List.Content floated='left'>
                    <i>Oil Change</i>
                </List.Content>
                <List.Content floated='right'>
                    <i>$45.00</i>
                </List.Content>
                <List>
                    <List.Item>
                        <Image size='mini' floated='left' src={'http://thumbs4.ebaystatic.com/m/mZWdRMwthT-Y_bX9Hjo6G2Q/140.jpg'} />
                        <List.Content floated='left' verticalAlign='middle'>
                            <p>Engine Oil</p>
                        </List.Content>
                        <List.Content floated='right'>
                            <p>$10.00</p>
                        </List.Content>
                    </List.Item>
                </List>
            </List.Item>
        </List>

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
